"use client";

import styles from "./ImageSlider.module.css";
import { MdArrowForwardIos } from "react-icons/md";
import { MdArrowBackIosNew } from "react-icons/md";
import Button from "@/app/components/Button/Button";
import { GoDotFill } from "react-icons/go";
import { TouchEventHandler, useEffect, useState } from "react";

const SWIPE_TRESHOLD = 50;

interface ImageSliderProps {
  imageUrls: string[];
  productCard?: boolean;
  selectedImageUrl?: string;
}

const ImageSlider = ({
  imageUrls,
  productCard = false,
  selectedImageUrl = "",
}: ImageSliderProps) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    if (selectedImageUrl) {
      setImageIndex(imageUrls.findIndex((url) => url === selectedImageUrl));
    }
  }, [selectedImageUrl, imageUrls]);

  const handleLeftClick = () => {
    setImageIndex((index) => (index === 0 ? imageUrls.length - 1 : index - 1));
  };

  const handleRightClick = () => {
    setImageIndex((index) => (index === imageUrls.length - 1 ? 0 : index + 1));
  };

  const handleTouchStart: TouchEventHandler<HTMLDivElement> = (event) => {
    setTouchEnd(0);
    setTouchStart(event.touches[0].clientX);
  };

  const handleTouchMove: TouchEventHandler<HTMLDivElement> = (event) => {
    setTouchEnd(event.touches[0].clientX);
  };

  const handleTouchEnd: TouchEventHandler<HTMLDivElement> = (event) => {
    if (!touchStart || !touchEnd) return;

    const distance = touchEnd - touchStart;

    if (distance > -SWIPE_TRESHOLD) {
      handleLeftClick();
    }

    if (distance < SWIPE_TRESHOLD) {
      handleRightClick();
    }
  };

  return (
    <div
      className={styles.imageSliderWrapper}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles.imageSlider}>
        {imageUrls.map((imageUrl, index) => {
          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={imageUrl}
              src={imageUrl}
              alt="advert image"
              className={`${styles.imageSliderImage} ${
                productCard ? styles.contain : styles.cover
              }`}
              style={{
                translate: `${-100 * imageIndex}%`,
                left: `${100 * index}%`,
              }}
            />
          );
        })}
      </div>
      {imageUrls.length >= 2 &&
        (!productCard ? (
          <>
            <Button
              Icon={MdArrowBackIosNew}
              shape="circle"
              className={`${styles.imageSliderButton} ${styles.buttonLeft}`}
              onClick={handleLeftClick}
            />
            <Button
              Icon={MdArrowForwardIos}
              shape="circle"
              className={`${styles.imageSliderButton} ${styles.buttonRight}`}
              onClick={handleRightClick}
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
        ) : (
          <>
            <Button
              Icon={MdArrowBackIosNew}
              shape="circle"
              className={`${[
                styles.imageSliderButton,
                styles.buttonLeft,
                productCard && styles.cardArrow,
              ]
                .filter(Boolean)
                .join(" ")}`}
              onClick={(event) => {
                event.stopPropagation();
                handleLeftClick();
              }}
            />
            <Button
              Icon={MdArrowForwardIos}
              shape="circle"
              className={`${[
                styles.imageSliderButton,
                styles.buttonRight,
                productCard && styles.cardArrow,
              ]
                .filter(Boolean)
                .join(" ")}`}
              onClick={(event) => {
                event.stopPropagation();
                handleRightClick();
              }}
            />
          </>
        ))}
    </div>
  );
};

export default ImageSlider;
