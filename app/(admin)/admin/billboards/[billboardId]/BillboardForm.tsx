"use client";

import {
  BillboardFormFields,
  billboardFormSchema,
} from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

const BillboardForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BillboardFormFields>({
    resolver: zodResolver(billboardFormSchema),
  });

  const onSubmit: SubmitHandler<BillboardFormFields> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="label">Label</label>
      <input
        autoComplete="off"
        type="text"
        id="label"
        disabled={isSubmitting}
        {...register("label")}
      />
      <p>{errors.label?.message}</p>

      <label htmlFor="imageUrl">Image URL</label>
      <input
        autoComplete="off"
        type="text"
        id="imageUrl"
        disabled={isSubmitting}
        {...register("imageUrl")}
      />
      <p>{errors.imageUrl?.message}</p>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Please wait..." : "Submit"}
      </button>
    </form>
  );
};

export default BillboardForm;
