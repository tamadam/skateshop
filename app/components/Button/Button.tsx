"use client";

import { IconType } from "react-icons";
import { ReactNode } from "react";
import styles from "./Button.module.css";

export type ButtonVariant =
  | "primary"
  | "update"
  | "delete"
  | "cancel"
  | "default";

interface ButtonProps {
  type?: "submit" | "reset" | "button" | undefined;
  variant?: ButtonVariant;
  disabled?: boolean;
  iconFirst?: boolean;
  iconSize?: string;
  children?: ReactNode;
  className?: string;
  square?: boolean;
  circle?: boolean;
  Icon?: IconType;
  onClick?: (event?: any) => void;
}

const Button = ({
  type = "button",
  variant = "default",
  disabled = false,
  iconFirst = false,
  iconSize = "1em",
  square,
  circle,
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
      } ${className ? className : ""} ${square ? styles.square : ""} ${
        circle ? styles.circle : ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
      {Icon && <Icon size={iconSize} />}
    </button>
  );
};

export default Button;
