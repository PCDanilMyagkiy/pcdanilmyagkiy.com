import { useEffect, useLayoutEffect, useMemo, forwardRef, useImperativeHandle, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

import DMAlogoV2 from "./../assets/DMAlogoV2.svg?react";

import styles from "./SwitchPage.module.scss";

import { useScale } from "./../utils/useScale.js";



gsap.registerPlugin(SplitText);





const SwitchPage = () => {

    /*███████████████ DECLARATION ████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████*/

    const { scale, s } = useScale();

    const switchHeight = s(60);
    const switchMargin = s(15);

    const startAnimationDelay = 400;





    const startAnimationStarted = useRef(0);
    const startOrEndAnimationInProcess = useRef(1);
    const switchAnimationActivity = useRef(0);

    const switchEnterAnimationPending = useRef(0);



    const switchRef = useRef(null);
    const switchThumbRef = useRef(null);

    const containerRef = useRef(null);

    const DMAlogoRef = useRef(null);
    const headerRef = useRef(null);

    const returnButtonContainerRef = useRef(null);
    const returnButtonRef = useRef(null);
    const returnButtonTextRef = useRef(null);

    const waveElementsRef = useRef([]);

    const headerSplitTextRef = useRef(null);
    const returnButtonSplitTextRef = useRef(null);



    const [switchAnimationActivityState, setSwitchAnimationActivityState] = useState(0);

    const [startAnimationReady, setStartAnimationReady] = useState(0);



    const navigate = useNavigate();



    /*███████████████ FUNCTIONS ██████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████*/

    const halfWaveElementsAmount = useMemo(() => {
        const halfScreenWidth = window.innerWidth / 2;
        const fullSwitchSize = switchHeight + switchMargin;

        return Math.round(halfScreenWidth / fullSwitchSize - 1);
    }, [scale]);



    const makeHalfWaveElements = (side) => {
        if (!side) waveElementsRef.current = [];

        const halfWaveElements = Array.from({ length: halfWaveElementsAmount }).map((el, i) => <div className={styles["wave-element"]} key={`${side}-${i}`} ref={(el) => {
            if (el) {
                if (!side) waveElementsRef.current[halfWaveElementsAmount - 1 - i] = el
                else waveElementsRef.current[i + halfWaveElementsAmount] = el;
            }
        }} /> );

        if (halfWaveElements.length && startAnimationReady !== 1) setStartAnimationReady(1);

        return halfWaveElements;
    }



    const navigateMain = () => {
        navigate("/")
    }



    const switchEnterAnimation = () => {
        if (switchAnimationActivity.current) {
            gsap.to(switchRef.current, { backgroundColor: styles.magentaLight, duration: 0.25, ease: "power1.inOut" });
        } else switchEnterAnimationPending.current = 1

        if (!startOrEndAnimationInProcess.current) {
            gsap.to(switchRef.current, { height: "calc(100% + 2px)", duration: 0.25, ease: "power1.inOut" });
        }
    }



    const switchLeaveAnimation = () => {
        if (switchAnimationActivity.current) gsap.to(switchRef.current, { backgroundColor: styles.magentaNormal, duration: 0.25, ease: "power1.inOut" });

        gsap.to(switchRef.current, { height: "100%", duration: 0.25, ease: "power1.inOut" });

        switchEnterAnimationPending.current = 0;
    }



    const switchAnimation = () => {
        if (!switchAnimationActivity.current) return;
        switchAnimationActivity.current = 0;
        setSwitchAnimationActivityState(0);


        const waveElements1 = [...waveElementsRef.current].splice(Math.trunc(waveElementsRef.current.length / 2));
        const waveElements2 = [...waveElementsRef.current].splice(0, Math.trunc(waveElementsRef.current.length / 2));
        const waveElementsArranged = [...waveElements1, ...waveElements2];


        const tl = gsap.timeline({ onComplete: () => {switchAnimationActivity.current = 1; setSwitchAnimationActivityState(1)} });
        

        tl
            .to(switchThumbRef.current, { x: switchHeight, duration: 0.4, ease: "power1.inOut" }, "0")

            .to(switchRef.current, { backgroundColor: styles.transitionColor, boxShadow: `0 0 ${s(20)}px ${styles.transitionColor}`, duration: 0.4, ease: "power1.in" }, "<")
            .to(switchRef.current, { backgroundColor: styles.greenNormal, boxShadow: `0 0 ${s(20)}px ${styles.greenNormalA0}`, duration: 0.4, ease: "power1.in" }, ">")


            .to(waveElementsArranged, {
                height: "500%", aspectRatio: "1 / 5", backgroundColor: styles.transitionColor, boxShadow: `0 0 ${s(20)}px ${styles.transitionColor}`, duration: 0.4, ease: "power2.in", stagger: 0.1
            }, "<-0.2")

            .to(waveElementsArranged, {
                height: "100%", aspectRatio: "1 / 1", backgroundColor: styles.greenNormal, boxShadow: `0 0 ${s(20)}px ${styles.greenNormalA0}`, duration: 0.4, ease: "power2.out", stagger: 0.1
            }, "<+0.45")


            .to(switchThumbRef.current, { x: 0, duration: 0.4, ease: "power1.inOut" }, ">-0.7")

            .to(switchRef.current, { backgroundColor: styles.transitionColor, boxShadow: `0 0 ${s(20)}px ${styles.transitionColor}`, duration: 0.4, ease: "power1.in" }, "<")
            .to(switchRef.current, { backgroundColor: styles.magentaNormal, boxShadow: `0 0 ${s(20)}px ${styles.magentaNormalA0}`, duration: 0.4, ease: "power1.in" }, ">")


            .to(waveElementsArranged, {
                height: "500%", aspectRatio: "1 / 5", backgroundColor: styles.transitionColor, boxShadow: `0 0 ${s(20)}px ${styles.transitionColor}`, duration: 0.4, ease: "power2.in", stagger: 0.1
            }, "<-0.2")

            .to(waveElementsArranged, {
                height: "100%", aspectRatio: "1 / 1", backgroundColor: styles.magentaNormal, boxShadow: `0 0 ${s(20)}px ${styles.magentaNormalA0}`, duration: 0.4, ease: "power2.out", stagger: 0.1
            }, "<+0.45");
    }



    const startAnimation = async () => {
        if (startAnimationStarted.current) return;
        startAnimationStarted.current = 1;


        await document.fonts.ready;


        headerSplitTextRef.current = SplitText.create(headerRef.current, { type: "chars" });
        returnButtonSplitTextRef.current = SplitText.create(returnButtonTextRef.current, { type: "chars" });

        const waveElements1 = [...waveElementsRef.current].slice(0, Math.round(waveElementsRef.current.length / 2));
        const waveElements2 = [...waveElementsRef.current].slice(Math.round(waveElementsRef.current.length / 2));


        
        gsap.set(containerRef.current, { backgroundColor: "rgb(0, 0, 0)", opacity: 1 });

        gsap.set(DMAlogoRef.current, { opacity: 0 });

        gsap.set(switchRef.current, { aspectRatio: "1 / 1", backgroundColor: styles.transitionColor, boxShadow: `0 0 0.01px 0.01px ${styles.transitionColor}`, opacity: 0 });
        gsap.set(switchThumbRef.current, { opacity: 0 });

        gsap.set(headerSplitTextRef.current.chars, { scaleY: 0, opacity: 0, transformOrigin: "bottom" });

        gsap.set(returnButtonRef.current, { width: s(10), height: s(10), opacity: 0 });
        gsap.set(returnButtonSplitTextRef.current.chars, { x: s(-100), opacity: 0 });

        gsap.set(waveElementsRef.current, { opacity: 0, backgroundColor: styles.transitionColor })



        setTimeout(() => {
            const tl = gsap.timeline({ onComplete: () => {switchAnimationActivity.current = 1; setSwitchAnimationActivityState(1); startOrEndAnimationInProcess.current = 0} });

            tl
                .to(switchRef.current, { opacity: 1, boxShadow: `0 0 ${s(500)}px ${s(50)}px ${styles.transitionColor}`, duration: 0.8, ease: "power2.in" }, "0")
                .to(containerRef.current, { backgroundColor: styles.grayLight, duration: 0.8, ease: "power2.in" }, "<")


                .addLabel("switchDarkeningStart", ">")


                .to(containerRef.current, { backgroundColor: styles.grayNormal, duration: 1, ease: "power2.in" }, "switchDarkeningStart")
                .to(switchRef.current, { backgroundColor: styles.magentaNormal, boxShadow: `0 0 ${s(20)}px 0.01px ${styles.magentaNormalA0}`, duration: 1, ease: "power2.in" }, "<")
                .set(switchRef.current, { boxShadow: `0 0 ${s(20)}px ${styles.magentaNormalA0}` }, ">")


                .to(switchThumbRef.current, { opacity: 1, duration: 0.5, ease: "power2.in" }, "switchDarkeningStart")
                .to(switchRef.current, { aspectRatio: "2 / 1", duration: 0.5, ease: "power2.in" }, "<+0.25")


                
                .to([...waveElements1].reverse(), {
                    height: "500%", aspectRatio: "1 / 5", opacity: 1, backgroundColor: styles.transitionColor, boxShadow: `0 0 ${s(20)}px ${styles.transitionColor}`,
                    duration: 0.4, ease: "power2.in", stagger: 0.1
                }, ">-0.125")

                .to(waveElements2, {
                    height: "500%", aspectRatio: "1 / 5", opacity: 1, backgroundColor: styles.transitionColor, boxShadow: `0 0 ${s(20)}px ${styles.transitionColor}`,
                    duration: 0.4, ease: "power2.in", stagger: 0.1
                }, "<")


                .to([...waveElements1].reverse(), {
                    height: "100%", aspectRatio: "1 / 1", backgroundColor: styles.magentaNormal, boxShadow: `0 0 ${s(20)}px ${styles.magentaNormalA0}`, duration: 0.4, ease: "power2.out", stagger: 0.1
                }, "<+0.45")

                .to(waveElements2, {
                    height: "100%", aspectRatio: "1 / 1", backgroundColor: styles.magentaNormal, boxShadow: `0 0 ${s(20)}px ${styles.magentaNormalA0}`, duration: 0.4, ease: "power2.out", stagger: 0.1
                }, "<")



                .to(returnButtonRef.current, { height: "100%", opacity: 1, duration: 0.3, ease: "power1.inOut" }, "<")
                .to(returnButtonRef.current, { width: "100%", duration: 0.8, ease: "power2.inOut" }, ">")
                .to([...returnButtonSplitTextRef.current.chars].reverse(), { x: 0, opacity: 1, duration: 0.5, ease: "power2.out", stagger: 0.05 }, "<+0.1")

                .to(DMAlogoRef.current, { opacity: 1, duration: 0.6, ease: "power2.in" }, "<")

                .to(headerSplitTextRef.current.chars, { scaleY: 1, opacity: 1, duration: 0.3, ease: "power2.out", stagger: 0.05 }, "<+0.1");
        }, startAnimationDelay);
    }



    const endAnimation = () => {
        if (!switchAnimationActivity.current) return;
        switchAnimationActivity.current = 0;
        setSwitchAnimationActivityState(0);
        startOrEndAnimationInProcess.current = 1;


        const waveElements1 = [...waveElementsRef.current].slice(0, Math.round(waveElementsRef.current.length / 2));
        const waveElements2 = [...waveElementsRef.current].slice(Math.round(waveElementsRef.current.length / 2));


        const tl = gsap.timeline({ onComplete: navigateMain });


        tl
            .to(headerSplitTextRef.current.chars, { scaleY: 0, transformOrigin: "bottom", opacity: 0, duration: 0.3, ease: "power2.in", stagger: 0.05 }, "0")

            .to(DMAlogoRef.current, { opacity: 0, duration: 0.6, ease: "power2.in" }, "<+0.1")

            .to([...returnButtonSplitTextRef.current.chars].reverse(), { x: s(100), opacity: 0, duration: 0.5, ease: "power2.in", stagger: 0.05 }, "<")
            .set(returnButtonContainerRef.current, { justifyContent: "flex-start" }, "<+0.4")
            .set(returnButtonRef.current, { flexDirection: "row" }, "<")
            .to(returnButtonRef.current, { width: s(10), duration: 1, ease: "power2.inOut" }, "<")
            .to(returnButtonRef.current, { height: 0, opacity: 0, duration: 0.3, ease: "power1.inOut" }, ">")



            .to(waveElements1, {
                height: "500%", aspectRatio: "1 / 5", opacity: 1, backgroundColor: styles.transitionColor, boxShadow: `0 0 ${s(20)}px ${styles.transitionColor}`,
                duration: 0.4, ease: "power2.in", stagger: 0.1
            }, "<-1.2")

            .to([...waveElements2].reverse(), {
                height: "500%", aspectRatio: "1 / 5", opacity: 1, backgroundColor: styles.transitionColor, boxShadow: `0 0 ${s(20)}px ${styles.transitionColor}`,
                duration: 0.4, ease: "power2.in", stagger: 0.1
            }, "<")


            .to(waveElements1, {
                height: "100%", aspectRatio: "1 / 1", opacity: 0, boxShadow: `0 0 ${s(20)}px ${styles.transitionColorA0}`, duration: 0.4, ease: "power2.out", stagger: 0.1
            }, "<+0.45")

            .to([...waveElements2].reverse(), {
                height: "100%", aspectRatio: "1 / 1", opacity: 0, boxShadow: `0 0 ${s(20)}px ${styles.transitionColorA0}`, duration: 0.4, ease: "power2.out", stagger: 0.1
            }, "<")


            .addLabel("switchUnloadStart", ">-0.6")


            .to(switchRef.current, { aspectRatio: "1 / 1", duration: 0.5, ease: "power2.in" }, "switchUnloadStart")
            .to(switchThumbRef.current, { opacity: 0, duration: 0.5, ease: "power2.in" }, "<+0.25")

            .set(switchRef.current, { boxShadow: `0 0 ${s(20)}px 0.01px ${styles.magentaNormalA0}` }, "switchUnloadStart")
            .to(switchRef.current, { backgroundColor: styles.transitionColor, boxShadow: `0 0 ${s(500)}px ${s(50)}px ${styles.transitionColor}`, duration: 0.8, ease: "power2.in" }, "<")
            .to(containerRef.current, { backgroundColor: styles.grayLight, duration: 0.8, ease: "power2.in" }, "<")

            .to(switchRef.current, { opacity: 0, boxShadow: `0 0 ${s(20)}px 0.01px ${styles.magentaNormalA0}`, duration: 1, ease: "power2.in" }, ">")
            .to(containerRef.current, { backgroundColor: "rgb(0, 0, 0)", duration: 1, ease: "power2.in" }, "<")
    }



    const returnButtonEnterAnimation = () => {
        gsap.to(returnButtonRef.current, { backgroundColor: styles.grayDarkish, duration: 0.3, ease: "power1.in" });
    }



    const returnButtonLeaveAnimation = () => {
        gsap.to(returnButtonRef.current, { backgroundColor: styles.grayDark, duration: 0.3, ease: "power1.in" });
    }



    /*███████████████ EFFECTS ████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████*/



    useEffect(() => {
        if (switchAnimationActivityState && switchEnterAnimationPending.current) switchEnterAnimation();
    }, [switchAnimationActivityState]);



    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (!startAnimationReady) return;

            startAnimation();
        }, containerRef);

        return () => ctx.revert();
    }, [startAnimationReady]);



    /*███████████████ RETURN █████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████*/

    return (
        <div className={styles["container-bg"]}>
            <div className={styles["container"]} ref={containerRef}>
                <div className={styles["upper-content"]}>
                    <DMAlogoV2 className={styles["DMA-logo"]} ref={DMAlogoRef} />
                </div>

                <div className={styles["switch-container"]}>
                    {makeHalfWaveElements(0).reverse()}

                    <div className={styles["switch-inner-container"]}>
                        <div className={styles["switch"]} onClick={switchAnimation} onMouseEnter={switchEnterAnimation} onMouseLeave={switchLeaveAnimation} ref={switchRef}>
                            <div className={styles["switch-thumb"]} ref={switchThumbRef} />
                        </div>
                    </div>

                    {makeHalfWaveElements(1)}
                </div>

                <div className={styles["lower-content"]}>
                    <h1 className={styles["h1"]} ref={headerRef}>Antistress Switch</h1>

                    <div className={styles["return-button-container"]} ref={returnButtonContainerRef}>
                        <div className={styles["return-button"]} ref={returnButtonRef} onClick={endAnimation} onMouseEnter={returnButtonEnterAnimation} onMouseLeave={returnButtonLeaveAnimation}>
                            <p className={styles["return-button-p"]} ref={returnButtonTextRef}>Return to Subprojects</p>
                        </div>

                        <div className={styles["return-button-placeholder"]}>
                            <p className={styles["return-button-p"]}>Return to Subprojects</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default SwitchPage;