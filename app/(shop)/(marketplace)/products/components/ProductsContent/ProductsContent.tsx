import { ProductBreadcrumbData, ProductType } from "@/app/(shop)/types";
import ProductsFilter from "../ProductsFilter/ProductsFilter";
import ProductsGrid from "../ProductsGrid/ProductsGrid";
import styles from "./ProductsContent.module.css";

interface ProductsContentProps {
  products: ProductType[];
  breadcrumb: ProductBreadcrumbData[];
}

const ProductsContent = ({ products, breadcrumb }: ProductsContentProps) => {
  return (
    <div className={styles.productsContentWrapper}>
      <ProductsFilter breadcrumb={breadcrumb} />
      <ProductsGrid products={products} />
    </div>
  );
};

export default ProductsContent;
