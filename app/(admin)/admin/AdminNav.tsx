"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminNav = () => {
  const pathname = usePathname();
  const routes = [
    {
      label: "Overview",
      href: "/admin",
      active: pathname === "/admin",
    },
    {
      label: "Billboards",
      href: "/admin/billboards",
      active: pathname === "/admin/billboards",
    },
    {
      label: "Categories",
      href: "/admin/categories",
      active: pathname === "/admin/categories",
    },
    {
      label: "Sizes",
      href: "/admin/sizes",
      active: pathname === "/admin/sizes",
    },
    {
      label: "Colors",
      href: "/admin/colors",
      active: pathname === "/admin/colors",
    },
    {
      label: "Brands",
      href: "/admin/brands",
      active: pathname === "/admin/brands",
    },
    {
      label: "Products",
      href: "/admin/products",
      active: pathname === "/admin/products",
    },
  ];

  return (
    <div
      className="
        flex
        flex-col
        flex-wrap
        gap-4
        items-start 
        pb-2
        border-black
        border-solid
        border-0
        border-b
        md:flex-row
        md:items-center"
    >
      <Link
        href="/admin"
        className="
            text-[length:--fs-s]
            text-center
            text-white
            font-bold 
            bg-red-600 
            p-2 
            rounded-lg 
            no-underline"
      >
        Admin Dashboard
      </Link>
      <div className="flex flex-wrap gap-4">
        {routes.map((route) => {
          return (
            <Link
              key={route.href}
              href={route.href}
              className={`no-underline text-black ${
                route.active && "font-extrabold"
              }`}
            >
              {route.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AdminNav;
