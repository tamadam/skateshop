"use client";

import ProductCard from "@/app/(shop)/components/ProductCard/ProductCard";
import { ProductType } from "@/app/(shop)/types";

import styles from "./ProductsGrid.module.css";
import { useRouter } from "next/navigation";

interface ProductsGridProps {
  products: ProductType[];
}

const ProductsGrid = ({ products }: ProductsGridProps) => {
  const router = useRouter();

  return (
    <div className={styles.productsGridWrapper}>
      {products.length === 0 ? (
        <span>This type of product is currently unavailable</span>
      ) : (
        products.map((product) => {
          return (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => {
                router.push(`/product/${product.id}`);
              }}
            />
          );
        })
      )}
    </div>
  );
};

export default ProductsGrid;
