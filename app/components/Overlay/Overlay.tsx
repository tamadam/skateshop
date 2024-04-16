"use client";

import { useAdminNav } from "@/app/(admin)/components/AdminNav/AdminNavContext";
import styles from "./Overlay.module.css";

interface OverlayProps {
  open: boolean;
  onClick: () => void;
}

const Overlay = ({ open, onClick }: OverlayProps) => {
  return (
    <div
      className={`${styles.generalOverlay} ${
        open ? styles.open : ""
      } desktop--hide`}
      onClick={onClick}
    ></div>
  );
};

export default Overlay;
