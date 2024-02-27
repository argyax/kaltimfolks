"use client";
import { Button } from "@nextui-org/react";
import { signIn, useSession } from "next-auth/react";
import styles from "./authComponents.module.css";
import Link from "next/link";

const LoginButton = () => {
  const { data: session } = useSession();

  return (
    <div className={styles.position}>
      {session && session.user ? (
        <>
          <Link href={"/"}>{`${session.user.firstName} ${session.user.lastName}`}</Link>
          <Link
            className="tex-sky-500 hover:text-sky-600 transition-colors"
            href={"/api/auth/signout"}
          >
            Sign Out
          </Link>
        </>
      ) : (
        <>
          <Button  className={styles.socialButton1} onClick={() => signIn()}>Log In</Button>
          <Button  as={Link} href={"/auth/signup"}>
            Sign Up
          </Button>
        </>
      )}
    </div>
  );
};

export default LoginButton;
