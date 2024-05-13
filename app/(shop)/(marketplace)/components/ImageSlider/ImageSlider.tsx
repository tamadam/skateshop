"use client";

import styles from "./ImageSlider.module.css";
import { MdArrowForwardIos } from "react-icons/md";
import { MdArrowBackIosNew } from "react-icons/md";
import Button from "@/app/components/Button/Button";
import { GoDotFill } from "react-icons/go";
import { useState } from "react";
import Image from "next/image";

interface ImageSliderProps {
  imageUrls: string[];
}

const ImageSlider = ({ imageUrls }: ImageSliderProps) => {
  const [imageIndex, setImageIndex] = useState(0);

  return (
    <div className={styles.imageSliderWrapper}>
      <div className={styles.imageSlider}>
        {imageUrls.map((imageUrl, index) => {
          return (
            <Image
              fill
              key={imageUrl}
              src={imageUrl}
              alt="advert image"
              className={styles.imageSliderImage}
              style={{
                translate: `${-100 * imageIndex}%`,
                left: `${100 * index}%`,
              }}
            />
          );
        })}
      </div>
      {imageUrls.length >= 2 && (
        <>
          <Button
            Icon={MdArrowBackIosNew}
            shape="circle"
            className={`${styles.imageSliderButton} ${styles.buttonLeft}`}
            onClick={() =>
              setImageIndex((index) =>
                index === 0 ? imageUrls.length - 1 : index - 1
              )
            }
          />
          <Button
            Icon={MdArrowForwardIos}
            shape="circle"
            className={`${styles.imageSliderButton} ${styles.buttonRight}`}
            onClick={() =>
              setImageIndex((index) =>
                index === imageUrls.length - 1 ? 0 : index + 1
              )
            }
          />
          <div className={styles.imageNavigation}>
            {imageUrls.map((_, index) => {
              return (
                <Button
                  key={index}
                  onClick={() => setImageIndex(index)}
                  Icon={GoDotFill}
                  shape="original"
                  variant="cancel"
                  className={[
                    styles.imageNavButton,
                    imageIndex === index && styles.active,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageSlider;
