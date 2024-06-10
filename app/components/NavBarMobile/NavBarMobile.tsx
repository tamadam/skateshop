"use client";

import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import styles from "./NavBarMobile.module.css";
import { Libre_Franklin } from "next/font/google";
import { useState } from "react";
import SignOut from "@/app/(auth)/components/SignOut";
import Link from "next/link";
import { useCart } from "@/app/providers/Cart/CartContext";

const libre = Libre_Franklin({ subsets: ["latin"] });

interface NavBarMobileProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  routes: { href: string; label: string }[];
}

const NavBarMobile = ({
  isAuthenticated,
  isAdmin,
  routes,
}: NavBarMobileProps) => {
  const [isOpen, setOpen] = useState<Boolean>(false);
  const { allQuantity } = useCart();

  const mobileExtendedRoutes = isAuthenticated
    ? [
        ...(isAdmin ? [{ href: "/admin", label: "Admin" }] : []),
        {
          href: "/cart",
          label: `Cart (${allQuantity > 9 ? "9+" : allQuantity})`,
        },
        { href: "#", label: "Logout", signOut: true },
      ]
    : [
        { href: "/login", label: "Login" },
        { href: "/register", label: "Register" },
      ];

  const finalRoutes: { href: string; label: string; signOut?: boolean }[] = [
    ...routes,
    ...mobileExtendedRoutes,
  ];

  return (
    <div className={`${styles.navbarMobileWrapper} ${libre.className}`}>
      <div className={styles.navbarMobileContent}>
        <div
          className={`${styles.navbarMobileOptionsWrapper} ${
            isOpen ? styles.open : styles.close
          }`}
        >
          <div className={styles.navbarMobileOptions}>
            {finalRoutes.map((route) =>
              route.signOut ? (
                <SignOut
                  key={route.label}
                  className={styles.navbarMobileOption}
                />
              ) : (
                <Link
                  key={route.label}
                  href={route.href}
                  className={styles.navbarMobileOption}
                  onClick={() => setOpen(false)}
                >
                  {route.label}
                </Link>
              )
            )}
          </div>
        </div>

        <div
          className={styles.navbarMobileTitle}
          onClick={() => setOpen((prev) => !prev)}
        >
          {isOpen ? (
            <IoCloseSharp size="1.4em" />
          ) : (
            <>
              <GiHamburgerMenu />
              <h1>Menu</h1>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBarMobile;
