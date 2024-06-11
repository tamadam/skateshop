import { SingleProductType } from "@/app/(shop)/types";
import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type CartItem = {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  quantity: number;
};

const CART_LOCALE_STORAGE_NAME = "skateshopCart";

const transformProductToCartItem = (
  product: SingleProductType,
  quantity: number
): CartItem => {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    imageUrl: product.images[0]?.url ?? "/static/images/not_found.png",
    quantity,
  };
};

interface CartContextType {
  cartItems: CartItem[];
  addItem: (product: SingleProductType, quantity: number) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
  updateItemQuantity: (id: string, quantity: number) => void;
  allQuantity: number;
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addItem: () => {},
  removeItem: () => {},
  removeAll: () => {},
  updateItemQuantity: () => {},
  allQuantity: 0,
});

export function useCart() {
  return useContext(CartContext);
}

const CartProvider = ({ children }: PropsWithChildren) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // initialize cartItems
  useEffect(() => {
    setCartItems(
      JSON.parse(localStorage.getItem(CART_LOCALE_STORAGE_NAME) || "[]")
    );
  }, []);

  // update localStorage
  useEffect(() => {
    localStorage.setItem(CART_LOCALE_STORAGE_NAME, JSON.stringify(cartItems));
  }, [cartItems]);

  // add or update (quantity) item
  const addItem = (product: SingleProductType, quantity: number) => {
    const cartItem = transformProductToCartItem(product, quantity);
    const existingCartItem = cartItems.find((item) => item.id === product.id);

    if (existingCartItem) {
      const newCart = cartItems.map((item) =>
        item.id === existingCartItem.id
          ? {
              ...item,
              quantity: item.quantity + quantity,
            }
          : item
      );
      setCartItems(newCart);
    } else {
      setCartItems([...cartItems, cartItem]);
    }
  };

  const updateItemQuantity = (id: string, quantity: number) => {
    const newCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    setCartItems(newCart);
  };

  const removeItem = (id: string) => {
    const newCart = cartItems.filter((item) => item.id !== id);
    setCartItems(newCart);
  };

  const removeAll = useCallback(() => {
    setCartItems([]);
  }, []);

  const allQuantity = cartItems.reduce((acc, currVal) => {
    return (acc += currVal.quantity);
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItem,
        removeItem,
        removeAll,
        updateItemQuantity,
        allQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
