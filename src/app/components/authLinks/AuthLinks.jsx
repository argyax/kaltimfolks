"use client";
import Link from "next/link";
import styles from "./authLinks.module.css";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import DropDown from "../DropDown/DropDown";
import SearchInput from "../searchInput/searchInput";

const AuthLinks = () => {
  const [open, setOpen] = useState(false);

  const { status } = useSession();

  const handleMenuClick = () => {
    setOpen(false);
  };

  return (
    <>
      {status === "unauthenticated" ? (
        <>
          <button className={styles.button1}>
            <Link href="/auth/login" className={styles.link}>
              Log In
            </Link>
          </button>
          <button className={styles.button2}>
            <Link href="/auth/signup" className={styles.link}>
              Sign Up
            </Link>
          </button>
        </>
      ) : (
        <>
          <Link href="/write" className={styles.link}>
            Write
          </Link>
          <span className={styles.link} onClick={signOut}>
            Logout
          </span>
        </>
      )}
      <div className={styles.burger} onClick={() => setOpen(!open)}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
      {open && (
        <div className={styles.responsiveMenu}>
          <div className={styles.openBurger} onClick={() => setOpen(!open)}>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
          </div>

          {/* <DropDown /> */}
          <Link href="/blog?cat=follower's insight" onClick={handleMenuClick}>
            Follower's Insight
          </Link>
          <Link href="/about-us" onClick={handleMenuClick}>
            About Us
          </Link>
          <Link href="/our-content" onClick={handleMenuClick}>
            Our Content
          </Link>
          {status === "unauthenticated" ? (
            <>
              <Link href="/auth/login" onClick={handleMenuClick}>
                Log In
              </Link>
              <Link href="/auth/signup" onClick={handleMenuClick}>
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link href="/write" onClick={handleMenuClick}>
                Write
              </Link>
              <span onClick={() => { signOut(); handleMenuClick(); }}>Logout</span>
            </>
          )}
          <SearchInput />
        </div>
      )}
    </>
  );
};

export default AuthLinks;
