import { createRoot } from "react-dom/client";
import "./assets/index.css";
import App from "./App.tsx";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);
