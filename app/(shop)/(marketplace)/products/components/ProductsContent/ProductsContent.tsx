import {
  BrandType,
  ProductBreadcrumbData,
  ProductType,
} from "@/app/(shop)/types";
import ProductsFilter from "../ProductsFilter/ProductsFilter";
import ProductsGrid from "../ProductsGrid/ProductsGrid";
import styles from "./ProductsContent.module.css";
import PaginationController from "@/app/components/PaginationController/PaginationController";

interface ProductsContentProps {
  products: ProductType[];
  brandsInFilter: BrandType[];
  breadcrumb: ProductBreadcrumbData[];
  totalPages: number;
  currentPage: number;
}

const ProductsContent = ({
  products,
  brandsInFilter,
  breadcrumb,
  totalPages,
  currentPage,
}: ProductsContentProps) => {
  return (
    <div className={styles.productsContentWrapper}>
      <div className={styles.productsContentMain}>
        <ProductsFilter breadcrumb={breadcrumb} brands={brandsInFilter} />
        <ProductsGrid products={products} />
      </div>
      <PaginationController totalPages={totalPages} currentPage={currentPage} />
    </div>
  );
};

export default ProductsContent;
