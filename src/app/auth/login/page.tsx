"use client";
import LoginForm from "@/app/components/AuthComponents/LoginForm";
import Link from "next/link";
import styles from "./loginPage.module.css";
import NextAuthProviders from "@/app/components/AuthComponents/NextAuthProviders";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface Props {
  searchParams: {
    callbackUrl?: string;
  };
}

const SigninPage = ({ searchParams }: Props) => {
  console.log({ searchParams });

  const { status } = useSession();

  const router = useRouter();

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (status === "authenticated") {
    router.push("/");
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link href="/" className={styles.logo}>
          KALTIMFOLKS.
        </Link>
        <p className={styles.desc}>
          A place for you to explore the creative culture of East Kalimantan and
          Indonesians
        </p>
        <LoginForm callbackUrl={searchParams.callbackUrl} />
        <p className={styles.altlog}>
          Forgot your password? &nbsp;
          <Link className={styles.link} href={"/auth/forgotPassword"}>
            Reset here
          </Link>
        </p>
        <NextAuthProviders />
        <div className={styles.log}>
          <p className={styles.altlog}>
            Don&apos;t have an account? &nbsp;
            <Link className={styles.link} href="/auth/signup">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
