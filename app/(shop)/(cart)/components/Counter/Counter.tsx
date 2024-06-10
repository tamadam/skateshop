"use client";

import { useState } from "react";
import styles from "./Counter.module.css";
import { FiMinus, FiPlus } from "react-icons/fi";

const COUNTER_INITIAL_VALUE = 1;

interface CounterProps {
  initialValue?: number;
  onCounterChange: (quantity: number) => void;
}

const Counter = ({
  initialValue = COUNTER_INITIAL_VALUE,
  onCounterChange,
}: CounterProps) => {
  const [counter, setCounter] = useState<number>(initialValue);

  const handleCounterChange = (newCount: number) => {
    const validatedCount = newCount <= 0 ? 1 : newCount;
    setCounter(validatedCount);
    onCounterChange(validatedCount);
  };

  return (
    <div className={styles.counterWrapper}>
      <button
        type="button"
        className={[styles.counterItem, styles.minus].join(" ")}
        onClick={() => handleCounterChange(counter - 1)}
      >
        <FiMinus />
      </button>
      <div className={[styles.counterItem, styles.count].join(" ")}>
        {
          <input
            type="number"
            className={styles.counterInput}
            value={counter}
            onChange={(event) =>
              handleCounterChange(Number(event.target.value))
            }
            min="1"
          />
        }
      </div>
      <button
        type="button"
        className={[styles.counterItem, styles.plus].join(" ")}
        onClick={() => handleCounterChange(counter + 1)}
      >
        <FiPlus />
      </button>
    </div>
  );
};

export default Counter;
