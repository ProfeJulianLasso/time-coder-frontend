import { createRoot } from "react-dom/client";
import { HomePage } from "./modules/home";
import "./styles/globals.style.css";

createRoot(document.getElementById("root")!).render(<HomePage />);
