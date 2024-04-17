"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./AdminNav.module.css";
import { useEffect } from "react";
import { RiAdvertisementLine, RiNumbersFill } from "react-icons/ri";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { GiSkateboard } from "react-icons/gi";
import { MdNumbers } from "react-icons/md";
import { IoColorPaletteOutline } from "react-icons/io5";
import { TbBrandDatabricks } from "react-icons/tb";

import { useAdminNav } from "./AdminNavContext";
import Overlay from "@/app/components/Overlay/Overlay";

const AdminNav = () => {
  const pathname = usePathname();
  const { isOpen, setOpen } = useAdminNav();

  useEffect(() => {
    setOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const routes = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: RiNumbersFill,
      active: pathname === "/admin",
    },
    {
      label: "Billboards",
      href: "/admin/billboards",
      icon: RiAdvertisementLine,
      active: pathname === "/admin/billboards",
    },
    {
      label: "Categories",
      href: "/admin/categories",
      icon: BiSolidCategoryAlt,
      active: pathname === "/admin/categories",
    },
    {
      label: "Sizes",
      href: "/admin/sizes",
      icon: MdNumbers,
      active: pathname === "/admin/sizes",
    },
    {
      label: "Colors",
      href: "/admin/colors",
      icon: IoColorPaletteOutline,
      active: pathname === "/admin/colors",
    },
    {
      label: "Brands",
      href: "/admin/brands",
      icon: TbBrandDatabricks,
      active: pathname === "/admin/brands",
    },
    {
      label: "Products",
      href: "/admin/products",
      icon: GiSkateboard,
      active: pathname === "/admin/products",
    },
  ];

  return (
    <>
      <Overlay open={isOpen} onClick={() => setOpen(false)} hideOnDesktop />
      <div
        className={`${styles.adminSidebarWrapper} ${isOpen ? styles.open : ""}`}
      >
        <div className={styles.adminSidebarTitleContainer}>
          <span className={styles.adminSidebarTitle}>Admin</span>
        </div>
        <ul>
          {routes.map((route) => {
            return (
              <li
                key={route.href}
                className={`${styles.adminNavItem}${
                  route.active ? ` ${styles.active}` : ""
                }`}
              >
                <Link href={route.href}>
                  <span className={styles.adminNavLabel}>{route.label}</span>
                  <span>{<route.icon />}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default AdminNav;
