"use client";

import Overlay from "@/app/components/Overlay/Overlay";
import { useSidebar } from "@/app/providers/Sidebar/SidebarContext";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import styles from "./ProductsNav.module.css";
import { ProductNavInfo } from "@/app/(shop)/types";
import NavItem from "./NavItem";
import { Libre_Franklin } from "next/font/google";

const libre = Libre_Franklin({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const removeDuplicates = (productInfo: { id: string; name: string }[]) => {
  return Array.from(
    new Set(
      productInfo
        .filter((info) => info.id !== "" && info.name != "")
        .map((info) =>
          JSON.stringify({
            id: info.id,
            name: info.name,
          })
        )
    )
  ).map((item) => JSON.parse(item));
};

interface ProductsNavProps {
  data: ProductNavInfo;
}

const ProductsNav = ({ data }: ProductsNavProps) => {
  const pathname = usePathname();
  const { isOpen, setOpen } = useSidebar();

  useEffect(() => {
    setOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const menuItems: { label: string; items: { id: string; name: string }[] }[] =
    [
      {
        label: "Subcategories",
        items: [
          ...data.subCategories.map((category) => ({
            id: category.id,
            name: category.name,
          })),
        ],
      },
      {
        label: "Brands",
        items: [
          ...removeDuplicates(
            data.productInfo.map((info) => ({
              id: info.brand.id,
              name: info.brand.name,
            }))
          ),
        ],
      },
      {
        label: "Sizes",
        items: [
          ...removeDuplicates(
            data.productInfo.map((product) => ({
              id: product.size.id,
              name: product.size.name,
            }))
          ),
        ],
      },
      {
        label: "Colors",
        items: [
          ...removeDuplicates(
            data.productInfo.map((product) => ({
              id: product.color?.id || "",
              name: product.color?.name || "",
            }))
          ),
        ],
      },
    ];

  return (
    <div>
      <Overlay open={isOpen} onClick={() => setOpen(false)} hideOnDesktop />
      <div
        className={[
          styles.productsSidebarWrapper,
          isOpen && styles.open,
          libre.className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {menuItems.map((menuItem) => {
          return (
            menuItem.items.length !== 0 && (
              <NavItem
                key={menuItem.label}
                label={menuItem.label}
                data={menuItem.items}
              />
            )
          );
        })}
      </div>
    </div>
  );
};

export default ProductsNav;
