import { Button } from "@nextui-org/react";
import styles from "./authComponents.module.css";
import { signIn, useSession } from "next-auth/react";

const NextAuthProviders = () => {
  const googleSignIn = async () => {
    const result = await signIn("google", {
      callbackUrl: "/",
    });
    console.log({ result });
  };

  return (
    <>
      <Button className={styles.socialButton2} onClick={googleSignIn}>Log in with Google</Button>
    </>
  );
};

export default NextAuthProviders;
