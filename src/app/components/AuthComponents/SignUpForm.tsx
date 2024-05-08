"use client";
import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  KeyIcon,
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import { Button, Checkbox, Input, Link } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { z } from "zod";
import validator from "validator";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordStrength } from "check-password-strength";
import PasswordStrength from "./PasswordStrength";
import { registerUser } from "@/lib/actions/authActions";
import { toast } from "react-toastify";
import styles from "./authComponents.module.css";

const FormSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be atleast 2 characters")
      .max(120, "Name must be less than 120 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z
      .string()
      .refine(validator.isMobilePhone, "Please enter a valid phone number!"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters ")
      .max(50, "Password must be less than 50 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters ")
      .max(50, "Password must be less than 50 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and confirm password doesn't match!",
    path: ["confirmPassword"],
  });

type InputType = z.infer<typeof FormSchema>;

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });
  const [passStrength, setPassStrength] = useState(0);
  const [isVisiblePass, setIsVisiblePass] = useState(false);

  useEffect(() => {
    setPassStrength(passwordStrength(watch().password).id);
  }, [watch]);
  const toggleVisblePass = () => setIsVisiblePass((prev) => !prev);

  const saveUser: SubmitHandler<InputType> = async (data) => {
    const { confirmPassword, ...user } = data;

    // Ensure that all required properties are present
    try {
      // Call the registerUser function with the user data
      const result = await registerUser(user);
      toast.success("The User Registered Successfully.");
    } catch (error) {
      toast.error("Something Went Wrong!");
      console.error(error);
    }
  };
  return (
    <form onSubmit={handleSubmit(saveUser)} className={styles.form}>
      <Input
        errorMessage={errors.name?.message}
        isInvalid={!!errors.name}
        {...register("name")}
        placeholder="Name"
        startContent={
          <UserIcon
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
      />
      <Input
        errorMessage={errors.email?.message}
        isInvalid={!!errors.email}
        {...register("email")}
        className="col-span-2"
        placeholder="Email"
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
        errorMessage={(errors.phone?.message as string) ?? ""}
        isInvalid={!!errors.phone}
        {...register("phone")}
        placeholder="Phone"
        startContent={
          <PhoneIcon
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
        errorMessage={errors.password?.message}
        isInvalid={!!errors.password}
        {...register("password")}
        placeholder="Password"
        type={isVisiblePass ? "text" : "password"}
        startContent={
          <KeyIcon
            style={{
              position: "absolute",
              width: "20px",
              border: "none",
              marginTop: "15px",
              transform: "translate(50%)",
              cursor: "pointer",
              color: "grey",
              backgroundColor: "transparent",
            }}
          />
        }
        endContent={
          isVisiblePass ? (
            <EyeSlashIcon
              className={styles.eye}
              onClick={toggleVisblePass}
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
            />
          ) : (
            <EyeIcon
              className={styles.eye}
              onClick={toggleVisblePass}
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
            />
          )
        }
        style={{
          width: "100%",
          padding: "1rem 2.5rem",
          border: "none",
          borderRadius: "6px",
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.8)",
          outline: "none",
        }}
      />
      <Input
        errorMessage={errors.confirmPassword?.message}
        isInvalid={!!errors.confirmPassword}
        {...register("confirmPassword")}
        className="col-span-2"
        placeholder="Confirm Password"
        type={isVisiblePass ? "text" : "password"}
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
          isVisiblePass ? (
            <EyeSlashIcon
              className={styles.eye}
              onClick={toggleVisblePass}
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
            />
          ) : (
            <EyeIcon
              className={styles.eye}
              onClick={toggleVisblePass}
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
            />
          )
        }
        style={{
          width: "100%",
          padding: "1rem 2.5rem",
          border: "none",
          borderRadius: "6px",
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.8)",
          outline: "none",
          marginBottom: "12px",
        }}
      />
      <PasswordStrength passStrength={passStrength} />
      <Button className={styles.socialButton1} type="submit">
        Sign Up
      </Button>
    </form>
  );
};

export default SignUpForm;
