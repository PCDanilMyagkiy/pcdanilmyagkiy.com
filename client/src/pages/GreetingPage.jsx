import { useEffect, useLayoutEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";


import Lenis from "lenis"

import StaticLayer from "./../components/StaticLayer.jsx";

import styles from "./GreetingPage.module.scss";

import { s } from "./../utils/scale.js";

import DMAlogoV2PartDM from "./../assets/GreetingPage/DMAlogoV2PartDM.svg?react";
import DMAlogoV2PartA from "./../assets/GreetingPage/DMAlogoV2PartA.svg?react";
import DMAlogoV2PartPyramid from "./../assets/GreetingPage/DMAlogoV2PartPyramid.svg?react";
import DMAlogoV2PartOverlayer from "./../assets/GreetingPage/DMAlogoV2PartOverlayer.svg?react";

import MongoDBLogo from "./../assets/GreetingPage/MongoDBLogo.svg?react";
import ExpressLogo from "./../assets/GreetingPage/ExpressLogo.svg?react";
import ReactLogo from "./../assets/GreetingPage/ReactLogo.svg?react";
import NodeJSLogo from "./../assets/GreetingPage/NodeJSLogo.svg?react";



gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);



const animationStart = 0.5;

const logoRotationPerPixel = 0.04;


const scrambleCharSet = (
    "abcdefghijklmnopqrstuvwxyz" +
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
    "0123456789" +
    "!@#$%^&*()_+-=[]{}|;:,.<>?"
).split("");

const scrambleIterations = 14;
const scrambleIterationStartingTime = 0.02;
const scrambleIterationExponentCoefficient = 1.005;





