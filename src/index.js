import { createRoot } from "react-dom/client";

// the app
import { Toolbar } from "./Toolbar";

// styles
import "./styles/styles.scss";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<Toolbar />);
