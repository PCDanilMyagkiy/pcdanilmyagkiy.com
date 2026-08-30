import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";

import AccountsModel from "./../models/accountsModel.js";
import PendingsModel from "./../models/pendingsModel.js";
import CalculatorHistoriesModel from "./../models/calculatorHistoriesModel.js"
import RefreshTokenModel from "./../models/refreshTokenModel.js";
import TrafficLimitingModel from "./../models/trafficLimitingModel.js";
import IpLimitingModel from "./../models/ipLimitingModel.js";
import IpBlacklistModel from "./../models/ipBlacklistModel.js";
import { sendVerCode } from "./../mailer.js";

import accountSchema from "./../../shared/schemas/accountSchema.js";



async function checkCode(account, verifCode) {
    const verifCodeHash = account.verificationCodeHash;
    const attempts = account.attempts;

    if (attempts >= 4) return 1;

    if (await bcrypt.compare(verifCode, verifCodeHash)) {
        account.attempts = 99;
        await account.save();

        return 2;
    }
    
    return 0;
}


export function makeAccountsService() {
    return {
        async getAccounts() {
            const accounts = await AccountsModel.find();

            return accounts;
        },



        async getAccountInfo(accountId) {
            const account = await AccountsModel.findById(accountId);

            return account;
        },



        async login({ name, email, password, verifCode }) {
            let account;

            if (name && email) {
                account = await AccountsModel.findOne({ name, email });
            } else if (name) {
                account = await AccountsModel.findOne({ name });
            } else if (email) {
                account = await AccountsModel.findOne({ email });
            }

            if (!account) {
                return { success: 0 }
            }

            

            const passwordStatus = await bcrypt.compare(password, account.passwordHash);
            let codeStatus = 0;

            if (!passwordStatus) {
                if (email && verifCode) {
                    const pending = await PendingsModel.findOne({ email });

                    if (pending) {
                        codeStatus = await checkCode(pending, verifCode);
                    }
                }
            }


            if (!(codeStatus === 2) && !passwordStatus) {
                return { success: 0 }
            }



            const accessToken = jwt.sign(
                { _id: account._id },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "15m" }
            );



            const jti = crypto.randomUUID();

            const refreshToken = jwt.sign(
                { _id: account._id, jti },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: "14d" }
            )

            await RefreshTokenModel.create({
                jti,
                userId: account._id,
                expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14)
            });



            return {
                success: 1,
                accessToken,
                refreshToken,
                account: {
                    id: account._id,
                    email: account.email
                },
                verifCodeExperation: codeStatus
            }
        },





        async createAccount({ name, email, password, verifCode }) {
            const inputValidationResult = accountSchema.safeParse({ name, password });

            if (!inputValidationResult.success) {
                return { log: "inputValidationFail_server_fail" }
            }


            const nameTaken = await AccountsModel.findOne({ name });
            const emailTaken = await AccountsModel.findOne({ email });
            const account = await PendingsModel.findOne({ email });

            if (!account) {
                return { log: "signUpFailInvalidEmail" }
            }
            
            if (nameTaken || emailTaken) {
                return { log: "signUpFailCredentialsTaken" }
            }


            const codeStatus = await checkCode(account, verifCode);

            if (codeStatus === 0) {
                account.attempts++;
                await account.save();

                return {
                    log: "signUpFailInvalidVerifCode",
                    attemptsLeft: 5 - account.attempts
                };
            }

            if (codeStatus === 1) {
                return { log: "verifCodeFailNoAttempts" };
            }

            if (codeStatus === 2) {
                const passwordHash = await bcrypt.hash(password, 10);

                account.name = name;
                account.passwordHash = passwordHash;
                account.emailVerified = true;
                
                await account.deleteOne();
                await AccountsModel({ name, email, passwordHash }).save();

                return { log: "signUpSuccess" };
            }
        },





        async generateCode(email, ip) {
            const account = await PendingsModel.findOne({ email });
            let trafficLimiter = await TrafficLimitingModel.findOne({ email });
            let ipLimiter = await IpLimitingModel.findOne({ ip });
            const ipBlacklisted = await IpBlacklistModel.findOne({ ip });

            const verificationCode = crypto.randomInt(100000, 1000000).toString();
            const verificationCodeHash = await bcrypt.hash(verificationCode, 10);


            if (!trafficLimiter) {
                trafficLimiter = await TrafficLimitingModel.create({ email });
            }

            if (trafficLimiter.codesSent >= 10) {
                return {
                    log: "verifCodeFailTooManyCodes",
                    newCodesIn: trafficLimiter.createdAt.getTime() + 1000 * 60 * 60 * 24 - Date.now()
                }
            }


            if (!ipLimiter) {
                ipLimiter = await IpLimitingModel.create({ ip });
            }

            if (ipLimiter.codesSent >= 30) {
                return {
                    log: "verifCodeFailIpLimiting"
                }
            }


            if (ipBlacklisted) {
                return {
                    log: "verifCodeFailIpBlacklisted"
                }
            }


            if (account) {
                if (Date.now() < account.codeSentAt + 60 * 1000) {
                    return {
                        log: "verifCodeFailTooManyRequests",
                        timeLeft: Math.round((account.codeSentAt + 60 * 1000 - Date.now()) / 1000)
                    }
                }


                account.verificationCodeHash = verificationCodeHash;
                account.codeSentAt = Date.now();
                account.attempts = 0;
                await account.save();
            } else {
                await PendingsModel({ email, verificationCodeHash, codeSentAt: Date.now(), attempts: 0 }).save();
            }

            trafficLimiter.codesSent++;
            await trafficLimiter.save();

            ipLimiter.codesSent++;
            await ipLimiter.save();


            sendVerCode(verificationCode, email);

            return {
                log: "verifCodeSuccess"
            }
        },





        async refresh(refresh) {
            try {
                const decoded = jwt.verify(refresh, process.env.REFRESH_TOKEN_SECRET);

                const tokenInDb = await RefreshTokenModel.findOne({ jti: decoded.jti });

                if (!tokenInDb) {
                    throw new Error;
                }


                await RefreshTokenModel.deleteOne({ jti: decoded.jti });

                const newJti = crypto.randomUUID();

                const newRefresh = jwt.sign(
                    { _id: decoded._id, jti: newJti },
                    process.env.REFRESH_TOKEN_SECRET,
                    { expiresIn: "14d" }
                );

                await RefreshTokenModel.create({
                    jti: newJti,
                    userId: decoded._id,
                    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14)
                });


                const newAccess = jwt.sign(
                    { _id: decoded._id },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: "15m" }
                );

                return {
                    success: 1,
                    newRefresh,
                    newAccess
                }
            } catch(err) {
                return { success: 0 }
            }
        },





        async applyChanges(req, res) {
            if (!req.account) {
                return { fail: "needRefresh" }
            }


            const { name, password, verifCode } = req.body;
            const account = await AccountsModel.findById(req.account._id);
            const pending = await PendingsModel.findOne({ email: account.email });

            const passwordComparison = await bcrypt.compare(password, account.passwordHash);


            if (name === account.name && passwordComparison) {
                return { fail: "noChanges" }
            }


            let accessLevel = 0;

            if (verifCode && pending) {
                if (pending.verificationCodeHash) {
                    if ((await checkCode(pending, verifCode)) > 1) {
                        accessLevel = 2;
                    }
                }
            }

            if (password && account && !accessLevel) {
                if (passwordComparison) {
                    accessLevel = 1;
                }
            }
            
            if (accessLevel === 0) {
                return { fail: "invalidCredentials" }
            }


            if (name) {
                account.name = name;
            }

            if (password && accessLevel > 1) {
                account.passwordHash = await bcrypt.hash(password, 10);
            }


            const nameChanged = account.isModified("name");
            const passwordChanged = account.isModified("passwordHash");

            await account.save();

            return {
                success: 1,
                nameChanged,
                passwordChanged,
                verifCodeExperation: accessLevel === 2
            }
        },





        async logOut(req, res) {
            try {
                const decoded = await jwt.verify(req.cookies.refresh, process.env.REFRESH_TOKEN_SECRET);

                await RefreshTokenModel.deleteOne({ jti: decoded.jti });
            } catch (err) {}
        },





        async deleteAccount(req, res) {
            if (!req.account) {
                return { fail: "needRefresh" }
            }


            const { password, verifCode } = req.body;
            const account = await AccountsModel.findById(req.account._id);
            const pending = await PendingsModel.findOne({ email: account.email });
            const calculatorHistory = await CalculatorHistoriesModel.findOne({ userId: account._id });


            if (account) {
                let i = 0;

                if (await bcrypt.compare(password, account.passwordHash)) {
                    i = 1;
                }

                if (!i && pending) {
                    if (await checkCode(pending, verifCode) > 1) {
                        i = 1;
                    }
                }


                if (i) {
                    await AccountsModel.deleteOne({ _id: account._id });
                    await RefreshTokenModel.deleteOne({ userId: account._id });

                    if (pending) await PendingsModel.deleteOne({ _id: pending._id });
                    if (calculatorHistory) await CalculatorHistoriesModel.deleteOne({ userId: account._id });

                    res.clearCookie("access");
                    res.clearCookie("refresh");

                    return { success: 1 }
                }
            }

            return { fail: "noAccount" }
        }
    }
}