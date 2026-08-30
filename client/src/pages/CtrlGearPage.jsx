import { useEffect, useLayoutEffect, forwardRef, useImperativeHandle, useState, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { useNavigate } from "react-router-dom";


import GearSprite from "./../assets/CtrlGearPage/GearSprite.svg?react";
import PlayIcon from "./../assets/CtrlGearPage/PlayIcon.svg?react";
import PauseIcon from "./../assets/CtrlGearPage/PauseIcon.svg?react";
import ReverseIcon from "./../assets/CtrlGearPage/ReverseIcon.svg?react";
import RestartIcon from "./../assets/CtrlGearPage/RestartIcon.svg?react";

import styles from "./CtrlGearPage.module.scss";

import { useScale } from "./../utils/useScale.js";



gsap.registerPlugin(SplitText);





const CtrlGearPage = () => {

    /*███████████████ DECLARATION ████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████*/

    const { scale, s } = useScale();

    const gearSpriteWidth = s(100);





    const containerRef = useRef(null);
    const innerContainerRef = useRef(null);

    const gearSpriteRef = useRef(null);
    const trackContainerRef = useRef(null);

    const reverseButtonRef = useRef(null);
    const pauseButtonRef = useRef(null);
    const restartButtonRef = useRef(null);
    const returnButtonContainerRef = useRef(null);
    const returnButtonRef = useRef(null);

    const reverseIconRef = useRef(null);
    const pauseIconRef = useRef(null);
    const playIconRef = useRef(null);
    const restartIconRef = useRef(null);


    const reverseButtonContainerRef = useRef(null);
    const pauseButtonContainerRef = useRef(null);
    const restartButtonContainerRef = useRef(null);


    const contentWindowBgRef = useRef(null);

    const trackRef = useRef(null);


    const headerRef = useRef(null);
    const headerSplitTextRef = useRef(null);
    const returnButtonPRef = useRef(null);
    const returnButtonPSplitTextRef = useRef(null);



    const gearTl = useRef(null);

    const reverseGearActive = useRef(1);
    const pauseGearActive = useRef(1);
    const restartGearActive = useRef(1);

    const reverseDownAnimPlaying = useRef(0);
    const pauseDownAnimPlaying = useRef(0);
    const restartDownAnimPlaying = useRef(0);

    const returnLeaveAnimActive = useRef(1);



    const navigate = useNavigate();





    /*███████████████ FUNCTIONS ██████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████*/

    const reverseGear = () => {
        if (!reverseGearActive.current) return;
        reverseGearActive.current = 0;


        const tl = gsap.timeline({ onComplete: () => reverseGearActive.current = 1 });

        tl
            .to(reverseIconRef.current, { rotation: "+=180", duration: 0.4, ease: "power1.inOut" }, "0")
            .to(reverseButtonContainerRef.current, { height: "100%", duration: 0.2, ease: "power3.in" }, "<");


        const wasPaused = gearTl.current.paused();

        gearTl.current.reversed(!gearTl.current.reversed());

        if (wasPaused) gearTl.current.pause();
    }

    const pauseGear = () => {
        if (!pauseGearActive.current) return;
        pauseGearActive.current = 0;


        const wasPaused = gearTl.current.paused();


        const tl = gsap.timeline({ onComplete: () => pauseGearActive.current = 1 });

        if (wasPaused) {
            gearTl.current.resume();

            tl
                .to(playIconRef.current, { rotation: "+=720", duration: 0.4, ease: "power2.in" }, "0")
                .to(playIconRef.current, { opacity: 0, duration: 0.3, ease: "power2.in" }, "<+0.1")
                
                .to(pauseIconRef.current, { rotation: "+=720", duration: 0.4, ease: "power2.out" }, "0")
                .to(pauseIconRef.current, { opacity: 1, duration: 0.3, ease: "power2.out" }, "<+0.1")

                .to(pauseButtonContainerRef.current, { height: "100%", duration: 0.2, ease: "power3.in" }, "0");
        } else {
            gearTl.current.pause();

            tl
                .to(pauseIconRef.current, { rotation: "+=720", duration: 0.4, ease: "power2.in" }, "0")
                .to(pauseIconRef.current, { opacity: 0, duration: 0.3, ease: "power2.in" }, "<+0.1")
                
                .to(playIconRef.current, { rotation: "+=720", duration: 0.4, ease: "power2.out" }, "0")
                .to(playIconRef.current, { opacity: 1, duration: 0.3, ease: "power2.out" }, "<+0.1")

                .to(pauseButtonContainerRef.current, { height: "100%", duration: 0.2, ease: "power3.in" }, "0");
        }
    }

    const restartGear = () => {
        if (!restartGearActive.current) return;
        restartGearActive.current = 0;


        const tl = gsap.timeline({ onComplete: () => restartGearActive.current = 1 });

        tl
            .to(restartIconRef.current, { rotation: "+=360", duration: 0.4, ease: "power1.inOut" }, "0")
            .to(restartButtonContainerRef.current, { height: "100%", duration: 0.2, ease: "power3.in" }, "<");


        const wasPaused = gearTl.current.paused();
        const wasReversed = gearTl.current.reversed();

        gearTl.current.restart();

        if (wasReversed) gearTl.current.reverse();
        if (wasPaused) gearTl.current.pause();
    }





    const reverseEnterAnim = () => {
        gsap.to(reverseButtonContainerRef.current, {
            flexGrow: 2.5, duration: 0.4, ease: "power1.out"
        });

        gsap.to(reverseButtonRef.current, {
            background: `linear-gradient(105deg, ${styles.cyanNormal}, ${styles.cyanNormal})`, duration: 0.4, ease: "power1.out"
        });

        gsap.to(pauseButtonRef.current, {
            background: `linear-gradient(105deg, ${styles.cyanNormal}, ${styles.transitionNormal}, ${styles.redTransition})`, duration: 0.4, ease: "power1.out"
        });
    }

    const reverseDownAnim = () => {
        if (reverseDownAnimPlaying.current) return;
        reverseDownAnimPlaying.current = 1;

        const tl = gsap.timeline({ onComplete: () => reverseDownAnimPlaying.current = 0 })

        tl.to(reverseButtonContainerRef.current, { height: "110%", duration: 0.2, ease: "power2.out" });
    }

    const reverseLeaveAnim = () => {
        gsap.to(reverseButtonContainerRef.current, {
            flexGrow: 2, duration: 0.4, ease: "power1.out"
        });

        gsap.to(reverseButtonRef.current, {
            background: `linear-gradient(105deg, ${styles.cyanNormal}, ${styles.cyanTransition})`, duration: 0.4, ease: "power1.out"
        });

        gsap.to(pauseButtonRef.current, {
            background: `linear-gradient(105deg, ${styles.cyanTransition}, ${styles.transitionNormal}, ${styles.redTransition})`, duration: 0.4, ease: "power1.out"
        });
    }



    const pauseEnterAnim = () => {
        gsap.to(pauseButtonContainerRef.current, {
            flexGrow: 5, duration: 0.4, ease: "power1.out"
        })

        gsap.to(pauseButtonRef.current, {
            background: `linear-gradient(105deg, ${styles.transitionNormal}, ${styles.transitionNormal}, ${styles.transitionNormal})`, duration: 0.4, ease: "power1.out"
        });

        gsap.to(reverseButtonRef.current, {
            background: `linear-gradient(105deg, ${styles.cyanNormal}, ${styles.transitionNormal})`, duration: 0.4, ease: "power1.out"
        });

        gsap.to(restartButtonRef.current, {
            background: `linear-gradient(105deg, ${styles.transitionNormal}, ${styles.redNormal})`, duration: 0.4, ease: "power1.out"
        });
    }

    const pauseDownAnim = () => {
        if (pauseDownAnimPlaying.current) return;
        pauseDownAnimPlaying.current = 1;

        const tl = gsap.timeline({ onComplete: () => pauseDownAnimPlaying.current = 0 })

        tl.to(pauseButtonContainerRef.current, { height: "110%", duration: 0.2, ease: "power2.out" });
    }

    const pauseLeaveAnim = () => {
        gsap.to(pauseButtonContainerRef.current, {
            flexGrow: 4, duration: 0.4, ease: "power1.out"
        })

        gsap.to(pauseButtonRef.current, {
            background: `linear-gradient(105deg, ${styles.cyanTransition}, ${styles.transitionNormal}, ${styles.redTransition})`, duration: 0.4, ease: "power1.out"
        });

        gsap.to(reverseButtonRef.current, {
            background: `linear-gradient(105deg, ${styles.cyanNormal}, ${styles.cyanTransition})`, duration: 0.4, ease: "power1.out"
        });

        gsap.to(restartButtonRef.current, {
            background: `linear-gradient(105deg, ${styles.redTransition}, ${styles.redNormal})`, duration: 0.4, ease: "power1.out"
        });
    }



    const restartEnterAnim = () => {
        gsap.to(restartButtonContainerRef.current, {
            flexGrow: 2.5, duration: 0.4, ease: "power1.out"
        })

        gsap.to(restartButtonRef.current, {
            background: `linear-gradient(105deg, ${styles.redNormal}, ${styles.redNormal})`, duration: 0.4, ease: "power1.out"
        });

        gsap.to(pauseButtonRef.current, {
            background: `linear-gradient(105deg, ${styles.cyanTransition}, ${styles.transitionNormal}, ${styles.redNormal})`, duration: 0.4, ease: "power1.out"
        });
    }

    const restartDownAnim = () => {
        if (restartDownAnimPlaying.current) return;
        restartDownAnimPlaying.current = 1;

        const tl = gsap.timeline({ onComplete: () => restartDownAnimPlaying.current = 0 })

        tl.to(restartButtonContainerRef.current, { height: "110%", duration: 0.2, ease: "power2.out" });
    }

    const restartLeaveAnim = () => {
        gsap.to(restartButtonContainerRef.current, {
            flexGrow: 2, duration: 0.4, ease: "power1.out"
        });

        gsap.to(restartButtonRef.current, {
            background: `linear-gradient(105deg, ${styles.redTransition}, ${styles.redNormal})`, duration: 0.4, ease: "power1.out"
        });

        gsap.to(pauseButtonRef.current, {
            background: `linear-gradient(105deg, ${styles.cyanTransition}, ${styles.transitionNormal}, ${styles.redTransition})`, duration: 0.4, ease: "power1.out"
        });
    }



    const returnButtonEnterAnim = () => {
        const enterTl = gsap.timeline();

        enterTl
            .to(returnButtonContainerRef.current, { width: s(120), duration: 0.4, ease: "power1.out" }, "0")
            .to(returnButtonRef.current, { background: `linear-gradient(105deg, ${styles.redNormal}, ${styles.redNormal})`, duration: 0.4, ease: "power1.out" }, "<");
    }

    const returnButtonLeaveAnim = () => {
        if (!returnLeaveAnimActive.current) return;

        const leaveTl = gsap.timeline();

        leaveTl
            .to(returnButtonContainerRef.current, { width: s(105), duration: 0.4, ease: "power1.out" }, "0")
            .to(returnButtonRef.current, { background: `linear-gradient(105deg, ${styles.redTransition}, ${styles.redNormal})`, duration: 0.4, ease: "power1.out" }, "<")
    }



    const returnFunction = () => {
        returnLeaveAnimActive.current = 0;

        if (!gearTl.current.paused()) {
            pauseGearActive.current = 1;
            pauseGear();
        }


        const gearMoveLength = trackContainerRef.current.offsetWidth - gearSpriteWidth;

        const currentGearX = gsap.getProperty(gearSpriteRef.current, "x");
        const targetGearX = gearMoveLength / 2;
        const deltaGearX = targetGearX - currentGearX;
        const deltaGearRotation = deltaGearX * 360 / (gearSpriteWidth * Math.PI);

        
        const tl = gsap.timeline({ onComplete: () => navigate("/") });


        tl
            .set(innerContainerRef.current, { pointerEvents: "none" }, "0")

            .set(reverseButtonRef.current, { width: reverseButtonRef.current.offsetWidth, height: reverseButtonRef.current.offsetHeight })
            .set(restartButtonRef.current, { width: restartButtonRef.current.offsetWidth, height: restartButtonRef.current.offsetHeight })
            .set(pauseButtonRef.current, { width: pauseButtonRef.current.offsetWidth, height: pauseButtonRef.current.offsetHeight })



            .to(returnButtonPSplitTextRef.current.chars, { x: s(-100), opacity: 0, ease: "power2.in", stagger: 0.03 }, "<")
            .to(headerSplitTextRef.current.chars, { scaleY: 0, transformOrigin: "bottom", opacity: 0, duration: 0.04, ease: "power2.in", stagger: 0.025 }, "<+0.1")


            .to(playIconRef.current, { rotation: -180, opacity: 0, duration: 0.4, ease: "power1.out" }, "0")
            .to(reverseIconRef.current, { rotation: 720, opacity: 0, duration: 0.4, ease: "power1.out"}, "<+0.2")
            .to(restartIconRef.current, { rotation: -360, opacity: 0, duration: 0.4, ease: "power1.out" }, "<")

            
            .to(containerRef.current, {
                backgroundColor: "rgb(60, 60, 60)", duration: 0.4, ease: "power2.in"
            }, "<+0.2")

            .to(reverseButtonRef.current, {
                background: `linear-gradient(105deg, ${styles.transitionNormal}, ${styles.transitionNormal})`, duration: 0.4, ease: "power2.in"
            }, "<")
            .to(pauseButtonRef.current, {
                background: `linear-gradient(105deg, ${styles.transitionNormal}, ${styles.transitionNormal}, ${styles.transitionNormal})`, duration: 0.4, ease: "power2.in"
            }, "<")
            .to(restartButtonRef.current, {
                background: `linear-gradient(105deg, ${styles.transitionNormal}, ${styles.transitionNormal})`, duration: 0.4, ease: "power2.in"
            }, "<")
            .to(returnButtonRef.current, {
                background: `linear-gradient(105deg, ${styles.transitionNormal}, ${styles.transitionNormal})`, duration: 0.4, ease: "power2.in"
            }, "<")

        
            .to(contentWindowBgRef.current, {
                background: `linear-gradient(105deg, ${styles.transitionNormal}, ${styles.transitionNormal}, ${styles.transitionNormal})`, duration: 0.4, ease: "power2.in"
            }, "<")

            .to(trackRef.current, {
                background: `linear-gradient(105deg, ${styles.transitionDark}, ${styles.transitionDark}, ${styles.transitionDark})`, duration: 0.4, ease: "power2.in"
            }, "<")



            .to(containerRef.current, {
                backgroundColor: "rgb(0, 0, 0)", duration: 0.6, ease: "power2.out"
            }, ">")

            .to(reverseButtonRef.current, {
                background: `linear-gradient(105deg, ${styles.cyanNormal}, ${styles.cyanNormalA025})`, duration: 0.6, ease: "power2.out"
            }, "<")
            .to(pauseButtonRef.current, {
                background: `linear-gradient(105deg, ${styles.cyanNormalA025}, ${styles.transitionNormalA0}, ${styles.redNormalA025})`, duration: 0.6, ease: "power2.out"
            }, "<")
            .to(restartButtonRef.current, {
                background: `linear-gradient(105deg, ${styles.redNormalA025}, ${styles.redNormal})`, duration: 0.6, ease: "power2.out"
            }, "<")
            .to(returnButtonRef.current, {
                background: `linear-gradient(105deg, ${styles.redNormalA025}, ${styles.redNormal})`, duration: 0.6, ease: "power2.out"
            }, "<")

        
            .to(contentWindowBgRef.current, {
                background: `linear-gradient(105deg, ${styles.cyanNormal}, ${styles.transitionNormalA0}, ${styles.redNormal})`, duration: 0.6, ease: "power2.out"
            }, "<")

            .to(trackRef.current, {
                background: `linear-gradient(105deg, ${styles.cyanDark}, ${styles.transitionDarkA0}, ${styles.redDark})`, duration: 0.6, ease: "power2.out"
            }, "<")



            .addLabel("disappearanceAnimStart", ">-0.4")


            .to(gearSpriteRef.current, {
                x: targetGearX, rotation: `+=${deltaGearRotation}`, opacity: 0, color: styles.transitionNormal, duration: 2, ease: "power2.in" 
            }, "disappearanceAnimStart")

            .to(trackRef.current, { width: s(10), duration: 2, ease: "power2.in" }, "<")
            .to(trackRef.current, { opacity: 0, duration: 2, ease: "power1.out" }, "<")

            .to(contentWindowBgRef.current, {
                background: `linear-gradient(105deg, ${styles.cyanNormalA0}, ${styles.transitionNormalA0}, ${styles.redNormalA0})`, duration: 0.8, ease: "power2.in"
            }, "<")

            .to(returnButtonRef.current, { opacity: 0, duration: 0.5, ease: "power2.in" }, "<+0.2")
            .to(returnButtonRef.current, { width: s(35), duration: 0.4, ease: "power2.inOut" }, "<+0.1")

            .to(reverseButtonRef.current, { width: s(50), duration: 0.4, ease: "power1.inOut" }, "disappearanceAnimStart+=0.4")
            .to(reverseButtonRef.current, { height: s(50), opacity: 0, duration: 0.4, ease: "power2.inOut" }, ">-0.1")

            .to(restartButtonRef.current, { width: s(50), duration: 0.4, ease: "power1.inOut" }, "disappearanceAnimStart+=0.4")
            .to(restartButtonRef.current, { height: s(50), opacity: 0, duration: 0.4, ease: "power2.inOut" }, ">-0.1")

            .to(pauseButtonRef.current, { width: s(50), duration: 0.4, ease: "power1.inOut" }, "disappearanceAnimStart+=0.6")
            .to(pauseButtonRef.current, { height: s(50), opacity: 0, duration: 0.4, ease: "power2.inOut" }, ">-0.1")
    }





    /*███████████████ EFFECTS ████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████*/

    useLayoutEffect(() => {
        gsap.set(containerRef.current, { backgroundColor: "rgb(0, 0, 0)" });
        gsap.set(innerContainerRef.current, { opacity: 0, pointerEvents: "none" });
    }, []);



    useEffect(() => {
        document.fonts.ready.then(() => {
            const tl = gsap.timeline({ onComplete: () => {
                gsap.set(innerContainerRef.current, { pointerEvents: "auto" });
            } });

            const gearMoveLength = trackContainerRef.current.offsetWidth - gearSpriteWidth;


            headerSplitTextRef.current = SplitText.create(headerRef.current, { type: "chars" });
            returnButtonPSplitTextRef.current = SplitText.create(returnButtonPRef.current, { type: "chars" });



            tl
                .set(innerContainerRef.current, { opacity: 1 })

                .set(reverseButtonRef.current, {
                    width: s(50), height: s(50), opacity: 0, background: `linear-gradient(105deg, ${styles.cyanNormal}, ${styles.cyanNormalA025})`
                }, "0")
                .set(pauseButtonRef.current, {
                    width: s(50), height: s(50), opacity: 0, background: `linear-gradient(105deg, ${styles.cyanNormalA025}, ${styles.transitionNormalA0}, ${styles.redNormalA025})`
                }, "<")
                .set(restartButtonRef.current, {
                    width: s(50), height: s(50), opacity: 0, background: `linear-gradient(105deg, ${styles.redNormalA025}, ${styles.redNormal})`
                }, "<")
                .set(returnButtonRef.current, {
                    width: s(35), opacity: 0, background: `linear-gradient(105deg, ${styles.redNormalA025}, ${styles.redNormal})`
                })

            
                .set(contentWindowBgRef.current, { background: `linear-gradient(105deg, ${styles.cyanNormalA0}, ${styles.transitionNormalA0}, ${styles.redNormalA0})` }, "<")

                .set(gearSpriteRef.current, { x: gearMoveLength / 2, rotation: gearMoveLength * 180 / (gearSpriteWidth * Math.PI), opacity: 0, color: styles.transitionNormal }, "<")

                .set(trackRef.current, { width: s(10), opacity: 0, background: `linear-gradient(105deg, ${styles.cyanDark}, ${styles.transitionDarkA0}, ${styles.redDark})` }, "<")


                .set(reverseIconRef.current, { rotation: -180, opacity: 0 }, "<")
                .set(playIconRef.current, { rotation: 720, opacity: 0 }, "<")
                .set(restartIconRef.current, { rotation: -360, opacity: 0 }, "<")


                .set(headerSplitTextRef.current.chars, { scaleY: 0, transformOrigin: "bottom", opacity: 0 })
                .set(returnButtonPSplitTextRef.current.chars, { x: s(-100), opacity: 0 })




                .to(gearSpriteRef.current, { x: 0, rotation: 0, color: styles.cyanNormal, duration: 2, ease: "power2.out" }, "0.4")
                .to(gearSpriteRef.current, { opacity: 1, duration: 2, ease: "power1.in" }, "<")

                .to(trackRef.current, { width: "100%", duration: 2, ease: "power2.out" }, "<")
                .to(trackRef.current, { opacity: 1, duration: 2, ease: "power1.in" }, "<")



                .addLabel("buttonsAnimStart", ">-1.75")



                .to(pauseButtonRef.current, { opacity: 1, duration: 0.5, ease: "power2.in" }, "buttonsAnimStart")
                .to(pauseButtonRef.current, { height: "100%", duration: 0.4, ease: "power1.inOut" }, "<+0.1")
                .to(pauseButtonRef.current, { width: "100%", duration: 0.4, ease: "power2.inOut" }, ">-0.1")

                .to(reverseButtonRef.current, { opacity: 1, duration: 0.5, ease: "power2.in" }, "buttonsAnimStart+=0.2")
                .to(reverseButtonRef.current, { height: "100%", duration: 0.4, ease: "power1.inOut" }, "<+0.1")
                .to(reverseButtonRef.current, { width: "100%", duration: 0.4, ease: "power2.inOut" }, ">-0.1")

                .to(restartButtonRef.current, { opacity: 1, duration: 0.5, ease: "power2.in" }, "buttonsAnimStart+=0.2")
                .to(restartButtonRef.current, { height: "100%", duration: 0.4, ease: "power1.inOut" }, "<+0.1")
                .to(restartButtonRef.current, { width: "100%", duration: 0.4, ease: "power2.inOut" }, ">-0.1")

                .to(returnButtonRef.current, { opacity: 1, duration: 0.5, ease: "power2.in" }, "buttonsAnimStart+=0.6")
                .to(returnButtonRef.current, { width: "100%", duration: 0.4, ease: "power2.inOut" }, "<+0.1")

                .to(contentWindowBgRef.current, {
                    background: `linear-gradient(105deg, ${styles.cyanNormal}, ${styles.transitionNormalA0}, ${styles.redNormal})`, duration: 0.8, ease: "power2.in"
                }, "buttonsAnimStart+=0.8")



                .addLabel("flashStart", ">")



                .to(containerRef.current, {
                    backgroundColor: "rgb(60, 60, 60)", duration: 0.4, ease: "power2.in"
                }, "flashStart")

                .to(reverseButtonRef.current, {
                    background: `linear-gradient(105deg, ${styles.transitionNormal}, ${styles.transitionNormal})`, duration: 0.4, ease: "power2.in"
                }, "<")
                .to(pauseButtonRef.current, {
                    background: `linear-gradient(105deg, ${styles.transitionNormal}, ${styles.transitionNormal}, ${styles.transitionNormal})`, duration: 0.4, ease: "power2.in"
                }, "<")
                .to(restartButtonRef.current, {
                    background: `linear-gradient(105deg, ${styles.transitionNormal}, ${styles.transitionNormal})`, duration: 0.4, ease: "power2.in"
                }, "<")
                .to(returnButtonRef.current, {
                    background: `linear-gradient(105deg, ${styles.transitionNormal}, ${styles.transitionNormal})`, duration: 0.4, ease: "power2.in"
                }, "<")

            
                .to(contentWindowBgRef.current, {
                    background: `linear-gradient(105deg, ${styles.transitionNormal}, ${styles.transitionNormal}, ${styles.transitionNormal})`, duration: 0.4, ease: "power2.in"
                }, "<")

                .to(trackRef.current, {
                    background: `linear-gradient(105deg, ${styles.transitionDark}, ${styles.transitionDark}, ${styles.transitionDark})`, duration: 0.4, ease: "power2.in"
                }, "<")



                .to(containerRef.current, {
                    backgroundColor: styles.mainNormal, duration: 0.6, ease: "power2.out"
                }, ">")

                .to(reverseButtonRef.current, {
                    background: `linear-gradient(105deg, ${styles.cyanNormal}, ${styles.cyanTransition})`, duration: 0.6, ease: "power2.out"
                }, "<")
                .to(pauseButtonRef.current, {
                    background: `linear-gradient(105deg, ${styles.cyanTransition}, ${styles.transitionNormal}, ${styles.redTransition})`, duration: 0.6, ease: "power2.out"
                }, "<")
                .to(restartButtonRef.current, {
                    background: `linear-gradient(105deg, ${styles.redTransition}, ${styles.redNormal})`, duration: 0.6, ease: "power2.out"
                }, "<")
                .to(returnButtonRef.current, {
                    background: `linear-gradient(105deg, ${styles.redTransition}, ${styles.redNormal})`, duration: 0.6, ease: "power2.out"
                }, "<")

            
                .to(contentWindowBgRef.current, {
                    background: `linear-gradient(105deg, ${styles.cyanNormal}, ${styles.transitionNormal}, ${styles.redNormal})`, duration: 0.6, ease: "power2.out"
                }, "<")

                .to(trackRef.current, {
                    background: `linear-gradient(105deg, ${styles.cyanDark}, ${styles.transitionDark}, ${styles.redDark})`, duration: 0.6, ease: "power2.out"
                }, "<")



                .addLabel("finishingStart", ">-0.4")



                .to(playIconRef.current, { rotation: 0, opacity: 1, duration: 0.4, ease: "power1.out" }, "finishingStart")
                .to(reverseIconRef.current, { rotation: 0, opacity: 1, duration: 0.4, ease: "power1.out"}, "<+0.2")
                .to(restartIconRef.current, { rotation: 0, opacity: 1, duration: 0.4, ease: "power1.out" }, "<")


                .to(headerSplitTextRef.current.chars, { scaleY: 1, opacity: 1, duration: 0.4, ease: "power2.out", stagger: 0.025 }, "finishingStart")
                .to([...returnButtonPSplitTextRef.current.chars].reverse(), { x: 0, opacity: 1, duration: 0.6, ease: "power2.out", stagger: 0.03 }, "<+0.1");
        });
    }, []);



    useEffect(() => {
        const gearMoveLength = trackContainerRef.current.offsetWidth - gearSpriteWidth;
        const wasPaused = gearTl.current ? gearTl.current.paused() : 1;
        const wasReversed = gearTl.current ? gearTl.current.reversed() : 0;
        const lastProgress = gearTl.current ? gearTl.current.progress() : 0;


        gearTl.current?.revert();
        gearTl.current = gsap.timeline({ paused: 1, yoyo: 1 });

        gearTl.current
            .to(gearSpriteRef.current, {
                x: gearMoveLength, rotation: gearMoveLength * 360 / (gearSpriteWidth * Math.PI), duration: 4, ease: "none"
            }, "0")

            .to(gearSpriteRef.current, { color: styles.transitionNormal, duration: 2, ease: "none" }, "0")
            .to(gearSpriteRef.current, { color: styles.redNormal, duration: 2, ease: "none" }, ">");

        if (lastProgress) gearTl.current.progress(lastProgress);
        if (wasReversed) gearTl.current.reverse().pause();
        if (!wasPaused) gearTl.current.resume();
    }, [scale]);





    /*███████████████ RETURN █████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████*/

    return (
        <div className={styles["container"]} ref={containerRef}>
            <div className={styles["inner-container"]} ref={innerContainerRef}>
                <div className={styles["content-window"]}>
                    <div className={styles["content-window-bg"]} ref={contentWindowBgRef} />
                        
                        
                    <div className={styles["header-container"]}>
                        <p className={styles["header"]} ref={headerRef}>CONTROLLABLE GEAR</p>

                        <div className={styles["return-button-container"]} ref={returnButtonContainerRef}>
                            <div
                                className={styles["return-button"]} ref={returnButtonRef} onClick={returnFunction}
                                onMouseEnter={returnButtonEnterAnim} onMouseLeave={returnButtonLeaveAnim}
                            >
                                <p className={styles["return-button-p"]} ref={returnButtonPRef}>RETURN</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles["slider-container"]}>
                        <div className={styles["track-container"]} ref={trackContainerRef}>
                            <div className={styles["track-inner-container"]}>
                                <div className={styles["track"]} ref={trackRef} />
                            </div>

                            <GearSprite className={styles["gear-sprite"]} ref={gearSpriteRef} />
                        </div>
                    </div>

                    <div className={styles["buttons-container"]}>
                        <div className={styles["buttons-inner-container"]}>
                            <div className={styles["button-container"]} ref={reverseButtonContainerRef}>
                                <div
                                    className={styles["reverse-button"]} ref={reverseButtonRef} onClick={reverseGear}
                                    onMouseEnter={reverseEnterAnim} onMouseDown={reverseDownAnim} onMouseLeave={reverseLeaveAnim}
                                >
                                    <ReverseIcon className={styles["button-icon"]} ref={reverseIconRef} />
                                </div>
                            </div>

                            <div className={styles["button-container-big"]} ref={pauseButtonContainerRef}>
                                <div
                                    className={styles["pause-button"]} ref={pauseButtonRef} onClick={pauseGear}
                                    onMouseEnter={pauseEnterAnim} onMouseDown={pauseDownAnim} onMouseLeave={pauseLeaveAnim}
                                >
                                    <PlayIcon className={styles["button-icon-small"]} ref={playIconRef} />
                                    <PauseIcon className={styles["button-icon-small-invisible"]} ref={pauseIconRef} />
                                </div>
                            </div>

                            <div className={styles["button-container"]} ref={restartButtonContainerRef}>
                                <div
                                    className={styles["restart-button"]} ref={restartButtonRef} onClick={restartGear}
                                    onMouseEnter={restartEnterAnim} onMouseDown={restartDownAnim} onMouseLeave={restartLeaveAnim}
                                >
                                    <RestartIcon className={styles["button-icon"]} ref={restartIconRef} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}





export default CtrlGearPage;