import { ProductType } from "@/app/(shop)/types";
import ProductsFilter from "../ProductsFilter/ProductsFilter";
import ProductsGrid from "../ProductsGrid/ProductsGrid";
import styles from "./ProductsContent.module.css";

interface ProductsContentProps {
  products: ProductType[];
}

const ProductsContent = ({ products }: ProductsContentProps) => {
  return (
    <div className={styles.productsContentWrapper}>
      <ProductsFilter />
      <ProductsGrid products={products} />
    </div>
  );
};

export default ProductsContent;
