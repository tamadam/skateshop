import { PropsWithChildren } from "react";
import styles from "./OrdersWrapper.module.css";

const OrdersWrapper = ({ children }: PropsWithChildren) => {
  return <div className={styles.ordersWrapper}>{children}</div>;
};

export default OrdersWrapper;
