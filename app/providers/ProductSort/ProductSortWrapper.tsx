"use client";

import { PropsWithChildren } from "react";
import { ProductSortProvider } from "./ProductSortContext";

const ProductSortWrapper = ({ children }: PropsWithChildren) => {
  return <ProductSortProvider>{children}</ProductSortProvider>;
};

export default ProductSortWrapper;
