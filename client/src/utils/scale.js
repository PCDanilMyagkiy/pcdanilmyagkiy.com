const baseWidth = 1920;
const baseHeight = 919;



export function getScale(type) {
    const width = window.innerWidth / baseWidth;
    const height = window.innerHeight / baseHeight;

    switch (type) {
        case "w":
            return width;

        case "h":
            return height;

        default:
            return Math.min(width, height);
    }
}


export function updateScale() {
    document.documentElement.style.setProperty("--s", getScale());
}


/*s - Scale*/
export function s(value) {
    return value * getScale();
}