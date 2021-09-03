import { render } from "react-dom";

// Styles
import "../styles/preflight.css";
import "../styles/inter.css";
import "../styles/global.css";

import App from "./App";

const rootElement = document.getElementById("root");
render(<App />, rootElement);
