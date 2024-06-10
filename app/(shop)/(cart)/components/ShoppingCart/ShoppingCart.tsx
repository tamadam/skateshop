"use client";

import { useCart } from "@/app/providers/Cart/CartContext";
import styles from "./ShoppingCart.module.css";
import Button from "@/app/components/Button/Button";
import { LiaTrashAlt } from "react-icons/lia";
import Counter from "@/app/(shop)/(cart)/components/Counter/Counter";
import { useRouter } from "next/navigation";
import { IoIosArrowForward } from "react-icons/io";

const ShoppingCart = () => {
  const { cartItems, removeItem, updateItemQuantity } = useCart();
  const router = useRouter();

  const totalPrice = cartItems.reduce((acc, currVal) => {
    return (acc += Number(currVal.price) * currVal.quantity);
  }, 0);

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
              <Button className={styles.checkoutButton}>
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
