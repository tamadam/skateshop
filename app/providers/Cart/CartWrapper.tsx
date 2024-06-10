"use client";

import { PropsWithChildren } from "react";
import CartProvider from "./CartContext";

const CartWrapper = ({ children }: PropsWithChildren) => {
  return <CartProvider>{children}</CartProvider>;
};

export default CartWrapper;
