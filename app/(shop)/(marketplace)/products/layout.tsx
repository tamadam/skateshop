import { PropsWithChildren } from "react";
import SidebarWrapper from "@/app/providers/Sidebar/SidebarWrapper";

export default function ProductsLayout({ children }: PropsWithChildren) {
  return <SidebarWrapper>{children}</SidebarWrapper>;
}
