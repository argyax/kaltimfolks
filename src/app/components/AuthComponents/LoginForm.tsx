"use client";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import styles from "./authComponents.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import NextAuthProviders from "./NextAuthProviders";

interface Props {
  callbackUrl?: string;
}

const FormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string({
    required_error: "Please enter your password",
  }),
});

type InputType = z.infer<typeof FormSchema>;

const LoginForm = (props: Props) => {
  const router = useRouter();
  const [visiblePass, setVisiblePass] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<InputType> = async (data) => {
    const result = await signIn("credentials", {
      redirect: false,
      username: data.email,
      password: data.password,
    });
    if (!result?.ok) {
      toast.error(result?.error);
      return;
    }
    toast.success("Welcome To KALTIMFOLS");
    router.push(props.callbackUrl ? props.callbackUrl : "/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.input}>
          <Link href="/" className={styles.logo}>KALTIMFOLKS.</Link>
          <p className={styles.desc}>A place for you to explore the creative culture of East Kalimantan and Indonesians</p>
          <div className="p-2 flex flex-col gap-2">
            <Input label="Email" {...register("email")} errorMessage={errors.email?.message} className={styles.input}/>
            <Input
              placeholder="Password"
              {...register("password")}
              type={visiblePass ? "text" : "password"}
              errorMessage={errors.password?.message}
              endContent={
                <button type="button" onClick={() => setVisiblePass((prev) => !prev)}>
                  {visiblePass ? <EyeSlashIcon className="w-4" /> : <EyeIcon className="w-4" />}
                </button>
              }
              className={styles.input}
            />
            <div className="flex items-center justify-center gap-2">
              <Button className={styles.socialButton1} color="primary" type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
                {isSubmitting ? "Signing In..." : "Log In"}
              </Button>
              <Button className={styles.socialButton} as={Link} href="/auth/signup">
                Sign Up
              </Button>
            </div>
          </div>
          <NextAuthProviders />
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
