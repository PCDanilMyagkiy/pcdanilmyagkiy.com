import { useEffect, useLayoutEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";

import styles from "./MainPage.module.scss";

import Win95Main from "./main/Win95Main.jsx";
import BillMain from "./main/BillMain.jsx";
import DarkMain from "./main/DarkMain.jsx";
import PhotoMain from "./main/PhotoMain.jsx";



const MainPage = () => {
    const navigate = useNavigate();


    const Win95MainRef = useRef(null);
    const BillMainRef = useRef(null);
    const DarkMainRef = useRef(null);
    const PhotoMainRef = useRef(null);

    const [currentMainPage, setCurrentMainPage] = useState(null);
    

    const gotoMainPage = (page) => {
        localStorage.setItem("currentMainPage", page);

        setCurrentMainPage(page);
    };



    useEffect(() => {
        const currentMainPage = localStorage.getItem("currentMainPage");

        if (!currentMainPage) {
            gotoMainPage("Win95Main");

            return navigate("/greeting-page");
        }

        gotoMainPage(currentMainPage);
    }, []);
    


    useLayoutEffect(() => {
        switch (currentMainPage) {
            case "Win95Main":
                Win95MainRef.current.prepWin95Main();
                break;
            
            case "BillMain":
                BillMainRef.current.prepBillMain();
                break;

            case "DarkMain":
                DarkMainRef.current.prepDarkMain();
                break;

            case "PhotoMain":
                PhotoMainRef.current.prepPhotoMain();
                break;
        }
    }, [currentMainPage]);



    useEffect(() => {
        switch (currentMainPage) {
            case "Win95Main":
                Win95MainRef.current.loadWin95Main();
                break;

            case "BillMain":
                BillMainRef.current.loadBillMain();
                break;

            case "DarkMain":
                DarkMainRef.current.loadDarkMain();
                break;

            case "PhotoMain":
                PhotoMainRef.current.loadPhotoMain();
                break;
        }
    }, [currentMainPage]);

    return (
        <div className={styles["container"]}>
            {currentMainPage === "Win95Main" && (
                <Win95Main ref={Win95MainRef} gotoMainPage={gotoMainPage} />
            )}

            {currentMainPage === "BillMain" && (
                <BillMain ref={BillMainRef} gotoMainPage={gotoMainPage} />
            )}

            {currentMainPage === "DarkMain" && (
                <DarkMain ref={DarkMainRef} gotoMainPage={gotoMainPage} />
            )}

            {currentMainPage === "PhotoMain" && (
                <PhotoMain ref={PhotoMainRef} gotoMainPage={gotoMainPage} />
            )}
        </div>
    )
}





export default MainPage;