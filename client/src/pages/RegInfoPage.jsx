import { useEffect, useLayoutEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";

import apiFetch from "../utils/apiFetch.js";


import Lenis from "lenis";

import StaticLayer from "../components/StaticLayer.jsx";

import styles from "./RegInfoPage.module.scss";

import { useScale } from "./../utils/useScale.js";


gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);





const RegInfoPage = () => {

    /*███████████████ DECLARATION ████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████*/

    const { scale, s } = useScale();

    const characterWidth = s(9);

    const animationStart = 500;
    const staticAppearanceTime = 750;





    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);

    const [animationActive, setAnimationActive] = useState(0);


    const account = useRef(null);

    const containerRef = useRef(null);
    const textContainerRef = useRef(null);
    const linesRef = useRef(null);

    const scrollPlaceholderTopRef = useRef(null);
    const scrollPlaceholderBottomRef = useRef(null);
    const scrollPlaceholderTopLines1Ref = useRef(null);
    const scrollPlaceholderTopLines2Ref = useRef(null);
    const scrollPlaceholderBottomLines1Ref = useRef(null);
    const scrollPlaceholderBottomLines2Ref = useRef(null);

    const staticLayerContainerRef = useRef(null);

    const scrollContentRef = useRef(null);


    const hasRun = useRef(null);

    const lenis = useRef(null);


    const navigate = useNavigate();





    /*███████████████████████████████████████ FUNCTIONS ███████████████████████████████████████*/

    const formatLine = (start, content, fillCharacter, end) => {
        const availableSpace = Math.trunc((windowWidth - s(20)) / characterWidth - start.length - end.length);
        const placeholderSpace = availableSpace - content.length;



        if (content.length > availableSpace) {
            const contentWords = content.split(" ");
            
            let currentContentLine = "";
            let remainderContentLine = "";


            if (contentWords[0].length > availableSpace) {
                const splitWord1 = contentWords[0].slice(0, availableSpace);
                const splitWord2 = contentWords[0].slice(availableSpace);

                contentWords.shift();

                contentWords.unshift(splitWord2);
                contentWords.unshift(splitWord1);
            }


            for (let i = 0; i < contentWords.length; i++) {
                const word = contentWords[i];
                const updatedContentLine = currentContentLine + word;

                if (updatedContentLine.length <= availableSpace) {
                    currentContentLine = updatedContentLine + " ";
                } else {
                    remainderContentLine = contentWords.slice(i).join(" ");

                    break;
                }
            }

            
            return [
                ...formatLine(start, currentContentLine.trimEnd(), fillCharacter, end),
                ...formatLine(start, remainderContentLine.trimEnd(), fillCharacter, end)
            ];
        }


        return [start + content + fillCharacter.repeat(placeholderSpace > 0 ? placeholderSpace : 0) + end];
    }





    const createTopScrollPlaceholderAnimation = (delay) => {
        const scrollPlaceholderTopContents = scrollPlaceholderTopRef.current.querySelectorAll(`.${styles["scroll-placeholder-p"]}`);

        scrollPlaceholderTopLines1Ref.current = [...scrollPlaceholderTopContents].filter((el, i) => i % 2 === 0);
        scrollPlaceholderTopLines2Ref.current = [...scrollPlaceholderTopContents].filter((el, i) => i % 2 > 0);

        gsap.set(scrollPlaceholderTopLines1Ref.current, {
            x: s(150), opacity: 0, filter: `drop-shadow(0 0 ${s(10)}px ${styles.mainColor}) brightness(500%) blur(${s(6)}px)`
        });
        gsap.set(scrollPlaceholderTopLines2Ref.current, {
            x: s(-150), opacity: 0, filter: `drop-shadow(0 0 ${s(10)}px ${styles.mainColor}) brightness(500%) blur(${s(6)}px)`
        });



        containerRef.current.style.overflowY = "hidden";

        setTimeout(() => {
            containerRef.current.style.overflowY = "scroll";


            const flickerTl = gsap.timeline({ repeat: -1, paused: 1 });

            flickerTl
                .to(scrollPlaceholderTopLines1Ref.current,
                    { x: s(5), filter: `drop-shadow(0 0 ${s(10)}px ${styles.mainColor}) brightness(500%) blur(${s(3)}px)`, ease: "power1.inOut", duration: 0.25, stagger: 0.15, },
                "0")

                .to(scrollPlaceholderTopLines2Ref.current,
                    { x: s(-5), filter: `drop-shadow(0 0 ${s(10)}px ${styles.mainColor}) brightness(500%) blur(${s(3)}px)`, ease: "power1.inOut", duration: 0.25, stagger: 0.15, },
                "<+0.075")

                
                .to(scrollPlaceholderTopLines1Ref.current,
                    { x: 0, opacity: 0.1, filter: `drop-shadow(0 0 ${s(10)}px ${styles.mainColor}) brightness(100%) blur(0px)`, ease: "power1.inOut", duration: 0.25, stagger: 0.15, },
                "<+0.225")

                .to(scrollPlaceholderTopLines2Ref.current,
                    { x: 0, opacity: 0.1, filter: `drop-shadow(0 0 ${s(10)}px ${styles.mainColor}) brightness(100%) blur(0px)`, ease: "power1.inOut", duration: 0.25, stagger: 0.15, },
                "<+0.075")



                .to(scrollPlaceholderTopLines1Ref.current,
                    { x: s(-5), opacity: 1, filter: `drop-shadow(0 0 ${s(10)}px ${styles.mainColor}) brightness(500%) blur(${s(3)}px)`, ease: "power1.inOut", duration: 0.25, stagger: 0.15, },
                ">")

                .to(scrollPlaceholderTopLines2Ref.current,
                    { x: s(5), opacity: 1, filter: `drop-shadow(0 0 ${s(10)}px ${styles.mainColor}) brightness(500%) blur(${s(3)}px)`, ease: "power1.inOut", duration: 0.25, stagger: 0.15, },
                "<+0.075")

                
                .to(scrollPlaceholderTopLines1Ref.current,
                    { x: 0, filter: `drop-shadow(0 0 ${s(10)}px ${styles.mainColor}) brightness(100%) blur(0px)`, ease: "power1.inOut", duration: 0.25, stagger: 0.15, },
                "<+0.225")

                .to(scrollPlaceholderTopLines2Ref.current,
                    { x: 0, filter: `drop-shadow(0 0 ${s(10)}px ${styles.mainColor}) brightness(100%) blur(0px)`, ease: "power1.inOut", duration: 0.25, stagger: 0.15, },
                "<+0.075")


                .to(scrollPlaceholderTopLines1Ref.current, { duration: 0.8 }, ">")
                .to(scrollPlaceholderTopLines2Ref.current, { duration: 0.8 }, "<");



            const enterTl = gsap.timeline({ onComplete: () => flickerTl.restart() });

            enterTl
                .to(scrollPlaceholderTopLines1Ref.current, {
                    x: 0, opacity: 1, filter: `drop-shadow(0 0 ${s(10)}px ${styles.mainColor}) brightness(100%) blur(0px)`, ease: "power2.out", duration: 0.5, stagger: 0.1
                }, "0")

                .to(scrollPlaceholderTopLines2Ref.current, {
                    x: 0, opacity: 1, filter: `drop-shadow(0 0 ${s(10)}px ${styles.mainColor}) brightness(100%) blur(0px)`, ease: "power2.out", duration: 0.5, stagger: 0.1
                }, "<+0.05");



            const leaveTl = gsap.timeline({ paused: 1 });

            leaveTl
                .to(scrollPlaceholderTopLines1Ref.current, {
                    x: s(150), opacity: 0, filter: `drop-shadow(0 0 ${s(10)}px ${styles.mainColor}) brightness(500%) blur(${s(6)}px)`, ease: "power2.in", duration: 0.5, stagger: 0.1
                }, "0")

                .to(scrollPlaceholderTopLines2Ref.current, {
                    x: s(-150), opacity: 0, filter: `drop-shadow(0 0 ${s(10)}px ${styles.mainColor}) brightness(500%) blur(${s(6)}px)`, ease: "power2.in", duration: 0.5, stagger: 0.1
                }, "<+0.05");


            
            let prevResult = 1;

            ScrollTrigger.create({
                scroller: containerRef.current,
                start: "top top",

                onUpdate(self) {
                    if (self.progress === 0) {
                        if (prevResult !== 1) {
                            prevResult = 1;

                            enterTl.restart();
                            leaveTl.pause();
                        }
                    } else if (prevResult === 1) {
                        prevResult = 0;

                        flickerTl.pause();
                        enterTl.pause();
                        leaveTl.restart();
                    }
                }
            });
        }, delay);
    }





    const createBottomScrollPlaceholderAnimation = (delay) => {
        const scrollPlaceholderBottomContents = scrollPlaceholderBottomRef.current.querySelectorAll(`.${styles["scroll-placeholder-p"]}`);

        scrollPlaceholderBottomLines1Ref.current = [...scrollPlaceholderBottomContents].filter((el, i) => i % 2 === 0);
        scrollPlaceholderBottomLines2Ref.current = [...scrollPlaceholderBottomContents].filter((el, i) => i % 2 > 0);

        gsap.set(scrollPlaceholderBottomLines1Ref.current, {
            x: s(150), opacity: 0, filter: `drop-shadow(0 0 ${s(10)}px ${styles.mainColor}) brightness(500%) blur(${s(6)}px)`
        });
        gsap.set(scrollPlaceholderBottomLines2Ref.current, {
            x: s(-150), opacity: 0, filter: `drop-shadow(0 0 ${s(10)}px ${styles.mainColor}) brightness(500%) blur(${s(6)}px)`
        });



        setTimeout(() => {
            const flickerTl = gsap.timeline({ repeat: -1, paused: 1 });

            flickerTl
                .to(scrollPlaceholderBottomLines1Ref.current,
                    { x: s(5), filter: `drop-shadow(0 0 ${s(10)}px ${styles.mainColor}) brightness(500%) blur(${s(3)}px)`, ease: "power1.inOut", duration: 0.25, stagger: 0.15, },
                "0")

                .to(scrollPlaceholderBottomLines2Ref.current,
                    { x: s(-5), filter: `drop-shadow(0 0 ${s(10)}px ${styles.mainColor}) brightness(500%) blur(${s(3)}px)`, ease: "power1.inOut", duration: 0.25, stagger: 0.15, },
                "<+0.075")

                
                .to(scrollPlaceholderBottomLines1Ref.current,
                    { x: 0, opacity: 0.1, filter: `drop-shadow(0 0 ${s(10)}px ${styles.mainColor}) brightness(100%) blur(0px)`, ease: "power1.inOut", duration: 0.25, stagger: 0.15, },
                "<+0.225")

                .to(scrollPlaceholderBottomLines2Ref.current,
                    { x: 0, opacity: 0.1, filter: `drop-shadow(0 0 ${s(10)}px ${styles.mainColor}) brightness(100%) blur(0px)`, ease: "power1.inOut", duration: 0.25, stagger: 0.15, },
                "<+0.075")



                .to(scrollPlaceholderBottomLines1Ref.current,
                    { x: s(-5), opacity: 1, filter: `drop-shadow(0 0 ${s(10)}px ${styles.mainColor}) brightness(500%) blur(${s(3)}px)`, ease: "power1.inOut", duration: 0.25, stagger: 0.15, },
                ">")

                .to(scrollPlaceholderBottomLines2Ref.current,
                    { x: s(5), opacity: 1, filter: `drop-shadow(0 0 ${s(10)}px ${styles.mainColor}) brightness(500%) blur(${s(3)}px)`, ease: "power1.inOut", duration: 0.25, stagger: 0.15, },
                "<+0.075")

                
                .to(scrollPlaceholderBottomLines1Ref.current,
                    { x: 0, filter: `drop-shadow(0 0 ${s(10)}px ${styles.mainColor}) brightness(100%) blur(0px)`, ease: "power1.inOut", duration: 0.25, stagger: 0.15, },
                "<+0.225")

                .to(scrollPlaceholderBottomLines2Ref.current,
                    { x: 0, filter: `drop-shadow(0 0 ${s(10)}px ${styles.mainColor}) brightness(100%) blur(0px)`, ease: "power1.inOut", duration: 0.25, stagger: 0.15, },
                "<+0.075")


                .to(scrollPlaceholderBottomLines1Ref.current, { duration: 0.8 }, ">")
                .to(scrollPlaceholderBottomLines2Ref.current, { duration: 0.8 }, "<");



            const enterTl = gsap.timeline({ paused: 1, onComplete: () => flickerTl.restart() });

            enterTl
                .to(scrollPlaceholderBottomLines1Ref.current, {
                    x: 0, opacity: 1, filter: `drop-shadow(0 0 ${s(10)}px ${styles.mainColor}) brightness(100%) blur(0px)`, ease: "power2.out", duration: 0.5, stagger: 0.1
                }, "0")

                .to(scrollPlaceholderBottomLines2Ref.current, {
                    x: 0, opacity: 1, filter: `drop-shadow(0 0 ${s(10)}px ${styles.mainColor}) brightness(100%) blur(0px)`, ease: "power2.out", duration: 0.5, stagger: 0.1
                }, "<+0.05");



            const leaveTl = gsap.timeline({ paused: 1 });

            leaveTl
                .to(scrollPlaceholderBottomLines1Ref.current, {
                    x: s(150), opacity: 0, filter: `drop-shadow(0 0 ${s(10)}px ${styles.mainColor}) brightness(500%) blur(${s(6)}px)`, ease: "power2.in", duration: 0.5, stagger: 0.1
                }, "0")

                .to(scrollPlaceholderBottomLines2Ref.current, {
                    x: s(-150), opacity: 0, filter: `drop-shadow(0 0 ${s(10)}px ${styles.mainColor}) brightness(500%) blur(${s(6)}px)`, ease: "power2.in", duration: 0.5, stagger: 0.1
                }, "<+0.05");


            
            let prevResult = 0;

            ScrollTrigger.create({
                scroller: containerRef.current,
                start: "top top",

                onUpdate(self) {
                    if (self.progress === 1) {
                        if (prevResult !== 1) {
                            prevResult = 1;

                            enterTl.restart();
                            leaveTl.pause();
                        }
                    } else if (prevResult === 1) {
                        prevResult = 0;

                        flickerTl.pause();
                        enterTl.pause();
                        leaveTl.restart();
                    }
                }
            });
        }, delay);
    }



    const unloadingAnimation = () => {
        const textLines = textContainerRef.current.querySelectorAll(`.${styles["p"]}`);

        containerRef.current.style.overflowY = "hidden";
        lenis.current.destroy();


        const visibleTextLines = [...textLines].filter(line => {
            const rect = line.getBoundingClientRect();

            return rect.bottom > 0 && rect.top < window.innerHeight;
        });

        const visibleTextLines1 = visibleTextLines.filter((line, i) => i % 2 === 0);
        const visibleTextLines2 = visibleTextLines.filter((line, i) => i % 2 !== 0);


        
        const tl = gsap.timeline();

        tl
            .set(visibleTextLines, { filter: `drop-shadow(0 0 ${s(10)}px ${styles.mainColor}) brightness(100%)` }, "0")

            .to(visibleTextLines, {
                filter: `drop-shadow(0 0 ${s(10)}px ${styles.mainColor}) brightness(500%) blur(${s(3)}px)`, duration: 0.5, ease: "power2.in", stagger: 0.025
            }, "<")


            .to(visibleTextLines1, { x: window.innerWidth / 4, opacity: 0, duration: 0.75, ease: "power2.in", stagger: 0.05 }, "<+0.05")
            .to(visibleTextLines2, { x: window.innerWidth / -4, opacity: 0, duration: 0.75, ease: "power2.in", stagger: 0.05 }, "<+0.025")


            .to(staticLayerContainerRef.current, { opacity: 0, duration: staticAppearanceTime / 1000, ease: "power2.in" }, `>-${staticAppearanceTime / 1000 - 0.2}`)

            .call(() => navigate("/"), [], ">");
    }





    /*████████████████████████████████████████ EFFECTS ████████████████████████████████████████*/

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            setWindowHeight(window.innerHeight);
        }

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);



    useLayoutEffect(() => {
        gsap.set(staticLayerContainerRef.current, { opacity: 0 });


        setTimeout(() => {
            gsap.to(staticLayerContainerRef.current, { opacity: 1, duration: staticAppearanceTime / 1000, ease: "power2.in" });
        }, animationStart);


        createTopScrollPlaceholderAnimation(animationStart + staticAppearanceTime);
        createBottomScrollPlaceholderAnimation(animationStart + staticAppearanceTime);
    }, []);



    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            linesRef.current = containerRef.current.querySelectorAll(`.${styles["p"]}`);
            

            gsap.set(linesRef.current, {
                yPercent: -40, 
                scaleX: 1.025, 
                opacity: 0, 
                color: "rgb(255, 255, 255)", 
                filter: `drop-shadow(0 0 ${s(10)}px ${styles.mainColorLight}) blur(${s(3)}px)`
            });

            if (animationActive) {
                linesRef.current.forEach((line) => {
                    gsap.timeline({
                        scrollTrigger: {
                            trigger: line,
                            scroller: containerRef.current,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true
                        }
                    })


                    .to(line, {
                        yPercent: 0,
                        scaleX: 1,
                        opacity: 1,
                        filter: `drop-shadow(0 0 ${s(10)}px ${styles.mainColor}) blur(0px)`,

                        ease: "power2.out",
                        duration: 0.5
                    }, "0")

                    .to(line, {
                        color: styles.mainColor,

                        ease: "power1`.out",
                        duration: 0.5
                    }, "<")




                    .to(line, {
                        yPercent: 40,
                        scaleX: 1.025,
                        opacity: 0,
                        filter: `drop-shadow(0 0 ${s(10)}px ${styles.mainColorLight}) blur(${s(3)}px)`,

                        ease: "power2.in",
                        duration: 0.5
                    }, ">")

                    .to(line, {
                        color: "rgb(255, 255, 255)",

                        ease: "power1.in",
                        duration: 0.5
                    }, "<");
                });
            }
        }, containerRef);

        return () => ctx.revert();
    }, [animationActive]);



    useEffect(() => {
        lenis.current = new Lenis({
            wrapper: containerRef.current,
            content: scrollContentRef.current,
            lerp: 0.1,
            autoRaf: true
        });

        return () => lenis.current.destroy();
    }, []);



    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = 1;

        (async() => {
            try {
                account.current = await apiFetch("/api/accounts/profile/", "refresh", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                });

                if (account.current.fail) {
                    account.current = 0;
                }
            }
            
            catch (error) {
                if (import.meta.env.DEV) {
                    console.log("Server unavailable - continuing without account");
                } else {
                    throw error;
                }
            }

            return setAnimationActive(1);
        })();
    }, []);
    


    /*████████████████████████████████████████ RETURN █████████████████████████████████████████*/

    const textContent = [
        ...formatLine('╔═════', '══════════════════════════════════════════════════╦', '═',                                           '══╗'),
        ...formatLine('║     ', '                                                  ║', ' ',                             '┌─────────────┐ ║'),
        ...formatLine('║     ', ' ██████████    ██████   ██████    █████████       ║  pcdanilmyagkiy.com/regInfo', ' ', '│  Return to  │ ║'),
        ...formatLine('║     ', '░░███░░░░███  ░░██████ ██████    ███░░░░░███      ║', ' ',                             '│ Subprojects │ ║'),
        ...formatLine('║     ', ' ░███   ░░███  ░███░█████░███   ░███    ░███      ║  2025-2026', ' ',                  '└─────────────┘ ║'),
        ...formatLine('║     ', ' ░███    ░███  ░███░░███ ░███   ░███████████      ║', ' ',                                           '  ║'),
        ...formatLine('║     ', ' ░███    ░███  ░███ ░░░  ░███   ░███░░░░░███      ║', ' ',                                           '  ║'),
        ...formatLine('║     ', ' ░███    ███   ░███      ░███   ░███    ░███      ║  made by', ' ',                                  '  ║'),
        ...formatLine('║     ', ' ██████████    █████     █████  █████   █████     ║', ' ',                                           '  ║'),
        ...formatLine('║     ', '░░░░░░░░░░    ░░░░░     ░░░░░  ░░░░░   ░░░░░      ║  PCDanil_Myagkiy', ' ',                          '  ║'),
        ...formatLine('║     ', '                                                  ║', ' ',                                           '  ║'),
        ...formatLine('╠═════', '══════════════════════════════════════════════════╩', '═',                                           '══╣'),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('║  ', 'RegInfo', ' ', '  ║'),
        ...formatLine('║  ', '', ' ', '  ║',),
        ...formatLine('║   ', 'Registration Information - a simple page to explain intricate registration.', ' ', '  ║',),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('╠══', '', '═', '══╣'),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('║  ', 'Input Validation', ' ', '  ║',),
        ...formatLine('║  ', '', ' ', '  ║',),
        ...formatLine('║   ', 'Any registration system needs input validation. We can\'t allow users to have very short passwords or names that include special characters, so I designed a prevention system based on the Zod library.', ' ', '   ║',),
        ...formatLine('║   ', 'So, here are the input validation schemas:', ' ', '   ║',),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('║  ', '', '╌', '  ║',),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('║   ', `Name: ${account.current ? account.current.name : "Not registered"}. Rules: {`, ' ', '  ║',),
        ...formatLine('║     ', 'Minimum length: 3,', ' ', '  ║',),
        ...formatLine('║     ', 'Maximum length: 8,', ' ', '  ║',),
        ...formatLine('║     ', 'Should only include: {', ' ', '  ║',),
        ...formatLine('║       ', 'Uppercase letters: A-Z,', ' ', '  ║',),
        ...formatLine('║       ', 'Lowercase letters: a-z,', ' ', '  ║',),
        ...formatLine('║       ', 'Digits: 0-9,', ' ', '  ║',),
        ...formatLine('║       ', 'Hyphens and underscores: "-", "_"', ' ', '  ║',),
        ...formatLine('║     ', '}', ' ', '  ║',),
        ...formatLine('║   ', '}', ' ', '  ║',),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('║  ', '', '╌', '  ║',),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('║   ', `Email: ${account.current ? account.current.email : "Not registered"}. Rules:`, ' ', '  ║',),
        ...formatLine('║     ', 'Email validation relies on Zod\'s built-in .email() validator. Since confirmation codes are delivered via email, invalid addresses are naturally rejected during the registration process.', ' ', '  ║',),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('║  ', '', '╌', '  ║',),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('║   ', 'Password: ********. Rules: {', ' ', '  ║',),
        ...formatLine('║     ', 'Minimum length: 8,', ' ', '  ║',),
        ...formatLine('║     ', 'Maximum length: 120,', ' ', '  ║',),
        ...formatLine('║     ', 'Must include at least one of each: {', ' ', '  ║',),
        ...formatLine('║       ', 'Uppercase letters: A-Z,', ' ', '  ║',),
        ...formatLine('║       ', 'Lowercase letters: a-z,', ' ', '  ║',),
        ...formatLine('║       ', 'Digits: 0-9,', ' ', '  ║',),
        ...formatLine('║     ', '}', ' ', '  ║',),
        ...formatLine('║   ', '}', ' ', '  ║',),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('║  ', '', '╌', '  ║',),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('║   ', 'One important architectural decision is sharing the same Zod schema between the frontend and the backend. The frontend uses it to provide immediate feedback to the user, while the backend uses the exact same rules to reject invalid requests. This avoids duplicated validation logic and keeps frontend and backend validation consistent.', ' ', '  ║',),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('╠══', '', '═', '══╣'),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('║  ', 'Database structure', ' ', '  ║',),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('║   ', 'All account information is stored in the database - MongoDB. It has a complex system organized into multiple collections, each responsible for a specific task. Full descriptions of each collection and its functions are provided below.', ' ', '  ║'),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('║  ', '', '╌', '  ║',),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('║   ', 'accounts collection', ' ', '  ║'),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('║    ', 'Stores the core information needed to sign up, log in and identify account. Document structure is as follows:', ' ', '  ║'),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('║    ', '{', ' ', '  ║'),
        ...formatLine('║      ', '_id: An identification code generated by MongoDB,', ' ', '  ║'),
        ...formatLine('║      ', 'name: The username of the account,', ' ', '  ║'),
        ...formatLine('║      ', 'email: The email the account is connected to,', ' ', '  ║'),
        ...formatLine('║      ', 'passwordHash: The hash of the account password, more details below', ' ', '  ║'),
        ...formatLine('║    ', '}', ' ', '  ║'),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('║    ', 'Important to note - only the hash of the account password is stored. This is a safety measure - hashes are one-way functions, meaning the original password cannot be directly reversed from the stolen hash. However it can still be subjected to offline password-guessing attacks, which is why a slow password-hashing algorithm and a unique salt are important here.', ' ', '  ║'),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('║  ', '', '╌', '  ║',),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('║   ', 'pendings collection', ' ', '  ║'),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('║    ', 'Stores the information about a pending verification code to proceed in email verification. Document structure is as follows:', ' ', '  ║'),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('║    ', '{', ' ', '  ║'),
        ...formatLine('║      ', '_id: An identification code generated by MongoDB,', ' ', '  ║'),
        ...formatLine('║      ', 'email: The receiving email of the verification code,', ' ', '  ║'),
        ...formatLine('║      ', 'verificationCodeHash: The hash of the verification code, more details below,', ' ', '  ║'),
        ...formatLine('║      ', 'codeSentAt: The time the last code was sent at, more details below,', ' ', '  ║'),
        ...formatLine('║      ', 'attempts: Used to limit the number of attempts you have,', ' ', '  ║'),
        ...formatLine('║      ', 'createdAt: The time the first code was sent, more details below', ' ', '  ║'),
        ...formatLine('║    ', '}', ' ', '  ║'),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('║    ', 'verificationCodeHash works the same way as password hash - we can\'t directly save the code to the database because of safety concerns. However, the code has a lot less entropy being just a 6-digit number, so it is important that it has a short lifespan and limited attemps, unlike password, because it is easier to crack.', ' ', '  ║'),
        ...formatLine('║    ', 'codeSentAt is used to not let the user send codes more than once a minute to prevent burst spam attacks.', ' ', '  ║'),
        ...formatLine('║    ', 'createdAt lets MongoDB automatically delete documents older than 5 minutes to prevent account verification via expired codes.', ' ', '  ║'),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('║  ', '', '╌', '  ║',),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('║   ', 'trafficLimiting collection', ' ', '  ║'),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('║    ', 'Stores per-email limiting information for verification requests to limit them to 10 per 24 hours. Document structure is as follows:', ' ', '  ║'),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('║    ', '{', ' ', '  ║'),
        ...formatLine('║      ', '_id: An identification code generated by MongoDB,', ' ', '  ║'),
        ...formatLine('║      ', 'email: The receiving email of the verification codes,', ' ', '  ║'),
        ...formatLine('║      ', 'codesSent: Number of codes sent to this email, limited to 10,', ' ', '  ║'),
        ...formatLine('║      ', 'createdAt: Used to delete the document after 24 hours to refresh the 10 code limitation', ' ', '  ║'),
        ...formatLine('║    ', '}', ' ', '  ║'),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('║  ', '', '╌', '  ║',),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('║   ', 'refreshTokens collection', ' ', '  ║'),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('║    ', 'Stores the information about a refresh token. More details on tokens in "Access and refresh tokens" below. Document structure is as follows:', ' ', '  ║'),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('║    ', '{', ' ', '  ║'),
        ...formatLine('║      ', '_id: An identification code generated by MongoDB,', ' ', '  ║'),
        ...formatLine('║      ', 'jti: [J]SON Web [T]oken [I]D of the refresh token, more details in "Access and refresh tokens" below,', ' ', '  ║'),
        ...formatLine('║      ', 'expiresAt: Time when the token will expire and the document will be deleted', ' ', '  ║'),
        ...formatLine('║    ', '}', ' ', '  ║'),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('║  ', '', '╌', '  ║',),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('║   ', 'ipLimiting collection', ' ', '  ║'),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('║    ', 'Limits the number of codes you can send from a single IP address to 30/day reducing potential for automated email abuse.', ' ', '  ║'),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('║    ', '{', ' ', '  ║'),
        ...formatLine('║      ', '_id: An identification code generated by MongoDB,', ' ', '  ║'),
        ...formatLine('║      ', 'ip: The IP address of the user,', ' ', '  ║'),
        ...formatLine('║      ', 'createdAt: Used to delete the document after 24 hours to refresh the 30 codes limitation', ' ', '  ║'),
        ...formatLine('║    ', '}', ' ', '  ║'),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('║  ', '', '╌', '  ║',),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('║   ', 'ipBlacklist collection', ' ', '  ║'),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('║    ', 'Used for manual IP bans if we notice suspicious activity from an address.', ' ', '  ║'),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('║    ', '{', ' ', '  ║'),
        ...formatLine('║      ', '_id: An identification code generated by MongoDB,', ' ', '  ║'),
        ...formatLine('║      ', 'ip: The IP address of the user,', ' ', '  ║'),
        ...formatLine('║    ', '}', ' ', '  ║'),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('║  ', '', '╌', '  ║',),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('║   ', 'calculatorHistories collection', ' ', '  ║'),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('║    ', 'Stores the information about the calculator history of the account. Used in the "Retro Calculator" subproject. Document structure is as follows:', ' ', '  ║'),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('║    ', '{', ' ', '  ║'),
        ...formatLine('║      ', '_id: An identification code generated by MongoDB,', ' ', '  ║'),
        ...formatLine('║      ', 'userId: The unique _id of the account this history is connected to, more details below,', ' ', '  ║'),
        ...formatLine('║      ', 'history: The array of all the operations, the history itself', ' ', '  ║'),
        ...formatLine('║    ', '}', ' ', '  ║'),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('║    ', 'userId basically connects the two documents. There is an account and there is a calculator history that is connected to it by _id.', ' ', '  ║'),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('╠══', '', '═', '══╣'),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('║  ', 'Access and refresh tokens', ' ', '  ║',),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('║   ', 'My project implements a full access/refresh system. Let\'s split the explanation into 2 blocks.', ' ', '  ║'),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('║  ', '', '╌', '  ║',),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('║   ', 'Access', ' ', '  ║'),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('║    ', 'When you create a registration system every operation involving the database would require authentication. For example:', ' ', '  ║'),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('║    ', 'You need to input your username and password to log in.', ' ', '  ║'),
        ...formatLine('║    ', 'Then you need to enter them again to proceed to the subprojects hub so it displays your username and link availability.', ' ', '  ║'),
        ...formatLine('║    ', 'Then you need to enter them one more time to log into the Calculator.', ' ', '  ║'),
        ...formatLine('║    ', 'Now, to save each operation to history, your password and username are required AGAIN.', ' ', '  ║'),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('║    ', 'See how annoying that becomes? That\'s where the access token is used. It stores all the information required to identify and authenticate the user. The server verifies the token\'s signature and if the signature is valid and the token hasn\'t expired, the server trusts the information inside it without asking for the user\'s credentials again.', ' ', '  ║'),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('║  ', '', '╌', '  ║',),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('║   ', 'Refresh', ' ', '  ║'),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('║    ', 'Access tokens are convenient, but they shouldn\'t live forever. If an attacker somehow steals one, they could use it until it expires. To reduce that risk, access tokens in this project are only valid for 15 minutes. Of course, asking users to log in every 15 minutes would be terrible for usability. That\'s where the refresh system comes in.', ' ', '  ║'),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('║    ', 'The refresh token is stored in an HTTP-only cookie and in the database for 14 days. Whenever the application detects that the access token has expired, it sends a refresh request. The browser automatically includes the HTTP-only refresh cookie with that request. The server checks whether the refresh token is still valid, matches the one stored in the database, and hasn\'t expired. If everything is correct, it issues a brand new access token without asking the user to log in again.', ' ', '  ║'),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('║    ', 'If the refresh cookie expires or the refresh token becomes invalid, the user simply needs to authenticate again, which happens far less often than it would without this refresh system.', ' ', '  ║'),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('║    ', 'When an expired access token is replaced using a valid refresh token, refresh token rotation is performed. The previous refresh token immediately becomes invalid, a new refresh token is generated and stored in the database, and a new HTTP-only refresh cookie is sent to the browser. This means that every successful refresh replaces the previous token, reducing the amount of time a leaked refresh token remains useful.', ' ', '  ║'),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('╠══', '', '═', '══╣'),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('║  ', 'Conclusion', ' ', '  ║',),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('║   ', 'The registration system combines multiple independent mechanisms into a single authentication workflow:', ' ', '  ║'),
        ...formatLine('║     ', '◦ Input validation prevents invalid data from reaching the server', ' ', '  ║'),
        ...formatLine('║     ', '◦ Hashing protects sensitive information', ' ', '  ║'),
        ...formatLine('║     ', '◦ Verification codes confirm access to the provided email address', ' ', '  ║'),
        ...formatLine('║     ', '◦ Traffic limiting reduces resource abuse', ' ', '  ║'),
        ...formatLine('║     ', '◦ Access/refresh token system keeps users authenticated without compromising security', ' ', '  ║'),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('║   ', 'Although this project is intended as a portfolio application rather than a production service, I tried to implement the core ideas behind a modern authentication system instead of simplifying them.', ' ', '  ║'),
        ...formatLine('║  ', '', ' ', '  ║'),
        ...formatLine('╚══', '', '═', '══╝'),
    ];



    return (
        <div className={styles["container"]} ref={containerRef}>
            <div ref={scrollContentRef}>
                <div className={styles["scroll-placeholder"]} ref={scrollPlaceholderTopRef}>
                    <p className={styles["scroll-placeholder-p"]}>{String.raw` ____     ____   ___  ____   __   __    __      ____   __   _  _  __ _  _  _   __   ____  ____  ____     ____ `}</p>
                    <p className={styles["scroll-placeholder-p"]}>{String.raw` \  /    / ___) / __)(  _ \ /  \ (  )  (  )    (    \ /  \ / )( \(  ( \/ )( \ / _\ (  _ \(    \/ ___)    \  / `}</p>
                    <p className={styles["scroll-placeholder-p"]}>{String.raw`(‾  ‾)   \___ \( (__  )   /(  O )/ (_/\/ (_/\   ) D ((  O )\ /\ //    /\ /\ //    \ )   / ) D (\___ \   (‾  ‾)`}</p>
                    <p className={styles["scroll-placeholder-p"]}>{String.raw` \__/    (____/ \___)(__\_) \__/ \____/\____/  (____/ \__/ (_/\_)\_)__)(_/\_)\_/\_/(__\_)(____/(____/    \__/ `}</p>
                </div>

                <div className={styles["text-container"]} ref={textContainerRef}>
                    {
                        textContent.map((el, i) => {
                            return <p className={styles["p"]} key={i}>{(() => {
                                const buttonParts = [
                                    "┌─────────────┐",
                                    "│  Return to  │",
                                    "│ Subprojects │",
                                    "└─────────────┘"
                                ];

                                const currentButtonPart = buttonParts.find(buttonPart => el.includes(buttonPart));

                                if (!currentButtonPart) return el;

                                const parts = el.split(currentButtonPart);


                                return (
                                    <>
                                        {parts[0]}
                                        <span className={styles["return-button"]} onClick={unloadingAnimation}>{currentButtonPart}</span>
                                        {parts[1]}
                                    </>
                                )
                            })()}</p>
                        })
                    }
                </div>

                <div className={styles["scroll-placeholder"]} ref={scrollPlaceholderBottomRef}>
                    <p className={styles["scroll-placeholder-p"]}>{String.raw`  __      ____   ___  ____   __   __    __      _  _  ____  _  _   __   ____  ____  ____      __  `}</p>
                    <p className={styles["scroll-placeholder-p"]}>{String.raw` /  \    / ___) / __)(  _ \ /  \ (  )  (  )    / )( \(  _ \/ )( \ / _\ (  _ \(    \/ ___)    /  \ `}</p>
                    <p className={styles["scroll-placeholder-p"]}>{String.raw`(_  _)   \___ \( (__  )   /(  O )/ (_/\/ (_/\  ) \/ ( ) __/\ /\ //    \ )   / ) D (\___ \   (_  _)`}</p>
                    <p className={styles["scroll-placeholder-p"]}>{String.raw` /__\    (____/ \___)(__\_) \__/ \____/\____/  \____/(__)  (_/\_)\_/\_/(__\_)(____/(____/    /__\ `}</p>
                </div>

                <div ref={staticLayerContainerRef}>
                    <StaticLayer opacity={0.6} windowWidth={windowWidth} windowHeight={windowHeight} />
                </div>
            </div>
        </div>
    )
}


export default RegInfoPage;