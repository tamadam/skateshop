"use client";

import { useState } from "react";
import styles from "./ProductCounter.module.css";

const ProductCounter = () => {
  const [counter, setCounter] = useState<number>(1);

  return <div>ProductCounter {counter}</div>;
};

export default ProductCounter;
