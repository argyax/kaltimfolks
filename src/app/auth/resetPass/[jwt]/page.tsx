import ResetPasswordForm from "@/app/components/AuthComponents/ResetPasswordForm";
import { verifyJwt } from "@/lib/jwt";
import Link from "next/link";
import styles from "./resetpassPage.module.css";

interface Props {
  params: {
    jwt: string;
  };
}

const ResetPasswordPage = ({ params }: Props) => {
  const payload = verifyJwt(params.jwt);
  if (!payload)
    return (
      <div className="flex items-center justify-center h-screen text-red-500 text-2xl">
        The URL is not valid!
      </div>
    );
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link href="/" className={styles.logo}>KALTIMFOLKS.</Link>
        <p className={styles.desc}>Reset Your Password</p>
        <ResetPasswordForm jwtUserId={params.jwt} />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
