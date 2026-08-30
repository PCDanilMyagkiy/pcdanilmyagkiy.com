import { useEffect, useRef, useState } from "react";

import { getScale } from "./scale.js";



export function useScale(type) {
    const [scale, setScale] = useState(() => getScale(type));

    const timeout = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            clearTimeout(timeout.current);

            timeout.current = setTimeout(() => {
                setScale(getScale(type));
            }, 250);
        }

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            if (timeout.current) clearTimeout(timeout.current);
        }
    }, []);

    const s = (value) => value * scale;

    return { scale, s }
}