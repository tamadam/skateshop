"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import Input from "./Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInFormFields, signInFormSchema } from "@/app/validationSchemas";
import { signIn } from "next-auth/react";
import styles from "./AuthStyles.module.css";
import Button from "@/app/components/Button/Button";
import Spinner from "@/app/components/Spinner/Spinner";
import CustomLink from "@/app/components/CustomLink/CustomLink";
import { RiAccountPinCircleFill } from "react-icons/ri";
import toast from "react-hot-toast";

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormFields>({
    resolver: zodResolver(signInFormSchema),
  });

  const onSubmit: SubmitHandler<SignInFormFields> = async (data) => {
    try {
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: true,
        callbackUrl: "/",
      });

      if (response && !response.ok) {
        throw new Error("Login failed.");
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
          <h1>Login</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.authForm}>
          <p className={styles.authFormInformation}>
            Enter the following information to log in to your profile.
          </p>
          <div className={styles.authInputs}>
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
          </div>
          <div className={styles.authSubmit}>
            <Button type="submit" variant="secondary" disabled={isSubmitting}>
              Login {isSubmitting && <Spinner />}
            </Button>
          </div>

          <div className={styles.authRedirectWrapper}>
            <hr className={styles.authRedirectSeparator} />
            <RiAccountPinCircleFill size="2em" />
            <p className={styles.authRedirectText}>
              Don&apos;t have an account yet?
            </p>
            <CustomLink href="/register" label="Register" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
