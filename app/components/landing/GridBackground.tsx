"use client";

import { useEffect } from "react";
import styles from "../../home/page.module.css";

export function GridBackground() {
  useEffect(() => {
    const updatePointer = (event: MouseEvent) => {
      const root = document.documentElement;
      root.style.setProperty("--landing-mouse-x", `${event.clientX}px`);
      root.style.setProperty("--landing-mouse-y", `${event.clientY}px`);
    };

    window.addEventListener("mousemove", updatePointer);

    return () => {
      window.removeEventListener("mousemove", updatePointer);
    };
  }, []);

  return <div aria-hidden="true" className={styles.gridBackground} />;
}
