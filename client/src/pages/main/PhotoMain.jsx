import { useEffect, useLayoutEffect, forwardRef, useImperativeHandle, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

import styles from "./PhotoMain.module.scss";

import { s } from "./../../utils/scale.js";

import workplacePhoto from "./../../assets/MainPage/PhotoMain/workplacePhoto.png";
import workplacePhotoGlow from "./../../assets/MainPage/PhotoMain/workplacePhotoGlow.png";
import workplacePhotoLogo from "./../../assets/MainPage/PhotoMain/workplacePhotoLogo.png";
import ParagraphBg from "./../../assets/MainPage/PhotoMain/ParagraphBg.svg?react"

gsap.registerPlugin(SplitText);



const loadAnimStart = 0.5;



const PhotoMain = forwardRef((props, ref) => {

    /*███████████████ DECLARATION ████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████*/

    const photoMainLoadingOrUnloading = useRef(0);


    const containerRef = useRef(null);
    const innerContainerRef = useRef(null);
    const bgPhotoRef = useRef(null);
    const bgPhotoGlowRef = useRef(null);
    const bgPhotoLogoRef = useRef(null);

    const headerContainerRef = useRef(null);
    const headerHeaderRef = useRef(null);
    const headerHeaderSplitTextRef = useRef(null);
    const headerSubheaderRef = useRef(null);
    const headerSubheaderSplitTextRef = useRef(null);

    const paragraphContainerRef = useRef(null);
    const paragraphHeaderRef = useRef(null);
    const paragraphHeaderSplitTextRef = useRef(null);
    const linkboxRefs = useRef([]);
    const linkboxTextRefs = useRef([]);
    const linkboxSplitTextRefs = useRef([]);


    const buttonRefs = useRef([]);
    const buttonTextRefs = useRef([]);
    const buttonSplitTextRefs = useRef([]);





    /*███████████████ COMPONENT MANAGEMENT ███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████*/

    const prepPhotoMain = () => {
        if (photoMainLoadingOrUnloading.current) return;

        gsap.set(innerContainerRef.current, { opacity: 0 });

        gsap.set(containerRef.current, { backgroundColor: "rgb(0, 0, 0)" });
        gsap.set(bgPhotoRef.current, { opacity: 0 });
        gsap.set(bgPhotoGlowRef.current, { opacity: 0 });
        gsap.set(bgPhotoLogoRef.current, { opacity: 0 });

        gsap.set(headerContainerRef.current, { y: window.innerHeight / 2 - s(80) - headerContainerRef.current.getBoundingClientRect().top });
        gsap.set(paragraphContainerRef.current, { opacity: 0, filter: "blur(30px)" });
        gsap.set(linkboxRefs.current, { width: 0, opacity: 0, transformOrigin: "right" });


        gsap.set(buttonRefs.current[buttonRefs.current.length - 1], { backgroundColor: styles.bgLight });
        gsap.set(buttonRefs.current, { height: 0, opacity: 0 });
    }

    const loadPhotoMain = () => {
        if (photoMainLoadingOrUnloading.current) return;
        photoMainLoadingOrUnloading.current = 1;

        

        document.fonts.ready.then(() => {
            headerHeaderSplitTextRef.current = SplitText.create(headerHeaderRef.current, { type: "chars" });
            headerSubheaderSplitTextRef.current = SplitText.create(headerSubheaderRef.current, { type: "words" });
            paragraphHeaderSplitTextRef.current = SplitText.create(paragraphHeaderRef.current, { type: "words" });

            linkboxSplitTextRefs.current = linkboxTextRefs.current.map((linkboxText) => {
                return SplitText.create(linkboxText, { type: "chars" });
            });

            buttonSplitTextRefs.current = buttonTextRefs.current.map((buttonText) => {
                return SplitText.create(buttonText, { type: "chars" });
            });



            gsap.set(headerHeaderSplitTextRef.current.chars, { y: s(150), opacity: 0, filter: "blur(15px)", color: styles.bgNormal });
            gsap.set(headerSubheaderSplitTextRef.current.words, { scaleY: 0, transformOrigin: "bottom", opacity: 0, color: styles.bgNormal });
            gsap.set(paragraphHeaderSplitTextRef.current.words, { x: s(-80), opacity: 0 });

            linkboxSplitTextRefs.current.forEach((linkboxSplitText, id) => {
                gsap.set(linkboxSplitText.chars, { x: id % 2 ? s(-100) : s(100), opacity: 0 });
            });

            gsap.set(buttonSplitTextRefs.current[buttonSplitTextRefs.current.length - 1].chars, { color: styles.accentNormal });
            
            buttonSplitTextRefs.current.forEach((buttonSplitText) => {
                gsap.set(buttonSplitText.chars, { opacity: 0 });
            });


            gsap.set(innerContainerRef.current, { opacity: 1 });



            const loadTl = gsap.timeline({ onComplete: () => photoMainLoadingOrUnloading.current = 0 });

            loadTl
                .to(bgPhotoRef.current, { opacity: 1, duration: 1.6, ease: "power2.in" }, loadAnimStart)
                .to(containerRef.current, { backgroundColor: styles.accentNormal, duration: 0.8, ease: "power2.in" }, "<+0.6")
                .to(bgPhotoGlowRef.current, { opacity: 1, duration: 0.8, ease: "power2.in" }, "<")


                .addLabel("flashPeak", ">")


                .to(headerHeaderSplitTextRef.current.chars, { y: 0, duration: 0.6, ease: "power2.out", stagger: 0.03 }, "flashPeak-=0.4")
                .to(headerHeaderSplitTextRef.current.chars, { opacity: 1, filter: "blur(0px)", ease: "power1.out", stagger: 0.03 }, "<")

                .to(headerSubheaderSplitTextRef.current.words, { scaleY: 1, duration: 0.6, ease: "power2.out", stagger: 0.06 }, "<+0.6")
                .to(headerSubheaderSplitTextRef.current.words, { opacity: 1, duration: 0.6, ease: "power1.out", stagger: 0.06 }, "<")


                .to(buttonRefs.current, { height: "100%", duration: 0.5, ease: "power2.out", stagger: 0.2 }, "flashPeak+=0.8")
                .to(buttonRefs.current, { opacity: 1, duration: 0.5, ease: "power1.out", stagger: 0.2 }, "<")
                .to(buttonRefs.current.slice(0, -1), { height: "80%", duration: 0.4, ease: "power1.inOut", stagger: 0.2 }, "<+0.5")

                .to(buttonRefs.current[buttonRefs.current.length - 1], {
                    backgroundColor: styles.accentNormal, duration: 0.4, ease: "power1.inOut"
                }, `<+${0.2 * (buttonRefs.current.length - 1)}`)
                .to(buttonSplitTextRefs.current[buttonSplitTextRefs.current.length - 1].chars, {
                    color: styles.bgLight, duration: 0.4, ease: "power1.inOut"
                }, "<");


            buttonSplitTextRefs.current.forEach((buttonSplitText, id) => {
                loadTl.to(buttonSplitText.chars, { opacity: 1, duration: 0.6, ease: "power1.out", stagger: 0.05 }, id ? "<+0.2" : "flashPeak+=1")
            });



            loadTl
                .to(containerRef.current, { backgroundColor: styles.bgNormal, duration: 1.6, ease: "power1.out" }, "flashPeak+=0.1")
                .to(headerHeaderSplitTextRef.current.chars, { color: styles.accentNormal, duration: 1.6, ease: "power3.in" }, "<")
                .to(headerSubheaderSplitTextRef.current.words, { color: styles.accentNormal, duration: 1.6, ease: "power3.in" }, "<")

                .to(bgPhotoLogoRef.current, { opacity: 1, duration: 0.6, ease: "power3.in" }, "<")
                .to(headerContainerRef.current, { y: 0, duration: 1, ease: "power1.inOut" }, "<+0.2")
                .to(paragraphContainerRef.current, { opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "power2.out" }, "<+0.4")


                .to([...paragraphHeaderSplitTextRef.current.words].reverse(), { x: 0, duration: 0.6, ease: "power2.out", stagger: 0.05 }, ">-0.3")
                .to([...paragraphHeaderSplitTextRef.current.words].reverse(), { opacity: 1, duration: 0.6, ease: "power1.out", stagger: 0.05 }, "<")

                .to(linkboxRefs.current, { width: "100%", duration: 0.8, ease: "power2.out", stagger: 0.2 }, "<+0.3")
                .to(linkboxRefs.current, { opacity: 1, duration: 0.8, ease: "power1.out", stagger: 0.2 }, "<");

                linkboxSplitTextRefs.current.forEach((linkboxSplitText, id) => {
                    loadTl
                        .to(id % 2 ? [...linkboxSplitText.chars].reverse() : linkboxSplitText.chars, { x: 0, duration: 0.5, ease: "power2.out", stagger: 0.02 }, "<+0.2")
                        .to(id % 2 ? [...linkboxSplitText.chars].reverse() : linkboxSplitText.chars, { opacity: 1, duration: 0.5, ease: "power1.out", stagger: 0.02 }, "<");
                });
            });
    }

    useImperativeHandle(ref, () => ({
        prepPhotoMain,
        loadPhotoMain,
    }));




    const unloadPhotoMain = (endFunction, buttonId) => {
        if (photoMainLoadingOrUnloading.current) return;
        photoMainLoadingOrUnloading.current = 1;


        const unloadTl = gsap.timeline({ onComplete: endFunction });

        unloadTl
            .to(buttonRefs.current[buttonId], { backgroundColor: styles.accentNormal, duration: 0.5, ease: "power2.out" }, "0")
            .to(buttonSplitTextRefs.current[buttonId].chars, { color: styles.bgNormal, duration: 0.5, ease: "power2.out" }, "<")

            .to(buttonRefs.current[buttonRefs.current.length - 1], { height: s(40), backgroundColor: styles.bgLight, duration: 0.5, ease: "power2.out" }, "<")
            .to(buttonSplitTextRefs.current[buttonSplitTextRefs.current.length - 1].chars, { color: styles.accentNormal, duration: 0.5, ease: "power2.out" }, "<");


        buttonRefs.current.forEach((button, id) => {
            if (id !== buttonId) {
                unloadTl.to(button, { height: "100%", duration: 0.4, ease: "power1.inOut" }, (id + 1) * 0.2)
            } else {
                unloadTl.to(button, { backgroundColor: styles.bgLight, duration: 0.4, ease: "power1.inOut" }, (id + 1) * 0.2)
                unloadTl.to(buttonSplitTextRefs.current[id].chars, { color: styles.accentNormal, duration: 0.4, ease: "power1.inOut" }, "<")
            }


            unloadTl
                .to(button, { height: 0, duration: 0.5, ease: "power2.in" }, ">")
                .to(button, { opacity: 0, duration: 0.5, ease: "power1.in" }, "<")
        });


        buttonSplitTextRefs.current.forEach((buttonSplitText, id) => {
            unloadTl.to(buttonSplitText.chars, { opacity: 0, duration: 0.4, ease: "power1.in", stagger: 0.05 }, id ? "<+0.2" : "0.3")
        });


        unloadTl
            .to([...paragraphHeaderSplitTextRef.current.words].reverse(), { x: s(80), duration: 0.6, ease: "power2.in", stagger: 0.05 }, "0.5")
            .to([...paragraphHeaderSplitTextRef.current.words].reverse(), { opacity: 0, duration: 0.6, ease: "power1.in", stagger: 0.05 }, "<")

            .to(linkboxRefs.current, { width: 0, duration: 0.6, ease: "power2.in", stagger: 0.2 }, "<+0.3")
            .to(linkboxRefs.current, { opacity: 0, duration: 0.6, ease: "power1.in", stagger: 0.2 }, "<");


        linkboxSplitTextRefs.current.forEach((linkboxSplitText, id) => {
            unloadTl
                .to(id % 2 ? linkboxSplitText.chars : [...linkboxSplitText.chars].reverse(), {
                    x: id % 2 ? s(-100) : s(100), duration: 0.5, ease: "power2.in", stagger: 0.02
                }, id ? "<+0.2" : "<-0.3")
                .to(id % 2 ? linkboxSplitText.chars : [...linkboxSplitText.chars].reverse(), { opacity: 0, duration: 0.5, ease: "power1.in", stagger: 0.02 }, "<");
        });


        unloadTl
            .to(paragraphContainerRef.current, { opacity: 0, filter: "blur(30px)", duration: 0.8, ease: "power2.in" }, "<+0.4")
            .to(headerContainerRef.current, {
                y: window.innerHeight / 2 - s(80) - headerContainerRef.current.getBoundingClientRect().top, duration: 1, ease: "power1.inOut"
            }, "<+0.2")
            .to(bgPhotoLogoRef.current, { opacity: 0, duration: 0.6, ease: "power3.in" }, "<")

            .to(containerRef.current, { backgroundColor: styles.accentNormal, duration: 0.8, ease: "power1.in" }, "<")
            .to(headerHeaderSplitTextRef.current.chars, { color: styles.bgNormal, duration: 0.8, ease: "power3.out" }, "<")
            .to(headerSubheaderSplitTextRef.current.words, { color: styles.bgNormal, duration: 0.8, ease: "power3.out" }, "<")
            .to(containerRef.current, { backgroundColor: "rgb(0, 0, 0)", duration: 1.6, ease: "power1.inOut" }, ">")
            .to(bgPhotoGlowRef.current, { opacity: 0, duration: 1.6, ease: "power1.inOut" }, "<")
            .to(bgPhotoRef.current, { opacity: 0, duration: 1.6, ease: "power2.in" }, "<+0.3")
            
            .to([...headerHeaderSplitTextRef.current.chars].reverse(), { y: s(150), duration: 0.6, ease: "power2.in", stagger: 0.03 }, "<-0.8")
            .to([...headerHeaderSplitTextRef.current.chars].reverse(), { opacity: 0, filter: "blur(15px)", ease: "power1.in", stagger: 0.03 }, "<")

            .to([...headerSubheaderSplitTextRef.current.words].reverse(), { scaleY: 0, duration: 0.6, ease: "power2.in", stagger: 0.06 }, "<+0.6")
            .to([...headerSubheaderSplitTextRef.current.words].reverse(), { opacity: 0, duration: 0.6, ease: "power1.in", stagger: 0.06 }, "<")
    }





    /*███████████████ LINKBOXES ██████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████*/

    const linkboxesData = [
        {
            text: "dma@pcdanilmyagkiy.com",
            link: "mailto:dma@pcdanilmyagkiy.com",
            external: 0
        },

        {
            text: "GitHub profile",
            link: "https://github.com/PCDanilMyagkiy",
            external: 1
        },

        {
            text: "Open-source project repo",
            link: "https://github.com/PCDanilMyagkiy/pcdanilmyagkiy.com",
            external: 1
        },

        {
            text: "No LinkedIn yet",
            link: "https://github.com/PCDanilMyagkiy",
            external: 1
        },
    ];



    const linkboxEnterAnim = (id) => {
        if (photoMainLoadingOrUnloading.current) return;

        gsap.to(linkboxRefs.current[id], { backgroundColor: styles.bgLight, duration: 0.4, ease: "power2.out" });
    }


    const linkboxLeaveAnim = (id) => {
        if (photoMainLoadingOrUnloading.current) return;

        gsap.to(linkboxRefs.current[id], { backgroundColor: styles.bgNormal, duration: 0.4, ease: "power2.in" });
    }



    const createLinkboxes = () => {
        const linkboxes = [];

        linkboxesData.forEach((linkboxData, id) => {
            linkboxes.push(
                <div className={styles["linkbox-container"]} key={id}>
                    <a className={id % 2 ? styles["linkbox-inverse"] : styles["linkbox"]} ref={(el) => linkboxRefs.current[id] = el}
                        href={linkboxData.link} target={linkboxData.external ? "_blank" : undefined} rel={linkboxData.external ? "noopener noreferrer" : undefined}
                        onMouseEnter={() => linkboxEnterAnim(id)} onMouseLeave={() => linkboxLeaveAnim(id)}
                    >
                        <p className={styles["linkbox-font"]} ref={(el) => linkboxTextRefs.current[id] = el}>{linkboxData.text}</p>
                    </a>

                    <div className={styles["linkbox-sizer"]}>
                        <p className={styles["linkbox-font"]}>{linkboxData.text}</p>
                    </div>
                </div>
            );
        });

        return linkboxes;
    }





    /*███████████████ BUTTONS ████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████*/

    const buttonsData = [
        {
            text: "Greeting Page",
            mainPage: "Win95Main"
        },

        {
            text: "Registration",
            mainPage: "BillMain"
        },

        {
            text: "Subprojects",
            mainPage: "DarkMain"
        }
    ];



    const buttonEnterAnim = (id) => {
        if (photoMainLoadingOrUnloading.current) return;

        gsap.to(buttonRefs.current[id], { height: "100%", duration: 0.4, ease: "power2.out" });
    }


    const buttonLeaveAnim = (id) => {
        if (photoMainLoadingOrUnloading.current) return;

        gsap.to(buttonRefs.current[id], { height: "80%", duration: 0.4, ease: "power2.in" });
    }



    const createButtons = () => {
        const buttons = [];

        buttonsData.forEach((buttonData, id) => {
            buttons.push(
                <div className={styles["button"]} ref={(el) => buttonRefs.current[id] = el} key={id}
                    onClick={() => unloadPhotoMain(() => props.gotoMainPage(buttonData.mainPage), id)}
                    onMouseEnter={() => buttonEnterAnim(id)} onMouseLeave={() => buttonLeaveAnim(id)}
                >
                    <div className={styles["button-contents"]}>
                        <p className={styles["button-p"]} ref={(el) => buttonTextRefs.current[id] = el}>{buttonData.text}</p>
                    </div>

                    <div className={styles["button-stripe"]} />
                </div>
            )
        });

        return buttons;
    }





    /*███████████████ FUNCTIONS ██████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████*/

    const greetingPageButtonFunction = () => {
        if (photoMainLoadingOrUnloading.current) return;

        unloadPhotoMain(() => props.gotoMainPage())
    }





    /*███████████████ RETURN █████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████*/

    return (
        <div className={styles["container"]} ref={containerRef}>
            <div className={styles["inner-container"]} ref={innerContainerRef}>
                <div className={styles["buttons-container"]}>
                    {createButtons()}

                    <div className={styles["button-selected"]} ref={(el) => buttonRefs.current[buttonsData.length] = el}>
                        <div className={styles["button-contents"]}>
                            <p className={styles["button-selected-p"]} ref={(el) => buttonTextRefs.current[buttonsData.length] = el}>Contacts</p>

                            <div className={styles["button-stripe"]} />
                        </div>
                    </div>
                </div>



                <div className={styles["contents-container"]}>
                    <div className={styles["inner-contents-container"]}>
                        <div className={styles["header-container"]} ref={headerContainerRef}>
                            <p className={styles["header-h1"]} ref={headerHeaderRef}>Looks like that's it!</p>
                            <p className={styles["header-h2"]} ref={headerSubheaderRef}>Thanks for making it this far</p>
                        </div>

                        <div className={styles["paragraph-container"]} ref={paragraphContainerRef}>
                            <div className={styles["paragraph-bg-container"]}>
                                <ParagraphBg className={styles["paragraph-bg"]} />
                            </div>

                            <p className={styles["paragraph-h"]} ref={paragraphHeaderRef}>Though you could always hire me, reach out at:</p>

                            {createLinkboxes()}
                        </div>
                    </div>
                </div>



                <div className={styles["bg-photo-container"]}>
                    <img src={workplacePhoto} className={styles["bg-photo"]} ref={bgPhotoRef} />

                    <img src={workplacePhotoGlow} className={styles["bg-photo-overlay"]} ref={bgPhotoGlowRef} />
                    <img src={workplacePhotoLogo} className={styles["bg-photo-overlay"]} ref={bgPhotoLogoRef} />
                </div>
            </div>
        </div>
    );
});





export default PhotoMain;