"use client";

import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

import styles from "./ProductsNav.module.css";

interface NavItemProps {
  label: string;
  data: {
    id: string;
    name: string;
  }[];
}

const NavItem = ({ label, data }: NavItemProps) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <div className={styles.menuItem}>
      <div
        className={styles.menuItemTitle}
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className={styles.titleLabel}>{label}</div>
        <div
          className={[styles.titleIcon, isOpen && styles.rotate]
            .filter(Boolean)
            .join(" ")}
        >
          <IoIosArrowDown size="1.2em" />
        </div>
      </div>
      <div
        className={[styles.menuItemSubItems, isOpen && styles.open]
          .filter(Boolean)
          .join(" ")}
      >
        <div className={styles.menuSubItem}>
          {data.map((dt) => (
            <div className={styles.subItem} key={dt.id}>
              {dt.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavItem;
