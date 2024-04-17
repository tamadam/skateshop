"use client";

import Button from "@/app/components/Button/Button";
import styles from "./ApiInfo.module.css";
import { FiServer } from "react-icons/fi";
import { MdContentCopy } from "react-icons/md";
import toast from "react-hot-toast";
import { Roboto_Slab } from "next/font/google";

const robotoSlab = Roboto_Slab({ subsets: ["latin"] });

interface ApiInfoProps {
  title: string;
  description: string;
  variant: "Public" | "Admin";
}

const ApiInfo = ({ title, description, variant }: ApiInfoProps) => {
  const copyLink = () => {
    navigator.clipboard.writeText(description);
    toast.success("API route copied to the clipboard!");
  };

  return (
    <div className={styles.apiInfoWrapper}>
      <div className={styles.apiInfoContent}>
        <FiServer />
        <div className={styles.apiInfoTitleWrapper}>
          <div>
            <span className={styles.apiInfoTitle}>{title}</span>
            <span className={`${styles.badge} ${styles[variant]}`}>
              {variant}
            </span>
          </div>

          <p className={`${styles.apiInfoDescription} ${robotoSlab.className}`}>
            {description}
          </p>
        </div>
      </div>

      <div className={styles.apiInfoCopy}>
        <Button Icon={MdContentCopy} onClick={copyLink} />
      </div>
    </div>
  );
};

export default ApiInfo;
