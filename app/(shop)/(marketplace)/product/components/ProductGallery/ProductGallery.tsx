"use client";

import { ImageType } from "@/app/(shop)/types";
import styles from "./ProductGallery.module.css";
import { useEffect, useMemo, useRef, useState } from "react";
import useContainerDimensions from "@/app/hooks/useContainerDimensions";
import Button from "@/app/components/Button/Button";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import ImagePreview from "./ImagePreview/ImagePreview";
import GallerySlider from "./GallerySlider/GallerySlider";

interface ProductGalleryProps {
  images: ImageType[];
}

const ProductGallery = ({ images }: ProductGalleryProps) => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const { width } = useContainerDimensions(galleryRef);
  const [imageWidth, setImageWidth] = useState(180);
  // const [numImages, setNumImages] = useState(3);
  const carouselRef = useRef<HTMLUListElement>(null);
  const [isEndOfCarousel, setIsEndOfCarousel] = useState<boolean>(false);
  const [isBeginningOfCarousel, setIsBeginningOfCarousel] =
    useState<boolean>(true);

  const imageUrls = useMemo(() => {
    const rawImageUrls = images.map((image) => image.url);
    return rawImageUrls.length === 0
      ? ["/static/images/not_found.png"]
      : rawImageUrls;
  }, [images]);

  const [selectedImageUrl, setSelectedImageUrl] = useState<string>(
    imageUrls[0]
  );

  const padding = 10;
  const maxImageWidth = 142;
  const minNumImages = 3;

  useEffect(() => {
    const updateCarouselDimensions = () => {
      const carousel = carouselRef.current;
      if (carousel) {
        const width = imageWidth;
        const isEnd =
          carousel.scrollLeft + carousel.clientWidth >=
          carousel.scrollWidth - width;
        const isBeginning = carousel.scrollLeft <= width;

        setIsEndOfCarousel(isEnd);
        setIsBeginningOfCarousel(isBeginning);
      }
    };

    if (width > 0) {
      const calculatedNumImages = Math.floor(width / (maxImageWidth + padding));
      const newNumImages = Math.max(calculatedNumImages, minNumImages);
      // setNumImages(newNumImages);
      const newImageWidth = Math.floor(
        (width - padding * (newNumImages - 1)) / newNumImages
      );

      setImageWidth(newImageWidth);
      updateCarouselDimensions();
    }
  }, [width, imageWidth]);

  const [imageIndex, setImageIndex] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    setImageIndex(imageUrls.findIndex((url) => url === selectedImageUrl));
  }, [selectedImageUrl, imageUrls]);

  const handleArrowClick = (direction: string) => {
    if (!carouselRef.current) return;

    carouselRef.current.scrollLeft +=
      direction === "left" ? -imageWidth : imageWidth;
  };

  const handleScroll = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const isEnd =
      carousel.scrollLeft + carousel.clientWidth >=
      carousel.scrollWidth - imageWidth;
    const isBeginning = carousel.scrollLeft <= imageWidth;
    setIsEndOfCarousel(isEnd);
    setIsBeginningOfCarousel(isBeginning);
  };

  return (
    <div className={styles.productDetailsImages} ref={galleryRef}>
      <ImagePreview
        imageUrls={imageUrls}
        selectedImageUrl={selectedImageUrl}
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
      />
      <div className={styles.mainImage} onClick={() => setPreviewOpen(true)}>
        <GallerySlider
          imageUrls={imageUrls}
          selectedImageUrl={selectedImageUrl}
          productCard
          imageIndex={imageIndex}
          setImageIndex={setImageIndex}
          onImageChange={(index) => setSelectedImageUrl(imageUrls[index])}
        />
      </div>

      <div className={styles.subImagesContainer}>
        {!isBeginningOfCarousel && (
          <Button
            shape="original"
            Icon={MdArrowBackIosNew}
            className={styles.sliderArrow}
            onClick={() => handleArrowClick("left")}
          />
        )}
        <ul
          className={styles.carousel}
          style={{ gap: `${padding}px` }}
          ref={carouselRef}
          onScroll={handleScroll}
        >
          {imageUrls.map((url, index) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={url + index}
              src={url}
              alt="product image"
              className={styles.subImage}
              style={{ width: `${imageWidth}px` }}
              onClick={() => setSelectedImageUrl(url)}
            />
          ))}
        </ul>
        {!isEndOfCarousel && (
          <Button
            shape="original"
            Icon={MdArrowForwardIos}
            className={styles.sliderArrow}
            onClick={() => handleArrowClick("right")}
          />
        )}
      </div>
    </div>
  );
};

export default ProductGallery;
