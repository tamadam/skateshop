"use client";

import Button from "@/app/components/Button/Button";
import { useSidebar } from "@/app/providers/Sidebar/SidebarContext";
import { ImHome } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  MdKeyboardDoubleArrowRight,
  MdKeyboardArrowRight,
} from "react-icons/md";
import styles from "./ProductsFilter.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import { BrandType, ProductBreadcrumbData } from "@/app/(shop)/types";
import {
  BRAND_SEARCH_PARAM,
  CATEGORY_PRODUCTS_SEARCH_PARAM,
  ORDER_BY,
  PRODUCTS_ORDER_BY_OPTIONS,
  PRODUCTS_ORDER_BY_PARAM,
} from "@/app/constants";
import { toggleSearchParams } from "@/lib/toggleSearchParams";
import { updateSearchParams } from "@/lib/updateSearchParams";
import { useState } from "react";
import { isValidOrderBy } from "@/lib/isValidOrderBy";

interface ProductsFilterProps {
  breadcrumb: ProductBreadcrumbData[];
  brands: BrandType[];
}

const ProductsFilter = ({ breadcrumb, brands }: ProductsFilterProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toggleOpen } = useSidebar();
  const initialOrderBy = searchParams.get(PRODUCTS_ORDER_BY_PARAM);
  const [orderBy, setOrderBy] = useState<ORDER_BY>(
    isValidOrderBy(initialOrderBy) ? initialOrderBy : ORDER_BY.RANDOM_ORDER
  );

  return (
    <div className={styles.productsFilterWrapper}>
      <div className={styles.productsFilterBreadcrumb}>
        <Button
          Icon={ImHome}
          iconSize="1.2em"
          shape="original"
          onClick={() => {
            router.push("/marketplace");
          }}
        />
        <MdKeyboardDoubleArrowRight size="1.2em" />
        {breadcrumb.length !== 0 &&
          breadcrumb.map((item, index) => (
            <div key={item.id} className={styles.dynamicBreadcrumbWrapper}>
              {index !== 0 && <MdKeyboardArrowRight size="1.2em" />}
              <div
                className={[
                  styles.dynamicBreadcrumbItem,
                  breadcrumb.length - 1 === index && styles.active,
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => {
                  if (!(breadcrumb.length - 1 === index)) {
                    router.push(
                      `?${CATEGORY_PRODUCTS_SEARCH_PARAM}=${item.id}`
                    );
                  }
                }}
              >
                {item.name}
              </div>
            </div>
          ))}
      </div>
      <div className={styles.productsFilterSidebarTrigger}>
        <Button
          Icon={GiHamburgerMenu}
          onClick={toggleOpen}
          className="desktop--hide"
        />
      </div>
      <div className={styles.productsFilterBrands}>
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
      </div>
      <div className={styles.productsFilterOrderBy}>
        <select
          onChange={(event) => {
            const selectedValue = event.target.value;
            if (isValidOrderBy(selectedValue)) {
              setOrderBy(selectedValue);
              const newSearchParams = updateSearchParams(searchParams, [
                { key: PRODUCTS_ORDER_BY_PARAM, value: selectedValue },
              ]);
              router.push(newSearchParams);
            }
          }}
          defaultValue={orderBy}
          className={styles.orderBySelect}
        >
          {PRODUCTS_ORDER_BY_OPTIONS.map((opt) => (
            <option key={opt.type} value={opt.type}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ProductsFilter;
