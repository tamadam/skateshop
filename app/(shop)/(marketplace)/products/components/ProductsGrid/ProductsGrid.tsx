"use client";

import ProductCard from "@/app/(shop)/components/ProductCard/ProductCard";
import { ProductType } from "@/app/(shop)/types";

import styles from "./ProductsGrid.module.css";

interface ProductsGridProps {
  products: ProductType[];
}

const ProductsGrid = ({ products }: ProductsGridProps) => {
  return (
    <div className={styles.productsGridWrapper}>
      {products.map((product) => {
        return (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => {
              console.log("product clicked");
            }}
          />
        );
      })}
    </div>
  );
};

export default ProductsGrid;
