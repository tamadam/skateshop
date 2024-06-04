"use client";

import Overlay from "@/app/components/Overlay/Overlay";
import styles from "./ImagePreview.module.css";
import ImageSlider from "@/app/(shop)/(marketplace)/components/ImageSlider/ImageSlider";

interface ImagePreviewProps {
  imageUrls: string[];
  selectedImageUrl?: string;
  open: boolean;
  onClose: () => void;
}

const ImagePreview = ({
  imageUrls,
  selectedImageUrl = "",
  open,
  onClose,
}: ImagePreviewProps) => {
  return (
    <>
      <Overlay open={open} onClick={onClose} />
      <div className={`${styles.imagePreviewWrapper} ${open && styles.open}`}>
        <div className={styles.imagePreviewContent}>
          <ImageSlider
            productCard
            imageUrls={imageUrls}
            selectedImageUrl={selectedImageUrl}
          />
        </div>
      </div>
    </>
  );
};

export default ImagePreview;
