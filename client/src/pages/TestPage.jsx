import { useEffect, useLayoutEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";



import styles from "./TestPage.module.scss";

import { s } from "./../utils/scale.js";



gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);


console


export default function GreetingPage() {

    /*███████████████ DECLARATION ████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████*/

    const containerRef = useRef(null);
    const sliderRef = useRef(null);


    const scrollTl = useRef(null);
    const hasRun = useRef(0);



    const navigate = useNavigate();





    /*███████████████ FUNCTIONS ██████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████*/

    const createScrollTrigger = () => {
        scrollTl.current = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                pin: true,
                start: "top top",
                end: `+=${containerRef.current.getBoundingClientRect().height + 1000}`,
                scrub: true,

                markers: true
            },

            invalidateOnRefresh: true
        });


        const nestedTl = gsap.timeline({});

        nestedTl.fromTo(sliderRef.current, 
            { x: 0 },
            { x: () => s(1000) - sliderRef.current.getBoundingClientRect().width, duration: 1, ease: "power1.inOut" },
        "0");


        scrollTl.current.add(nestedTl, "0");


        return () => {
            scrollTl.current.scrollTrigger?.kill();
            scrollTl.current.kill();
        };
    }





    /*███████████████ EFFECTS ████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████*/

    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = 1;

        createScrollTrigger();
    }, []);



    useEffect(() => {
        document.body.classList.add("scroller-body");

        return () => document.body.classList.remove("scroller-body");
    }, []);



    useEffect(() => {
        const handleRefresh = () => {
            scrollTl.current.invalidate();
            scrollTl.current.render(scrollTl.current.time(), false, true);
        };

        ScrollTrigger.addEventListener("refresh", handleRefresh);

        return () => ScrollTrigger.removeEventListener("refresh", handleRefresh);
    }, []);





    /*███████████████ RETURN █████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████*/

    return (
        <div className={styles["container"]} ref={containerRef}>
            <div className={styles["slider-container"]}>
                <div className={styles["slider"]} ref={sliderRef} />
            </div>
        </div>
    );
}