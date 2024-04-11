import React, { ChangeEvent, useState } from "react";
import { UseFormRegister, UseFormResetField } from "react-hook-form";
import { AiOutlineUpload } from "react-icons/ai";
import { LiaTrashAlt } from "react-icons/lia";

interface ImageUploadProps {
  id: string;
  imageUrl: string | undefined;
  disabled: boolean;
  resetField: UseFormResetField<any>;
  register: UseFormRegister<any>;
  errorMessage?: string;
  originalImage: string | null;
  onOriginalImageChange: () => void;
}

const ImageUpload = ({
  id,
  imageUrl,
  disabled,
  resetField,
  register,
  errorMessage,
  originalImage,
  onOriginalImageChange,
}: ImageUploadProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(
    imageUrl || null
  );

  const handleImageInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    let url = null;
    if (files && files.length > 0) {
      url = URL.createObjectURL(files[0]);
      setSelectedImage(url);
    }
  };

  const prepareImageRemoval = () => {
    onOriginalImageChange();
    setSelectedImage(null);
    resetField(id);
  };

  return (
    <>
      <label
        htmlFor={id}
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
          id={id}
          disabled={disabled}
          {...register(id)}
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

      <p>{errorMessage}</p>
    </>
  );
};

export default ImageUpload;
