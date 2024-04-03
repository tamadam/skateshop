"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import Input from "./Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInFormFields, signInFormSchema } from "@/app/validationSchemas";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormFields>({
    resolver: zodResolver(signInFormSchema),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<SignInFormFields> = async (data) => {
    try {
      console.log(data);
      const response = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (!response?.ok) {
        console.log("error");
        return;
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      console.log("Something went wrong");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Please wait..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
