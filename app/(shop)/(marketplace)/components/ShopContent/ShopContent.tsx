import { PropsWithChildren } from "react";
import styles from "./ShopContent.module.css";

const ShopContent = ({ children }: PropsWithChildren) => {
  return <div className={styles.shopContentWrapper}>{children}</div>;
};

export default ShopContent;
