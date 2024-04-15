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
import ImageUpload from "./ImageUpload";
import Heading from "@/app/(admin)/components/Heading";

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

  return (
    <>
      <Heading title="Create Billboard" description="Add a new billboard" />
      <form onSubmit={handleSubmit(onSubmit)} className="form-container">
        <div>
          <label htmlFor="label" className="font-bold pb-1">
            Label
          </label>
          <input
            autoComplete="off"
            type="text"
            id="label"
            disabled={isSubmitting}
            {...register("label")}
          />
          <p>{errors.label?.message}</p>
        </div>

        <h3>Billboard image</h3>

        <div>
          <ImageUpload
            id="imageUrl"
            imageUrl={billboard?.imageUrl}
            resetField={resetField}
            register={register}
            errorMessage={errors.imageUrl?.message}
            disabled={isSubmitting}
            originalImage={originalImage}
            onOriginalImageChange={handleOriginalImageChange}
          />
        </div>

        <button type="submit" disabled={isSubmitting} className="mt-4">
          {isSubmitting ? "Please wait..." : "Submit"}
        </button>
      </form>
    </>
  );
};

export default BillboardForm;
