import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

import { updateScale } from "./utils/scale.js"




updateScale();

window.addEventListener("resize", updateScale);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);