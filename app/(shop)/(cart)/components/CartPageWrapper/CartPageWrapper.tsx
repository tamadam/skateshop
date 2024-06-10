import { PropsWithChildren } from "react";
import styles from "./CartPageWrapper.module.css";
import Container from "@/app/(shop)/(marketplace)/components/Container/Container";

const CartPageWrapper = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.cartPageWrapper}>
      <Container>{children}</Container>
    </div>
  );
};

export default CartPageWrapper;
