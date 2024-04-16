import { PropsWithChildren } from "react";

import AdminNavWrapper from "../components/AdminNav/AdminNavWrapper";
import AdminContent from "./AdminContent";
import styles from "../components/AdminDefault.module.css";

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <AdminNavWrapper>
      <div className={styles.adminContentMainWrapper}>
        <AdminContent>{children}</AdminContent>
      </div>
    </AdminNavWrapper>
  );
}
