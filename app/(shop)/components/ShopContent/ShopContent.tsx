import { PropsWithChildren } from "react";
import styles from "./ShopContent.module.css";

const ShopContent = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.shopContentWrapper}>
      <div className={styles.shopContent}>{children}</div>
    </div>
  );
};

export default ShopContent;
