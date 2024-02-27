import LoginForm from "@/app/components/AuthComponents/LoginForm";
import Link from "next/link";

interface Props {
  searchParams: {
    callbackUrl?: string;
  };
}

const SigninPage = ({ searchParams }: Props) => {
  console.log({ searchParams });

  return (
    <div className="flex items-center justify-center flex-col ">
      <LoginForm callbackUrl={searchParams.callbackUrl} />
      <Link href={"/auth/forgotPassword"}>Forgot Your Password?</Link>
    </div>
  );
};

export default SigninPage;
