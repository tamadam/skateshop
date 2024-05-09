import { Product } from "@prisma/client";
import styles from "./FeaturedProducts.module.css";

interface FeaturedProductsProps {
  products: Product[];
}

const FeaturedProducts = ({ products }: FeaturedProductsProps) => {
  return (
    <div>
      {products.map((product) => {
        return <div key={product.id}>{product.name}</div>;
      })}
    </div>
  );
};

export default FeaturedProducts;
