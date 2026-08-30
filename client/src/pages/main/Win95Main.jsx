import { useEffect, useState, useRef, forwardRef, useMemo, useImperativeHandle } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

import styles from "./Win95Main.module.scss";

import { s } from "./../../utils/scale.js";

gsap.registerPlugin(SplitText);



const loadAnimStart = 0.5



const Win95Main = forwardRef((props, ref) => {

    /*███████████████ DECLARATION ████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████*/

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);



    const win95MainLoading = useRef(null);
    const win95MainLoaded = useRef(0);
    const fontsReady = useRef(0);


    const containerBgRef = useRef(null);
    const bgBlobRefs = useRef([]);


    const sidebarRef = useRef(null);
    const sidebarNameboxBgRef = useRef(null);
    const sidebarNameboxTextRef = useRef(null);
    const sidebarNameboxSplitTextRef = useRef(null);
    const sidebarNameboxButtonLeftRef = useRef(null);
    const sidebarNameboxButtonRightRef = useRef(null);
    const sidebarInnerRef = useRef(null);
    const sidebarItem0 = useRef(null);
    const sidebarItem2 = useRef(null);
    const sidebarItem3 = useRef(null);
    const sidebarItem0Text = useRef(null);

    const sidebarItemRefs = useRef(null);


    const mainRef = useRef(null);
    const mainNameboxBg = useRef(null);
    const mainNameboxTextRef = useRef(null);
    const mainNameboxSplitTextRef = useRef(null);
    const mainInnerWindowScrollContainerRef = useRef(null);
    const mainInnerRef = useRef(null);
    const mainInnerBgRef = useRef(null);
    const mainInnerBorderRef = useRef(null);
    const mainInnerFrameRef = useRef([]);
    const mainInnerContentsRef = useRef(null);
    const mainTextElementRefs = useRef(null);
    const mainTextElementSplitTextRefs = useRef(null);
    const mainTextMarginBgRefs = useRef(null);
    
    const runButtonRef = useRef(null);
    const cancelButtonRef = useRef(null);
    const cancelTextRef = useRef(null);
    const cancelSplitTextRef = useRef(null);



    const navigate = useNavigate();



    /*███████████████ COMPONENT MANAGEMENT ███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████*/

    const prepWin95Main = () => {
        if (win95MainLoading.current) return;

        sidebarItemRefs.current = document.querySelectorAll(`.${styles["sidebar-window-item"]}`);
        mainTextMarginBgRefs.current = document.querySelectorAll(`.${styles["p-font-margin-bg"]}`);

        mainInnerFrameRef.current = [mainInnerBgRef.current, mainInnerBorderRef.current];


        gsap.set(containerBgRef.current, { opacity: 0, filter: "saturate(0)" });

        gsap.set(sidebarRef.current, { width: 0, height: 0, opacity: 0 });
        gsap.set(sidebarNameboxButtonLeftRef.current, { width: 0, height: 0, opacity: 0 });
        gsap.set(sidebarNameboxButtonRightRef.current, { width: 0, height: 0, opacity: 0 });
        gsap.set(sidebarNameboxBgRef.current, { x: "-300%" });
        gsap.set(sidebarInnerRef.current, { width: 0, height: 0, opacity: 0 });
        gsap.set(sidebarItem0.current, { x: "100%", opacity: 0, backgroundColor: "rgb(255, 255, 255)" });
        gsap.set(sidebarItem0Text.current, { color: "rgb(0, 0, 0)" });

        sidebarItemRefs.current.forEach((sidebarItem, index) => {
            gsap.set(sidebarItem, { x: index % 2 ? "100%" : "-100%", opacity: 0 });
        });

        gsap.set(mainRef.current, { opacity: 0, width: 0, height: 0, transformOrigin: "top right", });
        gsap.set(mainNameboxBg.current, { x: "-300%", });
        gsap.set(mainInnerWindowScrollContainerRef.current, { opacity: 0 });
        gsap.set(mainInnerFrameRef.current, { width: 0, height: 0, opacity: 0 });
        gsap.set(mainInnerContentsRef.current, { opacity: 0 });
        gsap.set(mainTextMarginBgRefs.current, { width: 0, backgroundColor: styles.mainNormalA0 });

        gsap.set(runButtonRef.current, { width: 0, height: 0, opacity: 0, transformOrigin: "top left" });
        gsap.set(cancelButtonRef.current, { width: 0, height: 0, opacity: 0, transformOrigin: "bottom right" });
    }





    const loadWin95Main = () => {
        if (win95MainLoading.current) return;
        win95MainLoading.current = 1;

        document.fonts.ready.then(() => {
            sidebarNameboxSplitTextRef.current = SplitText.create(sidebarNameboxTextRef.current, { type: "chars" });
            mainNameboxSplitTextRef.current = SplitText.create(mainNameboxTextRef.current, { type: "chars" });
            cancelSplitTextRef.current = SplitText.create(cancelTextRef.current, { type: "chars" });


            gsap.set([sidebarNameboxSplitTextRef.current.chars, mainNameboxSplitTextRef.current.chars], { x: s(-100), opacity: 0 });
            gsap.set(cancelSplitTextRef.current.chars, { opacity: 0 });





            const tl = gsap.timeline({
                onComplete: () => {
                    win95MainLoaded.current = 1;
                }
            });

            tl
                .to(containerBgRef.current, { opacity: 1, duration: 0.6, ease: "power1.inOut" }, loadAnimStart)
                .to(containerBgRef.current, { filter: "saturate(1)", duration: 1.6, ease: "power2.inOut" }, "<+0.2")


                .addLabel("sidebarAnimStart", "<+0.3")


                .to(sidebarRef.current, { opacity: 1, duration: 0.2, ease: "power1.in" }, "sidebarAnimStart")
                .to(sidebarRef.current, { width: `100%`, duration: 0.4, ease: "power1.inOut" }, "<")
                .to(sidebarRef.current, { height: `100%`, duration: 1, ease: "power1.inOut" }, ">")


                .to(sidebarNameboxBgRef.current, { x: "-62.5%", duration: 1.6, ease: "power1.inOut" }, "sidebarAnimStart+=0.15")


                .addLabel("sidebarNameboxAnimStart", "<")


                .to([...sidebarNameboxSplitTextRef.current.chars].reverse(), { x: 0, duration: 0.6, ease: "power2.out", stagger: 0.05 }, "sidebarNameboxAnimStart+=1")
                .to([...sidebarNameboxSplitTextRef.current.chars].reverse(), { opacity: 1, duration: 0.6, ease: "power1.in", stagger: 0.05 }, "<")


                .to(sidebarNameboxButtonLeftRef.current, { width: "100%", opacity: 1, duration: 0.35, ease: "power1.inOut" }, "sidebarNameboxAnimStart+=0.5")
                .to(sidebarNameboxButtonRightRef.current, { width: "100%", opacity: 1, duration: 0.35, ease: "power1.inOut" }, "<")
                .to(sidebarNameboxButtonLeftRef.current, { height: "100%", duration: 0.35, ease: "power1.inOut" }, ">")
                .to(sidebarNameboxButtonRightRef.current, { height: "100%", duration: 0.35, ease: "power1.inOut" }, "<")

                .to(sidebarInnerRef.current, { width: "100%", opacity: 1, duration: 0.3, ease: "power1.inOut" }, "<-0.4")
                .to(sidebarInnerRef.current, { height: "100%", duration: 0.75, ease: "power1.inOut" }, ">")

                .to(sidebarItem0.current, { x: 0, duration: 0.6, ease: "power1.inOut" }, ">-0.4")
                .to(sidebarItem0.current, { opacity: 1, duration: 0.6, ease: "power1.inOut" }, "<")


                .addLabel("sidebarItemsAnim", ">");

            
            sidebarItemRefs.current.forEach((sidebarItem) => {
                tl
                    .to(sidebarItem, { x: 0, duration: 0.6, ease: "power2.out" }, ">-0.5")
                    .to(sidebarItem, { opacity: 1, duration: 0.6, ease: "power1.in" }, "<");
            })


            tl
                .to(sidebarItem0.current, { backgroundColor: "rgb(0, 0, 128)", duration: 0.6, ease: "power1.inOut" }, "sidebarItemsAnim")
                .to(sidebarItem0Text.current, { color: "rgb(255, 255, 255)", duration: 0.6, ease: "power1.inOut" }, "<")


                .to(mainRef.current, { opacity: 1, duration: 0.3, ease: "power1.inOut" }, "sidebarAnimStart+=0.1")
                .to(mainRef.current, { width: "100%", duration: 0.8, ease: "power1.inOut" }, "<")
                .to(mainRef.current, { height: "100%", duration: 0.7, ease: "power1.inOut" }, ">")
                .to(mainInnerFrameRef.current, { height: "100%", opacity: 1, duration: 0.7, ease: "power1.inOut" }, "<+0.3")
                .to(mainInnerFrameRef.current, { width: "100%", duration: 0.6, ease: "power1.inOut" }, ">")

                .addLabel("mainTextAnimStart", ">-0.6")


                .to(mainNameboxBg.current, { x: "-62.5%", duration: 3, ease: "power1.inOut" }, "sidebarAnimStart-=0.6")

                .to([...mainNameboxSplitTextRef.current.chars].reverse(), { x: 0, duration: 0.6, ease: "power2.out", stagger: 0.05 }, "<+2")
                .to([...mainNameboxSplitTextRef.current.chars].reverse(), { opacity: 1, duration: 0.6, ease: "power1.in", stagger: 0.05 }, "<")

                .to(mainInnerWindowScrollContainerRef.current, { opacity: 1, duration: 0.3, ease: "power2.out" }, "<+0.1");




            mainTextElementRefs.current = mainInnerRef.current.querySelectorAll(`.${styles["p-font"]}`);

            mainTextElementSplitTextRefs.current = [...mainTextElementRefs.current].map((mainTextElement) => {
                return SplitText.create(mainTextElement, { type: "lines", reduceWhiteSpace: false });
            });


            mainTextElementSplitTextRefs.current.forEach((mainTextElementSplitText) => {
                gsap.set(mainTextElementSplitText.lines, { x: s(300), opacity: 0 });
            });



            const lineTl = gsap.timeline({ onComplete: () => {
                mainTextElementSplitTextRefs.current.forEach((mainTextElementSplitText) => {
                    mainTextElementSplitText.revert();
                });
            }});

            mainTextElementSplitTextRefs.current.forEach((mainTextElementSplitText, elemId) => {
                mainTextElementSplitText.lines.forEach((line, lineId) => {
                    if (elemId === 0 && lineId === 0) {
                        gsap.set(mainInnerContentsRef.current, { opacity: 1 });
                        fontsReady.current = 1;
                    }

                    lineTl
                        .to(line, { x: 0, duration: 0.8, ease: "power3.out" }, (elemId === 0) && (lineId === 0) ? "0" : "<+0.05")
                        .to(line, { opacity: 1, duration: 0.8, ease: "power2.out" }, "<");
                });
            });

            tl.add(lineTl, "mainTextAnimStart");





            tl
                .to(runButtonRef.current, { width: "100%", opacity: 1, duration: 0.6, ease: "power1.inOut" }, "<-0.2")
                .to(cancelButtonRef.current, { width: "100%", opacity: 1, duration: 0.6, ease: "power1.inOut" }, "<")
                .to(runButtonRef.current, { height: "100%", duration: 0.6, ease: "power1.inOut" }, ">")
                .to(cancelButtonRef.current, { height: "100%", duration: 0.6, ease: "power1.inOut" }, "<")

                .to(cancelSplitTextRef.current.chars, { opacity: 1, duration: 1.2, ease: "power2.out", stagger: 0.02 }, "<-0.2");


            mainTextMarginBgRefs.current.forEach((mainTextMarginBg, elemId) => {
                tl
                    .to(mainTextMarginBg, { width: "100%", duration: 1.2, ease: "power1.out" }, elemId === 0 ? "mainTextAnimStart+=0.6" : "<+0.05")
                    .to(mainTextMarginBg, { backgroundColor: styles.mainNormal, duration: 1.2, ease: "none" }, "<");
            });
        });
    }



    const unloadWin95Main = (endFunction, sidebarItemNum) => {
        if (!win95MainLoaded.current) return;
        win95MainLoaded.current = 0;



        mainTextElementRefs.current = mainInnerRef.current.querySelectorAll(`.${styles["p-font"]}`);

        mainTextElementSplitTextRefs.current = [...mainTextElementRefs.current].map((mainTextElement) => {
            return SplitText.create(mainTextElement, { type: "lines", reduceWhiteSpace: false });
        });

        sidebarNameboxSplitTextRef.current = SplitText.create(sidebarNameboxTextRef.current, { type: "chars" });
        mainNameboxSplitTextRef.current = SplitText.create(mainNameboxTextRef.current, { type: "chars" });
        cancelSplitTextRef.current = SplitText.create(cancelTextRef.current, { type: "chars" });



        const lineTl = gsap.timeline();

        mainTextElementSplitTextRefs.current.forEach((mainTextElementSplitText, elemId) => {
            mainTextElementSplitText.lines.forEach((line, lineId) => {
                lineTl
                    .to(line, { x: s(300), duration: 0.8, ease: "power3.in" }, (elemId === 0) && (lineId === 0) ? "0" : "<+0.05")
                    .to(line, { opacity: 0, duration: 0.8, ease: "power2.in" }, "<");
            });
        });



        const allSidebarItems = [sidebarItem0.current, ...sidebarItemRefs.current];

        const tl = gsap.timeline({ onComplete: endFunction });

        mainTextMarginBgRefs.current.forEach((mainTextMarginBg, elemId) => {
            tl
                .to(mainTextMarginBg, { scaleX: 0, transformOrigin: "right", duration: 1.2, ease: "power1.out" }, elemId === 0 ? "0.6" : "<+0.05")
                .to(mainTextMarginBg, { backgroundColor: styles.mainNormalA0, duration: 1.2, ease: "none" }, "<");
        });


        allSidebarItems.forEach((sidebarItem, num) => {
            if (num && num === sidebarItemNum) {
                const sidebarItemText = sidebarItem.querySelector(`.${styles["p-font"]}`);

                tl
                    .to(sidebarItem0.current, { backgroundColor: styles.whiteNormal, duration: 0.4, ease: "power2.inOut" }, "0")
                    .to(sidebarItem0Text.current, { color: styles.blackNormal, duration: 0.4, ease: "power2.inOut" }, "<")

                    .to(sidebarItem, { backgroundColor: styles.accentNormal, duration: 0.4, ease: "power2.inOut" }, "<")
                    .to(sidebarItemText, { color: styles.whiteNormal, duration: 0.4, ease: "power2.inOut" }, "<");
            }
        });


        tl
            .addLabel("mainInnerAnimStart", "0.5")

            .to([...mainNameboxSplitTextRef.current.chars].reverse(), { x: s(100), duration: 0.6, ease: "power2.in", stagger: 0.05 }, "0")
            .to([...mainNameboxSplitTextRef.current.chars].reverse(), { opacity: 0, duration: 0.6, stagger: 0.05, ease: "power1.in" }, "<")
            .to(mainNameboxBg.current, { x: "+100%", duration: 2, ease: "power1.in" }, "mainInnerAnimStart")


            .to(runButtonRef.current, { height: 0, duration: 0.6, ease: "power1.inOut" }, "<-0.2")
            .to(cancelButtonRef.current, { height: 0, duration: 0.6, ease: "power1.inOut" }, "<")
            .to(runButtonRef.current, { width: 0, opacity: 0, duration: 0.6, ease: "power1.inOut" }, ">")
            .to(cancelButtonRef.current, { width: 0, opacity: 0, duration: 0.6, ease: "power1.inOut" }, "<")

            .to(cancelSplitTextRef.current.chars, { opacity: 0, duration: 1.2, ease: "power2.out", stagger: 0.02 }, "<-0.2")


            .to(mainInnerFrameRef.current, { width: 0, duration: 0.6, ease: "power1.inOut" }, "mainInnerAnimStart+=0.4")
            .to(mainInnerFrameRef.current, { height: 0, opacity: 0, duration: 0.7, ease: "power1.inOut" }, ">")

            .to(mainInnerWindowScrollContainerRef.current, { opacity: 0, duration: 0.3, ease: "power2.out" }, ">-0.2")

            .to(mainRef.current, { width: 0, duration: 1, ease: "power1.inOut" }, "<")
            .to(mainRef.current, { height: 0, duration: 0.9, ease: "power1.inOut" }, ">")
            .to(mainRef.current, { opacity: 0, duration: 0.3, ease: "power1.inOut" }, "<+0.6")




            .to(sidebarNameboxButtonLeftRef.current, { height: "0%", duration: 0.35, ease: "power1.inOut" }, "mainInnerAnimStart")
            .to(sidebarNameboxButtonRightRef.current, { height: "0%", duration: 0.35, ease: "power1.inOut" }, "<")
            .to(sidebarNameboxButtonLeftRef.current, { width: "0%", opacity: 0, duration: 0.35, ease: "power1.inOut" }, ">")
            .to(sidebarNameboxButtonRightRef.current, { width: "0%", opacity: 0, duration: 0.35, ease: "power1.inOut" }, "<");


        [...allSidebarItems].reverse().forEach((sidebarItem, num) => {
            tl
                .to(sidebarItem, { x: num % 2 ? "-100%" : "100%", duration: 0.4, ease: "power2.in" }, ">-0.3")
                .to(sidebarItem, { opacity: 0, duration: 0.4, ease: "power1.in" }, "<");
        });


        tl
            .to([...sidebarNameboxSplitTextRef.current.chars].reverse(), { x: s(100), duration: 0.6, ease: "power2.in", stagger: 0.05 }, "mainInnerAnimStart-=0.2")
            .to([...sidebarNameboxSplitTextRef.current.chars].reverse(), { opacity: 0, duration: 0.6, stagger: 0.05, ease: "power1.in" }, "<")
            .to(sidebarNameboxBgRef.current, { x: "+100%", duration: 0.8, ease: "power1.in" }, "<+0.6")

            .to(sidebarInnerRef.current, { height: 0, duration: 0.75, ease: "power1.inOut" }, "<+0.3")
            .to(sidebarInnerRef.current, { width: 0, opacity: 0, duration: 0.2, ease: "power1.inOut" }, ">")

            .to(sidebarRef.current, { width: 0, duration: 0.8, ease: "power1.inOut" }, "mainInnerAnimStart+=1.4")
            .to(sidebarRef.current, { height: 0, duration: 1, ease: "power1.inOut" }, ">")
            .to(sidebarRef.current, { opacity: 0, duration: 0.3, ease: "power1.inOut" }, "<+0.7")

            
            .to(containerBgRef.current, { filter: "saturate(0)", duration: 1.6, ease: "power2.inOut" }, "<-0.2")
            .to(containerBgRef.current, { opacity: 0, duration: 0.6, ease: "power1.inOut" }, "<+1")
    }


    useImperativeHandle(ref, () => ({
        prepWin95Main,
        loadWin95Main,
    }));

    const navigateGreetingPage = () => {
        unloadWin95Main(() => {navigate("/greeting-page")}, 0);
    }

    const gotoBillMain = () => {
        if (!win95MainLoaded.current) return;

        unloadWin95Main(() => {props.gotoMainPage("BillMain")}, 1);
    }

    const gotoDarkMain = () => {
        if (!win95MainLoaded.current) return;

        unloadWin95Main(() => {props.gotoMainPage("DarkMain")}, 2);
    }

    const gotoPhotoMain = () => {
        if (!win95MainLoaded.current) return;

        unloadWin95Main(() => {props.gotoMainPage("PhotoMain")}, 3);
    }





    /*███████████████ FUNCTIONS ██████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████*/

    const bgBlobs = useMemo(() => {
        bgBlobRefs.current = [];

        return Array.from({ length: 25 }, (el, id) => { return (
            <div key={id} ref={(el) => bgBlobRefs.current[id] = el} className={styles["bg-blob"]} style={{ top: Math.random() * window.innerHeight - s(100), left: Math.random() * window.innerWidth - s(100) }} />
        )});
    }, [windowWidth, windowHeight]);





    /*███████████████ EFFECTS ████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████*/

    useEffect(() => {
        let timeout;

        const handleResize = () => {
            clearTimeout(timeout);

            timeout = setTimeout(() => {
                setWindowWidth(window.innerWidth);
                setWindowHeight(window.innerHeight);
            }, 250);
        }

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);



    useEffect(() => {
        const tweens = [];

        bgBlobRefs.current.forEach((bgBlob) => {
            const animate = () => {
                const tween = gsap.to(bgBlob, {
                    xPercent: Math.random() * 50 - 25,
                    yPercent: Math.random() * 50 - 25,
                    scale: 0.8 + Math.random() * 0.4,
                    opacity: Math.random() * 0.5,
                    duration: 0.6 + Math.random() * 0.6,
                    ease: "sine.inOut",
                    onComplete: animate
                });

                tweens.push(tween);
            }

            animate();
        });
    }, [windowWidth, windowHeight]);



    useEffect(() => {
        const lenis = new Lenis({
            wrapper: mainInnerWindowScrollContainerRef.current,
            content: mainInnerRef.current,
            lerp: 0.125,
            autoRaf: true
        });

        return () => lenis.destroy();
    }, []);


    


    /*███████████████ RETURN █████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████*/

    return (
        <div className={styles["container"]}>
            <div className={styles["container-bg"]} ref={containerBgRef}>
                {bgBlobs}
            </div>

            <div className={styles["sidebar-container"]}>
                <div className={styles["sidebar-inner-container"]}>
                    <div className={styles["sidebar"]} ref={sidebarRef}>
                        <div className={styles["window-padding-container"]}>
                            <div className={styles["namebox"]}>
                                <div className={styles["namebox-text-container"]}>
                                    <p className={styles["namebox-font"]} ref={sidebarNameboxTextRef}>Sidebar</p>
                                </div>

                                <div className={styles["namebox-buttons-container"]}>
                                    <div className={styles["namebox-button-left-container"]}>
                                        <div className={styles["namebox-button"]} ref={sidebarNameboxButtonLeftRef}>
                                            <div className={styles["namebox-button-arrow-left"]}></div>
                                        </div>
                                    </div>

                                    <div className={styles["namebox-button-right-container"]}>
                                        <div className={styles["namebox-button"]} ref={sidebarNameboxButtonRightRef} onClick={gotoBillMain}>
                                            <div className={styles["namebox-button-arrow-right"]}></div>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles["namebox-bg"]} ref={sidebarNameboxBgRef}></div>
                            </div>

                            <div className={styles["inner-window-wrapper"]}>
                                <div className={styles["inner-window"]} ref={sidebarInnerRef}>
                                    <div className={styles["sidebar-window-item-active"]} ref={sidebarItem0}>
                                        <p className={styles["sidebar-window-item-active-font"]} ref={sidebarItem0Text}>Greeting Page</p>
                                    </div>

                                    <div className={styles["sidebar-window-item"]} ref={sidebarItem2} onClick={gotoBillMain}>
                                        <p className={styles["p-font"]}>Registration</p>
                                    </div>
                                        
                                    <div className={styles["sidebar-window-item"]} ref={sidebarItem3} onClick={gotoDarkMain}>
                                        <p className={styles["p-font"]}>Projects</p>
                                    </div>

                                    <div className={styles["sidebar-window-item"]} ref={sidebarItem3} onClick={gotoPhotoMain}>
                                        <p className={styles["p-font"]}>Contacts</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div className={styles["main-container"]}>
                <div className={styles["main-inner-container"]}>
                    <div className={styles["main"]} ref={mainRef}>
                        <div className={styles["window-padding-container"]}>
                            <div className={styles["namebox"]}>
                                <div className={styles["namebox-text-container"]}>
                                    <p className={styles["namebox-font"]} ref={mainNameboxTextRef}>Greeting Page</p>
                                </div>

                                <div className={styles["namebox-bg"]} ref={mainNameboxBg}></div>
                            </div>

                            <div className={styles["inner-window-wrapper"]} />

                            <div className={styles["main-buttons-container"]}>
                                <div className={styles["run-button-container"]}>
                                    <div className={styles["main-button"]} ref={runButtonRef} onClick={navigateGreetingPage}>
                                        <p className={styles["button-font"]}>Run</p>
                                    </div>

                                    <div className={styles["main-button-sizer"]}>
                                        <p className={styles["button-font"]}>Run</p>
                                    </div>
                                </div>

                                <div className={styles["cancel-button-container"]}>
                                    <div className={styles["main-button"]} ref={cancelButtonRef}>
                                        <p className={styles["button-font"]}>Cancel</p>
                                    </div>

                                    <div className={styles["main-button-sizer"]}>
                                        <p className={styles["button-font"]}>Cancel</p>
                                    </div>
                                </div>


                                <p className={styles["button-font"]} ref={cancelTextRef}>Sorry, cancel is out of order</p>
                            </div>
                        </div>
                    </div>



                    <div className={styles["main-sizer"]}>
                        <div className={styles["window-padding-container"]}>
                            <div className={`${styles["namebox"]} ${styles["sizer"]}`}>
                                <div className={styles["namebox-text-container"]}>
                                    <p className={styles["namebox-font"]}>Greeting Page</p>
                                </div>

                                <div className={styles["namebox-bg"]}></div>
                            </div>

                            <div className={styles["inner-window-wrapper"]}>
                                <div className={styles["inner-window-scroll-container"]} ref={mainInnerWindowScrollContainerRef}>
                                    <div className={styles["main-inner-window"]} ref={mainInnerRef}>
                                        <div className={styles["main-inner-window-frame-lower"]}>
                                            <div className={styles["main-inner-window-bg"]} ref={mainInnerBgRef} />
                                        </div>

                                        <div className={styles["main-inner-window-contents"]} ref={mainInnerContentsRef}>
                                            <p className={styles["p-font"]}>You have just seen the introductory animation sequence, but if you want to watch it again, click the <span className={styles["p-font-bold"]}>"Run"</span> button at the bottom of this window.</p>
                                            <p className={styles["p-font"]}> </p>
                                            <p className={styles["p-font"]}>Notice that the project is open-source (MIT License), if you're interested in source code - you can access GitHub repo from the Contacts page.</p>
                                            <p className={styles["p-font"]}> </p>
                                            <p className={styles["p-font"]}>Before we dive in, here's a quick overview of the technologies I work with:</p>
                                            <p className={styles["p-font"]}> </p>
                                            <p className={styles["p-font"]}> </p>
                                            <p className={styles["p-font"]}>The foundation of my stack is <span className={styles["p-font-bold"]}>MERN</span> - a popular <span className={styles["p-font-bold"]}>JavaScript</span> ecosystem for building modern full-stack web applications. It consists of:</p>
                                            <p className={styles["p-font"]}> </p>
                                        
                                            <div className={styles["p-font-margin"]}>
                                                <div className={styles["p-font-margin-bg"]} />
                                                <p className={styles["p-font"]}><span className={styles["p-font-bold"]}>• MongoDB</span> - A NoSQL document database that stores data in flexible BSON documents.</p>
                                            </div>
                                            <div className={styles["p-font-margin"]}>
                                                <div className={styles["p-font-margin-bg"]} />
                                                <p className={styles["p-font"]}><span className={styles["p-font-bold"]}>• Express</span> - A lightweight backend framework that runs on Node.js, used to build APIs, handle HTTP requests, and organize server-side logic.</p>
                                            </div>
                                            <div className={styles["p-font-margin"]}>
                                                <div className={styles["p-font-margin-bg"]} />
                                                <p className={styles["p-font"]}><span className={styles["p-font-bold"]}>• React</span> - A frontend library used to build dynamic, interactive user interfaces from reusable components.</p>
                                            </div>
                                            <div className={styles["p-font-margin"]}>
                                                <div className={styles["p-font-margin-bg"]} />
                                                <p className={styles["p-font"]}><span className={styles["p-font-bold"]}>• Node.js</span> - A server-side runtime environment that allows JavaScript to run outside the browser.</p>
                                            </div>
                                            
                                            <p className={styles["p-font"]}> </p>
                                            <p className={styles["p-font"]}> </p>
                                            <p className={styles["p-font"]}>Though these technologies are only the core of my toolkit, as I've also developed skills with these tools:</p>
                                            <p className={styles["p-font"]}> </p>
                                        
                                            <div className={styles["p-font-margin"]}>
                                                <div className={styles["p-font-margin-bg"]} />
                                                <p className={styles["p-font"]}><span className={styles["p-font-bold"]}>◦ GSAP</span> - A professional animation tool used in all animated sequences on this website. I also work extensively with plugins such as ScrollTrigger for scroll-based animations and SplitText for intricate typography animations.</p>
                                            </div>
                                        
                                            <div className={styles["p-font-margin"]}>
                                                <div className={styles["p-font-margin-bg"]} />
                                                <p className={styles["p-font"]}><span className={styles["p-font-bold"]}>◦ Mongoose</span> - An object data modeling library for MongoDB that introduces schemas, validation, and a cleaner way to interact with complex databases.</p>
                                            </div>
                                        
                                            <div className={styles["p-font-margin"]}>
                                                <div className={styles["p-font-margin-bg"]} />
                                                <p className={styles["p-font"]}><span className={styles["p-font-bold"]}>◦ Sass</span> - A CSS preprocessor that adds variables, nesting, mixins, and other features, making stylesheets significantly easier to maintain as a project grows.</p>
                                            </div>
                                        
                                            <div className={styles["p-font-margin"]}>
                                                <div className={styles["p-font-margin-bg"]} />
                                                <p className={styles["p-font"]}><span className={styles["p-font-bold"]}>◦ Zod</span> - A schema validation library that keeps validation logic centralized and consistent across both frontend and backend code, greatly simplifying this kind of work.</p>
                                            </div>
                                        
                                            <div className={styles["p-font-margin"]}>
                                                <div className={styles["p-font-margin-bg"]} />
                                                <p className={styles["p-font"]}><span className={styles["p-font-bold"]}>◦ Redux</span> - A predictable state management library for JavaScript apps. While I prefer lighter solutions, I'm comfortable using Redux whenever necessary.</p>
                                            </div>
                                        
                                            <p className={styles["p-font"]}> </p>
                                            <p className={styles["p-font"]}> </p>
                                            <p className={styles["p-font"]}>To summarize, I am a developer capable of building both polished <span className={styles["p-font-bold"]}>interfaces</span> and robust <span className={styles["p-font-bold"]}>backend</span> systems. While I'm comfortable taking ownership of an <span className={styles["p-font-bold"]}>entire project</span>, I'm also open to <span className={styles["p-font-bold"]}>teamwork</span>.</p>
                                            <p className={styles["p-font"]}> </p>
                                            <p className={styles["p-font"]}>You may have also noticed that this website embraces a rather bold visual style. That's an intentional creative choice, meant to make it more interesting and distinguishable from other portfolios while drawing attention to my skills - but we can always settle on something calmer and more classic if that's what your project needs. I'm happy to adapt to the design direction that best fits your goals.</p>
                                            <p className={styles["p-font"]}> </p>
                                            <p className={styles["p-font"]}>One more thing worth mentioning: this site uses a custom dynamic scaling system I built specifically for this project. Instead of relying on standard responsive breakpoints, every size, spacing, and animation value is calculated in real time from the screen's actual dimensions, so proportions stay consistent whether you're viewing this on a laptop or a 4K TV. It's a small detail visually, but it turned out to be quite a technically demanding part of the build. That said, it's currently designed for desktop screens - mobile uses fundamentally different layout logic, so this scaling system doesn't extend there yet. You can check out the scaling right now - try resizing the window (though the website is intended for maximized window without fullscreen).</p>
                                            <p className={styles["p-font"]}> </p>
                                            <p className={styles["p-font"]}> </p>
                                            <p className={styles["p-font"]}>Now, let's cut right to the chase - my <span className={styles["p-font-bold"]}>actual projects</span>. You can proceed with the <span className={styles["p-font-bold"]}>sidebar</span> on the left.</p>
                                        </div>

                                        <div className={styles["main-inner-window-frame"]}>
                                            <div className={styles["main-inner-window-border"]} ref={mainInnerBorderRef} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={{backgroundColor: "red"}} className={`${styles["main-buttons-container"]} ${styles["sizer"]}`}>
                                <div className={styles["run-button-container"]}>
                                    <div className={styles["main-button"]}>
                                        <p className={styles["button-font"]}>Run</p>
                                    </div>

                                    <div className={styles["main-button-sizer"]}>
                                        <p className={styles["button-font"]}>Run</p>
                                    </div>
                                </div>

                                <div className={styles["cancel-button-container"]}>
                                    <div className={styles["main-button"]}>
                                        <p className={styles["button-font"]}>Cancel</p>
                                    </div>

                                    <div className={styles["main-button-sizer"]}>
                                        <p className={styles["button-font"]}>Cancel</p>
                                    </div>
                                </div>


                                <p className={styles["button-font"]}>Sorry, cancel is out of order</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
});

export default Win95Main;