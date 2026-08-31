import express from "express";
import path from "path";
import "./dotenvConfig.js";
import { fileURLToPath } from "url";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./connectDb.js";

import { makeAccountsService } from "./services/accountsService.js";
import { makeCalculatorHistoriesService } from "./services/calculatorHistoriesService.js";
import { verifyToken } from "./middleware/verifyToken.js";


await connectDb();


const port = process.env.PORT;
const app = express();
const clientBuildPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "../client/dist");


async function logIntoAccount(req, res) {
    const { name, email, password, verifCode } = req.body;

    const loginResponse = await accountsService.login({ name, email, password, verifCode });

    if (loginResponse.success) {
        res
            .cookie("access", loginResponse.accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "Strict",
                maxAge: 1000 * 60 * 15
            })

            .cookie("refresh", loginResponse.refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "Strict",
                maxAge: 1000 * 60 * 60 * 24 * 14
            });
    }

    return loginResponse;
}


app.use(cors({
    origin: [
        `http://localhost:${process.env.PORT}`,
        "http://localhost:8080",
        "https://pcdanilmyagkiy.netlify.app"
    ],
    credentials: true,
}));
app.use(express.json());
app.use(express.static(clientBuildPath));
app.use(cookieParser());


let accountsService;
let calculatorHistoriesService;



app.post("/api/accounts/create", async (req, res) => {
    const { name, email, password, verifCode } = req.body;
    const result = await accountsService.createAccount({ name, email, password, verifCode });
    
    if (result.log === "signUpSuccess") {
        await logIntoAccount(req, res);
    }

    res.json(result);
});

app.post("/api/accounts/login", async (req, res) => {
    const loginResponse = await logIntoAccount(req, res);

    return res.json(loginResponse);

});

app.post("/api/accounts/code/generate", async (req, res) => {
    const { email } = req.body;

    const codeStatus = await accountsService.generateCode(email, req.ip);

    res.json(codeStatus);
});

app.post("/api/accounts/refresh", async(req, res) => {
    const result = await accountsService.refresh(req.cookies.refresh);

    if (result.success) {
        const { newAccess, newRefresh } = result;

        return res
            .cookie("access", newAccess, {
                httpOnly: true,
                secure: false,
                sameSite: "Strict",
                maxAge: 1000 * 60 * 15
            })
            .cookie("refresh", newRefresh, {
                httpOnly: true,
                secure: false,
                sameSite: "Strict",
                maxAge: 1000 * 60 * 60 * 24 * 14
            })

            .json({ success: 1 });
    } else {
        res.clearCookie("refresh");

        return res.json({ success: 0 });
    }
});

app.post("/api/accounts/apply-changes", verifyToken, async (req, res) => {
    const result = await accountsService.applyChanges(req, res);

    res.json(result);
});

app.post("/api/accounts/logout", async (req, res) => {
    await accountsService.logOut(req, res);

    res.clearCookie("access");
    res.clearCookie("refresh");

    return res.json({ success: 1 });
});

app.post("/api/account/delete", verifyToken, async (req, res) => {
    const response = await accountsService.deleteAccount(req, res);

    return res.json(response);
});


app.post("/api/calculator-histories/add-history-item", async (req, res) => {
    const { userId, history } = req.body;
    const response = await calculatorHistoriesService.setHistory({ userId, history });

    res.json(response);
});


app.post("/api/calculator-histories/get-history", async (req, res) => {
    const { userId } = req.body;

    const calculatorHistory = await calculatorHistoriesService.getCalculatorHistory(userId);

    return res.json(calculatorHistory);
});





app.get("/api/accounts/profile", verifyToken, async (req, res) => {
    if (req.account) {
        const account = await accountsService.getAccountInfo(req.account._id);
        
        res.json(account);
    } else {
        const refreshToken = req.cookies.refresh;

        if (refreshToken) {
            res.json({ fail: "needRefresh" });
        } else {
            res.json({ fail: "noRefresh" });
        }
    }
});


app.get("/*splat", (req, res) => {
    res.sendFile(path.join(clientBuildPath, "index.html"))
});



app.listen(port, () => {
    console.log(`Node is listening at http://localhost:${port}`);
});



async function start() {
    accountsService = makeAccountsService();
    calculatorHistoriesService = makeCalculatorHistoriesService();
}

start();