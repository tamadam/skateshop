"use client";

import {
  ORDER_BY,
  PRODUCTS_ORDER_BY_OPTIONS,
  PRODUCTS_ORDER_BY_PARAM,
} from "@/app/constants";
import { isValidOrderBy } from "@/lib/isValidOrderBy";
import { updateSearchParams } from "@/lib/updateSearchParams";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import styles from "./ProductsFilter.module.css";

const ProductOrderBy = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialOrderBy = searchParams.get(PRODUCTS_ORDER_BY_PARAM);
  const [orderBy, setOrderBy] = useState<ORDER_BY>(
    isValidOrderBy(initialOrderBy) ? initialOrderBy : ORDER_BY.RANDOM_ORDER
  );

  return (
    <select
      onChange={(event) => {
        const selectedValue = event.target.value;
        if (isValidOrderBy(selectedValue)) {
          setOrderBy(selectedValue);
          const newSearchParams = updateSearchParams(searchParams, [
            { key: PRODUCTS_ORDER_BY_PARAM, value: selectedValue },
          ]);
          router.push(newSearchParams);
        }
      }}
      defaultValue={orderBy}
      className={styles.orderBySelect}
    >
      {PRODUCTS_ORDER_BY_OPTIONS.map((opt) => (
        <option key={opt.type} value={opt.type}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export default ProductOrderBy;
