"use client";
import { usePathname } from "next/navigation";
import styles from "./navbar.module.css";
import Search from "../search/search";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className={styles.menu}>
    </div>
  );
};

export default Navbar;