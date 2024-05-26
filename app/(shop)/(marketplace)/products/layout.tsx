import { PropsWithChildren } from "react";
import SidebarWrapper from "@/app/providers/Sidebar/SidebarWrapper";
import ProductSortWrapper from "@/app/providers/ProductSort/ProductSortWrapper";

export default function ProductsLayout({ children }: PropsWithChildren) {
  return (
    <SidebarWrapper>
      <ProductSortWrapper>{children}</ProductSortWrapper>
    </SidebarWrapper>
  );
}
