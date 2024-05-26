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
import { useRouter } from "next/navigation";
import {
  BrandType,
  ProductBreadcrumbData,
  ProductType,
} from "@/app/(shop)/types";
import { CATEGORY_PRODUCTS_SEARCH_PARAM } from "@/app/constants";

const removeDuplicates = (brands: BrandType[]): BrandType[] => {
  const uniqueIds = new Set<string>();
  return brands.filter((brand) => {
    if (uniqueIds.has(brand.id)) {
      return false;
    } else {
      uniqueIds.add(brand.id);
      return true;
    }
  });
};

interface ProductsFilterProps {
  breadcrumb: ProductBreadcrumbData[];
  products: ProductType[];
}

const ProductsFilter = ({ breadcrumb, products }: ProductsFilterProps) => {
  const { toggleOpen } = useSidebar();
  const router = useRouter();

  const currentBrands = removeDuplicates(
    products.map((product) => product.brand)
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
        {currentBrands.map((brand, index) => {
          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={index}
              src={brand.imageUrl || "/static/images/not_found.png"}
              alt={`logo-${brand.name}`}
              className={styles.brandImage}
            />
          );
        })}
      </div>
      <div className={styles.productsFilterOrderBy}>Order By</div>
    </div>
  );
};

export default ProductsFilter;
