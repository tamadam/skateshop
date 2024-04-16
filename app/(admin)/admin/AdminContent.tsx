"use client";

import React, { PropsWithChildren } from "react";
import AdminNav from "../components/AdminNav/AdminNav";
import Overlay from "@/app/components/Overlay/Overlay";
import styles from "./AdminContent.module.css";
import { useAdminNav } from "../components/AdminNav/AdminNavContext";

const AdminContent = ({ children }: PropsWithChildren) => {
  const { isOpen, setOpen } = useAdminNav();

  return (
    <div className={styles.adminContentWrapper}>
      <AdminNav />
      <Overlay open={isOpen} onClick={() => setOpen(false)} />
      <div className={styles.adminContent}>{children}</div>
    </div>
  );
};

export default AdminContent;
