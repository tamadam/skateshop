"use client";

import { IconType } from "react-icons";
import { ReactNode } from "react";
import styles from "./Button.module.css";

export type ButtonVariant =
  | "primary"
  | "secondary"
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
  shape?: "square" | "circle" | "normal" | "original";
  colorInvert?: boolean;
  tooltip?: string;
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
  colorInvert = false,
  tooltip = "",
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
    styles[shape],
    colorInvert && styles.invert,
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
      {tooltip && (
        <span className={styles.generalButtonTooltip}>{tooltip}</span>
      )}
    </button>
  );
};

export default Button;
