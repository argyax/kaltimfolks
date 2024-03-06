"use client";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { passwordStrength } from "check-password-strength";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import PasswordStrength from "./PasswordStrength";
import { resetPassword } from "@/lib/actions/authActions";
import { toast } from "react-toastify";
import styles from "./authComponents.module.css";

interface Props {
  jwtUserId: string;
}

const FormSchema = z
  .object({
    password: z
      .string()
      .min(6, "Password must be at least 6 characters!")
      .max(52, "Password must be less than 52 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match!",
    path: ["confirmPassword"],
  });

type InputType = z.infer<typeof FormSchema>;

const ResetPasswordForm = ({ jwtUserId }: Props) => {
  const [visiblePass, setVisiblePass] = useState(false);
  const [passStrength, setPassStrength] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });
  useEffect(() => {
    setPassStrength(passwordStrength(watch().password).id);
  }, [watch]);

  const resetPass: SubmitHandler<InputType> = async (data) => {
    try {
      const result = await resetPassword(jwtUserId, data.password);
      if (result === "success")
        toast.success("Your password has been reset successfully!");
    } catch (err) {
      toast.error("Something went wrong!");
      console.error(err);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(resetPass)}
      className={styles.form}>
      <div className={styles.inputContainer}>
      <Input
        type={visiblePass ? "text" : "password"}
        placeholder="Password"
        {...register("password")}
        errorMessage={errors.password?.message}
        endContent={
          <Button className={styles.eye} 
            onClick={() => setVisiblePass((prev) => !prev)}
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
            >
            {visiblePass ? (
              <EyeSlashIcon/>
            ) : (
              <EyeIcon/>
            )}
          </Button>
        }
        style={{
          width: '100%',
          padding: '0.95rem',
          border: 'none',
          borderRadius: '7px',
          boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
          outline: 'none'
        }}
      />
      <PasswordStrength passStrength={passStrength} />
      <Input
        type={visiblePass ? "text" : "password"}
        placeholder="Confirm Password"
        {...register("confirmPassword")}
        errorMessage={errors.confirmPassword?.message}
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
          className={styles.socialButton1} color="primary" 
          isLoading={isSubmitting}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Please Wait..." : "Submit"}
        </Button>
    </form>
  );
};

export default ResetPasswordForm;
