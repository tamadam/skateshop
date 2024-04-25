"use client";

import AdminForm from "@/app/(admin)/components/AdminForm/AdminForm";
import AdminFormInput from "@/app/(admin)/components/AdminForm/AdminFormInput/AdminFormInput";
import AdminFormInputsWrapper from "@/app/(admin)/components/AdminForm/AdminFormInputsWrapper";
import AdminFormSubmit from "@/app/(admin)/components/AdminForm/AdminFormSubmit/AdminFormSubmit";
import Heading from "@/app/(admin)/components/Heading/Heading";
import { SizeFormFields, sizesFormSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Size } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface SizeFormProps {
  size: Size | null;
}

const SizeForm = ({ size }: SizeFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SizeFormFields>({
    resolver: zodResolver(sizesFormSchema),
    defaultValues: size || { name: "", value: "" },
  });

  const params = useParams();
  const router = useRouter();

  const headingTitle = size ? "Edit size" : "Create size";
  const headingDescription = size ? "Edit a size" : "Add a new size";
  const toastSuccessMessage = size ? "Size saved." : "Size created.";
  const submitFormLabel = size ? "Save" : "Create";

  const onSubmit: SubmitHandler<SizeFormFields> = async (data) => {
    try {
      let sizeData = {
        ...data,
      };

      if (size) {
        const initialData = {
          name: size.name,
          value: size.value,
        };

        // check if something has changed or not
        if (JSON.stringify(sizeData) === JSON.stringify(initialData)) {
          router.push("/admin/sizes");
          return;
        }
      }

      // SAVE DATA IN DATABASE
      const requestUrl = size ? `/api/sizes/${params.sizeId}` : "/api/sizes";

      const requestOptions = {
        method: size ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sizeData),
      };

      const response = await fetch(requestUrl, requestOptions);

      if (response.ok) {
        router.push("/admin/sizes");
        router.refresh();
        toast.success(toastSuccessMessage);
      } else {
        throw new Error();
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Heading title={headingTitle} description={headingDescription} />
      <AdminForm onSubmit={handleSubmit(onSubmit)}>
        <AdminFormInputsWrapper multiplieColumn>
          <AdminFormInput
            type="text"
            id="name"
            label="Name"
            required
            register={register}
            disabled={isSubmitting}
            errorMessage={errors.name?.message}
          />

          <AdminFormInput
            type="text"
            id="value"
            label="Value"
            required
            register={register}
            disabled={isSubmitting}
            errorMessage={errors.value?.message}
          />
        </AdminFormInputsWrapper>
        <AdminFormSubmit
          submitLabel={submitFormLabel}
          cancelLabel="Cancel"
          isSubmitting={isSubmitting}
          onCancel={() => router.push("/admin/sizes")}
        />
      </AdminForm>
    </>
  );
};

export default SizeForm;
