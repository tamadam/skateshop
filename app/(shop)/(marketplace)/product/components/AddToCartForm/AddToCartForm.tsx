"use client";

import styles from "./AddToCartForm.module.css";
import { SingleProductType } from "@/app/(shop)/types";
import { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import Button from "@/app/components/Button/Button";
import { FaBasketShopping } from "react-icons/fa6";
import Spinner from "@/app/components/Spinner/Spinner";
import toast from "react-hot-toast";

const COUNTER_INITIAL_VALUE = 1;

interface AddToCartFormProps {
  product: SingleProductType;
}

const AddToCartForm = ({ product }: AddToCartFormProps) => {
  const [counter, setCounter] = useState<number>(COUNTER_INITIAL_VALUE);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleCounterChange = (newCount: number) => {
    if (newCount <= 0) {
      setError("Quantity must be at least 1");
    } else {
      setError("");
    }

    setCounter(newCount);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (counter <= 0) {
      setError("Quantity must be at least 1");
      return;
    }

    setError("");

    try {
      console.log("submitting...");

      toast.success(`${product.name} is added to Cart`);
    } catch (error) {
      setError("An error occurred while adding the product to the cart");
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
      setCounter(COUNTER_INITIAL_VALUE);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.productFormWrapper}>
      <div className={styles.productCounter}>
        <h2>Quantity:</h2>
        <div className={styles.counterWrapper}>
          <button
            type="button"
            className={[styles.counterItem, styles.minus].join(" ")}
            onClick={() => handleCounterChange(counter - 1)}
            disabled={isSubmitting}
          >
            <FiMinus />
          </button>
          <div className={[styles.counterItem, styles.count].join(" ")}>
            <input
              type="number"
              className={styles.counterInput}
              value={counter}
              onChange={(event) =>
                handleCounterChange(Number(event.target.value))
              }
              min="1"
            />
          </div>
          <button
            type="button"
            className={[styles.counterItem, styles.plus].join(" ")}
            onClick={() => handleCounterChange(counter + 1)}
            disabled={isSubmitting}
          >
            <FiPlus />
          </button>
        </div>
      </div>
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.productAddToCart}>
        <Button
          type="submit"
          Icon={FaBasketShopping}
          iconFirst
          variant="primary"
          disabled={isSubmitting}
        >
          <span>Add to Cart (soon) {isSubmitting && <Spinner />}</span>
        </Button>
      </div>
    </form>
  );
};

export default AddToCartForm;
