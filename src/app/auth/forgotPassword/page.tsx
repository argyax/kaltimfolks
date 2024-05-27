"use client";
import { forgotPassword } from "@/lib/actions/authActions";
import { EnvelopeIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import styles from "./forgotPassword.module.css"
import Link from "next/link";

const FormSchema = z.object({
  email: z.string().email("Please enter a valid email!"),
});

type InputType = z.infer<typeof FormSchema>;

const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });

  const submitRequest: SubmitHandler<InputType> = async (data) => {
    try {
      const result = await forgotPassword(data.email);
      if (result) toast.success("Reset password link was sent to your email. Check your spam folder if your inbox is empty");
      reset();
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong!");
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
      <Link href="/" className={styles.logo}>KALTIMFOLKS.</Link>
      <p className={styles.desc}>Enter your email so we can recover your password</p>
        <form
          className={styles.form}
          onSubmit={handleSubmit(submitRequest)}>
          <div className={styles.inputContainer}>
            <Input
              placeholder="Email"
              {...register("email")}
              startContent=
              {<EnvelopeIcon 
                style={{
                  position: 'absolute',
                  width: '20px',
                  border: 'none',
                  marginTop: '13px',
                  transform: 'translate(-125%)',
                  cursor: 'pointer',
                  color: 'grey',
                  backgroundColor: 'transparent'
                }}
                />}
              errorMessage={errors.email?.message}
              style={{
                width: '100%',
                padding: '0.95rem',
                border: 'none',
                borderRadius: '7px',
                boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
                outline: 'none'
              }}
            />
          </div>
          <Button
            isLoading={isSubmitting}
            type="submit"
            disabled={isSubmitting}
            color="primary"
            className={styles.socialButton}
          >
            {isSubmitting ? "Please Wait..." : "Submit"}
          </Button>

        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
