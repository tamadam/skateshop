import React, { ChangeEvent, useState } from "react";
import { UseFormRegister, UseFormResetField } from "react-hook-form";
import { AiOutlineUpload } from "react-icons/ai";
import { LiaTrashAlt } from "react-icons/lia";
import styles from "./ImageUpload.module.css";
import Button from "@/app/components/Button/Button";

interface ImageUploadProps {
  id: string;
  imageUrl: string | null | undefined;
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
        className={styles.imageUploadWrapper}
        style={{
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
          className={styles.imageUploadFileInput}
        />

        {selectedImage || originalImage ? (
          <div className={styles.imageDeleteButton}>
            <Button
              variant="delete"
              onClick={(event) => {
                event.preventDefault();
                prepareImageRemoval();
              }}
              iconSize="2em"
              Icon={LiaTrashAlt}
              shape="square"
            />
          </div>
        ) : (
          <>
            <AiOutlineUpload size="3em" />
            <h3>Click here to upload an image</h3>
          </>
        )}
      </label>

      <p>{errorMessage}</p>
    </>
  );
};

export default ImageUpload;
