"use client";

import ApiList from "../../components/ApiInfo/ApiList";
import Heading from "../../components/Heading/Heading";
import { columns, FormattedProduct } from "./columns";
import ProductTable from "./ProductTable";

interface ProductClientProps {
  products: FormattedProduct[];
  totalProducts: number;
}

const ProductClient = ({ products, totalProducts }: ProductClientProps) => {
  return (
    <div>
      <Heading
        title={`Products (${totalProducts})`}
        description="Manage your products for your shop"
      />

      <ProductTable
        products={products}
        totalProducts={totalProducts}
        columns={columns}
      />

      <ApiList entityName="products" entityIdName="productId" />
    </div>
  );
};

export default ProductClient;
