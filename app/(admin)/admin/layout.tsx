import { PropsWithChildren } from "react";

import AdminNavWrapper from "../components/AdminNav/AdminNavWrapper";
import AdminContent from "./AdminContent";

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <AdminNavWrapper>
      <div className="w-[100%] bg-white">
        <AdminContent>{children}</AdminContent>
      </div>
    </AdminNavWrapper>
  );
}
