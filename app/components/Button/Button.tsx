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
  shape?: "square" | "circle" | "normal";
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
  shape = "normal",
  className,
  children,
  Icon,
  onClick,
}: ButtonProps) => {
  const buttonStyles = [
    styles.generalButton,
    styles[variant],
    iconFirst && styles.reverse,
    className && className,
    shape === "square" && styles.square,
    shape === "circle" && styles.circle,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={buttonStyles}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
      {Icon && <Icon size={iconSize} />}
    </button>
  );
};

export default Button;
