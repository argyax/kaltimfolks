"use client"
import SignUpForm from "@/app/components/AuthComponents/SignUpForm";
import { Image, Link } from "@nextui-org/react";
import styles from "./signupPage.module.css";
import NextAuthProviders from "@/app/components/AuthComponents/NextAuthProviders";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const SignupPage = () => {
  const { status } = useSession();

  const router = useRouter();

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (status === "authenticated") {
    router.push("/")
  }
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link href="/" className={styles.logo}>KALTIMFOLKS.</Link>
          <p className={styles.desc}>A place for you to explore the creative culture of East Kalimantan and Indonesians</p>
        <div className={styles.log}>
          <p>Already have an account? </p>
          <Link href={"/auth/login"}>Log In</Link>
        </div>
        <SignUpForm />
        <NextAuthProviders />
      </div>
    </div>
  );
};

export default SignupPage;
