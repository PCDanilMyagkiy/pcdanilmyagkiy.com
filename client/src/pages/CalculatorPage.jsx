import { useEffect, useLayoutEffect, useState, useRef, useCallback, useMemo } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { SplitText } from "gsap/SplitText";

import { fetchRefresh } from "../utils/fetchRefresh.js";

import styles from "./CalculatorPage.module.scss";

import CalculatorPageBG from "./../components/CalculatorPageBG.jsx";

import { s } from "./../utils/scale.js";

import trashBinIcon from "./../assets/trashBinIcon.png";
import trashBinIconActive from "./../assets/trashBinIconActive.png";
import crossIcon from "./../assets/crossIcon.png";
import crossIconActive from "./../assets/crossIconActive.png";

gsap.registerPlugin(TextPlugin);
gsap.registerPlugin(SplitText);





export default function CalculatorPage() {

    /*███████████████ DECLARATION ████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████*/

    const outputSymbolSize = s(21);

    const animationStart = 600;
    const flashDelay = 1500;



    const account = useRef(null);
    const hasRun = useRef(0);

    const outputWindowRef = useRef(null);
    const inputActivity = useRef(1);

    const buttonOpeningParenthesis = useRef(null);
    const buttonEqual = useRef(null);
    const buttonAC = useRef(null);
    const buttonClosingParenthesis = useRef(null);
    const button7 = useRef(null);
    const button8 = useRef(null);
    const button9 = useRef(null);
    const buttonDivide = useRef(null);
    const buttonPercent = useRef(null);
    const button4 = useRef(null);
    const button5 = useRef(null);
    const button6 = useRef(null);
    const buttonMultiply = useRef(null);
    const buttonSqrt = useRef(null);
    const button1 = useRef(null);
    const button2 = useRef(null);
    const button3 = useRef(null);
    const buttonMinus = useRef(null);
    const buttonPower = useRef(null);
    const button0 = useRef(null);
    const buttonPoint = useRef(null);
    const buttonPlus = useRef(null);

    const calculatorButtons = [
        buttonOpeningParenthesis,
        buttonEqual,
        buttonAC,
        buttonClosingParenthesis,
        button7,
        button8,
        button9,
        buttonDivide,
        buttonPercent,
        button4,
        button5,
        button6,
        buttonMultiply,
        buttonSqrt,
        button1,
        button2,
        button3,
        buttonMinus,
        buttonPower,
        button0,
        buttonPoint,
        buttonPlus
    ];
    const calculatorButtonOverlayersRefs = useRef(null);

    const eraseButtonRef = useRef(null);
    const historyRefs = useRef([]);
    const previousHistoryBlocksActivity = useRef([]);
    const historyInsertPending = useRef(0);
    const historyInitialized = useRef(0);
    const historyAnimationActivity = useRef(1);
    const startingOrEndingAnimationActivity = useRef(1);

    const infoActive = useRef(0);
    const infoDisplaying = useRef(0);


    const mainRef = useRef(null);
    const mainShadowRef = useRef(null);
    const calculatorButtonsContainerUpperRef = useRef(null);

    const nameboxLowerContentRef = useRef(null);
    const nameboxButtonRef = useRef(null);
    const nameboxButtonCornerRef = useRef(null);

    const nameboxTextRef = useRef(null);
    const nameboxButtonTextRef = useRef(null);
    const nameboxButtonCornerTextRef = useRef(null);

    const placeholderOutputTextRef = useRef(null);
    const outputTextRef = useRef(null);

    const mainContentsRef = useRef(null);

    const calculatorInfoContainerRef = useRef(null);
    const infoH1Ref = useRef(null);
    const infoH1SplitText = useRef(null);
    const infoSplitTexts = useRef(null);
    const infoListRef = useRef(null);
    const infoListDividerRef = useRef(null);

    const nameboxStripesRef = useRef(null);
    const nameboxSplitTextRef = useRef(null);
    const nameboxUphangTrapezoidsRef = useRef(null);
    const nameboxButtonSplitTextRef = useRef(null);
    const nameboxButtonCornerSplitTextRef = useRef(null);

    const outputTextParenthesesRef = useRef(null);
    const placeholderOutputSplitTextRef = useRef(null);
    

    const sidebarRef = useRef(null);
    const sidebarShadowRef = useRef(null);
    const sidebarInnerShadowRef = useRef(null);
    const sidebarInnerBorderRef = useRef(null);

    const yNameboxLowerContentRef = useRef(null);
    const yNameboxButtonCornerRef = useRef(null);

    const yNameboxTextRef = useRef(null);
    const yNameboxButtonCornerTextRef = useRef(null);

    const sidebarCapRef = useRef(null);
    const sidebarCapTextRef = useRef(null);
    const sidebarCapTextAccentRef = useRef(null);
    const historyPlaceholderTextRef = useRef(null);
    const historyPlaceholderSplitTextRef = useRef(null);

    const sidebarContentsRef = useRef(null);

    const sidebarCapSplitTextRef = useRef(null);
    const sidebarCapAccentSplitTextRef = useRef(null);
    const yNameboxStripesRef = useRef(null);
    const yNameboxSplitTextRef = useRef(null);
    const yNameboxUphangTrapezoidsRef = useRef(null);
    const yNameboxButtonCornerSplitTextRef = useRef(null);


    const calculatorPageBGRef = useRef(null);



    const [outputWindowParams, setOutputWindowParams] = useState({ width: 0, height: 0 });
    const [outputText, setOutputText] = useState("");
    const [openParenthesesCount, setOpenParenthesesCount] = useState(0);
    const [powerMode, setPowerMode] = useState(0);
    const [ACStatus, setACStatus] = useState(1);

    const [eraseButtonActive, setEraseButtonActive] = useState(0);
    const [activeHistoryButton, setActiveHistoryButton] = useState(null);

    const [history, setHistory] = useState([]);

    const [startAnimationReady, setStartAnimationReady] = useState(0);
    const [historyLoaded, setHistoryLoaded] = useState(0);


    const evalText = outputText + ")".repeat(openParenthesesCount);


    const displayOutputText = useMemo(() => {
        const maxLength = Math.trunc(outputWindowParams.width / outputSymbolSize);
        const startIndex = outputText.length - maxLength;

        if (outputText.length + openParenthesesCount <= maxLength) return outputText;

        if (openParenthesesCount > maxLength - 3) setOpenParenthesesCount(maxLength - 3);

        return "..." + outputText.split("").splice(startIndex + 3 + openParenthesesCount, outputText.length).join("");
    }, [outputText, outputWindowParams.width, openParenthesesCount]);





    /*███████████████ FUNCTIONS ██████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████*/

    const animateInputUpdate = (newInputProto) => {
        const newOutputText = displayOutputText + ")".repeat(openParenthesesCount);
        const maxLength = Math.max(newOutputText.length, newInputProto.length);


        const newInput = [
            ...Array(maxLength - newInputProto.length).fill(" "),
            ...newInputProto.split("")
        ];
        const oldInput = [
            ...Array(maxLength - newOutputText.length).fill(" "),
            ...newOutputText.split("")
        ];

        const cycleDuration = 200 / maxLength;
        const cycleChangeOn = 2;


        inputActivity.current = 0;
        setOpenParenthesesCount(0);
        setOutputText((prev) => prev + ")".repeat(openParenthesesCount));


        for (let frame = 0; frame <= maxLength * cycleChangeOn; frame++) {
            setTimeout(() => {
                const step = Math.floor(frame / cycleChangeOn);

                const scrambling = Array(step).fill().map(() => Math.floor(Math.random() * 10));

                setOutputText(scrambling.join("") + oldInput.slice(step).join(""));
            }, frame * cycleDuration);
        }


        setTimeout(() => {
            for (let frame = 0; frame <= maxLength * cycleChangeOn; frame++) {
                setTimeout(() => {
                    const step = Math.floor(frame / cycleChangeOn);

                    const scrambling = Array(maxLength - step).fill().map(() => Math.floor(Math.random() * 10));

                    if (step - maxLength) {
                        setOutputText([newInput.slice(0, step - maxLength).join("") + scrambling.join("")]);
                    } else {
                        setOutputText(newInputProto);
                    }
                }, frame * cycleDuration);
            }
        }, maxLength * cycleChangeOn * cycleDuration);


        setTimeout(() => {
            inputActivity.current = 1;
        }, maxLength * 2 * cycleChangeOn * cycleDuration);

        return maxLength * 2 * cycleChangeOn * cycleDuration;
    }


    const evaluateEquation = () => {
        const tokens = [];

        let currentToken = null;
        let unaryExponentActive = 0;



        const resetToken = () => {
            if (currentToken?.value === "-") currentToken.value = "-1";
            if (currentToken) tokens.push(currentToken);
            currentToken = "";
        }

        

        for (const protoCharacter of evalText) {
            let character;

            if ("0123456789.+-()%e".includes(protoCharacter)) character = protoCharacter;

            switch (protoCharacter) {
                case "÷": character = "/"; break;
                case "×": character = "*"; break;
                case "√": character = "sqrt"; break;
                case "⁰": character = "0"; break;
                case "¹": character = "1"; break;
                case "²": character = "2"; break;
                case "³": character = "3"; break;
                case "⁴": character = "4"; break;
                case "⁵": character = "5"; break;
                case "⁶": character = "6"; break;
                case "⁷": character = "7"; break;
                case "⁸": character = "8"; break;
                case "⁹": character = "9"; break;
                case "⁻": character = "-"; break;
            }



            if ("⁰¹²³⁴⁵⁶⁷⁸⁹⁻".includes(protoCharacter) && tokens[tokens.length - 1]?.value !== "**" ) {
                resetToken();

                tokens.push({
                    type: "operator",
                    value: "**"
                });
            }


            if ("0123456789.e".includes(character) || protoCharacter === "⁻" || ("-+".includes(character) && unaryExponentActive)) {
                if (!currentToken?.value) {
                    if (currentToken) resetToken();

                    currentToken = { type: "number", value: "" }
                }

                currentToken.value += character;

                if (character === "e") {
                    unaryExponentActive = 1;
                } else if ("-+".includes(character)) {
                    unaryExponentActive = 0;
                }

                continue;
            }


            resetToken();


            if (["/", "*", "-", "+", "sqrt"].includes(character)) {
                if (character === "sqrt" && ["number", "parenthesis"].includes(tokens[tokens.length - 1]?.type)) tokens.push({
                    type: "operator",
                    value: "*"
                });

                if (
                    character === "-" && (
                    tokens[tokens.length - 1]?.type === "operator" ||
                    tokens[tokens.length - 1]?.value === "(" ||
                    !tokens[tokens.length - 1])
                ) {
                    tokens.push({
                        type: "operator",
                        value: "unary-"
                    });
                } else {
                    tokens.push({
                        type: "operator",
                        value: character
                    });
                }
            }


            if ("()".includes(character)) {
                if (character === "(" && (tokens[tokens.length - 1]?.type === "number" || tokens[tokens.length - 1]?.value === ")")) {
                    tokens.push({
                        type: "operator",
                        value: "*"
                    });
                }

                tokens.push({
                    type: "parenthesis",
                    value: character
                });
            }


            if (character === "%") {
                tokens.push({
                    type: "percent",
                    value: character
                });
            }
        }

        if (currentToken) resetToken();

        if (    
            tokens[tokens.length - 1]?.type === "operator" ||
            (tokens[tokens.length - 1]?.type === "number" && tokens[tokens.length - 1]?.value === "-")
        ) return;



        const evaluationArray = [];
        const operators = [];

        const getPrecedence = (operator) => {
            switch (operator) {
                case "+": return 1; break;
                case "-": return 1; break;

                case "*": return 2; break;
                case "/": return 2; break;

                case "unary-": return 3; break;

                case "**": return 4; break;

                case "sqrt": return 5; break;

                default: return 0; break;
            }
        }

        const unloadOperators = (token) => {
            while (operators.length && getPrecedence(operators[operators.length - 1].value) >= getPrecedence(token.value)) {
                evaluationArray.push(operators.pop());
            }
        }



        tokens.forEach((token) => {
            if (token.type === "number" || token.type === "percent") {
                evaluationArray.push(token);
            }

            if (token.type === "operator") {
                if (getPrecedence(operators[operators.length - 1]?.value) >= getPrecedence(token.value)) {
                    unloadOperators(token);
                }

                operators.push(token);
            }

            if (token.type === "parenthesis") {
                if (token.value === "(") {
                    operators.push(token);
                }
                
                else {
                    while (operators[operators.length - 1]?.value !== "(") {
                        evaluationArray.push(operators.pop());
                    }

                    operators.pop();
                }
            }
        });

        unloadOperators({ value: 5 });
        operators.length = 0;



        const output = [];

        evaluationArray.forEach((evaluated, i) => {
            if (evaluated.type === "number") {
                output.push(evaluated.value);
            }

            if (evaluated.type === "operator") {
                if ("-+/**".includes(evaluated.value)) {
                    const b = output.pop();
                    const a = output.pop();

                    output.push(new Function(`return (${a}) ${evaluated.value} (${b})`)());
                }
                
                if (evaluated.value === "sqrt") {
                    const a = output.pop();

                    output.push(Math.sqrt(a))
                }

                if (evaluated.value === "unary-") {
                    const a = output.pop();

                    output.push(-a);
                }
            }

            if (evaluated.type === "percent") {
                const a = output[output.length - 2];
                const b = output.pop();
                const operator = evaluationArray[i + 1];

                if ("-+".includes(operator?.value)) {
                    output.push(b * a / 100);
                } else {
                    output.push(b / 100);
                }
            }
        });

        setOpenParenthesesCount(0);
        setACStatus(1);

        if (output.length !== 1 || (!output[0] && output[0] !== 0)) {
            throw new Error("Invalid output");
        }


        let result = parseFloat(parseFloat(output[0]).toPrecision(15));
        const rounded = Math.round(result);

        if (Math.abs(result - rounded) < 1e-12) result = rounded;

        return result.toString();
    }





    const getPlaceholderOutputText = () => {
        const output = [];

        (displayOutputText + ")".repeat(openParenthesesCount)).split("").forEach((character) => {
            output.push(character === " " ? "0" : character);
        });
        
        while ((output.length + 1) * outputSymbolSize < outputWindowParams.width) {
            output.unshift("0");
        }

        return output.join("");
    }





    const characterInput = useCallback(async (character) => {
        if (startingOrEndingAnimationActivity.current) return;


        if (inputActivity.current) {
            if (outputText === "Error") {
                setOutputText("0");
            }

            if (outputText.length) {
                setACStatus(0);
            }

            

            const numbers = outputText.split(/[^0-9.%\(\)]/).filter(Boolean);
            const lastNumber = numbers[numbers.length - 1];
            const lastCharacter = outputText[outputText.length - 1];

            const allElems = outputText.split(" ").filter(Boolean);
            const lastElem = allElems[allElems.length - 1];

            const startingZeroActive = ["0", "Error"].includes(outputText);



            if ("0123456789".includes(character)) {
                if (!powerMode) {
                    if (startingZeroActive) {
                        return setOutputText((prev) => prev.slice(0, -1) + character);
                    }

                    if ("%)⁰¹²³⁴⁵⁶⁷⁸⁹".includes(lastCharacter)) {
                        return setOutputText((prev) => prev + ` × ${character}`);
                    }

                    return setOutputText((prev) => prev + character);
                }


                let characterTransformed;

                switch (character) {
                    case "0": characterTransformed = "⁰"; break;
                    case "1": characterTransformed = "¹"; break;
                    case "2": characterTransformed = "²"; break;
                    case "3": characterTransformed = "³"; break;
                    case "4": characterTransformed = "⁴"; break;
                    case "5": characterTransformed = "⁵"; break;
                    case "6": characterTransformed = "⁶"; break;
                    case "7": characterTransformed = "⁷"; break;
                    case "8": characterTransformed = "⁸"; break;
                    case "9": characterTransformed = "⁹"; break;
                }

                setOutputText((prev) => prev + characterTransformed);

                return;
            }



            if (character === "-" && powerMode && !/[⁰¹²³⁴⁵⁶⁷⁸⁹]/.test(lastElem)) {
                if (!lastElem.includes("⁻")) {
                    setOutputText((prev) => prev + "⁻");
                }

                return;
            }



            setPowerMode(0);



            if ("÷×-+".includes(character)) {
                if ("÷×-+".includes(lastElem) && "÷×-+".includes(allElems[allElems.length - 2])) return;


                if ("÷×".includes(character) && "÷×-+".includes(lastElem)) {
                    return setOutputText((prev) => prev.slice(0, -2) + `${character} `);
                }


                if ("-+".includes(character)) {
                    if (character !== "-") {
                        if ("÷×-+".includes(lastElem)) {
                            return setOutputText((prev) => prev.slice(0, -2) + `${character} `);
                        }
                    }

                    else if (startingZeroActive) {
                        return setOutputText((prev) => prev.slice(0, -1) + character);
                    }

                    else if ("÷×".includes(lastElem) || lastCharacter === "(") {
                        return setOutputText((prev) => prev + character);
                    }

                    else if ("-+".includes(lastElem)) {
                        return setOutputText((prev) => prev.slice(0, -2) + `${character} `);
                    }
                }


                if (!" (".includes(lastCharacter) && lastCharacter) {
                    return setOutputText((prev) => prev + ` ${character} `);
                }
            }



            if (character === ".") {
                if (!lastNumber?.includes(character) && "0123456789".includes(lastCharacter)) {
                    return setOutputText((prev) => prev + character);
                }
            }



            if (character === "(") {
                setOpenParenthesesCount((prev) => prev + 1);

                return setOutputText((prev) => (prev.length !== 1 || lastNumber !== "0") ? prev + character : character);
            }



            if (character === ")" && openParenthesesCount > 0) {
                setOpenParenthesesCount((prev) => prev - 1);

                return setOutputText((prev) => prev + character);
            }



            if (character === "%") {
                if (lastCharacter !== " " && lastCharacter) {
                    return setOutputText((prev) => prev + character);
                }
            }



            if (character === "√") {
                setOpenParenthesesCount((prev) => prev + 1);

                return startingZeroActive
                    ? setOutputText(character + "(")
                    : setOutputText((prev) => prev + character + "(");
            }



            if (character === "^") {
                if ("0123456789⁰¹²³⁴⁵⁶⁷⁸⁹)%".includes(lastCharacter)) {
                    setPowerMode(powerMode ? 0 : 1);
                }
            }



            if (character === "AC/CE") {
                let eraseUntil = outputText.length - 1;


                if ("⁰¹²³⁴⁵⁶⁷⁸⁹⁻".includes(lastCharacter)) {
                    setPowerMode(1);
                }


                if (lastCharacter === " ") {
                    eraseUntil -= 2;

                    while (eraseUntil >= 0 && outputText[eraseUntil - 1] === " ") {
                        eraseUntil--;
                    }
                }


                if (lastCharacter === "(" && openParenthesesCount) {
                    setOpenParenthesesCount((count) => count - 1);

                    if (outputText[outputText.length - 2] === "√") {
                        eraseUntil--;
                    }
                }


                if (lastCharacter === ")") {
                    setOpenParenthesesCount((count) => count + 1);
                }


                const potentialUnaryExponents = outputText.split(/[^0-9\.\-+e]+/);
                const lastPotentialUnaryExponent = potentialUnaryExponents[potentialUnaryExponents.length - 1];

                if (lastPotentialUnaryExponent.includes("e")) {
                    eraseUntil -= lastPotentialUnaryExponent.length - 1;
                }


                if (ACStatus || eraseUntil < 1) {
                    setOpenParenthesesCount(0);
                    setACStatus(1);
                    return setOutputText("0");
                } else {
                    return setOutputText((prev) => prev.slice(0, eraseUntil));
                }
            }



            if (character === "=") {
                let result;

                try {
                    result = evaluateEquation();

                    setHistory((prev) => {
                        historyInsertPending.current = 1;
                        return [{ eval: evalText, result }, ...prev];
                    });
                } catch (error) {
                    result = "Error";
                }

                animateInputUpdate(result);

                await addHistoryItem({ eval: evalText, result });
            }
        }
    }, [outputText, powerMode, openParenthesesCount]);





    async function getCalculatorHistory() {
        try {
            const res = await fetch("/api/calculator-histories/get-history", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",

                body: JSON.stringify({
                    userId: account.current._id
                })
            });

            if (!res.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await res.json();

            setHistory(data.history);

            return data;
        } catch (err) {
            console.error(err);

            return null;
        }
    }





    const animateHistoryChange = (historyBlocksActivity) => {
        const allDelete = historyBlocksActivity.every((activity) => !activity);
        const allInsert = historyBlocksActivity.every((activity, i) => activity && !previousHistoryBlocksActivity.current[i]);


        let newHistory = history.filter((el, i) => historyBlocksActivity[i]);
        let currentTimeout = 0;
        let completedAnimations = 0;


        const handleAnimationCompletion = (currentHistoryRef, nextHistoryRefs) => {
            completedAnimations++;

            if (completedAnimations === historyBlocksActivity.length) {
                previousHistoryBlocksActivity.current = [...historyBlocksActivity].filter((el, i) => el);
                historyAnimationActivity.current = 0;

                setHistory(() => {
                    gsap.set(currentHistoryRef, { x: 0, opacity: 1 });
                    if (nextHistoryRefs.length) gsap.set(nextHistoryRefs, { y: 0 });

                    return newHistory;
                });
            }
        }

        historyBlocksActivity.forEach((activity, i) => {
            const currentHistoryRef = historyRefs.current[i];
            const nextHistoryRefs = historyRefs.current.toSpliced(0, i + 1);


            if (activity === previousHistoryBlocksActivity.current[i]) return handleAnimationCompletion(currentHistoryRef, nextHistoryRefs);


            setTimeout(() => {
                if (activity) {
                    const tl = gsap.timeline({ onComplete: () => {
                        handleAnimationCompletion(currentHistoryRef, nextHistoryRefs);
                    }});

                    if (nextHistoryRefs.length && !allInsert) {
                        tl.to(nextHistoryRefs, { y: 0, duration: 0.5, ease: "power1.inOut" }, "0");
                    }
                    tl.to(currentHistoryRef, { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, "<+0.2")
                }
                
                
                else {
                    const tl = gsap.timeline({ onComplete: () => {
                        handleAnimationCompletion(currentHistoryRef, nextHistoryRefs);
                    }});

                    tl.to(currentHistoryRef, { x: currentHistoryRef.offsetWidth + s(10), opacity: 0, duration: 0.5, ease: "power2.in" }, "0");
                    if (nextHistoryRefs.length && !allDelete) {
                        tl.to(nextHistoryRefs, { y: `-=${(currentHistoryRef.offsetHeight + s(10))}`, duration: 0.5, ease: "power1.inOut" }, "<+0.2");
                    }
                }
            }, currentTimeout);

            currentTimeout += 100 * (50 - i) / 50;
        });
    }




    const animateHistoryInitiation = () => {
        if (!historyInitialized.current) {
            historyRefs.current = historyRefs.current.filter((el) => el);

            historyInitialized.current = 1;

            historyRefs.current.forEach((ref, i) => {
                gsap.set(ref, { x: ref.offsetWidth + s(20), opacity: 0 });
            });

            previousHistoryBlocksActivity.current = new Array(history.length).fill(0);
            animateHistoryChange(new Array(history.length).fill(1));

            return;
        }
    }





    const animateHistoryPlaceholderAppearance = () => {
        if (history.length || !historyPlaceholderSplitTextRef.current) {
            animateHistoryInitiation();
            return;
        }

        const tl = gsap.timeline();

        tl
            .set(historyPlaceholderSplitTextRef.current.words, { display: "inline-block" }, "0")
            .to(historyPlaceholderSplitTextRef.current.words, { scaleY: 1, transformOrigin: "bottom", opacity: 1, duration: 0.6, ease: "power2.out", stagger: 0.1 }, ">");
    }




    const animateHistoryPlaceholderDisappearance = () => {
        if (!history.length || !historyPlaceholderSplitTextRef.current) return;


        const tl = gsap.timeline();

        tl
            .to(historyPlaceholderSplitTextRef.current.words, { scaleY: 0, transformOrigin: "bottom", opacity: 0, duration: 0.6, ease: "power2.in", stagger: 0.1 }, "0")
            .set(historyPlaceholderSplitTextRef.current.words, { display: "none" }, ">");

        return tl;
    }





    const calculatorButtonsAppearanceTimeline = () => {
        const calculatorButtonsShuffled = [...calculatorButtons].sort(() => Math.random() - 0.5).map((el) => el.current);
        const calculatorButtonOverlayersShuffled = [...calculatorButtonOverlayersRefs.current].sort(() => Math.random() - 0.5);

        const tl = gsap.timeline();

        tl
            .set(calculatorButtonOverlayersShuffled, { opacity: 1 }, "0")
            .to(calculatorButtonsShuffled, { opacity: 1, duration: 0.6, ease: "power2.in", stagger: 0.03 }, "<")
            .to(calculatorButtonOverlayersShuffled, { opacity: 0, duration: 0.6, ease: "power2.in", stagger: 0.03 }, "<+0.4");

        return tl;
    }





    const calculatorButtonsDisappearanceTimeline = () => {
        const calculatorButtonsShuffled = [...calculatorButtons].sort(() => Math.random() - 0.5).map((el) => el.current);

        const tl = gsap.timeline();

        tl
            .to(calculatorButtonsShuffled, { opacity: 0, duration: 0.6, ease: "power2.out", stagger: 0.03 }, "0");

        return tl;
    }





    const infoDisappearanceTimeline = () => {
        const tl = gsap.timeline();

        tl
            .set(calculatorInfoContainerRef.current, { userSelect: "none" }, "0")
            .to(infoH1SplitText.current.chars, { scaleY: 0, opacity: 0, duration: 0.3, ease: "power2.in", stagger: 0.1 }, "<")
            .to(infoListDividerRef.current, { opacity: 0, duration: 0.6, ease: "power2.in" }, "<-0.2")
            .to(infoListRef.current, { border: `${s(2)}px solid ${styles.magentaLightAlpha0}`, duration: 0.6, ease: "power2.in" }, "<+0.4");

        
        infoSplitTexts.current.forEach((infoSplitText, i) => {
            switch (infoSplitText.type) {
                case "h2":
                    tl.to(infoSplitText.content.chars, { x: s(20), opacity: 0, duration: 0.3, ease: "power2.in", stagger: 0.03 }, "<-0.1");
                    break;
                case "p":
                    tl.to(infoSplitText.content.words, { x: s(30), opacity: 0, duration: 0.25, ease: "power2.in", stagger: 0.05 }, "<+0.03");
                    break;
            }
        });

        return tl;
    }





    const animateInfo = (toStartPosition) => {
        if (infoActive.current || (startingOrEndingAnimationActivity.current && !toStartPosition) ) return;
        infoActive.current = 1;



        if (toStartPosition) {
            const infoTexts = document.querySelectorAll(`.${styles["calculator-info-h2"]}, .${styles["calculator-info-p"]}`);

            infoH1SplitText.current = SplitText.create(infoH1Ref.current, { type: "chars" });
            infoSplitTexts.current = [...infoTexts].map((infoText) => {
                let type;

                switch (infoText.className) {
                    case styles["calculator-info-h2"]: type = "h2"; break;
                    case styles["calculator-info-p"]: type = "p"; break;
                }

                return { content: SplitText.create(infoText, { type: "words, chars", reduceWhiteSpace: 0 }), type }
            });


            gsap.set(calculatorInfoContainerRef.current, { opacity: 1, userSelect: "none" });
            gsap.set(infoH1SplitText.current.chars, { opacity: 0, scaleY: 0, transformOrigin: "bottom" });
            gsap.set(infoListRef.current, { border: `${s(2)}px solid ${styles.magentaLightAlpha0}` });
            gsap.set(infoListDividerRef.current, { opacity: 0 });

            infoSplitTexts.current.forEach((infoSplitText) => {
                switch (infoSplitText.type) {
                    case "h2":
                        gsap.set(infoSplitText.content.chars, { x: s(20), opacity: 0 });
                        break;
                    case "p":
                        gsap.set(infoSplitText.content.words, { x: s(30), opacity: 0 });
                        break;
                }
            });


            infoDisplaying.current = 0;
            infoActive.current = 0;

            return;
        }



        else if (infoDisplaying.current) {
            const tl = gsap.timeline({ onComplete: () => {
                infoDisplaying.current = 0;
                infoActive.current = 0;
                return;
            }});


            tl
                .add(infoDisappearanceTimeline(), "0")
                .add(calculatorButtonsAppearanceTimeline(), ">-1");
        }
        


        else {
            const tl = gsap.timeline({ onComplete: () => {
                infoDisplaying.current = 1;
                infoActive.current = 0;
                return;
            }});


            tl
                .add(calculatorButtonsDisappearanceTimeline(), "0")
                .to(infoH1SplitText.current.chars, { scaleY: 1, opacity: 1, duration: 0.3, ease: "power2.out", stagger: 0.1 }, ">-0.75");

            infoSplitTexts.current.forEach((infoSplitText, i) => {
                switch (infoSplitText.type) {
                    case "h2":
                        tl.to(infoSplitText.content.chars, { x: 0, opacity: 1, duration: 0.3, ease: "power2.out", stagger: 0.03 }, "<-0.1");
                        break;
                    case "p":
                        tl.to(infoSplitText.content.words, { x: 0, opacity: 1, duration: 0.25, ease: "power2.out", stagger: 0.05 }, "<+0.03");
                        break;
                }
            });

            tl
                .to(infoListRef.current, { border: `${s(2)}px solid ${styles.magentaLight}`, duration: 0.6, ease: "power2.out" }, "<-0.2")
                .to(infoListDividerRef.current, { opacity: 1, duration: 0.6, ease: "power2.out" }, "<+0.4")
                .set(calculatorInfoContainerRef.current, { userSelect: "auto" }, ">");
        }
    }





    const unloadingAnimation = () => {
        if (startingOrEndingAnimationActivity.current || infoActive.current || !inputActivity.current) return;
        startingOrEndingAnimationActivity.current = 1;


        const tl = gsap.timeline();

        if (infoDisplaying.current) {
            tl.add(infoDisappearanceTimeline(), "0")
        } else {
            tl.add(calculatorButtonsDisappearanceTimeline(), "0");
        }


        if (history.length) {
            historyRefs.current.forEach((historyRef, i) => {
                tl.to(historyRef, { x: historyRef.offsetWidth + s(10), opacity: 0, duration: 0.5, ease: "power2.in" }, `<+${0.1 * (50 - i) / 50}`);
            });
        } else {
            tl
                .to(historyPlaceholderSplitTextRef.current.words, { scaleY: 0, transformOrigin: "bottom", opacity: 0, duration: 0.6, ease: "power2.in", stagger: 0.1 }, "0")
                .set(historyPlaceholderSplitTextRef.current.words, { display: "none" }, ">");
        }


        tl
            .call(() => {
                if (displayOutputText !== "0") animateInputUpdate("0");
            }, [], "0")

            .call(() => {
                placeholderOutputSplitTextRef.current.revert();
                placeholderOutputSplitTextRef.current.split({ type: "chars" });

                const tl2 = gsap.timeline();

                tl2
                    .to(placeholderOutputSplitTextRef.current.chars, { color: styles.magentaLight, duration: 0.4, ease: "power2.out", stagger: 0.02 }, "0")
                    .to(placeholderOutputSplitTextRef.current.chars, { scaleY: 0, transformOrigin: "bottom", opacity: 0, duration: 0.2, ease: "power2.out", stagger: 0.02 }, "<+0.2")

                    .add("placeholderOutputAnimationStart", "<+0.1")

                    .set(outputTextRef.current, { opacity: 0 }, ">-0.2")


                    .to(eraseButtonRef.current, { x: s(10), scaleX: 0, transformOrigin: "right", opacity: 0, duration: 0.25, ease: "power2.in" }, "0")
                    .to(sidebarCapAccentSplitTextRef.current.chars, { scaleX: 0, transformOrigin: "left", opacity: 0, duration: 0.2, ease: "power2.in", stagger: "0.05" }, "<+0.3")
                    .to(sidebarCapSplitTextRef.current.chars, { opacity: 0, duration: 0.2, ease: "power1.inOut", stagger: "0.075" }, "<-0.1")


                    .to(outputWindowRef.current, { backgroundPosition: "0% 0%", duration: 1, ease: "none" }, "placeholderOutputAnimationStart")
                    .to(sidebarCapRef.current, { backgroundPosition: "100% 0%", duration: 0.8, ease: "none" }, "<")


                    .to(nameboxStripesRef.current, { opacity: 0, duration: 0.4, ease: "power1.in", stagger: 0.1 }, "placeholderOutputAnimationStart+=0.4")
                    .to(nameboxSplitTextRef.current.chars.reverse(), { x: s(50), opacity: 0, duration: 0.2, ease: "power2.in", stagger: 0.05 }, "<+0.1")
                    .to(nameboxLowerContentRef.current, { opacity: 0, duration: 0.4, ease: "power1.in" }, "<+0.1")
                    .to(nameboxUphangTrapezoidsRef.current, { borderBottom: `${s(20)}px solid ${styles.magentaLight}`, duration: 0.4, ease: "power1.in", stagger: 0.1 }, "<")
                    .to(nameboxButtonSplitTextRef.current.chars, { x: s(-25), opacity: 0, duration: 0.15, ease: "power2.in", stagger: 0.05 }, "<+0.1")
                    .to(nameboxButtonCornerSplitTextRef.current.chars, { x: s(-25), opacity: 0, duration: 0.15, ease: "power2.in", stagger: 0.05 }, "<+0.1")
                    .to(nameboxButtonRef.current, { opacity: 0, duration: 0.4, ease: "power1.in" }, "<+0.1")
                    .to(nameboxButtonCornerRef.current, { opacity: 0, duration: 0.4, ease: "power1.in" }, "<+0.1")


                    .to(yNameboxStripesRef.current, { opacity: 0, duration: 0.4, ease: "power1.in", stagger: 0.1 }, "placeholderOutputAnimationStart+=0.4")

                    .to(sidebarInnerBorderRef.current, { opacity: 1, duration: 0.6, ease: "power2.in" }, "<")

                    .to(yNameboxSplitTextRef.current.chars.reverse(), { x: s(50), opacity: 0, duration: 0.2, ease: "power2.in", stagger: 0.05 }, "<+0.1")
                    .to(yNameboxLowerContentRef.current, { opacity: 0, duration: 0.4, ease: "power1.in" }, "<+0.1")

                    .to(yNameboxUphangTrapezoidsRef.current, { borderBottom: `${s(20)}px solid ${styles.yellowLight}`, duration: 0.4, ease: "power1.in", stagger: 0.1 }, "<")

                    .to(yNameboxButtonCornerSplitTextRef.current.chars.reverse(), { x: s(-25), opacity: 0, duration: 0.15, ease: "power2.in", stagger: 0.05 }, "<+0.2")
                    .to(yNameboxButtonCornerRef.current, { opacity: 0, duration: 0.4, ease: "power1.in" }, "<+0.1")


                    .to(mainContentsRef.current, {
                        backdropFilter: "blur(0px)",
                        background: `linear-gradient(${styles.magentaDarkestAlpha0}, ${styles.magentaDarkerAlpha0}, ${styles.magentaDarkestAlpha0})`,
                        duration: 0.5,
                        ease: "power1.inOut"
                    }, "<+0.2")
                    .to(sidebarContentsRef.current, {
                        backdropFilter: "blur(0px)",
                        background: `linear-gradient(${styles.yellowDarkestAlpha0}, ${styles.yellowDarkerAlpha0}, ${styles.yellowDarkestAlpha0})`,
                        duration: 0.5,
                        ease: "power1.inOut"
                    }, "<")


                    .set(mainRef.current, { filter: "brightness(100%)" }, ">")
                    .set(sidebarRef.current, { filter: "brightness(100%)" }, "<")

                    .call(calculatorPageBGRef.current.unloadAnimation, [], "<")

                    .to(mainRef.current, { filter: "brightness(200%)", duration: 0.4, ease: "power2.in" }, "<")
                    .to(sidebarRef.current, { filter: "brightness(200%)", duration: 0.4, ease: "power2.in" }, "<")

                    .to(mainRef.current, { filter: "brightness(0%)", duration: 0.4, ease: "power2.out" }, ">")
                    .to(mainShadowRef.current, { opacity: 0, duration: 0.4, ease: "power2.in" }, "<")
                    .to(calculatorButtonsContainerUpperRef.current, { opacity: 0, duration: 0.4, ease: "power2.in" }, "<")

                    .to(sidebarRef.current, { filter: "brightness(0%)", duration: 0.4, ease: "power2.out" }, "<")
                    .to(sidebarShadowRef.current, { opacity: 0, duration: 0.4, ease: "power2.in" }, "<")
                    .to(sidebarInnerShadowRef.current, { opacity: 0, duration: 0.4, ease: "power2.in" }, "<")

                    .to(mainRef.current, { x: -(mainRef.current.offsetWidth + s(100 + 75)), opacity: 0, duration: ((flashDelay + 200) / 1000), ease: "power3.in" }, ">")
                    .to(sidebarRef.current, { x: sidebarRef.current.offsetWidth + s(150 + 75), opacity: 0, duration: ((flashDelay + 200) / 1000), ease: "power3.in" }, "<");
            }, [], "<+0.82")
    }




    
    async function addHistoryItem(historyItem) {
        historyInitialized.current = 1;

        const res = await fetch("/api/calculator-histories/add-history-item", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",

            body: JSON.stringify({
                userId: account.current._id,
                history: [historyItem, ...history]
            })
        });

        const response = await res.json();

        return response;
    }





    async function eraseHistory() {
        setEraseButtonActive(1);

        if (historyAnimationActivity.current) return;
        historyAnimationActivity.current = 1;

        animateHistoryChange(new Array(history.length).fill(0));


        const res = await fetch("/api/calculator-histories/add-history-item", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",

            body: JSON.stringify({
                userId: account.current._id,
                history: []
            })
        });

        const response = await res.json();

        return response;
    }





    async function deleteHistoryItem(index) {
        setActiveHistoryButton(index);

        if (historyAnimationActivity.current) return;
        historyAnimationActivity.current = 1;

        const historyBlocksActivity = history.map((el, i) => i === index ? 0 : 1);
        animateHistoryChange(historyBlocksActivity);

        const currentHistoryDocument = await getCalculatorHistory();
        const newHistory = currentHistoryDocument.history.toSpliced(index, 1);

        
        const res = await fetch("/api/calculator-histories/add-history-item", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",

            body: JSON.stringify({
                userId: account.current._id,
                history: newHistory
            })
        });

        const response = await res.json();

        return response;
    }





    /*███████████████ EFFECTS ████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████*/

    useEffect(() => {
        (async () => {
            try {
                if (hasRun.current) return;
                hasRun.current = 1;

                account.current = await fetchRefresh("/api/accounts/profile/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                });

                if (account.current.fail) {
                    account.current = 0;
                    return;
                }
            } catch (err) {
                console.error(err);
            }

            setHistoryLoaded(1);
        })();
    }, []);



    useEffect(() => {
        calculatorButtonOverlayersRefs.current = document.querySelectorAll(`.${styles["calculator-button-overlayer"]}`);

        setOutputWindowParams({ width: outputWindowRef.current.clientWidth, height: outputWindowRef.current.clientHeight });
        setOutputText("0");

        setStartAnimationReady(1);
    }, []);



    useEffect(() => {
        const handleKeyDown = (event) => {
            switch (event.key) {
                case "0": characterInput("0"); button0.current.classList.add(styles["calculator-button-active"]); break;
                case "1": characterInput("1"); button1.current.classList.add(styles["calculator-button-active"]); break;
                case "2": characterInput("2"); button2.current.classList.add(styles["calculator-button-active"]); break;
                case "3": characterInput("3"); button3.current.classList.add(styles["calculator-button-active"]); break;
                case "4": characterInput("4"); button4.current.classList.add(styles["calculator-button-active"]); break;
                case "5": characterInput("5"); button5.current.classList.add(styles["calculator-button-active"]); break;
                case "6": characterInput("6"); button6.current.classList.add(styles["calculator-button-active"]); break;
                case "7": characterInput("7"); button7.current.classList.add(styles["calculator-button-active"]); break;
                case "8": characterInput("8"); button8.current.classList.add(styles["calculator-button-active"]); break;
                case "9": characterInput("9"); button9.current.classList.add(styles["calculator-button-active"]); break;
                case ".": characterInput("."); buttonPoint.current.classList.add(styles["calculator-button-active"]); break;

                case "(": characterInput("("); buttonOpeningParenthesis.current.classList.remove(styles["calculator-button-active"]); break;
                case ")": characterInput(")"); buttonClosingParenthesis.current.classList.remove(styles["calculator-button-active"]); break;
                case "%": characterInput("%"); buttonPercent.current.classList.remove(styles["calculator-button-active"]); break;
                case "@": characterInput("√"); buttonSqrt.current.classList.remove(styles["calculator-button-active"]); break;
                case "^": characterInput("^"); setPowerMode((prev) => prev ? 1 : 0); break;
                case "/": characterInput("÷"); buttonDivide.current.classList.remove(styles["calculator-button-active"]); break;
                case "*": characterInput("×"); buttonMultiply.current.classList.remove(styles["calculator-button-active"]); break;
                case "-": characterInput("-"); buttonMinus.current.classList.remove(styles["calculator-button-active"]); break;
                case "+": characterInput("+"); buttonPlus.current.classList.remove(styles["calculator-button-active"]); break;

                case "Backspace": characterInput("AC/CE"); buttonAC.current.classList.remove(styles["calculator-button-active"]); break;
                case "=": characterInput("="); buttonEqual.current.classList.remove(styles["calculator-button-active"]); break;
                case "Enter": characterInput("="); buttonEqual.current.classList.remove(styles["calculator-button-active"]); break;
            }
        }

        const handleKeyUp = (event) => {
            switch (event.key) {
                case "0": button0.current.classList.remove(styles["calculator-button-active"]); break;
                case "1": button1.current.classList.remove(styles["calculator-button-active"]); break;
                case "2": button2.current.classList.remove(styles["calculator-button-active"]); break;
                case "3": button3.current.classList.remove(styles["calculator-button-active"]); break;
                case "4": button4.current.classList.remove(styles["calculator-button-active"]); break;
                case "5": button5.current.classList.remove(styles["calculator-button-active"]); break;
                case "6": button6.current.classList.remove(styles["calculator-button-active"]); break;
                case "7": button7.current.classList.remove(styles["calculator-button-active"]); break;
                case "8": button8.current.classList.remove(styles["calculator-button-active"]); break;
                case "9": button9.current.classList.remove(styles["calculator-button-active"]); break;
                case ".": buttonPoint.current.classList.remove(styles["calculator-button-active"]); break;

                case "(": buttonOpeningParenthesis.current.classList.add(styles["calculator-button-active"]); break;
                case ")": buttonClosingParenthesis.current.classList.add(styles["calculator-button-active"]); break;
                case "%": buttonPercent.current.classList.add(styles["calculator-button-active"]); break;
                case "@": buttonSqrt.current.classList.add(styles["calculator-button-active"]); break;
                case "/": buttonDivide.current.classList.add(styles["calculator-button-active"]); break;
                case "*": buttonMultiply.current.classList.add(styles["calculator-button-active"]); break;
                case "-": buttonMinus.current.classList.add(styles["calculator-button-active"]); break;
                case "+": buttonPlus.current.classList.add(styles["calculator-button-active"]); break;

                case "Backspace": buttonAC.current.classList.add(styles["calculator-button-active"]); break;
                case "=": buttonEqual.current.classList.add(styles["calculator-button-active"]); break;
                case "Enter": buttonEqual.current.classList.add(styles["calculator-button-active"]); break;
            }
        }

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        }
    }, [characterInput]);



    useEffect(() => {
        const handleMouseUp = () => {
            setEraseButtonActive(0);
            setActiveHistoryButton(null);
        }

        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mouseup", handleMouseUp);
        }
    }, []);



    useLayoutEffect(() => {
        if (!history.length && historyLoaded) {
            animateHistoryPlaceholderAppearance();
            return;
        };

        animateHistoryPlaceholderDisappearance();

        historyRefs.current = historyRefs.current.filter((el) => el);


        if (historyInsertPending.current) {
            historyInsertPending.current = 0;

            previousHistoryBlocksActivity.current = [0, ...previousHistoryBlocksActivity.current];

            const lastHistoryRef = historyRefs.current[0];
            if (!lastHistoryRef) return;
            const nextHistoryRefs = historyRefs.current.slice(1);

            gsap.set(lastHistoryRef, { x: lastHistoryRef.offsetWidth + s(10), opacity: 0 });
            if (nextHistoryRefs.length) gsap.set(nextHistoryRefs, { y: -(lastHistoryRef.offsetHeight + s(10)) });

            animateHistoryChange(new Array(history.length).fill(1));

            return;
        }
    }, [history]);



    useLayoutEffect(() => {
        nameboxStripesRef.current = document.querySelectorAll(`.${styles["namebox-stripe"]}`);
        nameboxUphangTrapezoidsRef.current = document.querySelectorAll(`.${styles["namebox-uphang-trapezoid-dark"]}`);

        const calculatorButtonsShuffled = [...calculatorButtons].sort(() => Math.random() - 0.5).map((el) => el.current);


        yNameboxStripesRef.current = document.querySelectorAll(`.${styles["y-namebox-stripe"]}`);
        yNameboxUphangTrapezoidsRef.current = document.querySelectorAll(`.${styles["y-namebox-uphang-trapezoid-dark"]}`);



        gsap.set(mainRef.current, { x: -(mainRef.current.offsetWidth + s(100 + 75)), opacity: 0, filter: "brightness(0%)" });
        gsap.set(mainShadowRef.current, { opacity: 0 });
        gsap.set(calculatorButtonsContainerUpperRef.current, { boxShadow: `0 0 0 inset ${styles.magentaDarkish}` });

        gsap.set(nameboxStripesRef.current, { opacity: 0 });
        gsap.set(nameboxLowerContentRef.current, { opacity: 0 });
        gsap.set(nameboxUphangTrapezoidsRef.current, { borderBottom: `${s(20)}px solid ${styles.magentaLight}` });
        gsap.set(nameboxButtonRef.current, { opacity: 0 });
        gsap.set(nameboxButtonCornerRef.current, { opacity: 0 });

        gsap.set(outputTextRef.current, { opacity: 0 });

        gsap.set(mainContentsRef.current, {
            backdropFilter: "blur(0px)",
            background: `linear-gradient(${styles.magentaDarkestAlpha0}, ${styles.magentaDarkerAlpha0}, ${styles.magentaDarkestAlpha0})`
        });
        gsap.set(calculatorButtonsShuffled, { opacity: 0 });


        gsap.set(sidebarRef.current, { x: sidebarRef.current.offsetWidth + s(150 + 75), opacity: 0, filter: "brightness(0%)" });
        gsap.set(sidebarShadowRef.current, { opacity: 0 });
        gsap.set(sidebarInnerShadowRef.current, { opacity: 0 });
        gsap.set(sidebarInnerBorderRef.current, { opacity: 1 });

        gsap.set(yNameboxStripesRef.current, { opacity: 0 });
        gsap.set(yNameboxLowerContentRef.current, { opacity: 0 });
        gsap.set(yNameboxUphangTrapezoidsRef.current, { borderBottom: `${s(20)}px solid ${styles.yellowLight}` });
        gsap.set(yNameboxButtonCornerRef.current, { opacity: 0 });

        gsap.set(eraseButtonRef.current, { x: s(10), scaleX: 0, transformOrigin: "right", opacity: 0 });

        historyRefs.current.forEach((currentHistoryRef, i) => {
            gsap.set(currentHistoryRef, { x: currentHistoryRef.offsetWidth + s(10), opacity: 0, duration: 0.5, ease: "power2.in" });
        });

        gsap.set(sidebarContentsRef.current, {
            backdropFilter: "blur(0px)",
            background: `linear-gradient(${styles.yellowDarkestAlpha0}, ${styles.yellowDarkerAlpha0}, ${styles.yellowDarkestAlpha0})`
        });



        if (!startAnimationReady || !historyLoaded) return;
        setStartAnimationReady(0);



        document.fonts.ready.then(() => {
            if (
                !nameboxTextRef.current ||
                !nameboxButtonTextRef.current ||
                !nameboxButtonCornerTextRef.current ||
                !placeholderOutputTextRef.current.textContent ||
                !yNameboxTextRef.current ||
                !yNameboxButtonCornerTextRef.current ||
                !sidebarCapTextRef.current ||
                !sidebarCapTextAccentRef.current ||
                !calculatorButtonOverlayersRefs
            ) return;


            nameboxSplitTextRef.current = SplitText.create(nameboxTextRef.current, { type: "chars" });
            nameboxButtonSplitTextRef.current = SplitText.create(nameboxButtonTextRef.current, { type: "chars" });
            nameboxButtonCornerSplitTextRef.current = SplitText.create(nameboxButtonCornerTextRef.current, { type: "chars" });
            const calculatorButtonOverlayersShuffled = [...calculatorButtonOverlayersRefs.current].sort(() => Math.random() - 0.5);

            yNameboxSplitTextRef.current = SplitText.create(yNameboxTextRef.current, { type: "chars" });
            yNameboxButtonCornerSplitTextRef.current = SplitText.create(yNameboxButtonCornerTextRef.current, { type: "chars" });

            sidebarCapSplitTextRef.current = SplitText.create(sidebarCapTextRef.current, { type: "chars" });
            sidebarCapAccentSplitTextRef.current = SplitText.create(sidebarCapTextAccentRef.current, { type: "chars" });

            historyPlaceholderSplitTextRef.current = historyPlaceholderTextRef.current ? SplitText.create(historyPlaceholderTextRef.current, { type: "words" }) : 0;
            placeholderOutputSplitTextRef.current = SplitText.create(placeholderOutputTextRef.current, { type: "chars" });



            gsap.set(nameboxSplitTextRef.current.chars, { x: s(50), opacity: 0 });
            gsap.set(nameboxButtonSplitTextRef.current.chars.reverse(), { x: s(-25), opacity: 0 });
            gsap.set(nameboxButtonCornerSplitTextRef.current.chars.reverse(), { x: s(-25), opacity: 0 });
            gsap.set(placeholderOutputSplitTextRef.current.chars.reverse(), { scaleY: 0, transformOrigin: "bottom", color: styles.magentaLight, opacity: 0 });
            gsap.set(calculatorButtonOverlayersShuffled, { opacity: 1 });


            gsap.set(yNameboxSplitTextRef.current.chars, { x: s(50), opacity: 0 });
            gsap.set(yNameboxButtonCornerSplitTextRef.current.chars, { x: s(-25), opacity: 0 });

            gsap.set(sidebarCapSplitTextRef.current.chars, { opacity: 0 });
            gsap.set(sidebarCapAccentSplitTextRef.current.chars, { scaleX: 0, transformOrigin: "left", opacity: 0 });

            
            if (historyPlaceholderSplitTextRef.current.words.length) gsap.set(historyPlaceholderSplitTextRef.current.words, { scaleY: 0, transformOrigin: "bottom", opacity: 0.5 })


            setTimeout(() => {
                const tl = gsap.timeline({ onComplete: () => startingOrEndingAnimationActivity.current = 0 });

                tl
                    .to(mainRef.current, { x: 0, opacity: 1, duration: ((flashDelay + 200) / 1000), ease: "power3.out" }, "0")
                    .to(sidebarRef.current, { x: 0, opacity: 1, duration: ((flashDelay + 200) / 1000), ease: "power3.out" }, "<")


                    .to(mainRef.current, { filter: "brightness(200%)", duration: 0.4, ease: "power2.in" }, ">")
                    .to(mainShadowRef.current, { opacity: 1, duration: 0.4, ease: "power2.in" }, "<")
                    .to(calculatorButtonsContainerUpperRef.current, { boxShadow: `0 0 ${s(20)}px inset ${styles.magentaDarkish}`, duration: 0.4, ease: "power2.in" }, "<")

                    .to(sidebarRef.current, { filter: "brightness(200%)", duration: 0.4, ease: "power2.in" }, "<")
                    .to(sidebarShadowRef.current, { opacity: 1, duration: 0.4, ease: "power2.in" }, "<")
                    .to(sidebarInnerShadowRef.current, { opacity: 1, duration: 0.4, ease: "power2.in" }, "<")

                    .add("flashPeak", ">")

                    .to(mainRef.current, { filter: "brightness(100%)", duration: 0.4, ease: "power2.out" }, "flashPeak")
                    .to(sidebarRef.current, { filter: "brightness(100%)", duration: 0.4, ease: "power2.out" }, "<")

                    .set(mainRef.current, { clearProps: "filter" }, ">")
                    .set(sidebarRef.current, { clearProps: "filter" }, "<")

                    .to(mainContentsRef.current, {
                        backdropFilter: `blur(${s(4)}px)`,
                        background: `linear-gradient(${styles.magentaDarkestAlpha095}, ${styles.magentaDarkerAlpha05}, ${styles.magentaDarkestAlpha09})`,
                        duration: 0.5,
                        ease: "power1.inOut"
                    }, "<")
                    .to(sidebarContentsRef.current, {
                        backdropFilter: `blur(${s(4)}px)`,
                        background: `linear-gradient(${styles.yellowDarkestAlpha095}, ${styles.yellowDarkerAlpha05}, ${styles.yellowDarkestAlpha09})`,
                        duration: 0.5,
                        ease: "power1.inOut"
                    }, "<")


                    .to(nameboxStripesRef.current, { opacity: 1, duration: 0.4, ease: "power1.in", stagger: 0.1 }, "flashPeak")
                    .to(nameboxLowerContentRef.current, { opacity: 1, duration: 0.4, ease: "power1.in" }, "<+0.1")
                    .to(nameboxSplitTextRef.current.chars, { x: 0, opacity: 1, duration: 0.2, ease: "power2.out", stagger: 0.05 }, "<+0.1")
                    .to(nameboxUphangTrapezoidsRef.current, { borderBottom: `${s(20)}px solid ${styles.magentaDark}`, duration: 0.4, ease: "power1.in", stagger: 0.1 }, "<")
                    .to(nameboxButtonRef.current, { opacity: 1, duration: 0.4, ease: "power1.in" }, "<+0.1")
                    .to(nameboxButtonCornerRef.current, { opacity: 1, duration: 0.4, ease: "power1.in" }, "<+0.1")
                    .to(nameboxButtonSplitTextRef.current.chars.reverse(), { x: 0, opacity: 1, duration: 0.15, ease: "power2.out", stagger: 0.05 }, "<+0.1")
                    .to(nameboxButtonCornerSplitTextRef.current.chars.reverse(), { x: 0, opacity: 1, duration: 0.15, ease: "power2.out", stagger: 0.05 }, "<+0.1")

                    .to(outputWindowRef.current, { backgroundPosition: "100% 0%", duration: 1, ease: "none" }, "<-0.3")

                    .to(placeholderOutputSplitTextRef.current.chars, { scaleY: 1, opacity: 1, duration: 0.2, ease: "power2.out", stagger: 0.02 }, "<+0.15")
                    .to(placeholderOutputSplitTextRef.current.chars, { color: styles.magentaDarker, duration: 0.4, ease: "power2.out", stagger: 0.02 }, "<+0.2")
                    .to(outputTextRef.current, { opacity: 1, duration: 0.6, ease: "power1.inOut" }, ">-0.6")
                    .add(calculatorButtonsAppearanceTimeline(), "<-0.6")


                    .to(yNameboxStripesRef.current, { opacity: 1, duration: 0.4, ease: "power1.in", stagger: 0.1 }, "flashPeak")
                    .to(yNameboxLowerContentRef.current, { opacity: 1, duration: 0.4, ease: "power1.in" }, "<+0.1")
                    .to(yNameboxSplitTextRef.current.chars, { x: 0, opacity: 1, duration: 0.2, ease: "power2.out", stagger: 0.05 }, "<+0.1")
                    .to(yNameboxUphangTrapezoidsRef.current, { borderBottom: `${s(20)}px solid ${styles.yellowDark}`, duration: 0.4, ease: "power1.in", stagger: 0.1 }, "<")
                    .to(yNameboxButtonCornerRef.current, { opacity: 1, duration: 0.4, ease: "power1.in" }, "<+0.1")
                    .to(yNameboxButtonCornerSplitTextRef.current.chars.reverse(), { x: 0, opacity: 1, duration: 0.15, ease: "power2.out", stagger: 0.05 }, "<+0.2")

                    .to(eraseButtonRef.current, { x: 0, scaleX: 1, opacity: 1, duration: 0.25, ease: "power2.out" }, "<+0.1")
                    .to(sidebarCapRef.current, { backgroundPosition: "0% 0%", duration: 0.8, ease: "none" }, "<-0.4")
                    .to(sidebarCapSplitTextRef.current.chars, { opacity: 1, duration: 0.2, ease: "power1.inOut", stagger: "0.075" }, "<-0.1")
                    .to(sidebarCapAccentSplitTextRef.current.chars, { scaleX: 1, opacity: 1, duration: 0.2, ease: "power2.out", stagger: "0.05" }, "<+0.3")
                    .to(sidebarInnerBorderRef.current, { opacity: 0, duration: 0.6, ease: "power2.in" }, "<+0.1")

                    .call(animateInfo, [1], "<+0.2")
                    .call(animateHistoryPlaceholderAppearance, [], "<");
            }, animationStart)
        });
    }, [startAnimationReady, historyLoaded]);





    /*███████████████ RETURN █████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████*/

    return <div className={styles["container"]}>
        <div className={styles["container-lower"]}>
            <div className={styles["main"]} ref={mainRef}>
                <div className={styles["main-shadow"]} ref={mainShadowRef} />

                <div className={styles["namebox-container"]}>
                    <div className={styles["namebox"]}>
                        <div className={styles["namebox-contents-container"]}>
                            <div className={styles["namebox-stripes-container"]}>
                                <div className={styles["namebox-stripe"]} />
                                <div className={styles["namebox-stripe"]} />
                                <div className={styles["namebox-stripe"]} />
                            </div>

                            <div className={styles["namebox-buttons-container"]}>
                                <div className={styles["namebox-button"]} ref={nameboxButtonRef} onClick={(() => animateInfo(0))}>
                                    <p className={styles["namebox-button-font"]} ref={nameboxButtonTextRef}>info</p>

                                    <div className={styles["namebox-button-bg-dark"]}>
                                        <div className={styles["namebox-button-bg-light"]} />
                                    </div>
                                </div>

                                <div className={styles["namebox-button-corner"]} ref={nameboxButtonCornerRef} onClick = {unloadingAnimation}>
                                    <p className={styles["namebox-button-font"]} ref={nameboxButtonCornerTextRef}>return</p>

                                    <div className={styles["namebox-button-bg-dark"]} />
                                    <div className={styles["namebox-button-bg-light"]} />
                                </div>

                                <div className={styles["namebox-buttons-bg"]} />
                            </div>
                        </div>

                        <div className={styles["namebox-lower-outline"]}>
                            <p className={styles["namebox-font"]}>Retro Calculator</p>
                        </div>

                        <div className={styles["namebox-lower-content"]} ref={nameboxLowerContentRef}>
                            <p className={styles["namebox-font"]} ref={nameboxTextRef}>Retro Calculator</p>
                        </div>
                    </div>

                    <div className={styles["namebox-uphang"]}>
                        <div className={styles["namebox-uphang-trapezoid-container"]}>
                            <div className={styles["namebox-uphang-trapezoid-dark"]} />
                            <div className={styles["namebox-uphang-trapezoid-light"]} />

                            <div className={styles["namebox-uphang-trapezoid-dark"]} />
                            <div className={styles["namebox-uphang-trapezoid-light"]} />

                            <div className={styles["namebox-uphang-trapezoid-dark"]} />
                            <div className={styles["namebox-uphang-trapezoid-light"]} />
                        </div>
                    </div>
                </div>



                <div className={styles["main-contents"]} ref={mainContentsRef}>
                    <div className={styles["output-window"]} ref={outputWindowRef}>
                        <div className={styles["output-window-contents"]}>
                            <p className={styles["placeholder-output-font"]} ref={placeholderOutputTextRef}>{getPlaceholderOutputText()}</p>

                            <p className={styles["output-font"]} ref={outputTextRef}>
                                {displayOutputText}
                                <span className={styles["output-font-inactive"]} ref={outputTextParenthesesRef}>{")".repeat(openParenthesesCount)}</span>
                            </p>
                        </div>
                    </div>

                    <div className={styles["calculator-buttons-container-upper"]} ref={calculatorButtonsContainerUpperRef}>
                        <div className={styles["calculator-buttons-container"]}>
                            <div className={styles["calculator-buttons-row"]}>
                                <div className={`${styles["calculator-button"]} ${styles["calculator-button-active"]}`} onClick={() => characterInput("(")} ref={buttonOpeningParenthesis}>
                                    <div className={styles["calculator-button-overlayer"]} />

                                    <p className={styles["calculator-button-p"]}>{"("}</p>
                                </div>

                                <div className={`${styles["calculator-button-wide"]} ${styles["calculator-button-active"]}`} onClick={() => characterInput("=")} ref={buttonEqual}>
                                    <div className={styles["calculator-button-overlayer"]} />
                                    
                                    <p className={styles["calculator-button-p"]}>=</p>
                                </div>

                                <div className={`${styles["calculator-button-wide"]} ${styles["calculator-button-active"]}`} onClick={() => characterInput("AC/CE")} ref={buttonAC}>
                                    <div className={styles["calculator-button-overlayer"]} />
                                    
                                    <p className={styles["calculator-button-p"]}>{ACStatus ? "AC" : "CE"}</p>
                                </div>
                            </div>

                            <div className={styles["calculator-buttons-row"]}>
                                <div className={`${styles["calculator-button"]} ${styles["calculator-button-active"]}`} onClick={() => characterInput(")")} ref={buttonClosingParenthesis}>
                                    <div className={styles["calculator-button-overlayer"]} />
                                    
                                    <p className={styles["calculator-button-p"]}>{")"}</p>
                                </div>

                                <div className={styles["calculator-button"]} onClick={() => characterInput("7")} ref={button7}>
                                    <div className={styles["calculator-button-overlayer"]} />
                                    
                                    <p className={styles["calculator-button-p"]}>7</p>
                                </div>

                                <div className={styles["calculator-button"]} onClick={() => characterInput("8")} ref={button8}>
                                    <div className={styles["calculator-button-overlayer"]} />
                                    
                                    <p className={styles["calculator-button-p"]}>8</p>
                                </div>

                                <div className={styles["calculator-button"]} onClick={() => characterInput("9")} ref={button9}>
                                    <div className={styles["calculator-button-overlayer"]} />
                                    
                                    <p className={styles["calculator-button-p"]}>9</p>
                                </div>

                                <div className={`${styles["calculator-button"]} ${styles["calculator-button-active"]}`} onClick={() => characterInput("÷")} ref={buttonDivide}>
                                    <div className={styles["calculator-button-overlayer"]} />
                                    
                                    <p className={styles["calculator-button-p"]}>÷</p>
                                </div>
                            </div>

                            <div className={styles["calculator-buttons-row"]}>
                                <div className={`${styles["calculator-button"]} ${styles["calculator-button-active"]}`} onClick={() => characterInput("%")} ref={buttonPercent}>
                                    <div className={styles["calculator-button-overlayer"]} />
                                    
                                    <p className={styles["calculator-button-p"]}>%</p>
                                </div>

                                <div className={styles["calculator-button"]} onClick={() => characterInput("4")} ref={button4}>
                                    <div className={styles["calculator-button-overlayer"]} />
                                    
                                    <p className={styles["calculator-button-p"]}>4</p>
                                </div>

                                <div className={styles["calculator-button"]} onClick={() => characterInput("5")} ref={button5}>
                                    <div className={styles["calculator-button-overlayer"]} />
                                    
                                    <p className={styles["calculator-button-p"]}>5</p>
                                </div>

                                <div className={styles["calculator-button"]} onClick={() => characterInput("6")} ref={button6}>
                                    <div className={styles["calculator-button-overlayer"]} />
                                    
                                    <p className={styles["calculator-button-p"]}>6</p>
                                </div>

                                <div className={`${styles["calculator-button"]} ${styles["calculator-button-active"]}`} onClick={() => characterInput("×")} ref={buttonMultiply}>
                                    <div className={styles["calculator-button-overlayer"]} />
                                    
                                    <p className={styles["calculator-button-p"]}>×</p>
                                </div>
                            </div>

                            <div className={styles["calculator-buttons-row"]}>
                                <div className={`${styles["calculator-button"]} ${styles["calculator-button-active"]}`}onClick={() => characterInput("√")} ref={buttonSqrt}>
                                    <div className={styles["calculator-button-overlayer"]} />
                                    
                                    <p className={styles["calculator-button-p"]}>√</p>
                                </div>

                                <div className={styles["calculator-button"]} onClick={() => characterInput("1")} ref={button1}>
                                    <div className={styles["calculator-button-overlayer"]} />
                                    
                                    <p className={styles["calculator-button-p"]}>1</p>
                                </div>

                                <div className={styles["calculator-button"]} onClick={() => characterInput("2")} ref={button2}>
                                    <div className={styles["calculator-button-overlayer"]} />
                                    
                                    <p className={styles["calculator-button-p"]}>2</p>
                                </div>

                                <div className={styles["calculator-button"]} onClick={() => characterInput("3")} ref={button3}>
                                    <div className={styles["calculator-button-overlayer"]} />
                                    
                                    <p className={styles["calculator-button-p"]}>3</p>
                                </div>

                                <div className={`${styles["calculator-button"]} ${styles["calculator-button-active"]}`} onClick={() => characterInput("-")} ref={buttonMinus}>
                                    <div className={styles["calculator-button-overlayer"]} />
                                    
                                    <p className={styles["calculator-button-p"]}>-</p>
                                </div>
                            </div>

                            <div className={styles["calculator-buttons-row"]}>
                                <div className={`${styles["calculator-button"]} ${powerMode ? "" : styles["calculator-button-active"]}`} onClick={() => characterInput("^")} ref={buttonPower}>
                                    <div className={styles["calculator-button-overlayer"]} />
                                    
                                    <p className={styles["calculator-button-p"]}>xʸ</p>
                                </div>

                                <div className={styles["calculator-button-wide"]} onClick={() => characterInput("0")} ref={button0}>
                                    <div className={styles["calculator-button-overlayer"]} />
                                    
                                    <p className={styles["calculator-button-p"]}>0</p>
                                </div>

                                <div className={styles["calculator-button"]} onClick={() => characterInput(".")} ref={buttonPoint}>
                                    <div className={styles["calculator-button-overlayer"]} />
                                    
                                    <p className={styles["calculator-button-p"]}>.</p>
                                </div>

                                <div className={`${styles["calculator-button"]} ${styles["calculator-button-active"]}`} onClick={() => characterInput("+")} ref={buttonPlus}>
                                    <div className={styles["calculator-button-overlayer"]} />
                                    
                                    <p className={styles["calculator-button-p"]}>+</p>
                                </div>
                            </div>

                            <div className={styles["calculator-info-container"]} ref={calculatorInfoContainerRef}>
                                <p className={styles["calculator-info-h1"]} ref={infoH1Ref}>Info</p>
                                <p className={styles["calculator-info-p"]}>To exit this menu and return buttons press "info" again.</p>

                                <div className={styles["calculator-info-p-spacer"]} />

                                <p className={styles["calculator-info-h2"]}>There are shortcuts for all the buttons - here they are:</p>
                                <div className={styles["calculator-info-list"]} ref={infoListRef}>
                                    <div>
                                        <p className={styles["calculator-info-p"]}>{"‣  0-9 - [ 0 ]-[ 9 ]"}</p>
                                        <p className={styles["calculator-info-p"]}>{"‣  .   - [ . ]"}</p>
                                        <p className={styles["calculator-info-p"]}>{"‣  (   - [ ( ]"}</p>
                                        <p className={styles["calculator-info-p"]}>{"‣  )   - [ ) ]"}</p>
                                        <p className={styles["calculator-info-p"]}>{"‣  =   - [ Enter ], [ = ]"}</p>
                                        <p className={styles["calculator-info-p"]}>{"‣  AC  - [ Backspace ]"}</p>
                                        <p className={styles["calculator-info-p"]}>{"‣  CE  - [ Backspace ]"}</p>
                                    </div>

                                    <div className={styles["calculator-info-list-divider"]} ref={infoListDividerRef} />

                                    <div>
                                        <p className={styles["calculator-info-p"]}>{"‣  +  - [ + ]"}</p>
                                        <p className={styles["calculator-info-p"]}>{"‣  -  - [ - ]"}</p>
                                        <p className={styles["calculator-info-p"]}>{"‣  ×  - [ * ]"}</p>
                                        <p className={styles["calculator-info-p"]}>{"‣  ÷  - [ / ]"}</p>
                                        <p className={styles["calculator-info-p"]}>{"‣  xʸ - [ ^ ]"}</p>
                                        <p className={styles["calculator-info-p"]}>{"‣  √  - [ @ ]"}</p>
                                        <p className={styles["calculator-info-p"]}>{"‣  %  - [ % ]"}</p>
                                    </div>
                                </div>

                                <div className={styles["calculator-info-p-spacer"]} />

                                <p className={styles["calculator-info-p"]}>The history on your right is connected to your account.</p>
                                <p className={styles["calculator-info-p"]}>The button with trash bin icon clears the entire history on this account.</p>
                                <p className={styles["calculator-info-p"]}>The cross button removes the item it is on from the history.</p>

                                <div className={styles["calculator-info-p-spacer"]} />

                                <p className={styles["calculator-info-h2"]}>To return to the subprojects hub:</p>
                                <p className={styles["calculator-info-h2"]}>Press the "return" button on the top-right of any window.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>





            <div className={styles["sidebar"]} ref={sidebarRef}>
                <div className={styles["sidebar-shadow"]} ref={sidebarShadowRef} />

                <div className={styles["namebox-container"]}>
                    <div className={styles["y-namebox"]}>
                        <div className={styles["namebox-contents-container"]}>
                            <div className={styles["namebox-stripes-container"]}>
                                <div className={styles["y-namebox-stripe"]} />
                                <div className={styles["y-namebox-stripe"]} />
                                <div className={styles["y-namebox-stripe"]} />
                            </div>

                            <div className={styles["namebox-buttons-container"]}>
                                <div className={styles["namebox-button-corner"]} ref={yNameboxButtonCornerRef} onClick={unloadingAnimation} >
                                    <p className={styles["y-namebox-button-font"]} ref={yNameboxButtonCornerTextRef}>return</p>

                                    <div className={styles["y-namebox-button-bg-dark"]} />
                                    <div className={styles["y-namebox-button-bg-light"]} />
                                </div>

                                <div className={styles["y-namebox-buttons-bg"]} />
                            </div>
                        </div>

                        <div className={styles["y-namebox-lower-outline"]}>
                            <p className={styles["y-namebox-font"]}>History</p>
                        </div>

                        <div className={styles["y-namebox-lower-content"]} ref={yNameboxLowerContentRef}>
                            <p className={styles["y-namebox-font"]} ref={yNameboxTextRef}>History</p>
                        </div>
                    </div>

                    <div className={styles["y-namebox-uphang"]}>
                        <div className={styles["namebox-uphang-trapezoid-container"]}>
                            <div className={styles["y-namebox-uphang-trapezoid-dark"]} />
                            <div className={styles["y-namebox-uphang-trapezoid-light"]} />

                            <div className={styles["y-namebox-uphang-trapezoid-dark"]} />
                            <div className={styles["y-namebox-uphang-trapezoid-light"]} />
                        </div>
                    </div>
                </div>


                <div className={styles["sidebar-contents"]} ref={sidebarContentsRef}>
                    <div className={styles["sidebar-cap"]} ref={sidebarCapRef}>
                        <div className={styles["sidebar-cap-contents"]}>
                            <div className={styles["sidebar-cap-text-container"]}>
                                <p className={styles["sidebar-cap-text"]} ref={sidebarCapTextRef}>Logged in as:</p>
                                
                                <p className={styles["sidebar-cap-text-accent"]} ref={sidebarCapTextAccentRef}>{account.current?.name ? account.current?.name : "No account found"}</p>
                            </div>

                            <div className={styles["sidebar-cap-button"]} ref={eraseButtonRef} onMouseDown={eraseHistory}>
                                <img src={eraseButtonActive ? trashBinIconActive : trashBinIcon} alt="Clear history" className={styles["trash-bin-icon"]} draggable="false" />
                            </div>
                        </div>
                    </div>

                    <div className={styles["sidebar-inner-contents-container"]}>
                        <div className={styles["sidebar-inner-shadow"]} ref={sidebarInnerShadowRef} />
                        <div className={styles["sidebar-inner-border"]} ref={sidebarInnerBorderRef} />

                        <div className={styles["sidebar-inner-contents"]}>
                            <p className={styles["history-placeholder-p"]} ref={historyPlaceholderTextRef}>No history yet... :(</p>

                            {history.map((historyItem, i) => 
                                <div className={styles["history-item"]} ref={(el) => historyRefs.current[i] = el} key={i}>
                                    <div className={styles["history-item-text-container"]}>
                                        <p className={styles["history-item-text"]}>{historyItem.eval}</p>
                                        <p className={styles["history-item-text"]}>{` = ${historyItem.result}`}</p>
                                    </div>

                                    <div className={styles["history-item-button-container"]}>
                                        <div className={styles["history-item-button"]} onMouseDown={() => deleteHistoryItem(i)}>
                                            <img src={
                                                activeHistoryButton === i ? crossIconActive : crossIcon
                                            } alt="Delete" className={styles["cross-icon"]} draggable="false" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <CalculatorPageBG ref={calculatorPageBGRef} />
    </div>
}