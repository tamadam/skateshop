import { ProductType } from "@/app/(shop)/types";
import ProductsFilter from "../ProductsFilter/ProductsFilter";
import ProductsGrid from "../ProductsGrid/ProductsGrid";

interface ProductsContentProps {
  products: ProductType[];
}

const ProductsContent = ({ products }: ProductsContentProps) => {
  return (
    <div>
      <ProductsFilter />
      <ProductsGrid products={products} />
    </div>
  );
};

export default ProductsContent;
