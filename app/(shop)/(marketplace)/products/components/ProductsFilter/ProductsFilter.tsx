"use client";

import Button from "@/app/components/Button/Button";
import { useSidebar } from "@/app/providers/Sidebar/SidebarContext";

const ProductsFilter = () => {
  const { toggleOpen } = useSidebar();

  return (
    <div style={{width: "fit-content", marginLeft: "auto"}}>
      <Button onClick={toggleOpen} className="desktop--hide">
        Sidebar
      </Button>
    </div>
  );
};

export default ProductsFilter;
