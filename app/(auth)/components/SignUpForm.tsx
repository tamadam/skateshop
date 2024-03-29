"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "./Input";
import { SignUpFormFields, signUpFormSchema } from "@/app/validationSchemas";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormFields>({
    resolver: zodResolver(signUpFormSchema),
  });

  const onSubmit: SubmitHandler<SignUpFormFields> = async (data) => {
    console.log(data);
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
