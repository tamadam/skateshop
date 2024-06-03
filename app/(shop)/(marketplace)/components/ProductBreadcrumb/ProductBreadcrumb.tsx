"use client";

import { ProductBreadcrumbData } from "@/app/(shop)/types";
import Button from "@/app/components/Button/Button";
import { useRouter } from "next/navigation";
import { ImHome } from "react-icons/im";
import {
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import styles from "./ProductBreadcrumb.module.css";
import { CATEGORY_PRODUCTS_SEARCH_PARAM } from "@/app/constants";

interface ProductBreadcrumbProps {
  breadcrumb: ProductBreadcrumbData[];
}

const ProductBreadcrumb = ({ breadcrumb }: ProductBreadcrumbProps) => {
  const router = useRouter();

  return (
    <div className={styles.breadcrumbWrapper}>
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
                    `/products?${CATEGORY_PRODUCTS_SEARCH_PARAM}=${item.id}`
                  );
                }
              }}
            >
              {item.name}
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProductBreadcrumb;
