"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "./Input";
import { SignUpFormFields, signUpFormSchema } from "@/app/validationSchemas";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormFields>({
    resolver: zodResolver(signUpFormSchema),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<SignUpFormFields> = async (data) => {
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
      console.error("Registration failed");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="firstName"
          label="First Name"
          disabled={isSubmitting}
          register={register}
          errorMessage={errors.firstName?.message}
        />
        <Input
          id="lastName"
          label="Last Name"
          disabled={isSubmitting}
          register={register}
          errorMessage={errors.lastName?.message}
        />
        <Input
          id="email"
          label="Email"
          disabled={isSubmitting}
          register={register}
          errorMessage={errors.email?.message}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          disabled={isSubmitting}
          register={register}
          errorMessage={errors.password?.message}
        />
        <Input
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          disabled={isSubmitting}
          register={register}
          errorMessage={errors.confirmPassword?.message}
        />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Please wait..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
