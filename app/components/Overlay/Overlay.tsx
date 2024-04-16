"use client";

import { useAdminNav } from "@/app/(admin)/components/AdminNav/AdminNavContext";
import styles from "./Overlay.module.css";

const Overlay = () => {
  const { isOpen, setOpen } = useAdminNav();

  return (
    <div
      className={`${styles.generalOverlay} ${
        isOpen ? styles.open : ""
      } desktop--hide`}
      onClick={() => setOpen(false)}
    ></div>
  );
};

export default Overlay;
