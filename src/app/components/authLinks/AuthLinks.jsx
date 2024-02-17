"use client";
import Link from "next/link";
import styles from "./authLinks.module.css";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import DropDown from "../DropDown/DropDown";

const AuthLinks = () => {
  const [open, setOpen] = useState(false);

  const { status } = useSession();

  return (
    <>
      {status === "unauthenticated" ? (
        <>
        <button className={styles.button1}>
          <Link href="/login" className={styles.link}>
             Log In
          </Link>
        </button>
        <button className={styles.button2}>
          <Link href="/signup" className={styles.link}>
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
          <DropDown />
          <Link href="/">About</Link>
          <Link href="/">Contact</Link>
          {status === "notauthenticated" ? (
            <>
              <Link href="/login">Log In</Link>
              <Link href="/signup">Sign Up</Link>
            </>
          ) : (
            <>
              <Link href="/write">Write</Link>
              <span className={styles.link}>Logout</span>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AuthLinks;