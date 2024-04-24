"use client";

import {
  BillboardFormFields,
  billboardFormSchema,
} from "@/app/validationSchemas";
import {
  CldOptionsType,
  deleteCldImage,
  uploadCldImage,
} from "@/lib/cloudinaryUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Heading from "@/app/(admin)/components/Heading/Heading";
import AdminFormInput from "@/app/(admin)/components/AdminForm/AdminFormInput/AdminFormInput";
import AdminFormImageInput from "@/app/(admin)/components/AdminForm/AdminFormInput/AdminFormImageInput";
import AdminFormSubmit from "@/app/(admin)/components/AdminForm/AdminFormSubmit/AdminFormSubmit";
import AdminForm from "@/app/(admin)/components/AdminForm/AdminForm";
import AdminFormInputsWrapper from "@/app/(admin)/components/AdminForm/AdminFormInputsWrapper";

interface BillboardFormProps {
  billboard: Billboard | null;
  cldOptions?: CldOptionsType;
}

const BillboardForm = ({ billboard, cldOptions }: BillboardFormProps) => {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm<BillboardFormFields>({
    resolver: zodResolver(billboardFormSchema),
    defaultValues: { label: billboard ? billboard.label : "" },
  });

  const [originalImage, setOriginalImage] = useState<string | null>(
    billboard?.imageUrl || null
  );

  const handleOriginalImageChange = () => {
    setOriginalImage(null);
  };

  const params = useParams();
  const router = useRouter();

  const onSubmit: SubmitHandler<BillboardFormFields> = async (data) => {
    console.log(data);

    console.log("originalImage: ");
    console.log(originalImage);

    const rawImageInput = data.imageUrl?.[0];

    // DELETE IMAGE FROM CLOUDINARY - IF NEEDED
    if (rawImageInput) {
      if (billboard?.imageUrl) {
        // reason: image replaced by a new one
        deleteCldImage(cldOptions);
      }
    } else if (billboard?.imageUrl && !originalImage) {
      // reason: delete button clicked
      deleteCldImage(cldOptions);
    }

    // UPLOAD IMAGE TO CLOUDINARY - IF NEEDED
    // PREPARE BILLBOARD DATA TO SAVE IN THE DATABASE

    let billboardData;

    if (rawImageInput) {
      const imageUrl = await uploadCldImage(rawImageInput);
      if (imageUrl) {
        billboardData = { ...data, imageUrl }; // update imageUrl
      }
    } else if (billboard?.imageUrl && !originalImage) {
      billboardData = { ...data, imageUrl: null }; // remove imageUrl
    } else if (billboard?.label !== data.label) {
      billboardData = { label: data.label }; // only change the label
    } else {
      router.push("/admin/billboards"); // nothing has changed redirect to billboards page
      return;
    }

    // SAVE DATA IN DATABASE
    const requestUrl = billboard
      ? `/api/billboards/${params.billboardId}`
      : "/api/billboards";

    const requestOptions = {
      method: billboard ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(billboardData),
    };

    try {
      const response = await fetch(requestUrl, requestOptions);

      if (response.ok) {
        router.push("/admin/billboards");
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const headingTitle = billboard ? "Edit billboard" : "Create billboard";
  const headingDescription = billboard
    ? "Edit a Billboard"
    : "Add a new billboard";

  return (
    <>
      <Heading title={headingTitle} description={headingDescription} />
      <AdminForm onSubmit={handleSubmit(onSubmit)}>
        <AdminFormInputsWrapper singleColumn>
          <AdminFormInput
            type="text"
            id="label"
            label="Label"
            required
            register={register}
            disabled={isSubmitting}
            errorMessage={errors.label?.message}
          />

          <AdminFormImageInput
            id="imageUrl"
            label="Billboard Image"
            imageUrl={billboard?.imageUrl}
            originalImage={originalImage}
            onOriginalImageChange={handleOriginalImageChange}
            disabled={isSubmitting}
            register={register}
            resetField={resetField}
            errorMessage={errors.imageUrl?.message}
          />
        </AdminFormInputsWrapper>
        <AdminFormSubmit
          submitLabel="Submit"
          cancelLabel="Cancel"
          isSubmitting={isSubmitting}
          onCancel={() => router.push("/admin/billboards")}
        />
      </AdminForm>
    </>
  );
};

export default BillboardForm;
