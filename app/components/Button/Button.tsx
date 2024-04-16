"use client";

import { IconType } from "react-icons";
import styles from "./Button.module.css";
import { ReactNode } from "react";

interface ButtonProps {
  type?: "submit" | "reset" | "button" | undefined;
  variant?: "primary" | "update" | "delete" | "cancel" | "default";
  disabled?: boolean;
  iconFirst?: boolean;
  iconSize?: string;
  children?: ReactNode;
  className?: string;
  Icon?: IconType;
  onClick?: () => void;
}

const Button = ({
  type = "button",
  variant = "default",
  disabled = false,
  iconFirst = false,
  iconSize = "1em",
  className,
  children,
  Icon,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`${styles.generalButton} ${styles[variant]} ${
        iconFirst ? styles.reverse : styles.normal
      } ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span>{children}</span>
      {Icon && <Icon size={iconSize} />}
    </button>
  );
};

export default Button;
