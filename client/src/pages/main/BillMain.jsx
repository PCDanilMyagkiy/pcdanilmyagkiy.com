/*
███████████████████████████████████████████████████
█████   _     _____ ____    _    ______   __  █████
█████  | |   | ____/ ___|  / \  / ___\ \ / /  █████
█████  | |   |  _|| |  _  / _ \| |    \ V /   █████
█████  | |___| |__| |_| |/ ___ \ |___  | |    █████
█████  |_____|_____\____/_/   \_\____| |_|    █████
█████                                         █████
███████████████████████████████████████████████████


Be warned: this page contains legacy code.

This page was implemented before the current project architecture
and does not follow the project's current coding conventions.

It is stable and was intentionally left unchanged because the effort
required to refactor it would be disproportionate to the benefits.

Refactoring is advised only if further development of this page
truly requires it.
*/





import { useEffect, forwardRef, useImperativeHandle, useState, useRef } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

import { fetchRefresh } from "./../../utils/fetchRefresh.js";


import styles from "./BillMain.module.scss";

import { s } from "./../../utils/scale.js";

import cutPaperEdgeTop from "./../../assets/MainPage/BillMain/cutPaperEdgeTop.png";
import cutPaperEdgeBottom from "./../../assets/MainPage/BillMain/cutPaperEdgeBottom.png";
import tick from "./../../assets/MainPage/BillMain/tick.png";
import documentFolderBgUpper from "./../../assets/MainPage/BillMain/documentFolderBgUpper.png";
import documentFolderBgLower from "./../../assets/MainPage/BillMain/documentFolderBgLower.png";
import sticker from "./../../assets/MainPage/BillMain/sticker.png";
import eyeIcon from "./../../assets/MainPage/BillMain/eyeIcon.png";
import crossedEyeIcon from "./../../assets/MainPage/BillMain/crossedEyeIcon.png";

import accountSchema from "../../../../shared/schemas/accountSchema.js";

gsap.registerPlugin(TextPlugin);



