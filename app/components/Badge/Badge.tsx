import { capitalize } from "@/lib/capitalize";
import styles from "./Badge.module.css";

export type BadgeVariantType = "public" | "admin" | "default";
export type BadgeSizeType = "small" | "medium" | "large";
export type BadgeWeightType = "bold" | "semibold" | "normal";

interface BadgeProps {
  label: string;
  variant: BadgeVariantType;
  size?: BadgeSizeType;
  weight?: BadgeWeightType;
}

const Badge = ({
  label,
  variant,
  size = "small",
  weight = "normal",
}: BadgeProps) => {
  return (
    <span
      className={`${styles.badge} ${styles[variant]} ${styles[size]} ${styles[weight]}`}
    >
      {capitalize(label)}
    </span>
  );
};

export default Badge;
