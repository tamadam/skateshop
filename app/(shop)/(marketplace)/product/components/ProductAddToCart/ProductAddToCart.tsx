"use client";

import Button from "@/app/components/Button/Button";
import { FaBasketShopping } from "react-icons/fa6";

const ProductAddToCart = () => {
  return (
    <div>
      <Button
        Icon={FaBasketShopping}
        iconFirst
        variant="primary"
        disabled
        onClick={() => {
          console.log("Add to cart...");
        }}
      >
        <span>Add to Cart (soon)</span>
      </Button>
    </div>
  );
};

export default ProductAddToCart;
