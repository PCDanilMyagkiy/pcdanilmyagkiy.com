import { useEffect, useLayoutEffect, forwardRef, useImperativeHandle, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

import { fetchRefresh } from "../../utils/fetchRefresh.js";


import Lenis from "lenis";

import styles from "./DarkMain.module.scss";

import { s } from "./../../utils/scale.js";

gsap.registerPlugin(SplitText);



const loadAnimationDelay = 0.4;



const DarkMain = forwardRef((props, ref) => {

    /*███████████████ DECLARATION ████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████*/

    const hasRun = useRef(0);
    const account = useRef(0);
    const startOrEndAnimationActivity = useRef(0);

    const containerRef = useRef(null);
    const containerBgRef = useRef(null);


    const sidebarContainerRef = useRef(null);
    const sidebarNametextRef = useRef(null);
    const sidebarNametextSplitTextRef = useRef(null);
    const sidebarWindowRef = useRef(null);
    const arrowRightRef = useRef(null);
    const arrowLeftRef = useRef(null);
    const arrowRightTriangleRef = useRef(null);
    const arrowLeftTriangleRef = useRef(null);
    const sidebarBlockActiveRef = useRef(null);

    const sidebarBlockRefs = useRef(null);
    const sidebarMarginRefs = useRef(null);
    const sidebarMarginEvenRefs = useRef(null);
    const sidebarMarginOddRefs = useRef(null);


    const mainContainerRef = useRef(null);
    const mainNametextRef = useRef(null);
    const mainNametextSplitTextRef = useRef(null);
    const mainTextboxRef = useRef(null);

    const mainBlocks = useRef(null);
    const mainHeaders = useRef(null);
    const mainHeaderSplitTextRefs = useRef(null);
    const mainParagraphs = useRef(null);
    const mainParagraphSplitTextRefs = useRef(null);
    const linkboxes = useRef(null);
    const linkTexts = useRef(null);
    const linkTextSplitTextRefs = useRef(null);
    const inaccessibilityTexts = useRef(null);
    const inaccessibilityTextSplitTextRefs = useRef(null);

    const mainWindowRef = useRef(null);
    const mainWindowContentRef = useRef(null);


    const [logInStatus, setLogInStatus] = useState(0);


    const navigate = useNavigate();



    /*███████████████ COMPONENT MANAGEMENT ███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████*/

    const prepDarkMain = () => {
        sidebarBlockRefs.current = document.querySelectorAll(`.${styles["sidebar-block"]}, .${styles["sidebar-block-active"]}`);
        sidebarMarginRefs.current = document.querySelectorAll(`.${styles["sidebar-block-margin"]}`);

        mainBlocks.current = document.querySelectorAll(`.${styles["main-block"]}`);
        mainHeaders.current = document.querySelectorAll(`.${styles["header-font"]}`);
        mainParagraphs.current = document.querySelectorAll(`.${styles["mainblock-paragraph-font"]}`);


        sidebarMarginEvenRefs.current = [];
        sidebarMarginOddRefs.current = [];

        sidebarMarginRefs.current.forEach((elem, num) => {
            if (num % 2) {
                sidebarMarginOddRefs.current.push(elem);
            } else {
                sidebarMarginEvenRefs.current.push(elem);
            }
        });


        gsap.set(containerRef.current, { backgroundColor: "rgb(0, 0, 0)" });
        gsap.set(containerBgRef.current, { opacity: 1 });

        gsap.set(sidebarWindowRef.current, { opacity: 0, width: s(30), height: s(30)});

        gsap.set(arrowLeftRef.current, { opacity: 0, scaleX: 0, borderRadius: `${s(15)}px 0 0 ${s(15)}px`, transformOrigin: "right center" });
        gsap.set(arrowRightRef.current, { opacity: 0, scaleX: 0, borderRadius: `0 ${s(15)}px ${s(15)}px 0`, transformOrigin: "left center" });
        gsap.set(arrowLeftTriangleRef.current, { opacity: 0, rotation: 720 });
        gsap.set(arrowRightTriangleRef.current, { opacity: 0, rotation: -720 });

        gsap.set(sidebarMarginEvenRefs.current, { x: "-66.67%" })
        gsap.set(sidebarMarginOddRefs.current, { x: "66.67%" })
        gsap.set(sidebarBlockRefs.current, { x: "-100%", opacity: 0 })
        gsap.set(sidebarBlockActiveRef.current, { backgroundColor: styles.bgNeutral.replace(")", ", 0)") })


        gsap.set(mainContainerRef.current, { xPercent: 100 });
        gsap.set(mainTextboxRef.current, { yPercent: -100});

        gsap.set(mainBlocks.current, { x: s(800), opacity: 0 });
    }



    const loadDarkMain = async () => {
        if (startOrEndAnimationActivity.current) return;
        startOrEndAnimationActivity.current = 1;


        await document.fonts.ready;
        await logIn();



        requestAnimationFrame(() => {
            linkboxes.current = document.querySelectorAll(`.${styles["linkbox-bg"]}`);
            linkTexts.current = document.querySelectorAll(`.${styles["link-font"]}`);
            inaccessibilityTexts.current = document.querySelectorAll(".inaccessibility-text");

            gsap.set(linkboxes.current, { width: s(10), height: s(10) });



            mainNametextSplitTextRef.current = SplitText.create(mainNametextRef.current, { type: "chars" });
            sidebarNametextSplitTextRef.current = SplitText.create(sidebarNametextRef.current, { type: "chars" });

            mainHeaderSplitTextRefs.current = [...mainHeaders.current].map((header) => {
                return SplitText.create(header, { type: "chars", reduceWhiteSpace: false });
            });

            mainParagraphSplitTextRefs.current = [...mainParagraphs.current].map((paragraph) => {
                return SplitText.create(paragraph, { type: "lines", reduceWhiteSpace: false });
            });

            linkTextSplitTextRefs.current = [...linkTexts.current].map((linkText) => {
                return SplitText.create(linkText, { type: "chars" });
            });

            inaccessibilityTextSplitTextRefs.current = [...inaccessibilityTexts.current].map((inaccessibilityText) => {
                return SplitText.create(inaccessibilityText, { type: "chars" });
            })



            gsap.set(mainNametextSplitTextRef.current.chars, { x: s(25), opacity: 0 });
            gsap.set(sidebarNametextSplitTextRef.current.chars, { x: s(25), opacity: 0 });

            mainHeaderSplitTextRefs.current.forEach((headerSplitText) => {
                gsap.set(headerSplitText.chars, { scaleY: 0, transformOrigin: "bottom", opacity: 0 });
            });

            mainParagraphSplitTextRefs.current.forEach((paragraphSplitText) => {
                gsap.set(paragraphSplitText.lines, { x: s(-450), opacity: 0 });
            });

            linkTextSplitTextRefs.current.forEach((linkTextSplitText) => {
                gsap.set(linkTextSplitText.chars, { x: s(100), opacity: 0 });
            });

            inaccessibilityTextSplitTextRefs.current.forEach((inaccessibilitySplitText) => {
                gsap.set(inaccessibilitySplitText.chars, { opacity: 0 });
            });



            
            const createMainBlockTimeline = (mainBlock, i) => {
                const headerSplitText = mainHeaderSplitTextRefs.current[i];
                const paragraphSplitText = mainParagraphSplitTextRefs.current[i];

                const linkbox = linkboxes.current[i];
                const linkTextSplitText = linkTextSplitTextRefs.current[i];
                const inaccessibilityTextSplitText = inaccessibilityTextSplitTextRefs.current[i];



                const tl = gsap.timeline();

                tl
                    .to(mainBlock, { x: 0, ease: "power2.out", duration: 1.5 }, "0")
                    .to(mainBlock, { opacity: 1, ease: "power2.in", duration: 1.5 }, "<");

                if (headerSplitText) tl.to(headerSplitText.chars, { scaleY: 1, opacity: 1, duration: 0.6, ease: "power2.out", stagger: 0.06 }, "<+0.2");

                if (paragraphSplitText) {
                    tl.to(paragraphSplitText.lines, { x: 0, opacity: 1, duration: 1.2, ease: "power2.out", stagger: 0.1 }, "<+0.25");
                }


                if (linkbox) {
                    tl
                        .to(linkbox, { height: "100%", ease: "power1.inOut", duration: 0.2 }, "1.25")
                        .to(linkbox, { width: "100%", ease: "power1.inOut", duration: 0.5 }, ">-0.1")
                        .to(linkTextSplitText.chars, { x: 0, opacity: 1, duration: 0.4, ease: "power2.out", stagger: 0.075 }, ">-0.25");

                    if (inaccessibilityTextSplitText) tl.to(inaccessibilityTextSplitText.chars, { opacity: 1, duration: 0.3, ease: "power2.out", stagger: 0.02 }, "<+0.1");
                }



                return tl;
            }



            const blocksTl = gsap.timeline();

            mainBlocks.current.forEach((mainBlock, i) => {
                blocksTl.add(createMainBlockTimeline(mainBlock, i), i * 0.2);
            });




            const loadTl = gsap.timeline({ onComplete: () => startOrEndAnimationActivity.current = 0 });

            loadTl
                .set(containerBgRef.current, { opacity: 0 }, loadAnimationDelay)
                .to(containerRef.current, { backgroundColor: styles.bgDark, ease: "power1.inOut", duration: 0.6 }, "<")


                .to(sidebarNametextSplitTextRef.current.chars, { x: 0, opacity: 1, ease: "power2.out", duration: 0.6, stagger: 0.04 }, ">")
                .to(arrowLeftRef.current, { opacity: 1, scaleX: 1, borderRadius: `${s(10)}px 0 0 ${s(10)}px`, ease: "power1.out", duration: 0.35 }, "<")
                .to(arrowRightRef.current, { opacity: 1, scaleX: 1, borderRadius: `0 ${s(10)}px ${s(10)}px 0`, ease: "power1.out", duration: 0.35 }, "<")
                .to(arrowLeftTriangleRef.current, { opacity: 1, ease: "power2.in", duration: 0.4 }, ">-0.15")
                .to(arrowRightTriangleRef.current, { opacity: 1, ease: "power2.in", duration: 0.4 }, "<")
                .to(arrowLeftTriangleRef.current, { rotation: 0, ease: "power2.out", duration: 0.5 }, "<")
                .to(arrowRightTriangleRef.current, { rotation: 0, ease: "power2.out", duration: 0.5 }, "<")


                .to(sidebarWindowRef.current, { opacity: 1, ease: "power1.out", duration: 0.8 }, "<-0.6")
                .to(sidebarWindowRef.current, { width: "100%", ease: "power1.out", duration: 0.4 }, "<")
                .to(sidebarWindowRef.current, { height: "100%", ease: "power2.inOut", duration: 1 }, "<+0.2")

                .to(sidebarMarginRefs.current, { x: 0, ease: "power1.out", stagger: 0.15, duration: 1 }, ">-0.8")
                .to(sidebarBlockRefs.current, { x: s(15), opacity: 1, ease: "power1.out", stagger: 0.15, duration: 0.45 }, "<+0.2")
                .to(sidebarBlockRefs.current, { x: 0, ease: "power1.inOut", stagger: 0.15, duration: 0.4 }, "<+0.45")

                .to(sidebarBlockActiveRef.current, { backgroundColor: styles.bgNeutral, ease: "power1.out", duration: 0.4 }, "<+0.8")



                .to(mainContainerRef.current, { xPercent: 0, duration: 1.2, ease: "power2.out" }, loadAnimationDelay)

                .to(mainTextboxRef.current, { yPercent: 0, duration: 0.4, ease: "power1.out" }, "<+0.8")
                .to(mainNametextSplitTextRef.current.chars, { x: 0, opacity: 1, ease: "power2.out", duration: 0.6, stagger: 0.04 }, "<+0.2")

                .add(blocksTl, ">-0.8");
        });
    }



    useImperativeHandle(ref, () => ({
        prepDarkMain,
        loadDarkMain,
    }));



    const unloadDarkMain = (endFunction) => {
        const createMainBlockTimeline = (mainBlock, i) => {
            const headerSplitText = mainHeaderSplitTextRefs.current[i];
            const paragraphSplitText = mainParagraphSplitTextRefs.current[i];

            const linkbox = linkboxes.current[i];
            const linkTextSplitText = linkTextSplitTextRefs.current[i];
            const inaccessibilityTextSplitText = inaccessibilityTextSplitTextRefs.current[i];



            const tl = gsap.timeline();


            if (headerSplitText) tl.to([...headerSplitText.chars].reverse(), { scaleY: 0, opacity: 0, duration: 0.6, ease: "power2.in", stagger: 0.06 }, "0");

            if (paragraphSplitText) tl.to(paragraphSplitText.lines, { x: s(450), opacity: 0, duration: 1.2, ease: "power2.in", stagger: 0.1 }, "<+0.075");


            if (inaccessibilityTextSplitText) tl.to([...inaccessibilityTextSplitText.chars].reverse(), { opacity: 0, duration: 0.3, ease: "power2.in", stagger: 0.02 }, "<+0.1");

            if (linkbox) {
                tl
                    .to([...linkTextSplitText.chars].reverse(), { x: s(100), opacity: 0, duration: 0.4, ease: "power2.in", stagger: 0.075 }, "0.6")
                    .to(linkbox, { width: s(10), ease: "power1.inOut", duration: 0.5 }, "<+0.8")
                    .to(linkbox, { height: s(10), ease: "power1.inOut", duration: 0.2 }, ">-0.25")
            }


            tl
                .to(mainBlock, { x: s(800), ease: "power2.in", duration: 1.5 }, "0.2")
                .to(mainBlock, { opacity: 0, ease: "power2.in", duration: 1.5 }, "<")



            return tl;
        }




        const blocksTl = gsap.timeline();

        mainBlocks.current.forEach((mainBlock, i) => {
            blocksTl.add(createMainBlockTimeline(mainBlock, i), i * 0.125);
        });




        const unloadTl = gsap.timeline({ onComplete: endFunction });

        unloadTl.add(blocksTl, "0");


        unloadTl
            .to(sidebarBlockActiveRef.current, { backgroundColor: styles.bgLight, ease: "power1.in", duration: 0.4 }, ">-2")

            .to(sidebarMarginRefs.current, { x: (index) => `${index ? "-" : ""}100%`, ease: "power1.in", stagger: 0.15, duration: 1 }, ">-0.2")
            .to(sidebarBlockRefs.current, { x: "100%", opacity: 1, ease: "power2.in", stagger: 0.15, duration: 0.45 }, "<+0.2")


            .addLabel("nametextAnimStart", "<+0.2")


            .to([...sidebarNametextSplitTextRef.current.chars].reverse(), { x: s(25), opacity: 0, ease: "power2.in", duration: 0.6, stagger: 0.04 }, "nametextAnimStart")
            .to(arrowRightTriangleRef.current, { rotation: 1440, opacity: 0, ease: "power2.out", duration: 0.3 }, "<+0.2")
            .to(arrowLeftTriangleRef.current, { rotation: -1440, opacity: 0, ease: "power2.out", duration: 0.3 }, "<")
            .to(arrowRightRef.current, { opacity: 0, scaleX: 0, borderRadius: `0 ${s(15)}px ${s(15)}px 0`, ease: "power1.out", duration: 0.35 }, ">")
            .to(arrowLeftRef.current, { opacity: 0, scaleX: 0, borderRadius: `${s(15)}px 0 0 ${s(15)}px`, ease: "power1.out", duration: 0.35 }, "<")

            .to(sidebarWindowRef.current, { opacity: 0, ease: "power2.in", duration: 1.2 }, ">+0.1")
            .to(sidebarWindowRef.current, { height: s(30), ease: "power2.inOut", duration: 1 }, "<")
            .to(sidebarWindowRef.current, { width: s(30), ease: "power2.inOut", duration: 0.4 }, ">-0.05")


            .to([...mainNametextSplitTextRef.current.chars].reverse(), { x: s(25), opacity: 0, ease: "power2.in", duration: 0.6, stagger: 0.04 }, "nametextAnimStart")
            .to(containerRef.current, { backgroundColor: "rgb(0, 0, 0)", duration: 1.6, ease: "power2.in" }, ">-0.1")
            .to(mainTextboxRef.current, { yPercent: -100, duration: 0.4, ease: "power1.in" }, "<")
            .to(mainContainerRef.current, { xPercent: 100, duration: 1.2, ease: "power2.in" }, ">")
    }


    const navigateCalculator = () => {
        unloadDarkMain(() => navigate("/calculator"));
    }

    const navigateRegInfo = () => {
        unloadDarkMain(() => navigate("/reg-info"));
    }

    const navigateSwitch = () => {
        unloadDarkMain(() => navigate("/switch"));
    }

    const navigateCtrlGear = () => {
        unloadDarkMain(() => navigate("/ctrl-gear"));
    }



    /*███████████████ MAINBLOCKS / SIDEBAR BLOCKS ████████████████████████████████████████████████████████████████████████████████████████████████████████████████████*/
    
    const mainblocks = [
        {
            id: 0,
            header: "This is the subprojects hub",
            paragraph: [
                "Browse through a collection of small projects showcasing my skills.",
                "Note that to access some of them you need to be registered."
            ].join("\n")
        }, 
        
        {
            id: 1,
            header: logInStatus ? "Account found" : "No account found",
            paragraph: [
                logInStatus ? `Successfully logged in as ${account.current.name}` : "You can go to the \"Registration\" tab in the sidebar on the left to registrate first."
            ].join("\n")
        },

        {
            id: 2
        },

        {
            id: 3,
            header: "1. Retro Calculator",
            paragraph: [
                "A calculator with its own RPN algorithm, well conceived animations, and history stored in the database connected to your account." ,
                "The custom evaluation algorithm allows it to process context tokens. For example:" ,
                "100 * 25% = 25; 100 + 25% = 125" ,
                "In multiplication, the first case, 25% is 0.25, but in addition, the second case, it is 25% of 100, which is 25." ,
            ].join("\n"),
            link: "calculator",
            requiresAuth: 1
        },

        {
            id: 4,
            header: "2. RegInfo",
            paragraph: [
                "Registration Information. A simpler project, gives you a deep dive and a good explanation of how the registration system works, which is a crutial part of this website. Has an interesting entirely text-based interface."
            ].join("\n"),
            link: "regInfo",
            requiresAuth: 1
        },

        {
            id: 5,
            header: "3. Anti-stress switch",
            paragraph: [
                "Pretty self-explanatory. Just a switch with a mesmerizing animation to relax a bit ;) ."
            ].join("\n"),
            link: "switch"
        },

        {
            id: 6,
            header: "4. Controllable Gear",
            paragraph: [
                "A gear with a simple animation controlled by user inputs. Utilizes GSAP timeline control methods (.play(), .reverse(), .pause(), .resume() etc) and has a very interactive interface.",
            ].join("\n"),
            link: "ctrlGear"
        },

        {
            id: 8
        },

        {
            id: 9,
            header: "The End",
            paragraph: [
                "I guess that's it for now :C . Hope you found something interesting in here!",
            ].join("\n")
        }
    ];



    const sidebarBlocks = [
        {
            id: 0,
            text: "Greeting Page",
            mainPage: "Win95Main"
        },

        { id: 1, margin: 1 },

        {
            id: 2,
            text: "Registration",
            mainPage: "BillMain"
        },

        { id: 3, margin: 1 },

        {
            id: 4,
            text: "Subprojects"
        },

        { id: 5, margin: 1 },

        {
            id: 6,
            text: "Contacts",
            mainPage: "PhotoMain"
        },

        { id: 7, margin: 1 },
    ];



    /*███████████████ FUNCTIONS ██████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████*/

    const linkboxEnterAnim = (mainblockId) => {
        if (startOrEndAnimationActivity.current) return;


        const mainblock = document.getElementById(`mainblock-${mainblockId}`);
        const linkboxBg = mainblock.querySelector(`.${styles["linkbox-bg"]}`);

        gsap.to(linkboxBg, { width: `calc(100% + ${s(10)}px)`, backgroundColor: styles.bgLightish, duration: 0.25, ease: "power2.out" });
    }

    const linkboxLeaveAnim = (mainblockId) => {
        if (startOrEndAnimationActivity.current) return;


        const mainblock = document.getElementById(`mainblock-${mainblockId}`);
        const linkboxBg = mainblock.querySelector(`.${styles["linkbox-bg"]}`);

        gsap.to(linkboxBg, { width: "100%", backgroundColor: styles.bgDark, duration: 0.25, ease: "power2.in" });
    }

    const linkboxDownAnim = (mainblockId) => {
        if (startOrEndAnimationActivity.current) return;


        const mainblock = document.getElementById(`mainblock-${mainblockId}`);
        const linkboxBg = mainblock.querySelector(`.${styles["linkbox-bg"]}`);

        gsap.to(linkboxBg, { height: `calc(100% + ${s(4)}px)`, backgroundColor: styles.bgLight, duration: 0.1, ease: "power2.out" });
    }

    const linkboxUpAnim = (mainblockId) => {
        if (startOrEndAnimationActivity.current) return;


        const mainblock = document.getElementById(`mainblock-${mainblockId}`);
        const linkboxBg = mainblock.querySelector(`.${styles["linkbox-bg"]}`);

        gsap.to(linkboxBg, { height: "100%", backgroundColor: styles.bgLightish, duration: 0.1, ease: "power2.in" });
    }



    const sidebarBlockEnterAnim = (sidebarBlockId) => {
        if (startOrEndAnimationActivity.current) return;


        const sidebarBlock = document.getElementById(`sidebar-block-${sidebarBlockId}`);

        gsap.to(sidebarBlock, { backgroundColor: styles.bgActive, duration: 0.2, ease: "power2.out" });
    }

    const sidebarBlockLeaveAnim = (sidebarBlockId) => {
        if (startOrEndAnimationActivity.current) return;


        const sidebarBlock = document.getElementById(`sidebar-block-${sidebarBlockId}`);

        gsap.to(sidebarBlock, { backgroundColor: styles.bgActiveA0, duration: 0.2, ease: "power2.in" });
    }

    const sidebarBlockClickAnim = (sidebarBlockId, mainPage) => {
        if (startOrEndAnimationActivity.current) return;
        startOrEndAnimationActivity.current = 1;


        const sidebarBlock = document.getElementById(`sidebar-block-${sidebarBlockId}`);
        const tl = gsap.timeline();

        tl
            .to(sidebarBlockActiveRef.current, { backgroundColor: styles.bgLight, duration: 0.2, ease: "power2.in" }, "0")
            .to(sidebarBlock, { backgroundColor: styles.bgNeutral, duration: 0.2, ease: "power2.out" }, "<");


        sidebarBlockActiveRef.current = sidebarBlock
        unloadDarkMain(() => props.gotoMainPage(mainPage));
    }



    const arrowLeftEnterAnim = () => {
        if (startOrEndAnimationActivity.current) return;


        gsap.to(arrowLeftRef.current, { width: s(48), backgroundColor: styles.bgActive, duration: 0.3, ease: "power2.out" });
    }

    const arrowLeftLeaveAnim = () => {
        if (startOrEndAnimationActivity.current) return;


        gsap.to(arrowLeftRef.current, { width: s(44), backgroundColor: styles.bgLight, duration: 0.3, ease: "power2.in" });
    }

    const arrowLeftClickAnim = () => {
        if (startOrEndAnimationActivity.current) return;
        startOrEndAnimationActivity.current = 1;


        const tl = gsap.timeline({ onComplete: () => unloadDarkMain(() => props.gotoMainPage("BillMain")) })

        tl
            .to(arrowLeftRef.current, { height: s(34), backgroundColor: styles.bgActiveLight, duration: 0.1, ease: "power2.out" }, "0")
            .to(arrowLeftTriangleRef.current, { borderRight: `${s(12)}px solid ${styles.primary}`, duration: 0.1, ease: "power2.out" }, "<")

            .to(arrowLeftRef.current, { height: s(30), backgroundColor: styles.bgLight, duration: 0.25, ease: "power2.inOut" }, ">")
            .to(arrowLeftTriangleRef.current, { borderRight: `${s(9)}px solid ${styles.primary}`, duration: 0.25, ease: "power2.inOut" }, "<")

            .to(arrowLeftRef.current, { width: s(44), duration: 0.1, ease: "power2.out" }, ">");
    }



    const arrowRightEnterAnim = () => {
        if (startOrEndAnimationActivity.current) return;


        gsap.to(arrowRightRef.current, { width: s(48), backgroundColor: styles.bgActive, duration: 0.3, ease: "power2.out" });
    }

    const arrowRightLeaveAnim = () => {
        if (startOrEndAnimationActivity.current) return;


        gsap.to(arrowRightRef.current, { width: s(44), backgroundColor: styles.bgLight, duration: 0.3, ease: "power2.in" });
    }

    const arrowRightClickAnim = () => {
        if (startOrEndAnimationActivity.current) return;
        startOrEndAnimationActivity.current = 1;


        const tl = gsap.timeline({ onComplete: () => unloadDarkMain(() => props.gotoMainPage("PhotoMain")) });

        tl
            .to(arrowRightRef.current, { height: s(34), backgroundColor: styles.bgActiveLight, duration: 0.1, ease: "power2.out" }, "0")
            .to(arrowRightTriangleRef.current, { borderLeft: `${s(12)}px solid ${styles.primary}`, duration: 0.1, ease: "power2.out" }, "<")

            .to(arrowRightRef.current, { height: s(30), backgroundColor: styles.bgLight, duration: 0.25, ease: "power2.inOut" }, ">")
            .to(arrowRightTriangleRef.current, { borderLeft: `${s(9)}px solid ${styles.primary}`, duration: 0.25, ease: "power2.inOut" }, "<")

            .to(arrowRightRef.current, { width: s(44), duration: 0.1, ease: "power2.out" }, ">");
    }



    const mapMainblocks = () => {
        return mainblocks.map((mainblock) => {
            return <div id={`mainblock-${mainblock.id}`} className={styles["main-block"]} key={mainblock.id}>
                {(() => {
                    if (!mainblock.header) return (
                        <div className={styles["header-spacer"]} />
                    )

                    return (
                        <div className={styles["header-font-wrapper"]}>
                            <p className={styles["header-font"]} data-text={mainblock.header}>{mainblock.header}</p>
                        </div>
                    );
                })()}

                {(() => {
                    if (!mainblock.paragraph) return;

                    return (
                        <div className={styles["paragraph-font-wrapper"]}>
                            <p className={styles["mainblock-paragraph-font"]} data-text={mainblock.paragraph}>{mainblock.paragraph}</p>
                        </div>
                    );
                })()}

                {(() => {
                    if (!mainblock.link) return;

                    const onClickFunction = () => {
                        switch (mainblock.link) {
                            case "calculator":
                                navigateCalculator();
                                break;

                            case "regInfo":
                                navigateRegInfo();
                                break;

                            case "switch":
                                navigateSwitch();
                                break;

                            case "ctrlGear":
                                navigateCtrlGear();
                                break;
                        }
                    }

                    if (mainblock.requiresAuth && !logInStatus) {
                        return <div className={styles["linkbox-container"]}>
                            <div className={styles["linkbox"]}
                                onMouseEnter={() => linkboxEnterAnim(mainblock.id)} onMouseLeave={() => linkboxLeaveAnim(mainblock.id)}
                                onMouseDown={() => linkboxDownAnim(mainblock.id)} onMouseUp={() => linkboxUpAnim(mainblock.id)}
                            >
                                <div className={styles["linkbox-bg"]} />

                                <div className={styles["link-font-container"]}>
                                    <p className={styles["link-font"]} data-text="INACCESSIBLE">INACCESSIBLE</p>
                                    <p className={styles["link-font-sizer"]}>INACCESSIBLE</p>
                                </div>
                            </div>

                            <p className={`${styles["paragraph-font"]} inaccessibility-text`} data-text={"(Registration needed)"}>(Registration needed)</p>
                        </div>
                    }

                    return <div className={styles["linkbox-container"]}>
                        <div className={styles["linkbox"]} onClick={onClickFunction}
                            onMouseEnter={() => linkboxEnterAnim(mainblock.id)} onMouseLeave={() => linkboxLeaveAnim(mainblock.id)}
                            onMouseDown={() => linkboxDownAnim(mainblock.id)} onMouseUp={() => linkboxUpAnim(mainblock.id)}
                        >
                            <div className={styles["linkbox-bg"]} />

                            <div className={styles["link-font-container"]}>
                                <p className={styles["link-font"]} data-text="VISIT PAGE">VISIT PAGE</p>
                                <p className={styles["link-font-sizer"]}>VISIT PAGE</p>
                            </div>
                        </div>
                    </div>
                })()}
            </div>
        });
    }



    const mapSidebarBlocks = () => {
        return sidebarBlocks.map((sidebarBlock, id) => {
            if (sidebarBlock.margin) {
                return (
                    <div className={styles["sidebar-block-margin"]} key={sidebarBlock.id} />
                );
            }

            if (sidebarBlock.mainPage) {
                return (
                    <div id={`sidebar-block-${sidebarBlock.id}`} className={styles["sidebar-block"]} key={sidebarBlock.id}
                        onMouseEnter={() => sidebarBlockEnterAnim(sidebarBlock.id)} onMouseLeave={() => sidebarBlockLeaveAnim(sidebarBlock.id)}
                        onClick={() => sidebarBlockClickAnim(sidebarBlock.id, sidebarBlock.mainPage)}
                    >
                        <p className={styles["paragraph-font"]}>{sidebarBlock.text}</p>
                    </div>
                );
            }

            return (
                <div className={styles["sidebar-block-active"]} ref={sidebarBlockActiveRef} key={sidebarBlock.id}>
                    <p className={styles["paragraph-font"]}>{sidebarBlock.text}</p>
                </div>
            );
        });
    }



    const logIn = async () => {
        if (hasRun.current) return;
        hasRun.current = 1;


        try {
            account.current = await fetchRefresh("/api/accounts/profile/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            if (account.current.fail) {
                account.current = 0;
                return;
            }

            setLogInStatus(1);
            return;
        }
        
        catch (error) {
            if (import.meta.env.DEV) {
                console.log("Server unavailable - continuing without account");
            } else {
                throw error;
            }
        }
    }



    /*███████████████ EFFECTS ████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████*/

    useEffect(() => {
        const lenis = new Lenis({
            wrapper: mainWindowRef.current,
            content: mainWindowContentRef.current,
            lerp: 0.125,
            autoRaf: 1
        });

        return () => lenis.destroy();
    });



    /*███████████████ RETURN █████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████*/

    return (
        <div className={styles["container"]} ref={containerRef}>
            <div className={styles["container-bg"]} ref={containerBgRef} />

            <div className={styles["sidebar-container"]} ref={sidebarContainerRef}>
                <div className={styles["textbox"]}>
                    <p className={styles["textbox-font"]} ref={sidebarNametextRef}>SIDEBAR</p>

                    <div className={styles["arrows-container"]}>
                        <div className={styles["arrow-container-left"]}>
                            <div className={`${styles["arrow"]} ${styles["arrow-left"]}`} ref={arrowLeftRef} onClick={arrowLeftClickAnim}
                                onMouseEnter={arrowLeftEnterAnim} onMouseLeave={arrowLeftLeaveAnim}
                            >
                                <div className={styles["arrow-triangle-left"]} ref={arrowLeftTriangleRef} />
                            </div>
                        </div>

                        <div className={styles["arrow-container-right"]}>
                            <div className={`${styles["arrow"]} ${styles["arrow-right"]}`} ref={arrowRightRef} onClick={arrowRightClickAnim}
                                onMouseEnter={arrowRightEnterAnim} onMouseLeave={arrowRightLeaveAnim}
                            >
                                <div className={styles["arrow-triangle-right"]} ref={arrowRightTriangleRef} />
                            </div>
                        </div>
                    </div>
                </div>


                <div className={styles["sidebar-window-container"]}>
                    <div className={styles["sidebar-window"]} ref={sidebarWindowRef}>
                        {mapSidebarBlocks()}
                    </div>
                </div>
            </div>



            <div className={styles["main-container"]} ref={mainContainerRef}>
                <div className={`${styles["textbox"]} ${styles["textbox-main"]}`} ref={mainTextboxRef}>
                    <p className={styles["textbox-font"]} ref={mainNametextRef}>MAIN</p>
                </div>

                <div className={styles["main-window"]} ref={mainWindowRef}>
                    <div ref={mainWindowContentRef}>
                        {mapMainblocks()}
                    </div>
                </div>
            </div>
        </div>
    );
});





export default DarkMain;