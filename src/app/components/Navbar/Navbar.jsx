import React from "react";
import styles from "./navbar.module.css";
import { FaInstagram, FaTiktok } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6'
import Link from "next/link";
import AuthLinks from "../authLinks/AuthLinks";
import ThemeToggle from "../themeToggle/ThemeToggle";
import DropDown from "../DropDown/DropDown";

const Navbar = () => {
  return (
    <>
    <div className={styles.container}>
      <div className={styles.wrapper}> 
        <div className={styles.social}>
          <Link href="https://www.instagram.com/kaltimfolks/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram size={24} /></Link>
          <Link href="https://x.com/kaltimfolks" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FaXTwitter size={24} /></Link>
          <Link href="https://www.tiktok.com/@kaltimfolks" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><FaTiktok size={24} /></Link>
        </div>
        <div className={styles.links}>
          <Link href="/" className={styles.logo}>KALTIMFOLKS.</Link>
          <div className={styles.toggle}><ThemeToggle /></div>
          <div className={styles.cat}><DropDown /></div>
          <Link href="/about-us" className={styles.link}>About Us</Link>
          <Link href="/our-content" className={styles.link}>Our Content</Link>
        </div>
        <div className={styles.auth}>
          <AuthLinks />
        </div>
      </div>
    </div>
    </>
  );
};

export default Navbar;
