import { PropsWithChildren } from "react";
import styles from "./AdminTable.module.css";

const AdminTable = ({ children }: PropsWithChildren) => {
  return <div className={styles.assetsTable}>{children}</div>;
};

export default AdminTable;
