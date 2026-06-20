import { createRoot } from "react-dom/client";

// the app
import { Dashboard } from "./Dashboard";

// styles
import "./styles/styles.scss";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<Dashboard />);
