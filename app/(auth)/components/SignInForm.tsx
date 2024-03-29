"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import Input from "./Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInFormFields, signInFormSchema } from "@/app/validationSchemas";

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormFields>({
    resolver: zodResolver(signInFormSchema),
  });

  const onSubmit: SubmitHandler<SignInFormFields> = async (data) => {
    console.log(data);
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
