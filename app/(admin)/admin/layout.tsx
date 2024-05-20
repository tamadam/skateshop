import { PropsWithChildren } from "react";
import SidebarWrapper from "@/app/providers/Sidebar/SidebarWrapper";
import AdminContent from "../components/AdminContent/AdminContent";
import styles from "./AdminLayout.module.css";

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <SidebarWrapper>
      <div className={styles.adminContentMainWrapper}>
        <AdminContent>{children}</AdminContent>
      </div>
    </SidebarWrapper>
  );
}
