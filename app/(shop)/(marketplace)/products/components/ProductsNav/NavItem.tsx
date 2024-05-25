"use client";

import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoCheckmarkCircle } from "react-icons/io5";

import styles from "./ProductsNav.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import {
  BRAND_SEARCH_PARAM,
  CATEGORY_PRODUCTS_SEARCH_PARAM,
  SIZE_SEARCH_PARAM,
} from "@/app/constants";
import { toggleSearchParams } from "@/lib/toggleSearchParams";

interface NavItemProps {
  label: string;
  data: {
    id: string;
    name: string;
  }[];
  searchParam:
    | typeof BRAND_SEARCH_PARAM
    | typeof CATEGORY_PRODUCTS_SEARCH_PARAM
    | typeof SIZE_SEARCH_PARAM;
  open: boolean;
  filter: boolean;
}

const NavItem = ({ label, data, searchParam, open, filter }: NavItemProps) => {
  const [isOpen, setOpen] = useState<boolean>(open);
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchParamIds = [...Array.from(searchParams.values())];

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
              className={[
                styles.subItem,
                searchParamIds.includes(dt.id) && styles.activeSearch,
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => {
                if (filter) {
                  const newSearchParams = toggleSearchParams(
                    searchParams,
                    [{ key: searchParam, value: dt.id }],
                    true
                  );
                  router.push(newSearchParams);
                } else {
                  router.push(`?${CATEGORY_PRODUCTS_SEARCH_PARAM}=${dt.id}`);
                }
              }}
            >
              <span>{dt.name}</span>
              {filter && <IoCheckmarkCircle size="1.2em" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavItem;
