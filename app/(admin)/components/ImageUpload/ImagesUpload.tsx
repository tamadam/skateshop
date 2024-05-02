import React, { ChangeEvent, useEffect, useState } from "react";
import {
  UseFormClearErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormResetField,
  UseFormSetValue,
} from "react-hook-form";
import { AiOutlineUpload } from "react-icons/ai";
import { LiaTrashAlt } from "react-icons/lia";
import styles from "./ImageUpload.module.css";
import Button from "@/app/components/Button/Button";
import Image from "next/image";

interface ImagesUploadProps {
  id: string;
  label: string;
  classNameForLabel?: string;
  classNameForInput?: string;
  imageUrls: string[];
  disabled: boolean;
  resetField: UseFormResetField<any>;
  register: UseFormRegister<any>;
  getValues: UseFormGetValues<any>;
  setValue: UseFormSetValue<any>;
  clearErrors: UseFormClearErrors<any>;
  originalImages: string[];
  onOriginalImagesChange: (removedImage: string) => void;
}

const ImagesUpload = ({
  id,
  label,
  classNameForLabel,
  classNameForInput,
  imageUrls,
  disabled,
  resetField,
  register,
  getValues,
  setValue,
  clearErrors,
  originalImages,
  onOriginalImagesChange,
}: ImagesUploadProps) => {
  const [selectedImages, setSelectedImages] = useState<string[]>(
    imageUrls || []
  );

  useEffect(() => {
    setValue(id, undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleImageInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    let newImages: string[] = [];

    if (files && files.length > 0) {
      const filesArray = Array.from(files);

      filesArray.map((file) => {
        newImages = [...newImages, URL.createObjectURL(file)];
      });

      setSelectedImages([...originalImages, ...newImages]);
    } else if (originalImages) {
      setSelectedImages([...originalImages]);
    } else {
      setSelectedImages([]);
    }
  };

  /* console.log(selectedImages); */

  const prepareImageRemoval = () => {
    setSelectedImages((prevImages) => {
      const newImages = [...prevImages];
      const removedImage = newImages.shift();
      console.log(removedImage);

      return newImages;
    });

    // there is a bug when the user delete the currently uploaded files
    resetField(id);
    setValue(id, undefined);
  };

  useEffect(() => {
    const removedImage = originalImages.find(
      (image) => !selectedImages.includes(image)
    );

    if (removedImage) {
      onOriginalImagesChange(removedImage);
    }
  }, [selectedImages, onOriginalImagesChange, originalImages]);

  const handleImagePreviewClicked = (index: number) => {
    setSelectedImages((prevImages) => {
      const newImages = [...prevImages];
      [newImages[0], newImages[index]] = [newImages[index], newImages[0]];

      return newImages;
    });
  };

  return (
    <>
      <label htmlFor={id} className={styles.imageUploadWrapper}>
        <div className={classNameForLabel}>{label}</div>
        <div
          className={`${styles.imageUploadContent} ${classNameForInput}`}
          style={{
            backgroundImage: `${
              selectedImages[0] || originalImages[0]
                ? `url(${selectedImages[0] || originalImages[0]})`
                : "unset"
            }`,
          }}
        >
          <div>
            <input
              id={id}
              disabled={disabled}
              {...register(id)}
              accept="image/*"
              type="file"
              onChange={handleImageInputChange}
              className={styles.imageUploadFileInput}
              multiple
            />

            {selectedImages.length > 0 || originalImages.length > 0 ? (
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
              <div className={styles.imageUploadIcon}>
                <AiOutlineUpload />
                <h3>Click here to upload an image</h3>
              </div>
            )}
          </div>
        </div>
      </label>
      <div className={styles.imagesPreview}>
        {selectedImages.map((image, index) => {
          if (index === 0) return;
          return (
            <Image
              key={image}
              src={image}
              alt="image"
              width={60}
              height={60}
              onClick={() => handleImagePreviewClicked(index)}
            />
          );
        })}
      </div>
    </>
  );
};

export default ImagesUpload;
