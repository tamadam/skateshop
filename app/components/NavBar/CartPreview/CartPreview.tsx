"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CartPreview.module.css";
import { FaCartShopping } from "react-icons/fa6";
import Link from "next/link";

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

  const items = [
    { href: "#", label: "Product1" },
    { href: "#", label: "Product2" },
  ];

  return (
    <div className={styles.cartPreviewWrapper} ref={cartPreviewRef}>
      <div
        className={styles.cartPreviewIcon}
        onClick={() => setDropdownOpen((prev) => !prev)}
      >
        <FaCartShopping size="1.6em" />
      </div>
      {isDropdownOpen && (
        <div className={styles.cartPreviewContent}>
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={styles.dropdownItem}
              onClick={() => setDropdownOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPreview;