const BillMain = forwardRef((props, ref) => {
    const hasRun = useRef(0);

    const containerRef = useRef(null);

    const sidebarRef = useRef(null);
    const sidebarContainerRef = useRef(null);
    const placeholderFontBlocksContainerRef = useRef(null);

    const typewriter3000 = useRef(null);
    const typewriter3000Window = useRef(null);
    const typewriter3000WindowScroller = useRef(null);
    const indicator = useRef(null);

    const documentFolder = useRef(null);
    const documentFolderUpper = useRef(null);
    const documentFolderLower = useRef(null);

    const mainRef = useRef(null);
    const mainHeaderContainer = useRef(null);

    const shredder = useRef(null);
    const shredderIndicator = useRef(null);

    const stickerRef = useRef(null);

    const loggedIn = useRef(0);

    const verifCodeInputExpired = useRef(0);

    const verifCodeInputInactive = useRef(0);

    const deleteAccountFailInvalidCredentialsStatus = useRef(0);


    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);

    const [placeholderFontBlocks, setPlaceholderFontBlocks] = useState(null);

    const [nameInput, setNameInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [verifCodeInput, setVerifCodeInput] = useState("");

    const [logInSignUpStatus, setLogInSignUpStatus] = useState(2);

    const [mainActivity, setMainActivity] = useState(0);
    const [sidebarActivity, setSidebarActivity] = useState(0);

    const [leftArrowActivity, setLeftArrowActivity] = useState(0);
    const [rightArrowActivity, setRightArrowActivity] = useState(0);

    const [proceedActivity, setProceedActivity] = useState(0);
    const [proceedDestroyStatus, setProceedDestroyStatus] = useState(2);

    const [stickerActivity, setStickerActivity] = useState(0);

    const [stickerTextContent, setStickerTextContent] = useState("");
    const [stickerAdditionalContent, setStickerAdditionalContent] = useState(null);

    const [verifCodeTimeLeft, setVerifCodeTimeLeft] = useState("");

    const [verifCodeAttemptsLeft, setVerifCodeAttemptsLeft] = useState(5);

    const [verifCodeRefreshIn, setVerifCodeRefreshIn] = useState("");

    const [appliedChangesOn, setAppliedChangesOn] = useState("");

    const [passwordVisibility, setPasswordVisibility] = useState(0);





    const logInTickboxActivity = logInSignUpStatus === 0;
    const signUpTickboxActivity = logInSignUpStatus === 1;

    const logInChangeTickboxActivity = () => {
        setLogInSignUpStatus(0)
    }

    const signUpChangeTickboxActivity = () => {
        setLogInSignUpStatus(1);
    }



    const proceedTickboxActivity = proceedDestroyStatus === 0;
    const destroyTickboxActivity = proceedDestroyStatus === 1;

    const proceedChangeTickboxActivity = () => {
        setProceedDestroyStatus(0);
    }

    const destroyChangeTickboxActivity = () => {
        setProceedDestroyStatus(1);
    }



    const prepBillMainMain = () => {
        setMainActivity(0);

        gsap.set([mainRef.current, documentFolderUpper.current, documentFolderLower.current], {
            x: s(600),
            y: s(-1500),
            rotate: 20,
        });

        gsap.set([mainRef.current, mainHeaderContainer.current], {
            backgroundColor: "rgb(220, 220, 200)"
        });

        gsap.set(documentFolder.current, {
            display: "block"
        });
    }


    async function loadBillMainMain() {
        loggedIn.current = 0;

        let account = null;

        try {
            account = await fetchRefresh("/api/accounts/profile", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
        } catch (error) {
            if (import.meta.env.DEV) {
                console.log("Server unavailable - continuing without account");

                account = { fail: "noRefresh" }
            } else {
                throw error;
            }
        }

        if (!account.fail) {
            loggedIn.current = 1;

            setNameInput(account.name);
            setEmailInput(account.email);
        }



        const tl = gsap.timeline();

        const h2Containers = Array.from(document.querySelectorAll(`.${styles["main-h2-bg"]}`));

        h2Containers.forEach((container, i) => {
            const getX = () => {
                return i % 2 === 0 ? "100%" : "-100%";
            }

            tl.set(container, { x: getX() }, 0);
        });


        const inputUnderlines = Array.from(document.querySelectorAll(`.${styles["input-underline"]}`));

        inputUnderlines.forEach((underline) => {
            tl.set(underline, { backgroundColor: "rgba(128, 8, 8, 0)" }, 0);
        })



        tl
            .to([documentFolderUpper.current, documentFolderLower.current], { x: s(150), y: s(-400), duration: 0.6, ease: "power1.out" }, 0.6)

            .to(mainRef.current, { x: s(-75), y: s(200), duration: 1.2, ease: "power1.out" }, "<")

            .to([documentFolderUpper.current, documentFolderLower.current], { x: s(600), y: s(-1000), duration: 1, ease: "power2.in" }, ">-0.4")
            .set([documentFolder.current], { display: "none" }, ">")

            .to(mainRef.current, { x: s(200), y: s(100), rotate: 24, duration: 1, ease: "power1.inOut" }, ">-0.2")
            .to(mainRef.current, { x: 0, y: 0, rotate: -0.3, duration: 1.2, ease: "power2.inOut", onComplete: () => {
                setMainActivity(1);

                if (deleteAccountFailInvalidCredentialsStatus.current) {
                    deleteAccountFailInvalidCredentialsStatus.current = 0;
                    destroyBlank("deleteAccountFailInvalidCredentials");
                }
            } }, ">")
            .to([mainRef.current, mainHeaderContainer.current], { backgroundColor: loggedIn.current ? "rgb(30, 100, 30)" : "rgb(120, 30, 30)", duration: 1, ease: "power1.inOut" }, ">-0.6");

        h2Containers.forEach((container, i) => {
            tl.to(container, { x: 0, duration: 1.7, ease: "power2.out" }, i > 0 ? ">-1.5" : ">-0.6");
        });

        inputUnderlines.reverse().forEach((underline, i) => {
            tl.to(underline, { backgroundColor: loggedIn.current ?  "rgba(30, 100, 30, 0.25)" : "rgba(130, 30, 30, 0.25)", duration: 1, ease: "power2.out" }, i > 0 ? ">-0.7" : ">-3");
        });
    }



    const prepBillMainSticker = () => {
        setStickerActivity(0);

        gsap.set(stickerRef.current, { x: s(-1600), y: s(-600), rotation: -30});
    }


    const loadBillMainSticker = () => {
        setStickerActivity(1);

        const rotation = Math.round(6 * Math.random()) - 3;
        const tl = gsap.timeline();

        tl
            .to(stickerRef.current, { x: s(-160), y: s(-60), rotation, duration: 0.4, ease: "none" }, 0)
            .to(stickerRef.current, { x: 0, y: 0, duration: 0.1, ease: "power2.out" }, ">");
    }


    const removeBillMainSticker = () => {
        setProceedDestroyStatus(2);

        const tl = gsap.timeline({
            onComplete: () => { prepBillMainSticker() }
        });

        tl.to(stickerRef.current, { x: s(500), y: s(-800), rotation: 15, duration: 0.9, ease: "power1.in" }, 0);
    }



    const prepBillMain = () => {
        gsap.set(containerRef.current, { filter: "brightness(0) contrast(1.5)" });

        gsap.set(sidebarContainerRef.current, { x: s(-60), y: s(-1500), rotation: -5 });


        prepBillMainMain();
        prepBillMainSticker();
    }



    const enableIndicator = {
        backgroundColor: "rgb(255, 0, 0)",
        boxShadow: `0 0 ${s(10)}px ${s(10)}px rgba(255, 0, 0, 0.2)`,

        duration: 0.1,
        ease: "power1.inOut",
    }

    const activateIndicator = {
        backgroundColor: "rgb(0, 200, 0)",
        boxShadow: `0 0 ${s(10)}px ${s(10)}px rgba(0, 200, 0, 0.2)`,

        duration: 0,
    }

    const deactivateIndicator = {
        backgroundColor: "rgb(255, 0, 0)",
        boxShadow: `0 0 ${s(10)}px ${s(10)}px rgba(255, 0, 0, 0.2)`,

        duration: 0,
    }

    const disableIndicator = {
        backgroundColor: "rgb(20, 20, 0)",
        boxShadow: `0 0 ${s(10)}px ${s(10)}px rgba(255, 0, 0, 0)`,

        duration: 0.1,
        ease: "power1.inOut",
    }



    const loadBillMain = () => {
        if (hasRun.current) return;
        hasRun.current = 1;

        const run = async () => {
            const p = containerRef.current.querySelector(`.${styles["typewriter-p"]}`);
            const cs = p ? getComputedStyle(p) : null;

            await Promise.all([
                document.fonts.load(`${cs?.fontStyle || "normal"} ${cs?.fontWeight || "400"} ${cs?.fontSize || "16px"} ${cs?.fontFamily || "Cutive"}`),

                document.fonts.ready,
            ]);

            await document.fonts.load(`${cs?.fontStyle || "normal"} ${cs?.fontWeight || "400"} ${cs?.fontSize || "16px"} ${cs?.fontFamily || "Cutive"}`);
            await document.fonts.ready;

            const ctx = gsap.context(() => {
                const fontblocks = gsap.utils.toArray(
                    `.${styles["font-block"]}, .${styles["font-block-small"]}`
                )


                const measureFontblocks = (fontblocks) => {
                    const prev = gsap.getProperty(sidebarContainerRef.current, "transform");

                    gsap.set(sidebarContainerRef.current, { rotation: 0, clearProps: "transform" });

                    const heights = Array.from(fontblocks).reverse().map((fontblock) => {
                        return fontblock.getBoundingClientRect().height;
                    });

                    gsap.set(sidebarContainerRef.current, { transform: prev });

                    return heights;
                }


                const tl = gsap.timeline();
                const tl2 = gsap.timeline();
                const animationStart = 0.25;

                let offset = s(-640);


                tl
                    .to(containerRef.current, { filter: "brightness(1) contrast(1)", duration: 0.8, ease: "power1.inOut" }, animationStart)
                    .to(typewriter3000.current, { x: s(500), duration: 0.5, ease: "power1.out" }, ">")
                    .to(sidebarContainerRef.current, { x: 0, y: offset, rotation: 0, duration: 0.8, ease: "power1.out" }, "<+0.3")
                    .to(indicator.current, enableIndicator, ">");



                const heights = measureFontblocks(fontblocks)

                fontblocks.reverse().forEach((fontblock, i) => {
                    const p = fontblock.querySelector(`.${styles["typewriter-p"]}`);

                    const height = heights[i];
                    offset += height;

                    if (!p) return;

                    const text = p.textContent;

                    const getMaxScroll = () => {
                        const measurer = document.createElement("p");

                        measurer.className = styles["typewriter-p"];

                        measurer.style.position = "absolute";
                        measurer.style.visibility = "hidden";

                        measurer.textContent = text;

                        document.body.appendChild(measurer);
                        const width = Math.max(measurer.scrollWidth - 16, 0);
                        document.body.removeChild(measurer);

                        return width;
                    };

                    const maxScroll = getMaxScroll();
                    const scrollDur = maxScroll ? 0.2 : 0.1;
                    let sidebarValue = 0;

                    if (text === "SIDEBAR") {
                        sidebarValue = 1;
                    }

                    gsap.set(p, {
                        text: "",
                    });

                    tl
                        .to(indicator.current, activateIndicator, ">")
                        .to(p, { text: { value: text, preserveSpaces: true }, duration: text.length * 0.01, ease: "none", onComplete: function() {
                                if (sidebarValue) {
                                    setTimeout(() => {
                                        setLeftArrowActivity(1);

                                        setTimeout(() => {
                                            setRightArrowActivity(1);
                                        }, 3 * 0.01 * 1000);
                                    }, (29 - "SIDEBAR".split("").length - 12) * 0.01 * 1000);
                                }
                            }
                        }, ">")

                        if (maxScroll > 0) {
                            tl.to(typewriter3000WindowScroller.current, { x: maxScroll, duration: text.length * 0.01, ease: "none" }, "<");
                        }

                    tl
                        .to(typewriter3000WindowScroller.current, sidebarValue ? { x: s(220), duration: (29 - "SIDEBAR".split("").length) * 0.01 } : { duration: 0 })
                        .to(indicator.current, text.split("").length > 1 ? deactivateIndicator : activateIndicator, ">")
                        .to(typewriter3000WindowScroller.current, { x: 0, duration: scrollDur, ease: "power1.inOut" }, ">")
                        .to(sidebarContainerRef.current, { y: offset, duration: scrollDur, ease: "power1.out" }, "<");
                });



                tl
                    .to(indicator.current, disableIndicator, ">")
                    .to(sidebarContainerRef.current, { y: s(250), rotation: -0.2, duration: 0.6, ease: "power1.inOut" }, ">")
                    .to(typewriter3000.current, { x: 0, duration: 0.7, ease: "power1.in" }, ">")
                    .to(sidebarContainerRef.current, { y: 0, rotation: 1, duration: 0.8, ease: "power1.inOut", onComplete: () => {setSidebarActivity(1)} }, ">");


                setTimeout(() => {
                    loadBillMainMain();
                }, animationStart * 1000)
            }, containerRef);

            return () => ctx.revert();
        }

        setTimeout(() => {
            run();
        }, 400);
    }



    const shredRegistrationBlank = (restart, mainPage) => {
        const reloadBillMain = () => {
            verifCodeInputInactive.current = verifCodeInputExpired.current;

            setNameInput("");
            setEmailInput("");
            setPasswordInput("");
            setVerifCodeInput(verifCodeInputInactive.current ? `${verifCodeInput} has expired` : "");
            setLogInSignUpStatus(2);
            setProceedDestroyStatus(2);

            prepBillMainMain();
            loadBillMainMain();

            prepBillMainSticker();
        }


        if (!restart) {
            setTimeout(() => {
                removeSidebar();
            }, 400);
        }


        const tl = gsap.timeline({
            onComplete: () => {
                if (restart) {
                    reloadBillMain()
                } else {
                    gsap.to(containerRef.current, { filter: "brightness(0) contrast(1.5)", duration: 0.8, ease: "power1.inOut", onComplete: () => {
                        props.gotoMainPage(mainPage);
                    } });
                }
            }
        });

        tl
            .to(shredder.current, { y: s(-154), ease: "power1.out", duration: 0.4 })
            .to(shredderIndicator.current, enableIndicator, ">+0.25")
            .to(shredderIndicator.current, activateIndicator, ">+0.25")
            .to([mainRef.current, stickerRef.current], { y: s(1080), duration: 1.2, ease: "none" }, ">")
            .to(mainRef.current, { rotate: 0, duration: 0.4, ease: "power1.inOut" }, "<")
            .to([mainRef.current, stickerRef.current], { x: s(2), duration: 0.015625, ease: "power1.inOut" }, "<")
            .to([mainRef.current, stickerRef.current], { x: s(-2), duration: 0.03125, ease: "power1.inOut", yoyo: true, repeat: 33 }, ">")
            .to([mainRef.current, stickerRef.current], { x: 0, duration: 0.015625, ease: "power1.inOut" }, ">")
            .to(shredderIndicator.current, deactivateIndicator, ">")
            .to(shredderIndicator.current, disableIndicator, ">+0.1")
            .to(shredder.current, { y: 0, ease: "power1.in", duration: 0.4 }, ">+0.25");
    }

    useImperativeHandle(ref, () => ({
        prepBillMain,
        loadBillMain,
    }));


    const removeSidebar = () => {
        setSidebarActivity(0);
        gsap.to(sidebarContainerRef.current, { x: s(-600), y: s(500), rotate: -15, duration: 0.8, ease: "power1.in" });
    }



    const gotoWin95Main = () => {
        shredRegistrationBlank(0, "Win95Main");
    }

    const gotoDarkMain = () => {
        shredRegistrationBlank(0, "DarkMain");
    }

    const gotoPhotoMain = () => {
        shredRegistrationBlank(0, "PhotoMain");
    }

    const destroyBlank = (reason, additional) => {
        setStickerTextContent(reason);
        setStickerAdditionalContent(additional);
        loadBillMainSticker();
    }



    const formatSchemaResult = (schemaResult) => {
        if (schemaResult.success) return { success: 1 };


        const formattedSchemaResult = [];
        let formattingComplete = 0;


        schemaResult.error?.issues.forEach((schemaError) => {
            if (formattingComplete) return;

            if (!["password_no_lowercase", "password_no_uppercase"].includes(schemaError.message)) {
                formattingComplete = 1
            }

            formattedSchemaResult.push(schemaError.message);
        });


        if (formattedSchemaResult) {
            if (formattedSchemaResult.some((item) => ["password_no_lowercase", "password_no_uppercase", "password_no_digits"].includes(item))) {
                return {
                    success: 0,
                    error: `inputValidationFail_password_invalid`,
                    additional: formattedSchemaResult
                }
            }

            return {
                success: 0,
                error: `inputValidationFail_${formattedSchemaResult[0]}`
            }
        }


        return { succes: 1 };
    }



    async function getAccounts() {
        try {
            const res = await fetch("/api/accounts");

            if (!res.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await res.json();
            return data;
        } catch (err) {
            console.error(err);
            setError(err.message);
            return null;
        }
    }



    async function signUpFunction() {
        if (nameInput && emailInput && passwordInput && verifCodeInput) {
            const schemaResult = accountSchema.safeParse({ name: nameInput, password: passwordInput });
            const formattedSchemaResult = formatSchemaResult(schemaResult);


            if (!formattedSchemaResult.success) {
                return destroyBlank(formattedSchemaResult.error, formattedSchemaResult.additional ? formattedSchemaResult.additional : null);
            }


            const response = await fetch("/api/accounts/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: nameInput,
                    email: emailInput,
                    password: passwordInput,
                    verifCode: verifCodeInput
                })
            });

            const data = await response.json();

            setVerifCodeAttemptsLeft(data.attemptsLeft);

            if (data.log === "signUpSuccess") {
                verifCodeInputExpired.current = 1;
            }

            return destroyBlank(data.log);
        } else {
            return destroyBlank("signUpFailNoCredentials");
        }
    }

    async function logInFunction() {
        if ((nameInput || emailInput) && (passwordInput || verifCodeInput)) {
            const response = await fetch("/api/accounts/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: nameInput,
                    email: emailInput,
                    password: passwordInput,
                    verifCode: verifCodeInput
                })
            });

            const result = await response.json();

            if (result.success) {
                verifCodeInputExpired.current = result.verifCodeExperation;

                destroyBlank("logInSuccess");
            } else {
                destroyBlank("logInFailInvalidCredentials");
            }
        } else {
            !passwordInput ? destroyBlank("logInFailNoPassword") : 0;
            !nameInput && !emailInput ? destroyBlank("logInFailNoNameOrEmail") : 0;
            !nameInput && !emailInput && !passwordInput ? destroyBlank("logInFailNoCredentials") : 0;
        }
    }

    async function applyAccountChanges() {
        let schemaResult;

        if (nameInput && passwordInput) {
            schemaResult = accountSchema.safeParse({ name: nameInput, password: passwordInput });
        } else if (nameInput) {
            schemaResult = accountSchema.shape.name.safeParse(nameInput);
        } else if (passwordInput) {
            schemaResult = accountSchema.shape.password.safeParse(passwordInput);
        } else {
            return destroyBlank("applyChangesNoChanges");
        }

        const formattedSchemaResult = formatSchemaResult(schemaResult);

        if (!formattedSchemaResult.success) {
            return destroyBlank(formattedSchemaResult.error, formattedSchemaResult.additional ? formattedSchemaResult.additional : null);
        }


        const response = await fetchRefresh("/api/accounts/apply-changes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",

            body: JSON.stringify({
                name: nameInput,
                email: emailInput,
                password: passwordInput,
                verifCode: verifCodeInput
            })
        });

        if (response.fail === "invalidCredentials") {
            return destroyBlank("applyChangesFail");
        }

        if (response.fail === "noChanges") {
            return destroyBlank("applyChangesNoChanges");
        }

        if (response.success) {
            verifCodeInputExpired.current = response.verifCodeExperation;


            if (response.nameChanged && response.passwordChanged) {
                setAppliedChangesOn("name and password");
            } else if (response.nameChanged) {
                setAppliedChangesOn("name");
            } else if (response.passwordChanged) {
                setAppliedChangesOn("password")
            }

            return destroyBlank("applyChangesSuccess")
        }
    }

    async function deleteAccount() {
        const response = await fetchRefresh("/api/account/delete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",

            body: JSON.stringify({
                password: passwordInput,
                verifCode: verifCodeInput
            })
        });

        verifCodeInputExpired.current = 0;

        if (!response.success) {
            deleteAccountFailInvalidCredentialsStatus.current = 1;
        }
    }

    async function generateCode() {
        if (!emailInput) {
            return destroyBlank("verifCodeFailNoEmail");
        }

        const response = await fetch("/api/accounts/code/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({ email: emailInput })
        });

        const data = await response.json();

        if (data.timeLeft) {
            setVerifCodeTimeLeft(data.timeLeft);
        }

        if (data.newCodesIn) {
            setVerifCodeRefreshIn(data.newCodesIn);
        }

        destroyBlank(data.log);
    }

    const proceedFunction = () => {
        if (proceedDestroyStatus) {
            if (loggedIn.current) {
                if (!passwordInput && !verifCodeInput) {
                    return destroyBlank("deleteAccountFailNoCredentials");
                }

                return destroyBlank("deleteAccount");
            }

            return destroyBlank("userConsent");
        }

        if (loggedIn.current) {
            applyAccountChanges();
        } else if (logInSignUpStatus === 2) {
            destroyBlank("noAccountInfo");
        } else if (logInSignUpStatus) {
            signUpFunction();
        } else {
            logInFunction();
        }
    }

    const stickerOkayFunction = () => {
        shredRegistrationBlank(1);
    }

    const stickerNoFunction = () => {
        removeBillMainSticker();
    }


    const verifCodeFailTooManyCodesGetTime = () => {
        let seconds = Math.round(verifCodeRefreshIn / 1000);


        const hours = Math.floor(seconds / 60 / 60);
        seconds -= hours * 60 * 60;

        const minutes = Math.floor(seconds / 60);
        seconds -= minutes * 60;


        const outputArray = [
            hours,
            minutes,
            seconds
        ]
            .map((el, num) => {
                const getTimeUnit = () => {
                    if (num === 0)
                        {return " hour"}
                    else if (num === 1)
                        {return " minute"}
                    else
                        {return " second"}
                }

                return {
                    before: el,
                    after: `${el} ${getTimeUnit()}${el > 1 ? "s" : ""}`
                };
            })
            .filter(number => number.before > 0)
            .map((el) => el.after);

        return `${outputArray.slice(0, -1).join(", ")} and ${outputArray[outputArray.length - 1]}`;
    }


    const renderStickerTextContent = () => {
        const getInputs = () => {
            let result = [];

            if (!nameInput) { result.push("Name") }
            if (!emailInput) { result.push("Email") }
            if (!passwordInput) { result.push("Password") }
            if (!verifCodeInput) { result.push("Verification code") }

            return result.join(", ");
        }

        let mainText = [];
        let okayButtonText = "";
        let noButtonText = "";
        let okayButtonFunction;

        switch (stickerTextContent) {
            case "userConsent":
                mainText = [
                    "Would you really like to destroy the blank?",
                    "(Erases all the data in it)"
                ];
                okayButtonText = "Sure";
                noButtonText = "Cancel";
                break;

            case "noAccountInfo":
                mainText = [
                    "Do you have an account already?",
                    "Please choose an option in the first tickbox."
                ];
                noButtonText = "Okay";
                break;



            case "logInFailNoCredentials":
                mainText = [
                    "Please enter your name/email and password."
                ];
                noButtonText = "Okay";
                break;

            case "logInFailNoNameOrEmail":
                mainText = [
                    "Please enter your name or email",
                    "in order to log in."
                ];
                noButtonText = "Okay";
                break;

            case "logInFailNoPassword":
                mainText = [
                    "Please enter your password",
                    "in order to log in."
                ];
                noButtonText = "Okay";
                break;

            case "logInFailInvalidCredentials":
                mainText = [
                    "Sorry, your credentials were incorrect.",
                    "Try again."
                ];
                noButtonText = "Okay";
                break;

            case "logInSuccess":
                mainText = [
                    "You've successfully logged in."
                ];
                okayButtonText = "Proceed";
                break;



            case "signUpFailNoCredentials":
                mainText = [
                    "Please fill in all the required fields,",
                    "these ones are missing:",
                    getInputs()
                ];
                noButtonText = "Okay";
                break;

            case "signUpFailCredentialsTaken":
                mainText = [
                    "These email and/or name are already in use.",
                    "Please use spare ones."
                ];
                noButtonText = "Okay";
                break;

            case "signUpFailInvalidVerifCode":
                mainText = [
                    "The verification code is incorrect.",
                    `You have ${verifCodeAttemptsLeft} more attempt${verifCodeAttemptsLeft - 1 ? "s" : ""}, try again.`,
                ];
                noButtonText = "Okay";
                break;

            case "signUpFailInvalidEmail":
                mainText = [
                    "The verification code is incorrect."
                ];
                noButtonText = "Okay";
                break;

            case "signUpSuccess":
                mainText = [
                    "You've successfully signed up."
                ];
                okayButtonText = "Proceed";
                break;



            case "verifCodeFailTooManyRequests":
                mainText = [
                    "Failed to send the verification code,",
                    "there are too many requests.",
                    `Try again in ${verifCodeTimeLeft} seconds`
                ];
                noButtonText = "Okay";
                break;

            case "verifCodeSuccess":
                mainText = [
                    `The code is sent to ${emailInput.split("").length <= 20 ? emailInput : emailInput.split("").slice(0, 17).join("") + "..."}`,
                    "It expires in 5 minutes",
                    "You have 5 attempts",
                    "You can send 10 codes in 24 hours per email"
                ];
                noButtonText = "Okay";
                break;

            case "verifCodeFailNoAttempts":
                mainText = [
                    "The verification code is incorrect.",
                    "You've reached max attempts on this code,",
                    "it has expired, please generate a new one"
                ];
                noButtonText = "Okay";
                break;

            case "verifCodeFailTooManyCodes":
                mainText = [
                    "You've sent too many codes (10 per email).",
                    `Wait for ${verifCodeFailTooManyCodesGetTime()}`,
                    "to send new ones to this email"
                ];
                noButtonText = "Okay";
                break;

            case "verifCodeFailIpLimiting":
                mainText = [
                    "Daily email limit for your IP address has",
                    "been reached. Please try again tomorrow."
                ];
                noButtonText = "Okay";
                break;

            case "verifCodeFailIpBlacklisted":
                mainText = [
                    "Whoops! Looks like I've blocked your IP",
                    "address due to suspicious activity. If you",
                    "want to appeal, please contact me at",
                    "|MY CONTACTS|"
                ];
                noButtonText = "Okay";
                break;

            case "verifCodeFailNoEmail":
                mainText = [
                    "Input an email to send a code."
                ];
                noButtonText = "Okay";
                break;

            

            case "renderPasswordResetInstructions":
                mainText = [
                    "You can set a new password after logging in.",
                    "To log in without it, use your account email",
                    "and a verification code"
                ];
                noButtonText = "Okay";
                break;

            case "renderInstructions":
                mainText = [
                    "On this page you can:",
                    "Change your account name or password",
                    "Log out or delete your account",
                    "-----------------------------------------------",
                    "The log out button is next to the \"Email\" field",
                    "Destroy account is a tickbox at the bottom",
                ];
                noButtonText = "Okay";
                break;



            case "logOutWarning":
                mainText = [
                    "Are you really sure you want to log out?"
                ];
                okayButtonText = "Yes";
                noButtonText = "No";
                okayButtonFunction = async () => await logOut()
                break;


            
            case "applyChangesFail":
                mainText = [
                    "Your password and verification code",
                    "were incorrect, try again"
                ];
                noButtonText = "Okay";
                break;

            case "applyChangesNoChanges":
                mainText = [
                    "Neither new name or password were",
                    "provided, there is nothing to change"
                ];
                noButtonText = "Okay";
                break;

            case "applyChangesSuccess":
                mainText = [
                    "Applied changes on",
                    `your account's ${appliedChangesOn}.`
                ];
                okayButtonText = "Proceed";
                break;


            case "deleteAccount":
                mainText = [
                    "Are you really sure that you want to",
                    "permanently delete your account?",
                    "This is irreversible."
                ];
                okayButtonText = "Yes";
                noButtonText = "Cancel";
                okayButtonFunction = async () => await deleteAccount();
                break;


            case "deleteAccountFailNoCredentials":
                mainText = [
                    "To delete your account you need to",
                    "input either your account password",
                    "or use a verification code.",
                    "None was provided"
                ];
                noButtonText = "Okay";
                break;


            case "deleteAccountFailInvalidCredentials":
                mainText = [
                    "The account couldn't be deleted.",
                    "Invalid credentials were provided."
                ];
                noButtonText = "Okay";
                break;


            
            case "inputValidationFail_name_not_string":
                mainText = [
                    "Provided username was invalid."
                ];
                noButtonText = "Okay";
                break;

            case "inputValidationFail_name_too_small":
                mainText = [
                    "Provided username was too short.",
                    "Minimal length is 3 characters."
                ];
                noButtonText = "Okay";
                break;

            case "inputValidationFail_name_too_big":
                mainText = [
                    "Provided username was too long.",
                    "Maximal length is 25 characters."
                ];
                noButtonText = "Okay";
                break;

            case "inputValidationFail_name_invalid":
                mainText = [
                    "Provided username was invalid.",
                    "It should only include:",
                    "Uppercase and lowercase letters (A-Z, a-z)",
                    "Digits (0-9), Hyphens (-) and Underscores (_)"
                ];
                noButtonText = "Okay";
                break;


            case "inputValidationFail_password_not_string":
                mainText = [
                    "Provided password was invalid."
                ];
                noButtonText = "Okay";
                break;

            case "inputValidationFail_password_too_small":
                mainText = [
                    "Provided password was too short.",
                    "Minimal length is 8 characters"
                ];
                noButtonText = "Okay";
                break;

            case "inputValidationFail_password_too_big":
                mainText = [
                    "Provided password was too long.",
                    "Maximal length is 120 characters"
                ];
                noButtonText = "Okay";
                break;

            case "inputValidationFail_password_invalid":
                mainText = [
                    "Provided password was invalid.",
                    `${stickerAdditionalContent.includes("password_no_lowercase")
                        ? "✗ It doesn't contain any lowercase letter."
                        : "✓ It contains a lowercase letter."
                    }`,
                    `${stickerAdditionalContent.includes("password_no_uppercase")
                        ? "✗ It doesn't contain any uppercase letter."
                        : "✓ It contains an uppercase letter."
                    }`,
                    `${stickerAdditionalContent.includes("password_no_digits")
                        ? "✗ It doesn't contain any digit."
                        : "✓ It contains a digit."
                    }`,
                    "To be valid it needs to contain",
                    "at least a one of each"
                ];
                noButtonText = "Okay";
                break;
            
            case "inputValidationFail_server_fail":
                mainText = [
                    "Provided credentials were",
                    "not approved on server side."
                ];
                noButtonText = "Okay";
                break;
        }

        return <div className={styles["sticker-contents-inner"]}>
            <div className={styles["sticker-contents-text"]}>
                {(() => {
                    let result = [];

                    mainText.forEach((text, key) => {
                        result.push(<p className={styles["sticker-p"]} key={key}>{text}</p>);
                    });

                    return result;
                })()}
            </div>

            <div className={styles["sticker-contents-buttons"]}>
                {(() => {
                    let result = [];

                    if (okayButtonText) {
                        result.push(
                            <div className={styles["sticker-contents-button"]} key="okay">
                                <p className={styles["sticker-p"]} onClick={() => {
                                    if (okayButtonFunction) {
                                        okayButtonFunction();
                                    }

                                    stickerOkayFunction();
                                }}>{okayButtonText}</p>
                            </div>
                        );
                    }

                    if (noButtonText) {
                        result.push(
                            <div className={styles["sticker-contents-button"]} key="no">
                                <p className={styles["sticker-p"]} onClick={stickerNoFunction}>{noButtonText}</p>
                            </div>
                        );
                    }

                    return result;
                })()}
            </div>
        </div>
    }

    const requestLogOut = () => {
        return destroyBlank("logOutWarning");
    }

    async function logOut() {
        const response = await fetch("/api/accounts/logOut", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });

        verifCodeInputExpired.current = 0;

        return;
    }

    const verifCodeInputFocusFunction = () => {
        if (verifCodeInputInactive.current) {
            setVerifCodeInput("");
            verifCodeInputInactive.current = 0;
        }
    }


    const hideOrShowPassword = () => {


        setPasswordVisibility((prev) => !prev);
    }



    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            setWindowHeight(window.innerHeight);
        }

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);



    useEffect(() => {
        setPlaceholderFontBlocks(
            Array.from({
                length: placeholderFontBlocksContainerRef.current?.getBoundingClientRect().height / s(35)
            }).map((el, index) => (
                <div className={styles["font-block"]} key={index}>
                    <p className={styles["typewriter-p"]}>-</p>
                </div>
            ))
        )
    }, [windowHeight]);



    useEffect(() => {
        if (!proceedActivity) {
            setProceedActivity(1);
        }

        if (proceedDestroyStatus !== 2 && proceedActivity) {
            proceedFunction();
        }
    }, [proceedDestroyStatus]);





    return(
        <div className={styles["container"]} ref={containerRef}>
            <div className={styles["sidebar-container"]}>
                <div className={styles["sidebar-container-lower"]} ref={sidebarContainerRef}>
                    <img src={cutPaperEdgeTop} className={styles["cutPaperEdge"]} />

                    <div className={styles["sidebar"]} ref={sidebarRef}>
                        <div className={styles["font-block"]}>
                            <p className={styles["typewriter-p"]}>No:___   Date:__.__.____</p>
                        </div>

                        <div className={styles["font-block"]}>
                            <p className={styles["typewriter-p"]} />
                        </div>

                        <div className={styles["font-block-small"]}>
                            <p className={styles["typewriter-p"]}>- - - - - - - - - - - - - - - - -</p>
                        </div>

                        <div className={styles["font-block"]}>
                            <p className={styles["typewriter-p"]}>SIDEBAR</p>

                            <div className={styles["font-block-aligner"]}></div>

                            <div className={styles["font-block-lower"]} style={{ clipPath: leftArrowActivity ? "circle(100%)" : "circle(0)" }} onClick={gotoWin95Main}>
                                <p className={styles["typewriter-p"]}>&lt;</p>
                            </div>
                            <div className={styles["font-block-lower"]} style={{ clipPath: rightArrowActivity ? "circle(100%)" : "circle(0)" }} onClick={gotoDarkMain}>
                                <p className={styles["typewriter-p"]}>&gt;</p>
                            </div>
                        </div>

                        <div className={styles["font-block-small"]}>
                            <p className={styles["typewriter-p"]}>- - - - - - - - - - - - - - - - -</p>
                        </div>

                        <div className={styles["font-block"]} onClick={gotoWin95Main}>
                            <p className={styles["typewriter-p"]}>Greeting Page</p>
                        </div>

                        <div className={styles["font-block"]}>
                            <p className={styles["typewriter-p"]}>Registration     &lt;- Current</p>
                        </div>

                        <div className={styles["font-block"]} onClick={gotoDarkMain}>
                            <p className={styles["typewriter-p"]}>Subprojects</p>
                        </div>

                        <div className={styles["font-block"]} onClick={gotoPhotoMain}>
                            <p className={styles["typewriter-p"]}>Contacts</p>
                        </div>

                        <div className={styles["placeholder-font-blocks-container"]} ref={placeholderFontBlocksContainerRef}>
                            {placeholderFontBlocks}
                        </div>

                        <div className={styles["font-block-small"]}>
                            <p className={styles["typewriter-p"]}>- - - - - - - - - - - - - - - - -</p>
                        </div>

                        <div className={styles["font-block"]}>
                            <p className={styles["typewriter-p"]}>TOTAL:</p>
                        </div>

                        <div className={styles["font-block"]}>
                            <p className={styles["typewriter-p"]}>That's not a real receipt</p>
                        </div>
                    </div>

                    <img src={cutPaperEdgeBottom} className={styles["cutPaperEdge"]} />
                </div>

                <div className={styles["sidebar-deactivator"]} style={{ display: sidebarActivity ? "none" : "block" }} />
            </div>

            <div className={styles["main-container"]}>
                <div className={styles["main"]}  style={{ 
                    "--main-background": loggedIn.current ? "rgb(30, 100, 30)" : "rgb(120, 30, 30)",
                    "--main-h2-gradient": loggedIn.current ? "rgba(30, 100, 30, 0.25)" : "rgba(120, 30, 30, 0.25)"
                }} ref={mainRef}>
                    <div className={styles["main-inner"]}>
                        <div className={styles["main-header-container"]} ref={mainHeaderContainer}>
                            <p className={styles["main-header"]}>{loggedIn.current ? "ACCOUNT MANAGEMENT FORM" : "REGISTRATION FORM" }</p>
                        </div>



                        <div className={styles["main-inner-aligner-container"]}>
                            <div className={styles["input-container"]}>
                                <div className={styles["main-h2-container"]}>
                                    <div className={styles["main-h2-bg"]}/>
                                    
                                    <p className={styles["main-h2"]}>{loggedIn.current ? "You're already registered, get intstructions here:" : "Do you have an account already?"}</p>

                                    <div className={styles["checkbox-button"]} style={{ display: loggedIn.current ? "block" : "none" }} onClick={() => destroyBlank("renderInstructions")}>
                                        <p className={styles["checkbox-p"]}>Instructions</p>
                                    </div>
                                </div>

                                <div className={styles["checkboxes-container"]} style={{ display: loggedIn.current ? "none" : "flex" }}>
                                    <div className={styles["checkbox-container"]}>
                                        <div className={styles["checkbox"]} onClick={logInChangeTickboxActivity} >
                                            <img className={styles["tick"]} src={tick} alt="tick" style={{ display: logInTickboxActivity ? "block" : "none" }} />
                                        </div>

                                        <p className={styles["main-h2"]}>Yes</p>
                                    </div>

                                    <div className={styles["checkbox-container"]}>
                                        <div className={styles["checkbox"]} onClick={signUpChangeTickboxActivity} >
                                            <img className={styles["tick"]} src={tick} alt="tick" style={{ display: signUpTickboxActivity ? "block" : "none" }} />
                                        </div>

                                        <p className={styles["main-h2"]}>No</p>
                                    </div>
                                </div>

                                <div className={styles["main-p-container"]}>
                                    <p className={styles["main-p"]}>{ loggedIn.current
                                    ? "Note that to apply any changes you need to use your password or verify your email with a verification code."
                                    : "Tick \"Yes\" in order to log in, which will take either your name OR email, but if you tick \"No\", both your name AND email will be needed."
                                    }</p>

                                    <p className={styles["main-p"]} style={{ display: loggedIn.current ? "block" : "none" }}>
                                        To change your password input your new password and use a verification code.
                                    </p>
                                </div>
                            </div>


                            <div className={styles["input-container"]}>
                                <div className={styles["main-h2-container"]}>
                                    <div className={styles["main-h2-bg"]} />

                                    <p className={styles["main-h2"]}>Name</p>
                                </div>

                                <input className={styles["input"]} value={nameInput} onChange={(input) => {setNameInput(input.target.value)}} />

                                <div className={styles["input-underline"]} />
                            </div>


                            <div className={styles["input-container"]}>
                                <div className={styles["main-h2-container"]}>
                                    <div className={styles["main-h2-bg"]} />

                                    <p className={styles["main-h2"]}>Email</p>

                                    <div className={styles["checkbox-button"]} style={{ display: loggedIn.current ? "block" : "none" }} onClick={requestLogOut}>
                                        <p className={styles["checkbox-p"]}>Log out</p>
                                    </div>
                                </div>

                                <input className={styles["input"]} value={emailInput} onChange={(input) => {setEmailInput(input.target.value)}} readOnly={loggedIn.current}/>

                                <div className={styles["input-underline"]} />
                            </div>


                            <div className={styles["input-container"]}>
                                <div className={styles["main-h2-container"]}>
                                    <div className={styles["main-h2-bg"]} />

                                    <p className={styles["main-h2"]}>Password</p>

                                    <div className={styles["checkbox-button"]} onClick={hideOrShowPassword}>
                                        <img src={passwordVisibility ? crossedEyeIcon : eyeIcon} alt="eyeIcon" className={styles["eyeIcon"]} />
                                    </div>

                                    <div
                                        className={styles["checkbox-button"]}
                                        style={{display: !loggedIn.current ? "block" : "none"}}
                                        onClick={() => {destroyBlank("renderPasswordResetInstructions")}}
                                    >
                                        <p className={styles["checkbox-p"]}>Reset</p>
                                    </div>
                                </div>

                                <input className={styles["input"]} type={passwordVisibility ? "text" : "password"} value={passwordInput} onChange={(input) => {setPasswordInput(input.target.value)}} />

                                <div className={styles["input-underline"]} />
                            </div>

                            <div className={styles["input-container"]}>
                                <div className={styles["main-h2-container"]}>
                                    <div className={styles["main-h2-bg"]} />

                                    <p className={styles["main-h2"]}>Verification code</p>

                                    <div className={styles["checkbox-button"]} onClick={generateCode}>
                                        <p className={styles["checkbox-p"]}>Send</p>
                                    </div>
                                </div>

                                <input
                                    className={styles["input"]}
                                    value={verifCodeInput}
                                    onChange={(input) => {setVerifCodeInput(input.target.value)}}
                                    style={{color: verifCodeInputInactive.current ? "rgb(75, 75, 75)" : "rgb(0, 0, 75)"}}
                                    onFocus={verifCodeInputFocusFunction}
                                />

                                <div className={styles["input-underline"]} />

                                <div className={styles["main-p-container"]}>
                                    <p className={styles["main-p"]}>Click on the "Send" button and we'll send the verification code to the email specified in the corresponding field of this form.</p>
                                    <p className={styles["main-p"]}>If the email is not valid, the code won't be sent.</p>
                                </div>
                            </div>


                            <div className={styles["input-container"]}>
                                <div className={styles["main-h2-container"]}>
                                    <div className={styles["main-h2-bg"]} />

                                    <p className={styles["main-h2"]}>{loggedIn.current ? "What would you like to do?" : "Would you like to proceed?"}</p>
                                </div>

                                <div className={styles["checkboxes-container"]}>
                                    <div className={styles["checkbox-container"]}>
                                        <div className={styles["checkbox"]} onClick={proceedChangeTickboxActivity} >
                                            <img className={styles["tick"]} src={tick} alt="icon" style={{ display: proceedTickboxActivity ? "block" : "none" }} />
                                        </div>

                                        <p className={styles["main-h2"]}>{loggedIn.current ? "Apply changes" : "Yes"}</p>
                                    </div>

                                    <div className={styles["checkbox-container"]}>
                                        <div className={styles["checkbox"]} onClick={destroyChangeTickboxActivity} >
                                            <img className={styles["tick"]} src={tick} alt="icon" style={{ display: destroyTickboxActivity ? "block" : "none" }} />
                                        </div>

                                        <p className={styles["main-h2"]}>{loggedIn.current ? "Delete my account" : "No (Destroy the blank)"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles["shredder"]} ref={shredder}>
                    <div className={styles["shredder-textbox"]}>
                        <p className={styles["device-p"]}>Shredder 5000</p>

                        <div className={styles["shredder-indicator-container"]}>
                            <div className={styles["indicator"]} ref={shredderIndicator}/>
                        </div>
                    </div>
                </div>

                <div className={styles["sticker-container"]} style={{ display: stickerActivity ? "flex" : "none" }}>
                    <div className={styles["sticker"]} ref={stickerRef}>
                        <img src={sticker} className={styles["sticker-bg"]} />
                        
                        <div className={styles["sticker-contents"]}>
                            {renderStickerTextContent()}
                        </div>
                    </div>
                </div>

                <div className={styles["main-deactivator"]} style={{ display: mainActivity ? "none" : "block" }} />
            </div>



            <div className={styles["typewriter3000"]} ref={typewriter3000} >
                <div className={styles["typewriter3000-window-container"]}>
                    <div className={styles["typewriter3000-window"]} ref={typewriter3000Window} />
                </div>

                <div className={styles["typewriter3000-window-scroller"]} ref={typewriter3000WindowScroller} />

                <div className={styles["typewriter3000-content"]}>
                    <div className={styles["typewriter3000-inner-content"]}>
                        <div className={styles["typewriter3000-indicator-container"]}>
                            <div className={styles["indicator"]} ref={indicator} />
                        </div>

                        <p className={styles["device-p"]}>TYPEWRITER 3000</p>
                    </div>
                </div>
            </div>

            <div className={styles["document-folder"]} ref={documentFolder}>
                <div className={styles["document-folder-content"]}>
                    <div className={styles["document-folder-upper"]} ref={documentFolderUpper}>
                        <img src={documentFolderBgUpper} className={styles["document-folder-bg-upper"]} />

                        <p className={styles["document-folder-p"]}>Folder No:____</p>
                    </div>

                    <img src={documentFolderBgLower} className={styles["document-folder-bg-lower"]} ref={documentFolderLower} />
                </div>
            </div>
        </div>
    )
});

export default BillMain;