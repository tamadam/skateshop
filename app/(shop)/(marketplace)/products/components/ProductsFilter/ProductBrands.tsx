"use client";

import { BrandType } from "@/app/(shop)/types";
import styles from "./ProductsFilter.module.css";
import { toggleSearchParams } from "@/lib/toggleSearchParams";
import { BRAND_SEARCH_PARAM } from "@/app/constants";
import { useRouter, useSearchParams } from "next/navigation";

interface ProductBrandsProps {
  brands: BrandType[];
}

const ProductBrands = ({ brands }: ProductBrandsProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  return (
    <>
      {brands.map((brand, index) => {
        return (
          <div
            key={index}
            className={styles.brandImageContainer}
            onClick={() => {
              const newSearchParams = toggleSearchParams(
                searchParams,
                [{ key: BRAND_SEARCH_PARAM, value: brand.id }],
                true
              );
              router.push(newSearchParams);
            }}
          >
            {/*  eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={brand.imageUrl || "/static/images/not_found.png"}
              alt={`logo-${brand.name}`}
              className={styles.brandImage}
            />
          </div>
        );
      })}
    </>
  );
};

export default ProductBrands;
