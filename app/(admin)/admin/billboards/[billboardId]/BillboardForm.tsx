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
import { ChangeEvent, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { AiOutlineUpload } from "react-icons/ai";
import { LiaTrashAlt } from "react-icons/lia";

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

  const [selectedImage, setSelectedImage] = useState<string | null>(
    billboard?.imageUrl || null
  );

  const [originalImage, setOriginalImage] = useState<string | null>(
    billboard?.imageUrl || null
  );

  const params = useParams();
  const router = useRouter();

  const handleImageInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    let url = null;
    if (files && files.length > 0) {
      url = URL.createObjectURL(files[0]);
      setSelectedImage(url);
    }
  };

  const prepareImageRemoval = () => {
    setOriginalImage(null);
    setSelectedImage(null);
    resetField("imageUrl");
  };

  const onSubmit: SubmitHandler<BillboardFormFields> = async (data) => {
    console.log(data);
    console.log("selectedImage: ");
    console.log(selectedImage);

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

    let billboardData = { ...data, imageUrl: null };

    if (rawImageInput) {
      const imageUrl = await uploadCldImage(rawImageInput);
      if (imageUrl) {
        billboardData = { ...data, imageUrl }; // update imageUrl
      }
    } else if (billboard?.imageUrl && !originalImage) {
      billboardData = { ...data, imageUrl: null }; // remove imageUrl
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col w-[75%] max-w-[500px] my-4">
          <label htmlFor="label" className="font-bold pb-1">
            Label
          </label>
          <input
            autoComplete="off"
            type="text"
            id="label"
            disabled={isSubmitting}
            {...register("label")}
            className="peer
        py-2
        px-4
        
        "
          />
          <p>{errors.label?.message}</p>
        </div>

        <h3>Billboard image</h3>

        <div className="flex flex-col w-[75%] max-w-[500px] my-4">
          <label
            htmlFor="imageUrl"
            className="font-bold pb-1 relative w-[400px] h-[300px] bg-red-50 flex flex-col items-center justify-center text-center bg-cover hover:cursor-pointer"
            style={{
              border: "1px solid red",
              backgroundImage: `${
                selectedImage || originalImage
                  ? `url(${selectedImage || originalImage})`
                  : "unset"
              }`,
            }}
          >
            <input
              id="imageUrl"
              disabled={isSubmitting}
              {...register("imageUrl")}
              accept="image/*"
              type="file"
              onChange={handleImageInputChange}
              className="file-input-field opacity-0 w-0 h-0"
            />

            {selectedImage || originalImage ? (
              <div
                className="absolute top-[0.4em] right-[0.4em] bg-red-600 p-2 rounded-md hover:bg-red-500"
                onClick={(event) => {
                  event.preventDefault();
                  prepareImageRemoval();
                }}
              >
                <LiaTrashAlt size="2em" color="white" />
              </div>
            ) : (
              <>
                <AiOutlineUpload size="4em" />
                <h3>Drag and drop or click here to upload image</h3>
              </>
            )}
          </label>

          <p>{errors.imageUrl?.message}</p>
        </div>

        <button type="submit" disabled={isSubmitting} className="mt-4">
          {isSubmitting ? "Please wait..." : "Submit"}
        </button>
      </form>
    </>
  );
};

export default BillboardForm;
