"use client";

import {
  CLOUDINARY_BILLBOARDS_UPLOAD_PRESET_NAME,
  CLOUDINARY_UPLOAD_API,
} from "@/app/constants";
import {
  BillboardFormFields,
  billboardFormSchema,
} from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

interface BillboardFormProps {
  billboard: Billboard | null;
}

const BillboardForm = ({ billboard }: BillboardFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BillboardFormFields>({
    resolver: zodResolver(billboardFormSchema),
    defaultValues: billboard
      ? { label: billboard.label, imageUrl: billboard.imageUrl }
      : { label: "", imageUrl: "" },
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<BillboardFormFields> = async (data) => {
    const rawImage = data.imageUrl[0];

    const formData = new FormData();
    formData.append("file", rawImage);
    formData.append("upload_preset", CLOUDINARY_BILLBOARDS_UPLOAD_PRESET_NAME);

    try {
      // Upload the image to Cloudinary
      const uploadResponse = await fetch(CLOUDINARY_UPLOAD_API, {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error("Image upload failed");
      }

      const imageData = await uploadResponse.json();
      const imageUrl = imageData.secure_url;

      const billboardData = { ...data, imageUrl };

      // send the data to the API
      const response = await fetch("/api/billboards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(billboardData),
      });
      if (response.ok) {
        router.push("/admin/billboards");
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
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

      <label htmlFor="imageUrl">Image</label>
      <input
        id="imageUrl"
        disabled={isSubmitting}
        {...register("imageUrl")}
        accept="image/*"
        type="file"
      />
      <div className="max-w-[100px] max-h-[100px] relative">
        {billboard && (
          <Image
            src={billboard.imageUrl}
            alt="billboard"
            width={0}
            height={0}
            style={{ width: "100%", height: "100%" }}
          />
        )}
      </div>
      <p>{errors.imageUrl?.message}</p>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Please wait..." : "Submit"}
      </button>
    </form>
  );
};

export default BillboardForm;
