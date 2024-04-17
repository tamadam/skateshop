import React, { PropsWithChildren } from "react";
import AdminNav from "../AdminNav/AdminNav";
import Overlay from "@/app/components/Overlay/Overlay";
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
