"use client";

import Button from "@/app/components/Button/Button";
import { useSidebar } from "@/app/providers/Sidebar/SidebarContext";
import { ImHome } from "react-icons/im";
import {
  MdKeyboardDoubleArrowRight,
  MdKeyboardArrowRight,
} from "react-icons/md";
import styles from "./ProductsFilter.module.css";
import { useRouter } from "next/navigation";
import { ProductBreadcrumbData } from "@/app/(shop)/types";
import { CATEGORY_PRODUCTS_SEARCH_PARAM } from "@/app/constants";

interface ProductsFilterProps {
  breadcrumb: ProductBreadcrumbData[];
}

const ProductsFilter = ({ breadcrumb }: ProductsFilterProps) => {
  const { toggleOpen } = useSidebar();
  const router = useRouter();

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
        <Button onClick={toggleOpen} className="desktop--hide">
          Sidebar
        </Button>
      </div>
      <div className={styles.productsFilterBrands}>Brands</div>
      <div className={styles.productsFilterOrderBy}>Order By</div>
    </div>
  );
};

export default ProductsFilter;
