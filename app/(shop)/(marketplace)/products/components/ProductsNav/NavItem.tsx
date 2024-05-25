"use client";

import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

import styles from "./ProductsNav.module.css";
import { updateSearchParams } from "@/lib/updateSearchParams";
import { useRouter, useSearchParams } from "next/navigation";
import {
  BRAND_SEARCH_PARAM,
  CATEGORY_PRODUCTS_SEARCH_PARAM,
} from "@/app/constants";

interface NavItemProps {
  label: string;
  data: {
    id: string;
    name: string;
  }[];
  searchParam:
    | typeof BRAND_SEARCH_PARAM
    | typeof CATEGORY_PRODUCTS_SEARCH_PARAM;
  open: boolean;
}

const NavItem = ({ label, data, searchParam, open }: NavItemProps) => {
  const [isOpen, setOpen] = useState<boolean>(open);
  const searchParams = useSearchParams();
  const router = useRouter();

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
            <div
              key={dt.id}
              className={styles.subItem}
              onClick={() => {
                const newSearchParams = updateSearchParams(searchParams, [
                  { key: searchParam, value: dt.id },
                ]);
                router.push(newSearchParams);
              }}
            >
              {dt.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavItem;
