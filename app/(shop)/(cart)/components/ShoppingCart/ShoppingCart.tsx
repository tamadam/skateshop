"use client";

import { useCart } from "@/app/providers/Cart/CartContext";
import styles from "./ShoppingCart.module.css";
import Button from "@/app/components/Button/Button";
import { LiaTrashAlt } from "react-icons/lia";
import Counter from "@/app/(shop)/(cart)/components/Counter/Counter";
import { useRouter, useSearchParams } from "next/navigation";
import { IoIosArrowForward } from "react-icons/io";
import { useEffect } from "react";
import toast from "react-hot-toast";

const ShoppingCart = () => {
  const { cartItems, removeItem, updateItemQuantity, removeAll } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed");
      removeAll();
    }

    if (searchParams.get("canceled")) {
      toast.error("Something went wrong");
    }
  }, [searchParams, removeAll]);

  const totalPrice = cartItems.reduce((acc, currVal) => {
    return (acc += Number(currVal.price) * currVal.quantity);
  }, 0);

  const onCheckout = async () => {
    const request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
      method: "POST",
      body: JSON.stringify(
        cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        }))
      ),
    });

    if (request.ok) {
      const requestData = await request.json();

      const url = requestData.url;
      window.location = url;
    } else {
      console.log("Error...");
    }
  };

  return (
    <div>
      <h1 className={styles.shoppingCartTitle}>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className={styles.emptyCartWrapper}>
          <h1>Your cart is empty.</h1>
          <Button
            Icon={IoIosArrowForward}
            onClick={() => router.push("/marketplace")}
            variant="primary"
          >
            <span>Continue shopping</span>
          </Button>
        </div>
      ) : (
        <div className={styles.shoppingCartItemsWrapper}>
          <div className={styles.cartItems}>
            {cartItems.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <div
                  className={styles.productImageContainer}
                  onClick={() => router.push(`/product/${item.id}`)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageUrl}
                    alt="product image"
                    className={styles.productImage}
                  />
                </div>
                <div className={styles.productDetails}>
                  <h1
                    className={styles.productName}
                    onClick={() => router.push(`/product/${item.id}`)}
                  >
                    {item.name}
                  </h1>
                  <div className={styles.productPriceContainer}>
                    <h1>Price: </h1>
                    <h3 className={styles.productPrice}>&euro;{item.price}</h3>
                  </div>
                  <div className={styles.productCounter}>
                    <h1>Quantity: </h1>
                    <Counter
                      initialValue={item.quantity}
                      onCounterChange={(quantity) =>
                        updateItemQuantity(item.id, quantity)
                      }
                    />
                  </div>
                </div>
                <div className={styles.productRemove}>
                  <Button
                    onClick={() => removeItem(item.id)}
                    Icon={LiaTrashAlt}
                    iconSize="1.4em"
                    variant="delete"
                    shape="square"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className={styles.summaryWrapper}>
            <div className={styles.summaryTitle}>
              <h1>Order Summary</h1>
            </div>
            <div className={styles.summaryContent}>
              {cartItems.map((item) => (
                <div key={item.id} className={styles.summaryItem}>
                  <span>
                    {item.name} - x{item.quantity}
                  </span>
                  <span>&euro;{Number(item.price) * item.quantity}</span>
                </div>
              ))}
              <div
                className={[styles.summaryItem, styles.orderTotal].join(" ")}
              >
                <span>Order total</span>
                <span>&euro;{totalPrice}</span>
              </div>
              <Button className={styles.checkoutButton} onClick={onCheckout}>
                <span>Checkout</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
