"use client";

import { useRouter } from "next/navigation";
import styles from "./AdminAssetButton.module.css";

interface AdminAssetButtonProps {
  type: "new" | "update" | "delete";
  label: string;
  onClick: () => void;
}

const AdminAssetButton = ({ type, label, onClick }: AdminAssetButtonProps) => {
  const router = useRouter();

  return (
    <button
      onClick={onClick}
      className={`${styles.assetButton} ${styles[type]}`}
    >
      {label}
    </button>
  );
};

export default AdminAssetButton;
