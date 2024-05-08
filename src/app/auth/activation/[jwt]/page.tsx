import { activateUser } from "@/lib/actions/authActions";
import { verifyJwt } from "@/lib/jwt";
import styles from "./activationPage.module.css";

interface Props {
  params: {
    jwt: string;
  };
}

const ActivationPage = async ({ params }: Props) => {
  const result = await activateUser(params.jwt);
  return (
    <div className={styles.container}>
      {result === "userNotExist" ? (
        <h1 className={styles.logo}>This user does not exist</h1>
      ) : result === "alreadyActivated" ? (
        <h1 className={styles.logo}>This user is already activated</h1>
      ) : result === "success" ? (
        <h1 className={styles.logo}>
          Success! The user is now activated
        </h1>
      ) : (
        <h1 className={styles.logo}>Oops! Something went wrong!</h1>
      )}
    </div>
  );
};

export default ActivationPage;
