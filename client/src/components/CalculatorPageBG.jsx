import { useEffect, useLayoutEffect, useState, useRef, useMemo, forwardRef, useImperativeHandle } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";

import styles from "./CalculatorPageBG.module.scss";

import { useScale } from "./../utils/useScale.js";





const CalculatorPageBG = forwardRef((props, ref) => {
    
    /*███████████████ DECLARATION ████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████*/

    const { scale, s } = useScale();
    const { scale: scaleW } = useScale("w");
    const { scale: scaleH } = useScale("h");


    const starSize = s(4);
    const stripeSize = s(2);

    const baseHorizontalMargin = s(10);
    const horizontalPower = 1.8;

    const baseVerticalMargin = s(60);
    const horizon = s(300);


    const starLineHeight = s(6);
    const starAmountCoefficient = 2500;


    const animationStart = 600;
    const flashDelay = 1500;




    const [stripesSize, setStripesSize] = useState({ width: window.innerWidth, height: window.innerHeight / 2 });
    const [startAnimationComplete, setStartAnimationComplete] = useState(0);



    const containerBgRef = useRef(null);
    const skyGradientRef = useRef(null);

    const horizontalStripesContainerRef = useRef(null);
    const verticalStripesContainerRef = useRef(null);

    const layoutUpdatesActive = useRef(0);
    const startAnimationStarted = useRef(0);


    const verticalStripesRef = useRef(null);
    const horizontalStripesRef = useRef(null);

    const shuffledStarsRef = useRef(null);
    const starDelay = useRef(null);

    const resizePending = useRef(0);
    const scaleInitialized = useRef(0);


    const navigate = useNavigate();





    /*████████████████████████████████████████ FUNCTIONS ████████████████████████████████████████*/

    const renderStripes = (direction, limit) => {
        const stripeArray = [];



        /*----- HORIZONTAL -------------------------------------*/

        if (direction === "horizontal") {
            let height = 0;
            let cycleNum = 0;

            while (limit - height > 0) {
                const margin = baseHorizontalMargin + s(cycleNum ** horizontalPower);

                stripeArray.push(<div key={cycleNum} className={styles["horizontal-stripe"]} style={{ marginBottom: `${margin}px` }} />);

                height += s(4) + margin;
                cycleNum++;
            }
        }



        /*----- VERTICAL ---------------------------------------*/

        if (direction === "vertical") {
            let width = 0;
            let cycleNum = 0;

            const actualStripeSize = baseVerticalMargin + stripeSize;

            while (limit - width > -2 * (actualStripeSize)) {
                let offset = (limit - stripeSize) / 2;
                const offsetChange = (actualStripeSize) * Math.round(cycleNum / 2)

                if (cycleNum % 2 === 0) {
                    offset -= offsetChange;
                } else {
                    offset += offsetChange;
                }

                stripeArray.push(<div key={cycleNum} className={styles["vertical-stripe"]} data-index={cycleNum} style={{ left: `${offset}px` }} />);

                width += actualStripeSize;
                cycleNum++
            }
        }



        /*----- RETURN -----------------------------------------*/

        return <div className={styles[`${direction}-stripe-container`]} ref={direction === "horizontal" ? horizontalStripesContainerRef : verticalStripesContainerRef} >
            {stripeArray}
        </div>
    }



    const renderStars = (num) => {
        const returnArray = [];
        let widthLeft = stripesSize.width;

        let numCoefficient = num * starLineHeight / stripesSize.height;

        if (numCoefficient > 0.7) numCoefficient *= num ** 0.3;
        if (numCoefficient > 0.6) numCoefficient *= num ** 0.2;
        if (numCoefficient < 0.3) numCoefficient **= 0.6;



        let index = 0;

        while (widthLeft > 0) {
            const margin = s(numCoefficient * Math.random() * starAmountCoefficient + 2);

            widthLeft -= margin + starSize;

            let starKind = "star";
            const starKindRan = numCoefficient / Math.random();

            if (starKindRan < 0.4) starKind = "star-big"
            else if (starKindRan > 0.5) starKind = "star-small";

            returnArray.push(<div className={styles[starKind]} key={`${num}-${index}`} style={{ marginLeft: `${margin / 2}px`, marginRight: `${margin / 2}px` }} />);

            index++;
        }

        return returnArray;
    }



    const renderStarLines = () => {
        const outputArray = [];

        for (let i = starLineHeight; i < stripesSize.height; i += starLineHeight) {
            outputArray.push(<div key={i} className={styles["star-line"]}>{renderStars(i / starLineHeight)}</div>);
        }

        return outputArray;
    }



    const starLines = useMemo(() => {
        return renderStarLines();
    }, [stripesSize]);



    const findX = (num) => {
        const numCoefficient = Math.floor(num / 2) + 0.5;
        const x = s(numCoefficient * (baseVerticalMargin + stripeSize));

        return x;
    }



    const findTurn = (num) => {
        const dir = num % 2 ? -1 : 1;

        const turn = Math.atan(findX(num) / horizon) * (180 / Math.PI) * dir;


        return turn;
    }



    const unloadAnimation = () => {
        layoutUpdatesActive.current = 0;

        verticalStripesRef.current = verticalStripesContainerRef.current.querySelectorAll(`.${styles["vertical-stripe"]}`);
        horizontalStripesRef.current = horizontalStripesContainerRef.current.querySelectorAll(`.${styles["horizontal-stripe"]}`);

        const stars = document.querySelectorAll(`.${styles["star-small"]}, .${styles["star"]}, .${styles["star-big"]}`);
        shuffledStarsRef.current = [...stars].sort(() => Math.random() - 0.5);



        const verticalStripesTl = gsap.timeline();

        verticalStripesRef.current.forEach((el, num) => {
            verticalStripesTl
                .to(el, { filter: "brightness(500%)", duration: 0.2, ease: "power1.inOut" }, `${num * flashDelay / verticalStripesRef.current.length / 1000}`)
                .to(el, { opacity: 0, filter: "brightness(100%)", duration: 0.4, ease: "power2.inOut" }, ">");
        });


        const horizontalStripesTl = gsap.timeline();

        horizontalStripesRef.current.forEach((el, num) => {
            horizontalStripesTl
                .to(el, { filter: "brightness(500%)", duration: 0.2, ease: "power1.inOut" }, `${num * flashDelay / horizontalStripesRef.current.length / 1000}`)
                .to(el, { opacity: 0, filter: "brightness(100%)", duration: 0.4, ease: "power2.inOut" }, ">");
        });



        const tl = gsap.timeline({ onComplete: () => {
            navigate("/");
        } });

        tl
            .to(containerBgRef.current, { backgroundColor: "rgb(15, 30, 170)", filter: "brightness(500%)", duration: 0.4, ease: "power2.in" }, "0")
            .call(setStartAnimationComplete, [0], ">")
            .to(containerBgRef.current, { backgroundColor: "rgba(15, 30, 170, 0)", filter: "brightness(100%)", duration: 0.4, ease: "power2.out" }, ">")


            .add(verticalStripesTl, ">")
            .add(horizontalStripesTl, "<")


            .to(shuffledStarsRef.current, { filter: "brightness(500%)", duration: 0.4, ease: "power1.inOut", stagger: starDelay.current / 1000 }, "0")
            .to(shuffledStarsRef.current, {
                scale: 1, opacity: 0, filter: "brightness(100%)", transformOrigin: "center", duration: 0.2, ease: "power2.inOut", stagger: starDelay.current / 1000
            }, "<+0.4")

            .to(skyGradientRef.current, { opacity: 0, duration: ((flashDelay + 200) / 1000), ease: "power2.in" }, "0");
    };



    useImperativeHandle(ref, () => ({
        unloadAnimation
    }));





    /*████████████████████████████████████████ EFFECTS ████████████████████████████████████████*/

    useEffect(() => {
        if (!layoutUpdatesActive.current) {
            resizePending.current = 1;
            return;
        };

        
        setStripesSize({ width: window.innerWidth, height: window.innerHeight / 2 });
    }, [scaleW, scaleH]);


    useLayoutEffect(() => {
        if (startAnimationStarted.current) return;
        startAnimationStarted.current = 1;


        verticalStripesRef.current = verticalStripesContainerRef.current.querySelectorAll(`.${styles["vertical-stripe"]}`);
        horizontalStripesRef.current = horizontalStripesContainerRef.current.querySelectorAll(`.${styles["horizontal-stripe"]}`);


        verticalStripesRef.current.forEach((el, num) => {
            gsap.set(el, { y: s(2), rotate: findTurn(num), transformOrigin: "top" });
            gsap.set(el, { opacity: 0 });
        });

        horizontalStripesRef.current.forEach((el, num) => {
            gsap.set(el, { opacity: 0 });
        });




        const stars = document.querySelectorAll(`.${styles["star-small"]}, .${styles["star"]}, .${styles["star-big"]}`);
        shuffledStarsRef.current = [...stars].sort(() => Math.random() - 0.5);

        starDelay.current = flashDelay / shuffledStarsRef.current.length;

        gsap.set(skyGradientRef.current, { opacity: 0 });
        gsap.set(shuffledStarsRef.current, { opacity: 0, scale: 0, transformOrigin: "center" });



        setTimeout(() => {
            verticalStripesRef.current.forEach((el, num) => {
                const tl = gsap.timeline();

                setTimeout(() => {
                    tl
                        .to(el, { opacity: 1, filter: "brightness(500%)", duration: 0.4, ease: "power1.inOut" }, "0")
                        .to(el, { filter: "brightness(100%)", duration: 0.2, ease: "power2.inOut" }, ">")
                }, num * flashDelay / verticalStripesRef.current.length);
            });


            horizontalStripesRef.current.forEach((el, num) => {
                const tl = gsap.timeline();

                setTimeout(() => {
                    tl
                        .to(el, { opacity: 1, filter: "brightness(500%)", duration: 0.4, ease: "power1.inOut" }, "0")
                        .to(el, { filter: "brightness(100%)", duration: 0.2, ease: "power2.inOut" }, ">");
                }, num * flashDelay / horizontalStripesRef.current.length);
            });

            
            gsap.to(skyGradientRef.current, { opacity: 1, duration: ((flashDelay + 200) / 1000), ease: "power2.in" });

            gsap.to(shuffledStarsRef.current, { opacity: 1, filter: "brightness(500%)", scale: 1, duration: 0.4, ease: "power1.inOut", stagger: starDelay.current / 1000 });

            setTimeout(() => {
                gsap.to(shuffledStarsRef.current, { filter: "brightness(100%)", scale: 1, duration: 0.2, ease: "power2.inOut", stagger: starDelay.current / 1000 });
            }, 400);


            setTimeout(() => {
                const tl = gsap.timeline();

                tl
                    .to(containerBgRef.current, { backgroundColor: "rgb(15, 30, 170)", filter: "brightness(500%)", duration: 0.4, ease: "power2.in" }, "0")
                    .call(setStartAnimationComplete, [1], ">")
                    .call(() => {
                        layoutUpdatesActive.current = 1;

                        if (!scaleInitialized.current) {
                            scaleInitialized.current = 1;
                            resizePending.current = 0;
                        }

                        if (resizePending.current) setStripesSize({
                            width: window.innerWidth,
                            height: window.innerHeight / 2
                        });
                    }, [], "<")
                    .to(containerBgRef.current, { backgroundColor: "rgba(15, 30, 170, 0)", filter: "brightness(100%)", duration: 0.4, ease: "power2.out" }, ">");
            }, flashDelay + 200);
        }, animationStart);
    }, []);


    useLayoutEffect(() => {
        if (!startAnimationComplete) return;


        const ctx = gsap.context(() => {
            const verticalStripes = verticalStripesContainerRef.current.querySelectorAll(`.${styles["vertical-stripe"]}`);
            const horizontalStripes = horizontalStripesContainerRef.current.querySelectorAll(`.${styles["horizontal-stripe"]}`);

            verticalStripes.forEach((el, num) => {
                gsap.killTweensOf(el);

                gsap.set(el, {
                    x: 0,
                    y: s(2),
                    rotate: findTurn(num),
                    transformOrigin: "top"
                });

                gsap.to(el, { 
                    x: `+=${baseVerticalMargin + stripeSize}`,
                    rotate: `+=${num % 2 ? findTurn(num + 2) - findTurn(num) : findTurn(num - 2) - findTurn(num)}`,
                    ease: "none",
                    duration: 0.75,
                    repeat: -1,
                });
            });
        });

        return () => ctx.revert();
    }, [stripesSize, startAnimationComplete]);





    /*████████████████████████████████████████ RETURN █████████████████████████████████████████*/

    return <div className={styles["container"]}>
        <div className={styles["container-bg"]} ref={containerBgRef} />

        <div className={styles["sky"]}>
            <div className={styles["sky-gradient"]} ref ={skyGradientRef} />

            <div className={styles["star-line-container"]}>
                {starLines}
            </div>
        </div>

        <div className={styles["ground"]}>
            {renderStripes("horizontal", stripesSize.height)}
            {renderStripes("vertical", stripesSize.width)}
        </div>
    </div>
})


export default CalculatorPageBG