import { PropsWithChildren } from "react";
import AdminNavWrapper from "../components/AdminNav/AdminNavWrapper";
import AdminContent from "../components/AdminContent/AdminContent";
import styles from "./AdminLayout.module.css";

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <AdminNavWrapper>
      <div className={styles.adminContentMainWrapper}>
        <AdminContent>{children}</AdminContent>
      </div>
    </AdminNavWrapper>
  );
}
