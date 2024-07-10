"use client";

import Overlay from "@/app/components/Overlay/Overlay";
import { useSidebar } from "@/app/providers/Sidebar/SidebarContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "./ProductsNav.module.css";
import { ProductNavInfo } from "@/app/(shop)/types";
import NavItem from "./NavItem";
import { Libre_Franklin } from "next/font/google";
import {
  BRAND_SEARCH_PARAM,
  CATEGORY_PRODUCTS_SEARCH_PARAM,
  COLOR_SEARCH_PARAM,
  SIZE_SEARCH_PARAM,
} from "@/app/constants";
import Button from "@/app/components/Button/Button";

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
  const router = useRouter();

  useEffect(() => {
    setOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const menuItems: {
    label: string;
    items: {
      id: string;
      name: string;
    }[];
    searchParam:
      | typeof BRAND_SEARCH_PARAM
      | typeof CATEGORY_PRODUCTS_SEARCH_PARAM
      | typeof SIZE_SEARCH_PARAM
      | typeof COLOR_SEARCH_PARAM;
    filter: boolean;
  }[] = [
    {
      label: "Subcategories",
      items: [
        ...data.subCategories.map((category) => ({
          id: category.id,
          name: category.name,
        })),
      ],
      searchParam: CATEGORY_PRODUCTS_SEARCH_PARAM,
      filter: false,
    },
    {
      label: "Brands",
      items: [
        ...removeDuplicates(
          data.brands.map((info) => ({
            id: info.id,
            name: info.name,
          }))
        ),
      ],
      searchParam: BRAND_SEARCH_PARAM,
      filter: true,
    },
    {
      label: "Sizes",
      items: [
        ...removeDuplicates(
          data.sizes.map((info) => ({
            id: info.id,
            name: info.name,
          }))
        ),
      ],
      searchParam: SIZE_SEARCH_PARAM,
      filter: true,
    },
    {
      label: "Colors",
      items: [
        ...removeDuplicates(
          data.colors.map((info) => ({
            id: info?.id || "",
            name: info?.name || "",
          }))
        ),
      ],
      searchParam: COLOR_SEARCH_PARAM,
      filter: true,
    },
  ];

  // check if there is available menu item
  const isMenuItemAvailable =
    menuItems.filter((menuItem) => menuItem.items.length !== 0).length !== 0;

  console.log(isMenuItemAvailable);

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
        {isMenuItemAvailable ? (
          menuItems.map((menuItem, index) => {
            return (
              menuItem.items.length !== 0 && (
                <NavItem
                  key={menuItem.label}
                  searchParam={menuItem.searchParam}
                  open={index === 0 ? true : false}
                  label={menuItem.label}
                  data={menuItem.items}
                  filter={menuItem.filter}
                />
              )
            );
          })
        ) : (
          <Button variant="primary" onClick={() => router.push("/marketplace")}>
            <span>Go back to Marketplace</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductsNav;
