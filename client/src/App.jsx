import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MainPage from "./pages/MainPage.jsx";
import GreetingPage from "./pages/GreetingPage.jsx";
import CalculatorPage from "./pages/CalculatorPage.jsx";
import RegInfoPage from "./pages/RegInfoPage.jsx";
import SwitchPage from "./pages/SwitchPage.jsx";
import CtrlGearPage from "./pages/CtrlGearPage.jsx";
import TestPage from "./pages/TestPage.jsx";

import "./styles/styles.scss";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/greeting-page" element={<GreetingPage />} />
        <Route path="/calculator" element={<CalculatorPage />} />
        <Route path="/reg-info" element={<RegInfoPage />} />
        <Route path="/switch" element={<SwitchPage />} />
        <Route path="/ctrl-gear" element={<CtrlGearPage />} />
        <Route path="/test-page" element={<TestPage />} />
      </Routes>
    </BrowserRouter>
  )
}