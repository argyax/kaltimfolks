import React from "react";
import styles from "./navbar.module.css";
import Image from "next/image";
import Link from "next/link";
import AuthLinks from "../authLinks/AuthLinks";
import ThemeToggle from "../themeToggle/ThemeToggle";
import DropDown from "../DropDown/DropDown";

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.social}>
        <Image src="/instagram.png" alt="instagram" width={24} height={24} />
        <Image src="/tiktok.png" alt="tiktok" width={24} height={24} />
        <Image src="/youtube.png" alt="youtube" width={24} height={24} />
      </div>
      <div className={styles.links}>
      <Link href="/" className={styles.logo}>KALTIMFOLKS.</Link>
      <div className={styles.toggle}><ThemeToggle /></div>
        <div className={styles.cat}><DropDown /></div>
        <Link href="/blog" className={styles.link}>About Us</Link>
        <Link href="/" className={styles.link}>Our Content</Link>
      </div>
      <div className={styles.auth}>
          <AuthLinks />
      </div>
    </div>
  );
};

export default Navbar;
