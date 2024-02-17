"use client";
import { signIn, useSession } from "next-auth/react";
import styles from "./signupPage.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const LoginPage = () => {
  const { status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSignInWithEmail = async () => {
    const result = await signIn("email", { email, password, redirect: false });
    if (result?.error) {
      // Handle sign-in error
      console.error("Sign in error:", result.error);
    } else {
      // Redirect to home page on successful sign-in
      router.push("/");
    }
  };

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (status === "authenticated") {
    router.push("/");
  }

  return (
    <>
    <div className={styles.container}>
      <div className={styles.wrapper}>
      <Link href="/" className={styles.logo}>KALTIMFOLKS.</Link>
      <p className={styles.desc}>A place for you to explore the creative culture of East Kalimantan and Indonesians</p>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}/>

        <button className={styles.socialButton} onClick={handleSignInWithEmail}>
          Sign Up
        </button>
        <h4 className={styles.altlog}>or</h4>
        <button className={styles.socialButton} onClick={() => signIn("google")}>
          Sign Up with Google
        </button>
        <button className={styles.socialButton} onClick={() => signIn("facebook")}>
          Sign Up with Facebook
        </button>
      </div>
    </div>
    </>
  );
};

export default LoginPage;
