"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ProductsSlider.module.css";
import { ProductType } from "@/app/(shop)/types";
import { MdArrowForwardIos } from "react-icons/md";
import { MdArrowBackIosNew } from "react-icons/md";
import Button from "@/app/components/Button/Button";
import ProductCard from "@/app/(shop)/components/ProductCard/ProductCard";
import Separator from "../Separator/Separator";
import { Libre_Franklin } from "next/font/google";
import { useRouter } from "next/navigation";

const libre = Libre_Franklin({ subsets: ["latin"], weight: ["600"] });

interface ProductsSliderProps {
  products: ProductType[];
  title: string;
}

const ProductsSlider = ({ products, title }: ProductsSliderProps) => {
  const carouselRef = useRef<HTMLUListElement>(null);

  const firstCardRef = useRef<HTMLLIElement>(null);
  const [firstCardWidth, setFirstCardWidth] = useState(0);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);
  const [isEndOfCarousel, setIsEndOfCarousel] = useState<boolean>(false);
  const [isBeginningOfCarousel, setIsBeginningOfCarousel] =
    useState<boolean>(true);
  const router = useRouter();

  const dragStart = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX);

    if (carouselRef.current) {
      setStartScrollLeft(carouselRef.current.scrollLeft);
    }
  };

  const dragging = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;

    carouselRef.current.scrollLeft = startScrollLeft - (e.pageX - startX);
  };

  const dragStop = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const updateCarouselDimensions = () => {
      const carousel = carouselRef.current;
      if (carousel) {
        if (firstCardRef.current) {
          const width = firstCardRef.current.offsetWidth;
          setFirstCardWidth(width);
          const isEnd =
            carousel.scrollLeft + carousel.clientWidth >=
            carousel.scrollWidth - width;
          const isBeginning = carousel.scrollLeft <= width;
          setIsEndOfCarousel(isEnd);
          setIsBeginningOfCarousel(isBeginning);
        }
      }
    };

    updateCarouselDimensions();

    window.addEventListener("resize", updateCarouselDimensions);

    return () => {
      window.removeEventListener("resize", updateCarouselDimensions);
    };
  }, []);

  const handleArrowClick = (direction: string) => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollLeft +=
      direction === "left" ? -firstCardWidth : firstCardWidth;
  };

  const handleScroll = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const isEnd =
      carousel.scrollLeft + carousel.clientWidth >=
      carousel.scrollWidth - firstCardWidth;
    const isBeginning = carousel.scrollLeft <= firstCardWidth;
    setIsEndOfCarousel(isEnd);
    setIsBeginningOfCarousel(isBeginning);
  };

  return (
    <div className={styles.productsSliderWrapper}>
      <div className={`${styles.productsSliderTitle} ${libre.className}`}>
        {title}
      </div>
      <Separator />
      <div className={styles.cardSliderWrapper} onMouseUp={dragStop}>
        {!isBeginningOfCarousel && (
          <Button
            shape="original"
            Icon={MdArrowBackIosNew}
            className={styles.sliderArrow}
            onClick={() => handleArrowClick("left")}
          />
        )}
        <ul
          className={`${[styles.carousel, isDragging && styles.dragging]
            .filter(Boolean)
            .join(" ")}`}
          ref={carouselRef}
          onMouseDown={dragStart}
          onMouseMove={dragging}
          onScroll={handleScroll}
        >
          {products.map((product, index) => (
            <li
              key={product.id}
              ref={index === 0 ? firstCardRef : null}
              className={styles.featuredProductCardWrapper}
            >
              <ProductCard
                product={product}
                onClick={() => router.push(`/product/${product.id}`)}
              />
            </li>
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

export default ProductsSlider;