export default function GreetingPage() {

    /*███████████████ DECLARATION ████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████*/

    const lenis = useRef(null);


    const outerContainerRef = useRef(null);
    const containerRef = useRef(null);
    const containerOverlayerRef = useRef(null);


    const logoContainerRef = useRef(null);

    const logoRefDM = useRef(null);
    const logoRefA = useRef(null);
    const logoRefPyramid = useRef(null);
    const logoRefOverlayer = useRef(null);


    const overlayerRef = useRef(null);

    const logoTextRef = useRef(null);
    const logoTextSplitTextRef = useRef(null);



    const scene1ContainerRef = useRef(null);


    const scene2ContainerRef = useRef(null);
    const scene2p1Ref = useRef(null);
    const scene2p1SplitTextRef = useRef(null);
    const scene2p2Ref = useRef(null);
    const scene2p2SplitTextRef = useRef(null);


    const scene3ContainerRef = useRef(null);
    const scene3TextContainerRef = useRef(null);
    const scene3SmallTextContainerRef = useRef(null);
    const scene3BigTextContainerRef = useRef(null);
    const scene3SmallTextContainerSizerRef = useRef(null);
    const scene3BigTextContainerSizerRef = useRef(null);
    const scene3p1Ref = useRef(null);
    const scene3p1SplitTextRef = useRef(null);
    const scene3p2Ref = useRef(null);
    const scene3p2SplitTextRef = useRef(null);
    const scene3p3n1Ref = useRef(null);
    const scene3p3n1SplitTextRef = useRef(null);
    const scene3p3n2Ref = useRef(null);
    const scene3p3n2SplitTextRef = useRef(null);


    const scene4ContainerRef = useRef(null);
    const scene4pRef = useRef(null);
    const scene4pSplitTextRef = useRef(null);
    const scene4pSizerContainerRef = useRef(null);
    const scene4LogoContainerRefM = useRef(null);
    const scene4LogoContainerRefE = useRef(null);
    const scene4LogoContainerRefR = useRef(null);
    const scene4LogoContainerRefN = useRef(null);
    const scene4LogoInnerContainerRefM = useRef(null);
    const scene4LogoInnerContainerRefE = useRef(null);
    const scene4LogoInnerContainerRefR = useRef(null);
    const scene4LogoInnerContainerRefN = useRef(null);
    const scene4pAccentRefM = useRef(null);
    const scene4pAccentRefE = useRef(null);
    const scene4pAccentRefR = useRef(null);
    const scene4pAccentRefN = useRef(null);

    const scene4pRefM = useRef(null);
    const scene4pRefML = useRef(null);
    const scene4pRefMR = useRef(null);
    const scene4pRefE = useRef(null);
    const scene4pRefEL = useRef(null);
    const scene4pRefER = useRef(null);
    const scene4pRefR = useRef(null);
    const scene4pRefRL = useRef(null);
    const scene4pRefRR = useRef(null);
    const scene4pRefN = useRef(null);
    const scene4pRefNL = useRef(null);
    const scene4pRefNR = useRef(null);

    const scene4LogoRefM = useRef(null);
    const scene4LogoRefML = useRef(null);
    const scene4LogoRefMR = useRef(null);
    const scene4LogoRefE = useRef(null);
    const scene4LogoRefEL = useRef(null);
    const scene4LogoRefER = useRef(null);
    const scene4LogoRefR = useRef(null);
    const scene4LogoRefRL = useRef(null);
    const scene4LogoRefRR = useRef(null);
    const scene4LogoRefN = useRef(null);
    const scene4LogoRefNL = useRef(null);
    const scene4LogoRefNR = useRef(null);


    const scene5ContainerRef = useRef(null);
    const scene5p1Ref = useRef(null);
    const scene5p1SplitTextRef = useRef(null);
    const scene5p2Ref = useRef(null);
    const scene5p2SplitTextRef = useRef(null);


    const scene6ContainerRef = useRef(null);
    const scene6pRef = useRef(null);
    const scene6pSplitTextRef = useRef(null);


    const scene7ContainerRef = useRef(null);
    const scene7pRef = useRef(null);
    const scene7pSplitTextRef = useRef(null);


    const timelines = useRef([]);
    const scrollTl = useRef(null);



    const navigate = useNavigate();





    /*███████████████ FUNCTIONS ██████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████*/

    const prepLogo = () => {
        gsap.set(containerRef.current, { scaleY: 0, filter: "brightness(1000%) contrast(10%)" });
        gsap.set(containerOverlayerRef.current, { opacity: 1 });
        gsap.set(outerContainerRef.current, { background: "linear-gradient(rgb(0, 0, 0) 49%, rgb(0, 0, 0) 50%, rgb(0, 0, 0) 51%)" });

        gsap.set(logoRefDM.current, { x: s(-241), y: s(65), scaleX: 2, scaleY: 2, opacity: 0 });
        gsap.set(logoRefA.current, { x: s(241), y: s(65), scaleX: 2, scaleY: 2, opacity: 0 });
        gsap.set(logoRefPyramid.current, { y: s(350), opacity: 0 });

        gsap.set(scene3ContainerRef.current, { rotation: 8, transformOrigin: "-100% center" });
        gsap.set(scene3BigTextContainerSizerRef.current, { height: 0 });


        gsap.set([
            scene4pAccentRefM.current, scene4pAccentRefE.current, scene4pAccentRefR.current, scene4pAccentRefN.current
        ], { scale: 5, opacity: 0, filter: `blur(${s(20)}px)` }, "<"
        );

        gsap.set([
            scene4pRefM.current, scene4LogoRefM.current,
            scene4pRefE.current, scene4LogoRefE.current,
            scene4pRefR.current, scene4LogoRefR.current,
            scene4pRefN.current, scene4LogoRefN.current
        ], { opacity: 0, filter: `blur(${s(10)}px)` });

        gsap.set([
            scene4LogoRefML.current, scene4pRefML.current,
            scene4LogoRefEL.current, scene4pRefEL.current,
            scene4LogoRefRL.current, scene4pRefRL.current,
            scene4LogoRefNL.current, scene4pRefNL.current,
        ], { x: s(-60), opacity: 0, filter: `blur(${s(10)}px)` });
        gsap.set([
            scene4LogoRefMR.current, scene4pRefMR.current,
            scene4LogoRefER.current, scene4pRefER.current,
            scene4LogoRefRR.current, scene4pRefRR.current,
            scene4LogoRefNR.current, scene4pRefNR.current,
        ], { x: s(60), opacity: 0, filter: `blur(${s(10)}px)` });
    }



    const createScrollTrigger = (restoreProgress) => {
        const toggleTlActivity = (mainTimeline, toggledTimeline, endTime, isPauser) => {
            if (mainTimeline.time() >= endTime) {
                if (!toggledTimeline.paused()) return;

                toggledTimeline.resume();
            } else {
                if (toggledTimeline.paused()) return;

                toggledTimeline.pause();
            }
        }



        /*-------------------- OTHER TIMELINES --------------------*/

        const getAutoHeight = (index, target) => {
            const prevHeight = target.style.height;

            target.style.height = "auto";
            const height = target.getBoundingClientRect().height;
            target.style.height = prevHeight;

            return height;
        };



        const getRandomDimension = () => Math.random() * s(50) - s(25);

        const scene4LogoHoverTlM = gsap.timeline({ paused: true, repeat: -1, repeatRefresh: true, invalidateOnRefresh: true });
        const scene4LogoHoverTlE = gsap.timeline({ paused: true, repeat: -1, repeatRefresh: true, invalidateOnRefresh: true });
        const scene4LogoHoverTlR = gsap.timeline({ paused: true, repeat: -1, repeatRefresh: true, invalidateOnRefresh: true });
        const scene4LogoHoverTlN = gsap.timeline({ paused: true, repeat: -1, repeatRefresh: true, invalidateOnRefresh: true });

        scene4LogoHoverTlM.to(scene4LogoInnerContainerRefM.current,
            { x: getRandomDimension, y: getRandomDimension, duration: Math.random() * 2 + 3, ease: "power1.inOut" }, "0");
        scene4LogoHoverTlE.to(scene4LogoInnerContainerRefE.current,
            { x: getRandomDimension, y: getRandomDimension, duration: Math.random() * 2 + 3, ease: "power1.inOut" }, "0");
        scene4LogoHoverTlR.to(scene4LogoInnerContainerRefR.current,
            { x: getRandomDimension, y: getRandomDimension, duration: Math.random() * 2 + 3, ease: "power1.inOut" }, "0");
        scene4LogoHoverTlN.to(scene4LogoInnerContainerRefN.current,
            { x: getRandomDimension, y: getRandomDimension, duration: Math.random() * 2 + 3, ease: "power1.inOut" }, "0");

        timelines.current.push(scene4LogoHoverTlM);
        timelines.current.push(scene4LogoHoverTlE);
        timelines.current.push(scene4LogoHoverTlR);
        timelines.current.push(scene4LogoHoverTlN);



        /*-------------------- SCENE 1 TIMELINE --------------------*/

        const scene1Tl = gsap.timeline({ invalidateOnRefresh: true });
        timelines.current.push(scene1Tl);

        scene1Tl
            .set(logoRefOverlayer.current, { opacity: 0 }, "0")
            .set(overlayerRef.current, { backgroundColor: "transparent" }, "<")

            .to(logoTextSplitTextRef.current.chars, { scaleY: 0, willChange: "transform", opacity: 0, duration: 0.6, ease: "power2.out", stagger: 0.04 }, "<")

            .fromTo(logoContainerRef.current,
                { rotation: 0 },
                { rotation: logoRotationPerPixel * 1200, duration: 1.8, ease: "power1.inOut" },
            "<+0.2")

            .fromTo(logoRefDM.current,
                { x: 0, y: 0, scaleX: 1, scaleY: 1, filter: "blur(0px)", opacity: 1 },
                { x: () => s(-482), y: () => s(130), scaleX: 7.5, scaleY: 7.5, transformOrigin: "center 75%", filter: () => `blur(${s(10)}px)`, opacity: 0.05,
                    duration: 1.7, ease: "power1.inOut" },
            "<+0.1")
            .fromTo(logoRefA.current, 
                { x: 0, y: 0, scaleX: 1, scaleY: 1, filter: "blur(0px)", opacity: 1 },
                { x: () => s(482), y: () => s(130), scaleX: 7.5, scaleY: 7.5, transformOrigin: "center 75%", filter: () => `blur(${s(10)}px)`, opacity: 0.05,
                duration: 1.6, ease: "power1.inOut" },
            "<+0.15")
            .fromTo(logoRefPyramid.current,
                { y: 0, scaleX: 1, scaleY: 1, filter: "blur(0px)", opacity: 1 },
                { y: () => s(-600), scaleX: 7.5, scaleY: 7.5, transformOrigin: "center 75%", filter: () => `blur(${s(10)}px)`, opacity: 0.05,
                duration: 1.5, ease: "power1.inOut" },
            "<+0.15")




        /*-------------------- SCENE 2 TIMELINE --------------------*/
        
        const scene2Tl = gsap.timeline({ invalidateOnRefresh: true });
        timelines.current.push(scene2Tl);

        scene2Tl
            .set(scene2ContainerRef.current, { opacity: 1, duration: 0.5 }, "0")
            .fromTo(scene2p1SplitTextRef.current.chars,
                { x: () => s(100), opacity: 0 },
                { x: 0, opacity: 1, duration: 0.4, ease: "power2.in", stagger: 0.075 },
            "<")
            .fromTo(scene2p2SplitTextRef.current.chars,
                { skewY: 60, opacity: 0, filter: () => `blur(${s(5)}px)` },
                { skewY: 0, opacity: 1, filter: "blur(0px)", duration: 0.6, ease: "power2.in", stagger: 0.05 },
                "<+0.6")
            
            .fromTo(logoRefA.current,
                { x: () => s(482), duration: 2.5, ease: "power1.inOut" },
                { x: () => s(80), duration: 2.5, ease: "power1.inOut" },
            "0");




        /*-------------------- SCENE 3 TIMELINE --------------------*/
        
        const scene3Tl = gsap.timeline({ invalidateOnRefresh: true });
        timelines.current.push(scene3Tl);

        scene3Tl
            .set(scene3ContainerRef.current, { opacity: 1 }, "0")


            .fromTo(scene2ContainerRef.current,
                { rotation: 0 },
                { rotation: -8, transformOrigin: "-100% center", duration: 1, ease: "power3.inOut" },
            "<")
            .fromTo(scene2p1SplitTextRef.current.chars,
                { x: 0, opacity: 1, filter: "blur(0px)" },
                { x: () => s(175), opacity: 0, filter: () => `blur(${s(7)}px)`, duration: 0.35, stagger: 0.025 },
            "<")
            .fromTo(scene2p2SplitTextRef.current.chars,
                { x: 0, opacity: 1, filter: () => `blur(0px)` },
                { x: () => s(150), opacity: 0, filter: () => `blur(${s(7)}px)`, duration: 0.3, stagger: 0.03 },
            "<+0.2")
            .set(scene2ContainerRef.current, { opacity: 0 }, ">")

            .fromTo(scene3ContainerRef.current,
                { rotation: 8 },
                { rotation: 0, duration: 1, ease: "power3.inOut" },
            "0")
            .fromTo(scene3p1SplitTextRef.current.chars,
                { x: () => s(125), opacity: 0, filter: `blur(${s(7)}px)` },
                { x: 0, opacity: 1, filter: "blur(0px)", duration: 0.3, stagger: 0.03 },
            "<+0.2")
            .fromTo(scene3p2SplitTextRef.current.words,
                { scaleY: 0, opacity: 0 },
                { scaleY: 1, opacity: 1, duration: 0.6, stagger: 0.1 },
            "<+0.5")



            .fromTo(scene3TextContainerRef.current,
                { scaleX: 1, scaleY: 1, rotation: 0 },
                { scaleX: 0.5, scaleY: 0.5, rotation: -90, transformOrigin: "center", duration: 0.8, ease: "power2.inOut" },
            ">+0.4")
            .fromTo(scene3BigTextContainerSizerRef.current,
                { height: 0 },
                { height: "auto", duration: 1.2, ease: "power2.in" },
            ">-0.2")

            .fromTo(scene3p3n2SplitTextRef.current.chars,
                { scaleY: 0, transformOrigin: "top", opacity: 0 },
                { scaleY: 1, opacity: 1, duration: 0.2, ease: "power2.in", stagger: 0.15 },
            "<+0.4")
            .fromTo(scene3p3n1SplitTextRef.current.chars,
                { scaleY: 0, transformOrigin: "top", opacity: 0 },
                { scaleY: 1, opacity: 1, duration: 0.2, ease: "power2.in", stagger: 0.15 },
            "<+0.2")



            .fromTo(logoRefA.current,
                { y: () => s(130) },
                { y: () => s(-70), duration: 2.2, ease: "power2.inOut" },
            "0")
            .fromTo(logoRefDM.current,
                { x: () => s(-482), y: () => s(130) },
                { x: () => s(200), y: () => s(25), duration: 1.8, ease: "power1.inOut" },
            "<+0.1")
            .fromTo(logoRefPyramid.current,
                { x: 0, y: () => s(-600) },
                { x: () => s(160), y: () => s(-200), duration: 2.8, ease: "power2.inOut" },
            "<+0.2")
            .fromTo(logoRefPyramid.current,
                { x: () => s(160), y: () => s(-200) },
                { x: () => s(-20), y: () => s(-450), duration: 1.6, ease: "power1.inOut" },
            ">")
            .fromTo(logoRefDM.current,
                { x: () => s(200), y: () => s(25) },
                { x: () => s(120), y: () => s(-200), duration: 1.4, ease: "power1.inOut" },
            "<+0.2")
            .fromTo(logoRefA.current,
                { x: () => s(80), y: () => s(-70) },
                { x: () => s(-10), y: () => s(-20), duration: 1.1, ease: "power1.inOut" },
            "<+0.1")

        


        /*-------------------- SCENE 4 TIMELINE --------------------*/

        const scene4Tl = gsap.timeline({ invalidateOnRefresh: true });

        scene4Tl
            .set(scene4ContainerRef.current, { opacity: 1 }, "0")


            .fromTo(scene3p2SplitTextRef.current.chars,
                { x: 0 },
                { x: () => s(100), duration: 0.6, ease: "power2.in", stagger: 0.05 },
            "<")
            .fromTo(scene3p2SplitTextRef.current.chars,
                { opacity: 1 },
                { opacity: 0, duration: 0.6, ease: "power1.in", stagger: 0.05 },
            "<")

            .fromTo(scene3p1SplitTextRef.current.chars,
                { x: 0, y: 0 },
                { x: () => s(100), y: () => s(50), duration: 0.6, ease: "power2.in", stagger: 0.05 },
            "<+0.1")
            .fromTo(scene3p1SplitTextRef.current.chars,
                { opacity: 1 },
                { opacity: 0, duration: 0.6, ease: "power1.in", stagger: 0.05 },
            "<")

            .fromTo(scene3SmallTextContainerSizerRef.current,
                { height: () => 170 },
                { height: 0, duration: 1.8, ease: "power1.inOut" },
            "0")

            .fromTo(scene3SmallTextContainerRef.current,
                { yPercent: 0 },
                { yPercent: -100, duration: 1.8, ease: "power1.inOut" },
            "<")

            .fromTo(scene3BigTextContainerRef.current,
                { y: 0 },
                { y: () => -2 * scene3SmallTextContainerRef.current.getBoundingClientRect().width, duration: 1.8, ease: "power1.inOut" },
            "<")

            .fromTo(scene3p3n1SplitTextRef.current.chars,
                { opacity: 1, filter: "blur(0px)" },
                { opacity: 0.3, filter: () => `blur(${s(30)}px)`, duration: 4, ease: "power2.in", stagger: 1.6 },
            ">-0.8")



            .fromTo(scene4LogoContainerRefM.current,
                { top: () => (window.innerHeight - scene4LogoContainerRefM.current.getBoundingClientRect().height) / 2,
                    left: () => (window.innerWidth - scene4LogoContainerRefM.current.getBoundingClientRect().width) / 2 },
                { top: () => s(150), left: () => s(150), duration: 4, ease: "power2.out",
                    onUpdate: function() {toggleTlActivity(scene4Tl, scene4LogoHoverTlM, this.endTime(), 0)} },
            "<+1.6")
            .fromTo(scene4pSplitTextRef.current.chars[0],
                { scaleX: 0.5, scaleY: 2, opacity: 0 },
                { scaleX: 1, scaleY: 1, opacity: 1, duration: 2, ease: "power3.out" },
            "<+0.8")
            .fromTo(scene4pAccentRefM.current,
                { opacity: 0, filter: () => `blur(${s(20)}px)` },
                { opacity: 1, filter: "blur(0px)", duration: 1.5, ease: "power2.out" },
            "<")
            .fromTo(scene4pAccentRefM.current,
                { scale: 5 },
                { scale: 1, duration: 2, ease: "power2.out" },
            "<")

            .fromTo([scene4LogoRefML.current, scene4pRefML.current],
                { x: () => s(-60), filter: () => `blur(${s(10)}px)` },
                { x: 0, filter: () => `blur(${s(5)}px)`, duration: 1, ease: "power2.in" },
            "<+0.4")
            .fromTo([scene4LogoRefMR.current, scene4pRefMR.current],
                { x: () => s(60), filter: () => `blur(${s(10)}px)` },
                { x: 0, filter: () => `blur(${s(5)}px)`, duration: 1, ease: "power2.in" },
            "<")
            .fromTo([scene4LogoRefML.current, scene4pRefML.current, scene4LogoRefMR.current, scene4pRefMR.current],
                { opacity: 0 },
                { opacity: 1, duration: 0.8, ease: "power2.in" },
            "<")

            .fromTo([scene4LogoRefM.current, scene4pRefM.current],
                { opacity: 0, filter: `blur(${s(10)}px)` },
                { opacity: 1, filter: "blur(0px)", duration: 1, ease: "power2.in" },
            ">")
            .fromTo([scene4LogoRefML.current, scene4pRefML.current, scene4LogoRefMR.current, scene4pRefMR.current],
                { opacity: 1 },
                { opacity: 0, duration: 0.8, ease: "power2.out" },
            "<")



            .fromTo(scene4LogoContainerRefE.current,
                { top: () => (window.innerHeight - scene4LogoContainerRefE.current.getBoundingClientRect().height) / 2,
                    right: () => (window.innerWidth - scene4LogoContainerRefE.current.getBoundingClientRect().width) / 2 },
                { top: () => s(150), right: () => s(150), duration: 4, ease: "power2.out",
                    onUpdate: function() {toggleTlActivity(scene4Tl, scene4LogoHoverTlE, this.endTime(), 0)} },
            ">+0.2")
            .fromTo(scene4pSplitTextRef.current.chars[1],
                { scaleX: 0, transformOrigin: "left", opacity: 0 },
                { scaleX: 1, opacity: 1, duration: 2, ease: "power2.out" },
            "<+0.8")
            .fromTo(scene4pAccentRefE.current,
                { opacity: 0, filter: () => `blur(${s(20)}px)` },
                { opacity: 1, filter: "blur(0px)", duration: 1.5, ease: "power2.out" },
            "<")
            .fromTo(scene4pAccentRefE.current,
                { scale: 5 },
                { scale: 1, duration: 2, ease: "power2.out" },
            "<")

            .fromTo([scene4LogoRefEL.current, scene4pRefEL.current],
                { x: () => s(-60), filter: () => `blur(${s(10)}px)` },
                { x: 0, filter: () => `blur(${s(5)}px)`, duration: 1, ease: "power2.in" },
            "<+0.4")
            .fromTo([scene4LogoRefER.current, scene4pRefER.current],
                { x: () => s(60), filter: () => `blur(${s(10)}px)` },
                { x: 0, filter: () => `blur(${s(5)}px)`, duration: 1, ease: "power2.in" },
            "<")
            .fromTo([scene4LogoRefEL.current, scene4pRefEL.current, scene4LogoRefER.current, scene4pRefER.current],
                { opacity: 0 },
                { opacity: 1, duration: 0.8, ease: "power2.in" },
            "<")

            .fromTo([scene4LogoRefE.current, scene4pRefE.current],
                { opacity: 0, filter: `blur(${s(10)}px)` },
                { opacity: 1, filter: "blur(0px)", duration: 1, ease: "power2.in" },
            ">")
            .fromTo([scene4LogoRefEL.current, scene4pRefEL.current, scene4LogoRefER.current, scene4pRefER.current],
                { opacity: 1 },
                { opacity: 0, duration: 0.8, ease: "power2.out" },
            "<")



            .fromTo(scene4LogoContainerRefR.current,
                { bottom: () => (window.innerHeight - scene4LogoContainerRefR.current.getBoundingClientRect().height) / 2,
                    left: () => (window.innerWidth - scene4LogoContainerRefR.current.getBoundingClientRect().width) / 2 },
                { bottom: () => s(150), left: () => s(150), duration: 4, ease: "power2.out",
                    onUpdate: function() {toggleTlActivity(scene4Tl, scene4LogoHoverTlR, this.endTime(), 0)} },
            ">+0.2")
            .fromTo(scene4pSplitTextRef.current.chars[2],
                { opacity: 0, filter: () => `blur(${s(40)}px)`, duration: 2, ease: "power2.out" },
                { opacity: 1, filter: "blur(0px)", duration: 2, ease: "power2.out" },
            "<+0.8")
            .fromTo(scene4pAccentRefR.current,
                { opacity: 0, filter: () => `blur(${s(20)}px)` },
                { opacity: 1, filter: "blur(0px)", duration: 1.5, ease: "power2.out" },
            "<")
            .fromTo(scene4pAccentRefR.current,
                { scale: 5 },
                { scale: 1, duration: 2, ease: "power2.out" },
            "<")

            .fromTo([scene4LogoRefRL.current, scene4pRefRL.current],
                { x: () => s(-60), filter: () => `blur(${s(10)}px)` },
                { x: 0, filter: () => `blur(${s(5)}px)`, duration: 1, ease: "power2.in" },
            "<+0.4")
            .fromTo([scene4LogoRefRR.current, scene4pRefRR.current],
                { x: () => s(60), filter: () => `blur(${s(10)}px)` },
                { x: 0, filter: () => `blur(${s(5)}px)`, duration: 1, ease: "power2.in" },
            "<")
            .fromTo([scene4LogoRefRL.current, scene4pRefRL.current, scene4LogoRefRR.current, scene4pRefRR.current],
                { opacity: 0 },
                { opacity: 1, duration: 0.8, ease: "power2.in" },
            "<")

            .fromTo([scene4LogoRefR.current, scene4pRefR.current],
                { opacity: 0, filter: `blur(${s(10)}px)` },
                { opacity: 1, filter: "blur(0px)", duration: 1, ease: "power2.in" },
            ">")
            .fromTo([scene4LogoRefRL.current, scene4pRefRL.current, scene4LogoRefRR.current, scene4pRefRR.current],
                { opacity: 1 },
                { opacity: 0, duration: 0.8, ease: "power2.out" },
            "<")



            .fromTo(scene4LogoContainerRefN.current,
                { bottom: () => (window.innerHeight - scene4LogoContainerRefN.current.getBoundingClientRect().height) / 2,
                    right: () => (window.innerWidth - scene4LogoContainerRefN.current.getBoundingClientRect().width) / 2 },
                { bottom: () => s(150), right: () => s(150), duration: 4, ease: "power2.out",
                    onUpdate: function() {toggleTlActivity(scene4Tl, scene4LogoHoverTlN, this.endTime(), 0)} },
            ">+0.2")
            .fromTo(scene4pSplitTextRef.current.chars[3],
                { x: () => s(100), opacity: 0 },
                { x: 0, opacity: 1, duration: 2, ease: "power2.out" },
            "<+0.8")
            .fromTo(scene4pAccentRefN.current,
                { opacity: 0, filter: () => `blur(${s(20)}px)` },
                { opacity: 1, filter: "blur(0px)", duration: 1.5, ease: "power2.out" },
            "<")
            .fromTo(scene4pAccentRefN.current,
                { scale: 5 },
                { scale: 1, duration: 2, ease: "power2.out" },
            "<")

            .fromTo([scene4LogoRefNL.current, scene4pRefNL.current],
                { x: () => s(-60), filter: () => `blur(${s(10)}px)` },
                { x: 0, filter: () => `blur(${s(5)}px)`, duration: 1, ease: "power2.in" },
            "<+0.4")
            .fromTo([scene4LogoRefNR.current, scene4pRefNR.current],
                { x: () => s(60), filter: () => `blur(${s(10)}px)` },
                { x: 0, filter: () => `blur(${s(5)}px)`, duration: 1, ease: "power2.in" },
            "<")
            .fromTo([scene4LogoRefNL.current, scene4pRefNL.current, scene4LogoRefNR.current, scene4pRefNR.current],
                { opacity: 0 },
                { opacity: 1, duration: 0.8, ease: "power2.in" },
            "<")

            .fromTo([scene4LogoRefN.current, scene4pRefN.current],
                { opacity: 0, filter: `blur(${s(10)}px)` },
                { opacity: 1, filter: "blur(0px)", duration: 1, ease: "power2.in" },
            ">")
            .fromTo([scene4LogoRefNL.current, scene4pRefNL.current, scene4LogoRefNR.current, scene4pRefNR.current],
                { opacity: 1 },
                { opacity: 0, duration: 0.8, ease: "power2.out" },
            "<")

            .fromTo(scene4pSplitTextRef.current.chars[3],
                { rotation: -90 },
                { rotation: 0, duration: 1.2, ease: "power2.inOut" },
            "<-0.4")



            .fromTo(logoRefA.current,
                { x: () => s(-10) },
                { x: () => s(-40), ease: "power2.inOut", duration: 3 },
            "0")
            .fromTo(logoRefDM.current,
                { x: () => s(120), y: () => s(-200) },
                { x: () => s(80), y: () => s(-250), ease: "power1.inOut", duration: 2 },
            "<+0.4")
            .fromTo(logoRefPyramid.current,
                { x: () => s(-20), y: () => s(-450) },
                { x: () => s(300), y: () => s(-300), ease: "power2.inOut", duration: 3 },
            "<+1.25");




        /*-------------------- SCENE 5 TIMELINE --------------------*/

        const scene5Tl = gsap.timeline({ invalidateOnRefresh: true });
        timelines.current.push(scene5Tl);

        scene5Tl
            .set(scene5ContainerRef.current, { opacity: 1 }, "0")

            .fromTo(scene3p3n2SplitTextRef.current.chars,
                { filter: "blur(0px)" },
                { filter: () => `blur(${s(30)}px)`, duration: 0.8, ease: "power2.in", stagger: 0.1 },
            "<")

            .fromTo(scene3p3n2SplitTextRef.current.chars,
                { y: 0 },
                { y: () => s(-300), duration: 1.5, ease: "power2.in", stagger: 0.25 },
            "<")
            .fromTo(scene3p3n2SplitTextRef.current.chars,
                { opacity: 1 },
                { opacity: 0, duration: 1.5, ease: "power1.in", stagger: 0.25 },
            "<")

            .fromTo(scene3p3n1SplitTextRef.current.chars,
                { y: () => 0 },
                { y: () => s(-300), duration: 1.5, ease: "power2.in", stagger: 0.25 },
            "<+0.4")
            .fromTo(scene3p3n1SplitTextRef.current.chars,
                { opacity: 0.3 },
                { opacity: 0, duration: 1.5, ease: "power1.in", stagger: 0.25 },
            "<")

            .fromTo(scene4pSizerContainerRef.current,
                { height: getAutoHeight },
                { height: 0, duration: 2, ease: "power2.inOut" },
            "<")


            .fromTo([...scene5p1SplitTextRef.current.words].reverse(),
                { x: () => s(-200) },
                { x: 0, duration: 3, ease: "power3.out", stagger: 0.3 },
            ">+0.2")
            .fromTo([...scene5p1SplitTextRef.current.words].reverse(),
                { opacity: 0 },
                { opacity: 1, duration: 3, ease: "power1.out", stagger: 0.3 },
            "<")
            .fromTo(scene5p2SplitTextRef.current.words,
                { x: () => s(200) },
                { x: 0, duration: 3, ease: "power3.out", stagger: 0.6 },
            "<")
            .fromTo(scene5p2SplitTextRef.current.words,
                { opacity: 0 },
                { opacity: 1, duration: 3, ease: "power1.out", stagger: 0.6 },
            "<")


            .fromTo(logoRefPyramid.current,
                { x: () => s(300), y: () => s(-300) },
                { x: () => s(60), y: () => s(-500), duration: 6, ease: "power1.inOut" },
            "0")
            .fromTo(logoRefA.current,
                { x: () => s(-40), y: () => s(-20), duration: 5, ease: "power1.inOut" },
                { x: () => s(-120), y: () => s(100), duration: 5, ease: "power1.inOut" },
            "<+1")




        /*-------------------- SCENE 6 TIMELINE --------------------*/

        const scene4pChars1 = [...scene4pSplitTextRef.current.chars];
        const scene4pChars2 = scene4pChars1.splice(Math.round(scene4pChars1.length / 2));

        const scene6Tl = gsap.timeline({ invalidateOnRefresh: true });
        timelines.current.push(scene6Tl);

        scene6Tl
            .set(scene6ContainerRef.current, { opacity: 1 }, "0")
 
            .fromTo(scene4LogoHoverTlM,
                { timeScale: 1 },
                { timeScale: 0, duration: 0.4, ease: "power2.out",
                    onUpdate: function() {toggleTlActivity(scene4Tl, scene4LogoHoverTlM, this?.endTime(), 0)} },
            "<+0.2")
            .fromTo(scene4LogoHoverTlE,
                { timeScale: 1 },
                { timeScale: 0, duration: 0.4, ease: "power2.out",
                    onUpdate: function() {toggleTlActivity(scene4Tl, scene4LogoHoverTlE, this?.endTime(), 0)} },
            "<")
            .fromTo(scene4LogoHoverTlR,
                { timeScale: 1 },
                { timeScale: 0, duration: 0.4, ease: "power2.out",
                    onUpdate: function() {toggleTlActivity(scene4Tl, scene4LogoHoverTlR, this?.endTime(), 0)} },
            "<")
            .fromTo(scene4LogoHoverTlN,
                { timeScale: 1 },
                { timeScale: 0, duration: 0.4, ease: "power2.out",
                    onUpdate: function () {toggleTlActivity(scene4Tl, scene4LogoHoverTlN, this?.endTime(), 0)} },
            "<")



            .fromTo(scene4pAccentRefM.current,
                { opacity: 1, filter: "blur(0px)" },
                { opacity: 0, filter: () => `blur(${s(20)}px)`, duration: 1.5, ease: "power2.in" },
            "<")
            .fromTo(scene4pAccentRefM.current,
                { scale: 1 },
                { scale: 5, duration: 2, ease: "power2.in" },
            "<")

            .fromTo([scene4LogoRefM.current, scene4pRefM.current],
                { opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power2.in" },
                { opacity: 0, filter: () => `blur(${s(10)}px)`, duration: 1.2, ease: "power2.in" },
            "<")
            .fromTo([scene4LogoRefML.current, scene4pRefML.current, scene4LogoRefMR.current, scene4pRefMR.current],
                { opacity: 0 },
                { opacity: 1, duration: 0.8, ease: "power2.in" },
            "<+0.2")

            .fromTo(scene4LogoContainerRefM.current,
                { top: () => s(150), left: () => s(150) },
                { top: () => s(-300), left: () => s(-300), duration: 6, ease: "power2.in" },
            "<+0.6")

            .fromTo([scene4LogoRefML.current, scene4pRefML.current],
                { x: () => s(0), filter: () => `blur(${s(5)}px)`, duration: 4, ease: "power2.in" },
                { x: () => s(-60), filter: () => `blur(${s(10)}px)`, duration: 4, ease: "power2.in" },
            "<-0.5")
            .fromTo([scene4LogoRefMR.current, scene4pRefMR.current],
                { x: () => s(0), filter: () => `blur(${s(5)}px)`, duration: 4, ease: "power2.in" },
                { x: () => s(60), filter: () => `blur(${s(10)}px)`, duration: 4, ease: "power2.in" },
            "<")

            .fromTo([scene4LogoRefML.current, scene4pRefML.current, scene4LogoRefMR.current, scene4pRefMR.current],
                { opacity: 1 },
                { opacity: 0, duration: 3.2, ease: "power2.in" },
            "<+0.8")



            .fromTo(scene4pAccentRefE.current,
                { opacity: 1, filter: "blur(0px)" },
                { opacity: 0, filter: () => `blur(${s(20)}px)`, duration: 1.5, ease: "power2.in" },
            "0.2")
            .fromTo(scene4pAccentRefE.current,
                { scale: 1 },
                { scale: 5, duration: 2, ease: "power2.in" },
            "<")

            .fromTo([scene4LogoRefE.current, scene4pRefE.current],
                { opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power2.in" },
                { opacity: 0, filter: () => `blur(${s(10)}px)`, duration: 1.2, ease: "power2.in" },
            "<")
            .fromTo([scene4LogoRefEL.current, scene4pRefEL.current, scene4LogoRefER.current, scene4pRefER.current],
                { opacity: 0 },
                { opacity: 1, duration: 0.8, ease: "power2.in" },
            "<+0.2")

            .fromTo(scene4LogoContainerRefE.current,
                { top: () => s(150), right: () => s(150) },
                { top: () => s(-300), right: () => s(-300), duration: 6, ease: "power2.in" },
            "<+0.6")

            .fromTo([scene4LogoRefEL.current, scene4pRefEL.current],
                { x: () => s(0), filter: () => `blur(${s(5)}px)`, duration: 4, ease: "power2.in" },
                { x: () => s(-60), filter: () => `blur(${s(10)}px)`, duration: 4, ease: "power2.in" },
            "<-0.5")
            .fromTo([scene4LogoRefER.current, scene4pRefER.current],
                { x: () => s(0), filter: () => `blur(${s(5)}px)`, duration: 4, ease: "power2.in" },
                { x: () => s(60), filter: () => `blur(${s(10)}px)`, duration: 4, ease: "power2.in" },
            "<")

            .fromTo([scene4LogoRefEL.current, scene4pRefEL.current, scene4LogoRefER.current, scene4pRefER.current],
                { opacity: 1 },
                { opacity: 0, duration: 3.2, ease: "power2.in" },
            "<+0.8")



            .fromTo(scene4pAccentRefR.current,
                { opacity: 1, filter: "blur(0px)" },
                { opacity: 0, filter: () => `blur(${s(20)}px)`, duration: 1.5, ease: "power2.in" },
            "0.2")
            .fromTo(scene4pAccentRefR.current,
                { scale: 1 },
                { scale: 5, duration: 2, ease: "power2.in" },
            "<")

            .fromTo([scene4LogoRefR.current, scene4pRefR.current],
                { opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power2.in" },
                { opacity: 0, filter: () => `blur(${s(10)}px)`, duration: 1.2, ease: "power2.in" },
            "<")
            .fromTo([scene4LogoRefRL.current, scene4pRefRL.current, scene4LogoRefRR.current, scene4pRefRR.current],
                { opacity: 0 },
                { opacity: 1, duration: 0.8, ease: "power2.in" },
            "<+0.2")

            .fromTo(scene4LogoContainerRefR.current,
                { bottom: () => s(150), left: () => s(150) },
                { bottom: () => s(-300), left: () => s(-300), duration: 6, ease: "power2.in" },
            "<+0.6")

            .fromTo([scene4LogoRefRL.current, scene4pRefRL.current],
                { x: () => s(0), filter: () => `blur(${s(5)}px)`, duration: 4, ease: "power2.in" },
                { x: () => s(-60), filter: () => `blur(${s(10)}px)`, duration: 4, ease: "power2.in" },
            "<-0.5")
            .fromTo([scene4LogoRefRR.current, scene4pRefRR.current],
                { x: () => s(0), filter: () => `blur(${s(5)}px)`, duration: 4, ease: "power2.in" },
                { x: () => s(60), filter: () => `blur(${s(10)}px)`, duration: 4, ease: "power2.in" },
            "<")

            .fromTo([scene4LogoRefRL.current, scene4pRefRL.current, scene4LogoRefRR.current, scene4pRefRR.current],
                { opacity: 1 },
                { opacity: 0, duration: 3.2, ease: "power2.in" },
            "<+0.8")



            .fromTo(scene4pAccentRefN.current,
                { opacity: 1, filter: "blur(0px)" },
                { opacity: 0, filter: () => `blur(${s(20)}px)`, duration: 1.5, ease: "power2.in" },
            "0.2")
            .fromTo(scene4pAccentRefN.current,
                { scale: 1 },
                { scale: 5, duration: 2, ease: "power2.in" },
            "<")

            .fromTo([scene4LogoRefN.current, scene4pRefN.current],
                { opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power2.in" },
                { opacity: 0, filter: () => `blur(${s(10)}px)`, duration: 1.2, ease: "power2.in" },
            "<")
            .fromTo([scene4LogoRefNL.current, scene4pRefNL.current, scene4LogoRefNR.current, scene4pRefNR.current],
                { opacity: 0 },
                { opacity: 1, duration: 0.8, ease: "power2.in" },
            "<+0.2")

            .fromTo(scene4LogoContainerRefN.current,
                { bottom: () => s(150), right: () => s(150) },
                { bottom: () => s(-300), right: () => s(-300), duration: 6, ease: "power2.in" },
            "<+0.6")

            .fromTo([scene4LogoRefNL.current, scene4pRefNL.current],
                { x: () => s(0), filter: () => `blur(${s(5)}px)`, duration: 4, ease: "power2.in" },
                { x: () => s(-60), filter: () => `blur(${s(10)}px)`, duration: 4, ease: "power2.in" },
            "<-0.5")
            .fromTo([scene4LogoRefNR.current, scene4pRefNR.current],
                { x: () => s(0), filter: () => `blur(${s(5)}px)`, duration: 4, ease: "power2.in" },
                { x: () => s(60), filter: () => `blur(${s(10)}px)`, duration: 4, ease: "power2.in" },
            "<")

            .fromTo([scene4LogoRefNL.current, scene4pRefNL.current, scene4LogoRefNR.current, scene4pRefNR.current],
                { opacity: 1 },
                { opacity: 0, duration: 3.2, ease: "power2.in" },
            "<+0.8")



            .fromTo([...scene5p1SplitTextRef.current.words].reverse(),
                { x: 0 },
                { x: () => s(200), duration: 3, ease: "power3.in", stagger: 0.3 },
            "0.2")
            .fromTo([...scene5p1SplitTextRef.current.words].reverse(),
                { opacity: 1 },
                { opacity: 0, duration: 3, ease: "power1.in", stagger: 0.3 },
            "<")
            .fromTo(scene5p2SplitTextRef.current.words,
                { x: 0 },
                { x: () => s(-200), duration: 3, ease: "power3.in", stagger: 0.6 },
            "<")
            .fromTo(scene5p2SplitTextRef.current.words,
                { opacity: 1 },
                { opacity: 0, duration: 3, ease: "power1.in", stagger: 0.6 },
            "<")

            .fromTo(scene4pChars1,
                { scaleX: 1, opacity: 1, filter: "blur(0px)" },
                { scaleX: 2, opacity: 0, filter: () => `blur(${s(50)}px)`, duration: 3, ease: "power2.in", stagger: 1 },
            "<+1")
            .fromTo([...scene4pChars2].reverse(),
                { scaleX: 1, opacity: 1, filter: "blur(0px)" },
                { scaleX: 2, opacity: 0, filter: () => `blur(${s(50)}px)`, duration: 3, ease: "power2.in", stagger: 1 },
            "<");


        const scene6pSplitTextTl = gsap.timeline({ invalidateOnRefresh: true });
        timelines.current.push(scene6pSplitTextTl);

        scene6pSplitTextRef.current.chars.forEach((char) => {
            const charTl = gsap.timeline({ invalidateOnRefresh: true });

            charTl.fromTo(char,
                { scale: 1.5, opacity: 0, filter: () => `blur(${s(20)}px)` },
                { scale: 1, opacity: 1, filter: "blur(0px)", duration: 2, ease: "power1.inOut" },
            "0");


            const originalChar = char.textContent;

            for (let i = 0; i < scrambleIterations; i++) {
                charTl.set(
                    char,
                    { textContent: i < scrambleIterations - 1
                        ? scrambleCharSet[Math.round(Math.random() * scrambleCharSet.length)]
                        : originalChar
                    },
                    `<+${(i * scrambleIterationStartingTime) ** scrambleIterationExponentCoefficient}`
                );
            }


            scene6pSplitTextTl.add(charTl, "<+0.2");
        });

        scene6Tl
            .add(scene6pSplitTextTl, ">")
            
            .fromTo(logoRefDM.current,
                { x: () => s(80), y: () => s(-250), opacity: 0.05 },
                { x: () => s(-1500), y: () => s(1000), opacity: 0, duration: 9.5, ease: "power2.in" },
            "0")
            .fromTo(logoRefPyramid.current,
                { y: () => s(-500), opacity: 0.05 },
                { y: () => s(-1500), opacity: 0, duration: 8, ease: "power2.in" },
            "<+0.2")
            .fromTo(logoRefA.current,
                { x: () => s(-120), y: () => s(100), opacity: 0.05 },
                { x: () => s(1000), y: () => s(800), opacity: 0, duration: 8.5, ease: "power2.in" },
            "<+0.6");




        /*-------------------- SCENE 7 TIMELINE --------------------*/

        const scene7Tl = gsap.timeline({ invalidateOnRefresh: true });
        timelines.current.push(scene7Tl);

        scene7Tl
            .set(scene7ContainerRef.current, { opacity: 1 }, "0")

            .fromTo(scene7pSplitTextRef.current.chars,
                { scale: 1.5, opacity: 0, filter: () => `blur(${s(100)}px)` },
                { scale: 1, opacity: 0.3, filter: () => `blur(${s(10)}px)`, duration: 2, ease: "power2.in", stagger: 0.1 },
            "<")

            .call(unloadGreetingPage, [], ">+0.2")




        const sceneTls = [
            {
                height: 600,
                tl: scene1Tl
            },

            {
                height: 900,
                tl: scene2Tl
            },

            {
                height: 2700,
                tl: scene3Tl
            },

            {
                height: 3000,
                tl: scene4Tl
            },

            {
                height: 1200,
                tl: scene5Tl
            },

            {
                height: 1200,
                tl: scene6Tl
            },

            {
                height: 1400,
                tl: scene7Tl
            }
        ];



        let scenesHeight = 0;

        sceneTls.forEach((sceneTl) => {
            scenesHeight += sceneTl.height;
        });


        let scenesDuration = 0;

        sceneTls.forEach((sceneTl) => {
            const relativeDuration = sceneTl.height / scenesHeight;

            sceneTl.tl.duration(relativeDuration);
            scenesDuration += relativeDuration;
        });


        
        scrollTl.current = gsap.timeline({
            scrollTrigger: {
                trigger: outerContainerRef.current,
                pin: true,
                start: "top top",
                end: `+=${scenesHeight}`,
                scrub: true
            },

            invalidateOnRefresh: true
        });
        timelines.current.push(scrollTl.current);
        
        sceneTls.forEach((sceneTl) => {
            scrollTl.current
                .add(sceneTl.tl, ">");
        });

        scrollTl.current
            .fromTo(logoContainerRef.current,
                { rotation: logoRotationPerPixel * 1200 },
                { rotation: `+=${logoRotationPerPixel * (scenesHeight - sceneTls[0].height)}`, ease: "none", duration: scenesDuration },
            sceneTls[0].height / scenesHeight);


        ScrollTrigger.refresh();

        requestAnimationFrame(() => {
            lenis.current.start();
            lenis.current.resize();

            if (restoreProgress !== undefined) {
                const st = scrollTl.scrollTrigger;
                const targetScroll = st.start + restoreProgress * (st.end - st.start);

                lenis.current.scrollTo(targetScroll, { immediate: true });
            }
        });
    }



    const loadLogo = () => {
        logoTextSplitTextRef.current = SplitText.create(logoTextRef.current, { type: "chars" });

        scene2p1SplitTextRef.current = SplitText.create(scene2p1Ref.current, { type: "chars" });
        scene2p2SplitTextRef.current = SplitText.create(scene2p2Ref.current, { type: "chars" });

        scene3p1SplitTextRef.current = SplitText.create(scene3p1Ref.current, { type: "chars" });
        scene3p2SplitTextRef.current = SplitText.create(scene3p2Ref.current, { type: "words, chars" });
        scene3p3n1SplitTextRef.current = SplitText.create(scene3p3n1Ref.current, { type: "chars" });
        scene3p3n2SplitTextRef.current = SplitText.create(scene3p3n2Ref.current, { type: "chars" });

        scene4pSplitTextRef.current = SplitText.create(scene4pRef.current, { type: "chars" });

        scene5p1SplitTextRef.current = SplitText.create(scene5p1Ref.current, { type: "words" });
        scene5p2SplitTextRef.current = SplitText.create(scene5p2Ref.current, { type: "words" });

        scene6pSplitTextRef.current = SplitText.create(scene6pRef.current, { type: "chars" });

        scene7pSplitTextRef.current = SplitText.create(scene7pRef.current, { type: "chars" });



        gsap.set(logoTextSplitTextRef.current.chars, { scaleY: 0, transformOrigin: "top", opacity: 0 });

        gsap.set(scene2p1SplitTextRef.current.chars, { x: s(100), opacity: 0 });
        gsap.set(scene2p2SplitTextRef.current.chars, { skewY: 60, opacity: 0, filter: `blur(${s(5)}px)` });

        gsap.set(scene3p1SplitTextRef.current.chars, { x: s(175), opacity: 0, filter: `blur(${s(7)}px)` });
        gsap.set(scene3p2SplitTextRef.current.words, { scaleY: 0, transformOrigin: "bottom", opacity: 0 });
        gsap.set(scene3p3n1SplitTextRef.current.chars, { scaleY: 0, transformOrigin: "top", opacity: 0 });
        gsap.set(scene3p3n2SplitTextRef.current.chars, { scaleY: 0, transformOrigin: "top", opacity: 0 });

        gsap.set(scene4pSplitTextRef.current.chars[0], { scaleX: 0.5, scaleY: 2, opacity: 0 });
        gsap.set(scene4pSplitTextRef.current.chars[1], { scaleX: 0, transformOrigin: "left", opacity: 0 });
        gsap.set(scene4pSplitTextRef.current.chars[2], { opacity: 0, filter: `blur(${s(40)}px)` });
        gsap.set(scene4pSplitTextRef.current.chars[3], { x: s(100), rotation: -90, opacity: 0 });

        gsap.set(scene5p1SplitTextRef.current.words, { x: s(-200), opacity: 0 });
        gsap.set(scene5p2SplitTextRef.current.words, { x: s(200), opacity: 0 });

        gsap.set(scene6pSplitTextRef.current.chars, { scale: 1.5, opacity: 0, filter: `blur(${s(20)}px)` });

        gsap.set(scene7pSplitTextRef.current.chars, { scale: 1.5, opacity: 0, filter: `blur(${s(100)}px)` });



        const tl = gsap.timeline({ onComplete: createScrollTrigger });
        timelines.current.push(tl);

        tl
            .set(scene1ContainerRef.current, { opacity: 1 }, "0")

            .to(containerRef.current, { scaleY: 1, duration: 0.8, ease: "power2.in" }, animationStart)
            .to(containerRef.current, { filter: "brightness(100%) contrast(100%)", duration: 0.8, ease: "power1.out" }, "<")
            .set(containerOverlayerRef.current, { opacity: 0 }, "<")

            .to(outerContainerRef.current, { background: "linear-gradient(rgb(0, 0, 0) 48%, rgb(125, 125, 125) 50%, rgb(0, 0, 0) 52%)", duration: 0.1, ease: "none" }, "<")
            .to(outerContainerRef.current, { background: "linear-gradient(rgb(0, 0, 0) 40%, rgb(100, 100, 100) 50%, rgb(0, 0, 0) 60%)", duration: 0.25, ease: "power2.in" }, ">")
            .to(outerContainerRef.current, { background: "linear-gradient(rgb(0, 0, 0) 0%, rgb(5, 5, 5) 50%, rgb(0, 0, 0) 100%)", duration: 0.45, ease: "none" }, ">")


            .addLabel("screenOn", ">")


            .to(logoRefDM.current, { x: 0, y: 0, scaleX: 1, scaleY: 1, duration: 0.8, ease: "power2.out" }, "screenOn")
            .to(logoRefDM.current, { opacity: 1, duration: 0.8, ease: "power2.in" }, "<")

            .to(logoRefPyramid.current, { y: 0, opacity: 1, duration: 1, ease: "power2.in" }, "<+0.2")
            .to(logoRefPyramid.current, { y: s(-10), duration: 0.3, ease: "power1.out" }, ">")
            .to(logoRefPyramid.current, { y: 0, duration: 0.3, ease: "power1.in" }, ">")

            .to(logoRefA.current, { x: 0, y: 0, scaleX: 1, scaleY: 1, duration: 0.8, ease: "power2.out" }, "screenOn+=0.4")
            .to(logoRefA.current, { opacity: 1, duration: 0.8, ease: "power2.in" }, "<")


            .to(logoTextSplitTextRef.current.chars, { scaleY: 1.05, opacity: 1, duration: 0.4, ease: "power2.out", stagger: 0.04 }, ">+0.4")
            .to(logoTextSplitTextRef.current.chars, { scaleY: 1, duration: 0.2, ease: "power2.in", stagger: 0.04 }, "<+0.4")
            .to(logoTextSplitTextRef.current.chars, { color: styles.redLight, duration: 0.6, ease: "power2.in", stagger: 0.04 }, "<");
    }



    const unloadGreetingPage = () => {
        const tl = gsap.timeline({ onComplete: () => navigate("/", { state: { mainPage: "Win95Main" } }) });

        timelines.current.push(tl);

        tl
            .set("body", { pointerEvents: "none" })
            
            .to(containerRef.current, { scaleY: 0, duration: 0.8, ease: "power2.out" }, "<")
            .to(containerRef.current, { filter: "brightness(1000%) contrast(10%)", duration: 0.8, ease: "power1.out" }, "<")
            .to(containerOverlayerRef.current, { opacity: 0, duration: 0.8, ease: "power1.out" }, "<")

            .to(outerContainerRef.current, { background: "linear-gradient(rgb(0, 0, 0) 40%, rgb(100, 100, 100) 50%, rgb(0, 0, 0) 60%)", duration: 0.45, ease: "none" }, "<")
            .to(outerContainerRef.current, { background: "linear-gradient(rgb(0, 0, 0) 49%, rgb(125, 125, 125) 50%, rgb(0, 0, 0) 51%)", duration: 0.25, ease: "power2.out" }, ">")
            .to(outerContainerRef.current, { background: "linear-gradient(rgb(0, 0, 0) 49.5%, rgb(0, 0, 0) 50%, rgb(0, 0, 0) 50.5%)", duration: 0.1, ease: "power3.out" }, ">")
    }





    /*███████████████ EFFECTS ████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████*/

    useLayoutEffect(() => {
        prepLogo();
    }, []);



    useEffect(() => {
        let ctx;
        let cancelled = 0;

        document.fonts.ready.then(() => {
            if (cancelled) return;

            ctx = gsap.context(loadLogo);
        });

        return () => {
            cancelled = 1;

            lenis.current?.stop();

            timelines.current.forEach((timeline) => timeline.kill());
            timelines.current = [];

            ctx?.revert();

            ScrollTrigger.killAll();
        }
    }, []);



    useEffect(() => {
        const handleRefresh = () => {
            scrollTl.current?.invalidate();
        };

        ScrollTrigger.addEventListener("refresh", handleRefresh);

        return () => ScrollTrigger.removeEventListener("refresh", handleRefresh);
    }, []);



    useEffect(() => {
        document.body.classList.add("scroller-body");

        return () => document.body.classList.remove("scroller-body");
    }, []);



    useEffect(() => {
        lenis.current = new Lenis({
            lerp: 0.05,
            autoRaf: false
        });

        const update = (time) => {
            lenis.current.raf(time * 1000);
        }

        lenis.current.on("scroll", ScrollTrigger.update);

        gsap.ticker.add(update);
        gsap.ticker.lagSmoothing(0);

        lenis.current.stop();


        return () => {
            gsap.ticker.remove(update);
            lenis.current.destroy();
        }
    }, []);





    /*███████████████ RETURN █████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████*/

    return (
        <div className={styles["scroller-container"]}>
            <div className={styles["outer-container"]} ref={outerContainerRef}>
                <div className={styles["container"]} ref={containerRef}>
                    <div className={styles["container-overlayer"]} ref={containerOverlayerRef} />

                    <div className={styles["scene-container"]} ref={scene1ContainerRef}>
                        <div className={styles["logo-outer-container"]}>
                            <div className={styles["logo-spacer"]} />

                            <div className={styles["logo-container"]} ref={logoContainerRef}>
                                <DMAlogoV2PartDM className={styles["logo-part"]} ref={logoRefDM} />
                                <DMAlogoV2PartA className={styles["logo-part"]} ref={logoRefA} />
                                <DMAlogoV2PartPyramid className={styles["logo-part-pyramid"]} ref={logoRefPyramid} />
                                <DMAlogoV2PartOverlayer className={styles["logo-part-overlayer"]} ref={logoRefOverlayer} />
                            </div>

                            <div className={styles["logo-overlayer"]} ref={overlayerRef}>
                                <p className={styles["logo-p"]} ref={logoTextRef}>SCROLL DOWNWARDS</p>
                            </div>
                        </div>
                    </div>



                    <div className={styles["scene-container"]} ref={scene2ContainerRef}>
                        <div className={styles["scene-2-text-container"]}>
                            <p className={styles["scene-2-p-1"]} ref={scene2p1Ref}>Hey there!</p>
                            <p className={styles["scene-2-p-2"]} ref={scene2p2Ref}>I'M PCDANIL_MYAGKIY</p>
                        </div>
                    </div>



                    <div className={styles["scene-container"]} ref={scene3ContainerRef}>
                        <div className={styles["scene-3-text-container"]} ref={scene3TextContainerRef}>
                            <div className={styles["scene-3-text-container-sizer"]}>
                                <div className={styles["scene-3-small-text-container"]} ref={scene3SmallTextContainerSizerRef}>
                                    <p className={styles["scene-3-p-1"]}>A young web developer</p>
                                    <p className={styles["scene-3-p-2"]}>who specializes in</p>
                                </div>

                                <div className={styles["scene-3-big-text-container"]} ref={scene3BigTextContainerSizerRef}>
                                    <p className={styles["scene-3-p-3"]}>FULL-</p>
                                    <p className={styles["scene-3-p-3"]}>STACK</p>
                                </div>
                            </div>

                            <div className={styles["scene-3-text-content"]}>
                                <div className={styles["scene-3-small-text-container"]} ref={scene3SmallTextContainerRef}>
                                    <p className={styles["scene-3-p-1"]} ref={scene3p1Ref}>A young web developer</p>
                                    <p className={styles["scene-3-p-2"]} ref={scene3p2Ref}>who specializes in</p>
                                </div>

                                <div className={styles["scene-3-big-text-container"]} ref={scene3BigTextContainerRef}>
                                    <p className={styles["scene-3-p-3"]} ref={scene3p3n1Ref}>FULL-</p>
                                    <p className={styles["scene-3-p-3"]} ref={scene3p3n2Ref}>STACK</p>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className={styles["scene-container"]} ref={scene4ContainerRef}>
                        <div className={styles["scene-4-text-container"]}>
                            <p className={styles["scene-4-p-1"]} ref={scene4pRef}>M E R N</p>

                            <div className={styles["scene-4-p-sizer-container"]} ref={scene4pSizerContainerRef}>
                                <p className={styles["scene-4-p-1-sizer"]}>M E R N</p>
                            </div>
                        </div>

                        <div className={styles["scene-4-logo-container"]} ref={scene4LogoContainerRefM}>
                            <div className={styles["scene-4-logo-inner-container"]} ref={scene4LogoInnerContainerRefM}>
                                <MongoDBLogo className={styles["scene-4-logo"]} ref={scene4LogoRefM} />
                                <MongoDBLogo className={styles["scene-4-logo-lr"]} ref={scene4LogoRefML} />
                                <MongoDBLogo className={styles["scene-4-logo-lr"]} ref={scene4LogoRefMR} />

                                <div className={styles["scene-4-logo-p-container"]}>
                                    <p className={styles["scene-4-logo-p"]}>
                                        <span className={styles["scene-4-logo-p-accent"]} ref={scene4pAccentRefM}>M</span>

                                        <span className={styles["scene-4-logo-p-accent-sizer"]}>M</span>
                                        
                                        <span className={styles["scene-4-logo-p-inner"]} ref={scene4pRefM}>ongoDB</span>

                                        <span className={styles["scene-4-logo-p-lr-container"]}>
                                            <span className={styles["scene-4-logo-p-lr"]} ref={scene4pRefML}>ongoDB</span>
                                            <span className={styles["scene-4-logo-p-lr"]} ref={scene4pRefMR}>ongoDB</span>
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className={styles["scene-4-logo-container"]} ref={scene4LogoContainerRefE}>
                            <div className={styles["scene-4-logo-inner-container"]} ref={scene4LogoInnerContainerRefE}>
                                <ExpressLogo className={styles["scene-4-logo"]} ref={scene4LogoRefE} />
                                <ExpressLogo className={styles["scene-4-logo-lr"]} ref={scene4LogoRefEL} />
                                <ExpressLogo className={styles["scene-4-logo-lr"]} ref={scene4LogoRefER} />

                                <div className={styles["scene-4-logo-p-container"]}>
                                    <p className={styles["scene-4-logo-p"]}>
                                        <span className={styles["scene-4-logo-p-accent"]} ref={scene4pAccentRefE}>E</span>

                                        <span className={styles["scene-4-logo-p-accent-sizer"]}>E</span>
                                        
                                        <span className={styles["scene-4-logo-p-inner"]} ref={scene4pRefE}>xpress</span>

                                        <span className={styles["scene-4-logo-p-lr-container"]}>
                                            <span className={styles["scene-4-logo-p-lr"]} ref={scene4pRefEL}>xpress</span>
                                            <span className={styles["scene-4-logo-p-lr"]} ref={scene4pRefER}>xpress</span>
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className={styles["scene-4-logo-container"]} ref={scene4LogoContainerRefR}>
                            <div className={styles["scene-4-logo-inner-container"]} ref={scene4LogoInnerContainerRefR}>
                                <ReactLogo className={styles["scene-4-logo"]} ref={scene4LogoRefR} />
                                <ReactLogo className={styles["scene-4-logo-lr"]} ref={scene4LogoRefRL} />
                                <ReactLogo className={styles["scene-4-logo-lr"]} ref={scene4LogoRefRR} />

                                <div className={styles["scene-4-logo-p-container"]}>
                                    <p className={styles["scene-4-logo-p"]}>
                                        <span className={styles["scene-4-logo-p-accent"]} ref={scene4pAccentRefR}>R</span>

                                        <span className={styles["scene-4-logo-p-accent-sizer"]}>R</span>
                                        
                                        <span className={styles["scene-4-logo-p-inner"]} ref={scene4pRefR}>eact</span>

                                        <span className={styles["scene-4-logo-p-lr-container"]}>
                                            <span className={styles["scene-4-logo-p-lr"]} ref={scene4pRefRL}>eact</span>
                                            <span className={styles["scene-4-logo-p-lr"]} ref={scene4pRefRR}>eact</span>
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className={styles["scene-4-logo-container"]} ref={scene4LogoContainerRefN}>
                            <div className={styles["scene-4-logo-inner-container"]} ref={scene4LogoInnerContainerRefN}>
                                <NodeJSLogo className={styles["scene-4-logo"]} ref={scene4LogoRefN} />
                                <NodeJSLogo className={styles["scene-4-logo-lr"]} ref={scene4LogoRefNL} />
                                <NodeJSLogo className={styles["scene-4-logo-lr"]} ref={scene4LogoRefNR} />

                                <div className={styles["scene-4-logo-p-container"]}>
                                    <p className={styles["scene-4-logo-p"]}>
                                        <span className={styles["scene-4-logo-p-accent"]} ref={scene4pAccentRefN}>N</span>

                                        <span className={styles["scene-4-logo-p-accent-sizer"]}>N</span>
                                        
                                        <span className={styles["scene-4-logo-p-inner"]} ref={scene4pRefN}>odeJS</span>

                                        <span className={styles["scene-4-logo-p-lr-container"]}>
                                            <span className={styles["scene-4-logo-p-lr"]} ref={scene4pRefNL}>odeJS</span>
                                            <span className={styles["scene-4-logo-p-lr"]} ref={scene4pRefNR}>odeJS</span>
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className={styles["scene-container"]} ref={scene5ContainerRef}>
                        <div className={styles["scene-4-text-container"]}>
                            <p className={styles["scene-5-p-1"]} ref={scene5p1Ref}>AND THIS IS MY PERSONAL</p>

                            <div className={styles["scene-4-p-sizer-container"]}>
                                <p className={styles["scene-4-p-1-sizer"]}>M E R N</p>
                            </div>

                            <p className={styles["scene-5-p-2"]} ref={scene5p2Ref}>Portfolio Website</p>
                        </div>
                    </div>



                    <div className={styles["scene-container"]} ref={scene6ContainerRef}>
                        <div className={styles["scene-4-text-container"]}>
                            <p className={styles["scene-6-p"]} ref={scene6pRef}>pcdanilmyagkiy.com</p>
                        </div>
                    </div>



                    <div className={styles["scene-container"]} ref={scene7ContainerRef}>
                        <div className={styles["scene-4-text-container"]}>
                            <p className={styles["scene-7-p"]} ref={scene7pRef}>WELCOME</p>
                        </div>
                    </div>



                    <StaticLayer opacity={0.8} className={styles["static-layer"]} />
                </div>
            </div>
        </div>
    );
}