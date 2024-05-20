"use client";

import Overlay from "@/app/components/Overlay/Overlay";
import { useSidebar } from "@/app/providers/Sidebar/SidebarContext";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import styles from "./ProductsNav.module.css";

const ProductsNav = () => {
  const pathname = usePathname();
  const { isOpen, setOpen } = useSidebar();

  useEffect(() => {
    setOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div>
      <Overlay open={isOpen} onClick={() => setOpen(false)} hideOnDesktop />
      <div
        className={[styles.productsSidebarWrapper, isOpen && styles.open]
          .filter(Boolean)
          .join(" ")}
      >
        <div>Item</div>
        <div>Item</div>
        <div>Item</div>
        <div>Item</div>
        <div>Item</div>
      </div>
    </div>
  );
};

export default ProductsNav;
