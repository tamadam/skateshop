"use client";

import AdminForm from "@/app/(admin)/components/AdminForm/AdminForm";
import AdminFormInput from "@/app/(admin)/components/AdminForm/AdminFormInput/AdminFormInput";
import AdminFormInputsWrapper from "@/app/(admin)/components/AdminForm/AdminFormInputsWrapper";
import AdminFormSubmit from "@/app/(admin)/components/AdminForm/AdminFormSubmit/AdminFormSubmit";
import Heading from "@/app/(admin)/components/Heading/Heading";
import { ColorFormFields, colorsFormSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Color } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface ColorFormProps {
  color: Color | null;
}

const ColorForm = ({ color }: ColorFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ColorFormFields>({
    resolver: zodResolver(colorsFormSchema),
    defaultValues: color || { name: "", value: "" },
  });

  const params = useParams();
  const router = useRouter();

  const headingTitle = color ? "Edit color" : "Create color";
  const headingDescription = color ? "Edit a color" : "Add a new color";
  const toastSuccessMessage = color ? "Color saved." : "Color created.";
  const submitFormLabel = color ? "Save" : "Create";

  const onSubmit: SubmitHandler<ColorFormFields> = async (data) => {
    try {
      let colorData = {
        ...data,
      };

      if (color) {
        const initialData = {
          name: color.name,
          value: color.value,
        };

        // check if something has changed or not
        if (JSON.stringify(colorData) === JSON.stringify(initialData)) {
          router.push("/admin/colors");
          return;
        }
      }

      // SAVE DATA IN DATABASE
      const requestUrl = color
        ? `/api/colors/${params.colorId}`
        : "/api/colors";

      const requestOptions = {
        method: color ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(colorData),
      };

      const response = await fetch(requestUrl, requestOptions);

      if (response.ok) {
        router.push("/admin/colors");
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
            type="color"
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
          onCancel={() => router.push("/admin/colors")}
        />
      </AdminForm>
    </>
  );
};

export default ColorForm;
