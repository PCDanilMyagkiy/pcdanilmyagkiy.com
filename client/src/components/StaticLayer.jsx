import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

import styles from "./StaticLayer.module.scss";

import { useScale } from "./../utils/useScale.js";





const StaticLayer = ({ opacity }) => {
    const { scale, s } = useScale();

    const staticLineH = s(30);


    const staticContainer = useRef(null);
    const staticPx = useRef(null);
    const staticLineAnimTl = useRef(null);



    useEffect(() => {
        if (!staticContainer.current) return;


        staticLineAnimTl.current?.revert();

        staticLineAnimTl.current = gsap.timeline();

        staticLineAnimTl.current.fromTo(staticContainer.current,
            { backgroundPositionY: "0px" },
            { backgroundPositionY: `-${staticLineH}px`, duration: 0.3, repeat: -1, ease: "none"
        });


        return(() => {
            gsap.killTweensOf(staticContainer.current);
        });
    }, [scale]);
    


    useEffect(() => {
        const canvas = staticPx.current;
        const ctx = staticPx.current.getContext("2d");

        if (!canvas || !ctx) return;

        ctx.imageSmoothingEnabled = false;


        const bufferCanvas = document.createElement("canvas");
        const bufferCtx = bufferCanvas.getContext("2d");


        let animationFrameId;
        let frameNumber = 0;
        let savedFrames = [];

        let bufferWidth = 0;
        let bufferHeight = 0;


        let seed = 123456789;


        function rand8() {
            seed ^= seed << 13;
            seed ^= seed >>> 17;
            seed ^= seed << 5;
            return seed & 255;
        }



        const referenceWidth = 1920;
        const referenceHeight = 919;

        const resizeCanvas = () => {
            frameNumber = 0;
            savedFrames = [];

            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;


            const areaRatio = (canvas.width * canvas.height) / (referenceWidth * referenceHeight);
            const pixelSize = Math.max(1, Math.round(Math.sqrt(areaRatio)));

            bufferWidth = Math.max(1, Math.ceil(canvas.width / pixelSize));
            bufferHeight = Math.max(1, Math.ceil(canvas.height / pixelSize));

            bufferCanvas.width = bufferWidth;
            bufferCanvas.height = bufferHeight;
        };


        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);


        const renderNoise = () => {
            frameNumber += 0.25;

            if (frameNumber % 1 === 0) {
                if (frameNumber <= 16) {
                    const imageData = bufferCtx.createImageData(bufferWidth, bufferHeight);
                    const buffer32 = new Uint32Array(imageData.data.buffer);

                    for (let i = 0; i < buffer32.length; i++) {
                        const noise = rand8() | 0;

                        buffer32[i] = (255 << 24) | (noise << 16) | (noise << 8) | noise;
                    }

                    savedFrames.push(imageData)

                    bufferCtx.putImageData(imageData, 0, 0);
                } else {
                    bufferCtx.putImageData(savedFrames[frameNumber - 17], 0, 0);

                    if (frameNumber >= 32) {
                        frameNumber = 17;
                    }
                }

                ctx.drawImage(bufferCanvas, 0, 0, bufferWidth, bufferHeight, 0, 0, canvas.width, canvas.height);
            }

            animationFrameId = requestAnimationFrame(renderNoise);
        }

        
        
        renderNoise();


        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", resizeCanvas);
        }
    }, []);



    return (
        <div className={styles["static-effect-container"]} style={{ opacity }}>
            <div className={styles["static-lines"]} ref={staticContainer} />

            <canvas className={styles["static-pixels"]} ref={staticPx} />
        </div>
    );
}

export default StaticLayer;