"use client";

import { useRouter } from "next/navigation";
import styles from "./AdminAssetButton.module.css";

interface AdminAssetButtonProps {
  type: "new" | "update" | "delete";
  label: string;
  route: string;
}

const AdminAssetButton = ({ type, label, route }: AdminAssetButtonProps) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(route)}
      className={`${styles.assetButton} ${styles[type]}`}
    >
      {label}
    </button>
  );
};

export default AdminAssetButton;
