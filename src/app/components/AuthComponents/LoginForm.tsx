"use client";
import {
  EyeIcon,
  EyeSlashIcon,
  EnvelopeIcon,
  KeyIcon,
} from "@heroicons/react/20/solid";
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
    toast.success("Welcome To KALTIMFOLKS");
    router.push(props.callbackUrl ? props.callbackUrl : "/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.inputContainer}>
        <Input
          placeholder="Email"
          {...register("email")}
          errorMessage={errors.email?.message}
          startContent={
            <EnvelopeIcon
              style={{
                position: "absolute",
                width: "20px",
                border: "none",
                marginTop: "13px",
                transform: "translate(50%)",
                cursor: "pointer",
                color: "grey",
                backgroundColor: "transparent",
              }}
            />
          }
          style={{
            width: "100%",
            padding: "1rem 2.5rem",
            border: "none",
            borderRadius: "6px",
            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.8)",
            outline: "none",
          }}
        />{" "}
        <Input
          placeholder="Password"
          {...register("password")}
          type={visiblePass ? "text" : "password"}
          errorMessage={errors.password?.message}
          startContent={
            <KeyIcon
              style={{
                position: "absolute",
                width: "20px",
                border: "none",
                marginTop: "13px",
                transform: "translate(50%)",
                cursor: "pointer",
                color: "grey",
                backgroundColor: "transparent",
              }}
            />
          }
          endContent={
            <Button
              className={styles.eye}
              onClick={() => setVisiblePass((prev) => !prev)}
              style={{
                position: "absolute",
                width: "20px",
                border: "none",
                marginTop: "13px",
                transform: "translate(-150%)",
                cursor: "pointer",
                color: "grey",
                backgroundColor: "transparent",
              }}
            >
              {visiblePass ? <EyeSlashIcon /> : <EyeIcon />}
            </Button>
          }
          style={{
            width: "100%",
            padding: "1rem 2.5rem",
            border: "none",
            borderRadius: "6px",
            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.8)",
            outline: "none",
            marginBottom: "16px",
          }}
        />
      </div>

      <Button
        className={styles.socialButton1}
        color="primary"
        type="submit"
        disabled={isSubmitting}
        isLoading={isSubmitting}
      >
        {isSubmitting ? "Signing In..." : "Log In"}
      </Button>
    </form>
  );
};

export default LoginForm;
