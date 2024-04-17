"use client";

import styles from "./Overlay.module.css";

interface OverlayProps {
  open: boolean;
  onClick?: () => void;
  hideOnDesktop?: boolean;
}

const Overlay = ({
  open,
  onClick = () => {},
  hideOnDesktop = false,
}: OverlayProps) => {
  return (
    <div
      className={`${styles.generalOverlay} ${open ? styles.open : ""} ${
        hideOnDesktop ? "desktop--hide" : ""
      }`}
      onClick={onClick}
    ></div>
  );
};

export default Overlay;
