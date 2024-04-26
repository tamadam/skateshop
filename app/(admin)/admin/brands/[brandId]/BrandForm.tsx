"use client";

import AdminForm from "@/app/(admin)/components/AdminForm/AdminForm";
import AdminFormImageInput from "@/app/(admin)/components/AdminForm/AdminFormInput/AdminFormImageInput";
import AdminFormInput from "@/app/(admin)/components/AdminForm/AdminFormInput/AdminFormInput";
import AdminFormInputsWrapper from "@/app/(admin)/components/AdminForm/AdminFormInputsWrapper";
import AdminFormSubmit from "@/app/(admin)/components/AdminForm/AdminFormSubmit/AdminFormSubmit";
import Heading from "@/app/(admin)/components/Heading/Heading";
import { CLOUDINARY_BRANDS_UPLOAD_PRESET_NAME } from "@/app/constants";
import { BrandFormFields, brandsFormSchema } from "@/app/validationSchemas";
import {
  CldOptionsType,
  deleteCldImage,
  uploadCldImage,
} from "@/lib/cloudinaryUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Brand } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface BrandFormProps {
  brand: Brand | null;
  cldOptions?: CldOptionsType;
}

const BrandForm = ({ brand, cldOptions }: BrandFormProps) => {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm<BrandFormFields>({
    resolver: zodResolver(brandsFormSchema),
    defaultValues: { name: brand ? brand.name : "" },
  });

  const [originalImage, setOriginalImage] = useState<string | null>(
    brand?.imageUrl || null
  );

  const handleOriginalImageChange = () => {
    setOriginalImage(null);
  };

  const params = useParams();
  const router = useRouter();

  const headingTitle = brand ? "Edit brand" : "Create brand";
  const headingDescription = brand ? "Edit a brand" : "Add a new brand";
  const toastSuccessMessage = brand ? "Brand saved." : "Brand created.";
  const submitFormLabel = brand ? "Save" : "Create";

  const onSubmit: SubmitHandler<BrandFormFields> = async (data) => {
    try {
      const rawImageInput = data.imageUrl?.[0];

      // DELETE IMAGE FROM CLOUDINARY - IF NEEDED
      if (rawImageInput) {
        if (brand?.imageUrl) {
          // reason: image replaced by a new one
          deleteCldImage(cldOptions);
        }
      } else if (brand?.imageUrl && !originalImage) {
        // reason: delete button clicked
        deleteCldImage(cldOptions);
      }

      // UPLOAD IMAGE TO CLOUDINARY - IF NEEDED
      // PREPARE BRAND DATA TO SAVE IN THE DATABASE

      let brandData;

      if (rawImageInput) {
        const imageUrl = await uploadCldImage(
          rawImageInput,
          CLOUDINARY_BRANDS_UPLOAD_PRESET_NAME
        );
        if (imageUrl) {
          brandData = { ...data, imageUrl }; // update imageUrl
        }
      } else if (brand?.imageUrl && !originalImage) {
        brandData = { ...data, imageUrl: null }; // remove imageUrl
      } else if (brand?.name !== data.name) {
        brandData = { name: data.name }; // only change the name
      } else {
        router.push("/admin/brands"); // nothing has changed redirect to brands page
        return;
      }

      // SAVE DATA IN DATABASE
      const requestUrl = brand
        ? `/api/brands/${params.brandId}`
        : "/api/brands";

      const requestOptions = {
        method: brand ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(brandData),
      };

      const response = await fetch(requestUrl, requestOptions);

      if (response.ok) {
        router.push("/admin/brands");
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
        <AdminFormInputsWrapper singleColumn>
          <AdminFormInput
            type="text"
            id="name"
            label="Name"
            required
            register={register}
            disabled={isSubmitting}
            errorMessage={errors.name?.message}
          />

          <AdminFormImageInput
            id="imageUrl"
            label="Brand Image"
            imageUrl={brand?.imageUrl}
            originalImage={originalImage}
            onOriginalImageChange={handleOriginalImageChange}
            disabled={isSubmitting}
            register={register}
            resetField={resetField}
            errorMessage={errors.imageUrl?.message}
          />
        </AdminFormInputsWrapper>
        <AdminFormSubmit
          submitLabel={submitFormLabel}
          cancelLabel="Cancel"
          isSubmitting={isSubmitting}
          onCancel={() => router.push("/admin/brands")}
        />
      </AdminForm>
    </>
  );
};

export default BrandForm;
