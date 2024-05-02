"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "./Input";
import { SignUpFormFields, signUpFormSchema } from "@/app/validationSchemas";
import { signIn } from "next-auth/react";
import styles from "./AuthStyles.module.css";
import Button from "@/app/components/Button/Button";
import Spinner from "@/app/components/Spinner/Spinner";
import CustomLink from "@/app/components/CustomLink/CustomLink";
import { RiAccountPinCircleFill } from "react-icons/ri";
import toast from "react-hot-toast";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormFields>({
    resolver: zodResolver(signUpFormSchema),
  });

  const onSubmit: SubmitHandler<SignUpFormFields> = async (data) => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
        }),
      });

      if (response.ok) {
        await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: true,
          callbackUrl: "/",
        });
      } else {
        throw new Error("Registration failed.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className={styles.authFormOuterWrapper}>
      <div className={styles.authFormInnerWrapper}>
        <div className={styles.authFormHeading}>
          <h1>Registration</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.authForm}>
          <p className={styles.authFormInformation}>
            To create your account, enter the following information.
          </p>
          <div className={styles.authInputs}>
            <div className={styles.authNameInput}>
              <Input
                id="firstName"
                label="First Name"
                disabled={isSubmitting}
                placeholder="First name"
                register={register}
                required
                errorMessage={errors.firstName?.message}
              />
              <Input
                id="lastName"
                label="Last Name"
                disabled={isSubmitting}
                placeholder="Last name"
                register={register}
                required
                errorMessage={errors.lastName?.message}
              />
            </div>

            <Input
              id="email"
              label="Email"
              disabled={isSubmitting}
              placeholder="E-mail address"
              register={register}
              required
              errorMessage={errors.email?.message}
            />
            <Input
              id="password"
              label="Password"
              type="password"
              disabled={isSubmitting}
              placeholder="Password"
              register={register}
              required
              errorMessage={errors.password?.message}
            />
            <Input
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              disabled={isSubmitting}
              placeholder="Confirm Password"
              register={register}
              required
              errorMessage={errors.confirmPassword?.message}
            />
          </div>
          <div className={styles.authSubmit}>
            <Button type="submit" variant="secondary" disabled={isSubmitting}>
              Register {isSubmitting && <Spinner />}
            </Button>
          </div>

          <div className={styles.authRedirectWrapper}>
            <hr className={styles.authRedirectSeparator} />
            <RiAccountPinCircleFill size="2em" />
            <p className={styles.authRedirectText}>Already have an account?</p>
            <CustomLink href="/login" label="Login" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
