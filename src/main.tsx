
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import { MotionConfig } from "motion/react";
  import "./styles/index.css";

  createRoot(document.getElementById("root")!).render(
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  );
  