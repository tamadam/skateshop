"use client";

import { MdAccountBox } from "react-icons/md";

import styles from "./MyAccount.module.css";
import { useEffect, useRef, useState } from "react";
import SignOut from "@/app/(auth)/components/SignOut";
import Link from "next/link";

interface MyAccountProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const MyAccount = ({ isAuthenticated, isAdmin }: MyAccountProps) => {
  const [isDropdownOpen, setDropdownOpen] = useState<Boolean>(false);
  const myAccountRef = useRef<HTMLDivElement>(null);

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        myAccountRef.current &&
        !myAccountRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      console.log("Cleanup");
    };
  }, [myAccountRef]);

  const routes = isAuthenticated
    ? [
        ...(isAdmin ? [{ href: "/admin", label: "Admin" }] : []),
        { href: "#", label: "Logout", signOut: true },
      ]
    : [
        { href: "/login", label: "Login" },
        { href: "/register", label: "Register" },
      ];

  return (
    <div className={styles.myAccountWrapper} ref={myAccountRef}>
      <div
        className={styles.myAccountIcon}
        onClick={() => setDropdownOpen((prev) => !prev)}
      >
        <MdAccountBox size="2em" />
      </div>
      {isDropdownOpen && (
        <div className={styles.myAccountDropdown}>
          {routes.map((route) =>
            route.signOut ? (
              <SignOut key={route.label} className={styles.dropdownItem} />
            ) : (
              <Link
                key={route.label}
                href={route.href}
                className={styles.dropdownItem}
                onClick={closeDropdown}
              >
                {route.label}
              </Link>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default MyAccount;
