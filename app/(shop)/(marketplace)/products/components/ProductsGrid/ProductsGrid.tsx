import { ProductType } from "@/app/(shop)/types";

interface ProductsGridProps {
  products: ProductType[];
}

const ProductsGrid = ({ products }: ProductsGridProps) => {
  return (
    <div>
      {products.map((product) => {
        return (
          <div key={product.id}>
            {product.category.name} - {product.name}
          </div>
        );
      })}
    </div>
  );
};

export default ProductsGrid;
