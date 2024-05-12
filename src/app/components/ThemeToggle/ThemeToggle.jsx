"use client";
import Image from "next/image";
import styles from "./themeToggle.module.css";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";

const ThemeToggle = () => {
  const { toggle, theme } = useContext(ThemeContext);

  return (
    <div
      className={styles.container}
      onClick={toggle}
      style={
        theme === "dark" ? { backgroundColor: "white" } : { backgroundColor: "#0f172a" }
      }>
      <div
        className={styles.ball}
        style={
          theme === "dark"
            ? { left: 3, background: "#0f172a" }
            : { right: 3, background: "white" }
        }
      ></div>
    </div>
  );
};

export default ThemeToggle;