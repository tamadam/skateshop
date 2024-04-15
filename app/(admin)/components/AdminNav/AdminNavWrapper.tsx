"use client";

import { PropsWithChildren } from "react";
import { AdminNavProvider } from "./AdminNavContext";

const AdminNavWrapper = ({ children }: PropsWithChildren) => {
  return <AdminNavProvider>{children}</AdminNavProvider>;
};

export default AdminNavWrapper;
