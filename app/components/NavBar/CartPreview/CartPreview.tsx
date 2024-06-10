"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CartPreview.module.css";
import { FaCartShopping } from "react-icons/fa6";
import { useCart } from "@/app/providers/Cart/CartContext";
import { useRouter } from "next/navigation";
import Button from "../../Button/Button";
import { IoIosArrowForward } from "react-icons/io";

const CartPreview = () => {
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const cartPreviewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        cartPreviewRef.current &&
        !cartPreviewRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [cartPreviewRef]);

  const router = useRouter();
  const { cartItems, allQuantity } = useCart();

  return (
    <div className={styles.cartPreviewWrapper} ref={cartPreviewRef}>
      <div
        className={styles.cartPreviewIcon}
        onClick={() => setDropdownOpen((prev) => !prev)}
      >
        {allQuantity > 0 && (
          <div className={styles.cartPreviewCounter}>
            <span>{allQuantity > 9 ? "9+" : allQuantity}</span>
          </div>
        )}

        <FaCartShopping size="1.6em" />
      </div>
      {isDropdownOpen && (
        <div className={styles.cartPreviewContent}>
          {cartItems.length === 0 ? (
            <h1 className={styles.cartPreviewNoContent}>Your cart is empty</h1>
          ) : (
            <div className={styles.cartPreviewContentInner}>
              <div className={styles.cartPageNavigation}>
                <Button
                  variant="primary"
                  Icon={IoIosArrowForward}
                  iconSize="1.4em"
                  onClick={() => {
                    setDropdownOpen(false);
                    router.push("/cart");
                  }}
                >
                  <span>Go to cart</span>
                </Button>
              </div>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className={styles.cartItemPreviewWrapper}
                  onClick={() => {
                    setDropdownOpen(false);
                    router.push(`/product/${item.id}`);
                  }}
                >
                  <div className={styles.cartItemImageContainer}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.imageUrl}
                      alt="product image"
                      className={styles.cartItemImage}
                    />
                  </div>
                  <div className={styles.cartItemText}>
                    <h1 className={styles.cartItemTextTitle}>{item.name}</h1>
                    <h3 className={styles.cartItemTextPrice}>
                      &euro;{item.price}
                    </h3>
                    <div className={styles.cartItemQuantity}>
                      <span>Quantity:</span>
                      <h3>{item.quantity}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CartPreview;
