import * as React from "react";
import {createRoot} from "react-dom/client";
import "./style.css";

const root = createRoot(document.querySelector('.root'));
root.render(<h1>Hello, world!</h1>);