"use client";

import { ImageType } from "@/app/(shop)/types";
import styles from "./ProductGallery.module.css";

interface ProductGalleryProps {
  images: ImageType[];
}

const ProductGallery = ({ images }: ProductGalleryProps) => {
  return (
    <div className={styles.productDetailsImages}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={images[0].url}
        alt="product image"
        className={styles.mainImage}
      />
      <div className={styles.subImagesContainer}>
        {[...images, ...images].slice(1).map((image) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={image.id}
            src={image.url}
            alt="product image"
            className={styles.subImage}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
