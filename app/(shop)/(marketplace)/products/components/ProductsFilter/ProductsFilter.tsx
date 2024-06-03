"use client";

import Button from "@/app/components/Button/Button";
import { useSidebar } from "@/app/providers/Sidebar/SidebarContext";
import { GiHamburgerMenu } from "react-icons/gi";
import styles from "./ProductsFilter.module.css";
import { BrandType, ProductBreadcrumbData } from "@/app/(shop)/types";
import ProductBreadcrumb from "../../../components/ProductBreadcrumb/ProductBreadcrumb";
import ProductBrands from "./ProductBrands";
import ProductOrderBy from "./ProductOrderBy";

interface ProductsFilterProps {
  breadcrumb: ProductBreadcrumbData[];
  brands: BrandType[];
}

const ProductsFilter = ({ breadcrumb, brands }: ProductsFilterProps) => {
  const { toggleOpen } = useSidebar();

  return (
    <div className={styles.productsFilterWrapper}>
      <div className={styles.productsFilterBreadcrumb}>
        <ProductBreadcrumb breadcrumb={breadcrumb} />
      </div>
      <div className={styles.productsFilterSidebarTrigger}>
        <Button
          Icon={GiHamburgerMenu}
          onClick={toggleOpen}
          className="desktop--hide"
        />
      </div>
      <div className={styles.productsFilterBrands}>
        <ProductBrands brands={brands} />
      </div>
      <div className={styles.productsFilterOrderBy}>
        <ProductOrderBy />
      </div>
    </div>
  );
};

export default ProductsFilter;
