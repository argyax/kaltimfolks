"use client";
import { usePathname } from "next/navigation";
import styles from "./navbar.module.css";
import Search from "../search/search";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className={styles.container}>
      <div className={styles.title}>{pathname.split("/").pop()}</div>
      <div className={styles.menu}>
      </div>
    </div>
  );
};

export default Navbar;