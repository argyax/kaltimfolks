"use client";
import Link from "next/link";
import styles from "./authLinks.module.css";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import DropDown from "../DropDown/DropDown";
import SearchInput from "../searchInput/searchInput"

const AuthLinks = () => {
  const [open, setOpen] = useState(false);

  const { status } = useSession();

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

          {/* <DropDown /> */}
          <Link href="/about-us">About Us</Link>
          <Link href="/our-content">Our Content</Link>
          {status === "unauthenticated" ? (
            <>
              <Link href="/auth/login">Log In</Link>
              <Link href="/auth/signup">Sign Up</Link>
            </>
          ) : (
            <>
              <Link href="/write">Write</Link>
              <span onClick={signOut}>Logout</span>
            </>
          )}
          <SearchInput />
        </div>
      )}
    </>
  );
};

export default AuthLinks;