import { PropsWithChildren } from "react";
import AdminNav from "../AdminNav/AdminNav";
import styles from "./AdminContent.module.css";

const AdminContent = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.adminContentWrapper}>
      <AdminNav />
      <div className={styles.adminContent}>{children}</div>
    </div>
  );
};

export default AdminContent;
