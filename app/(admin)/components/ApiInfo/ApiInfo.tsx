"use client";

import Button from "@/app/components/Button/Button";
import styles from "./ApiInfo.module.css";
import { FiServer } from "react-icons/fi";
import { MdContentCopy } from "react-icons/md";

interface ApiInfoProps {
  title: string;
  description: string;
  variant: "Public" | "Admin";
}

const ApiInfo = ({ title, description, variant }: ApiInfoProps) => {
  const copyLink = () => {
    navigator.clipboard.writeText(description);
  };

  return (
    <div className={styles.apiInfoWrapper}>
      <div className={styles.apiInfoContent}>
        <FiServer />
        <div className={styles.apiInfoTitleWrapper}>
          <div>
            <span className={styles.apiInfoTitle}>{title}</span>
            <span className={styles[variant]}>{variant}</span>
          </div>

          <p className={styles.apiInfoDescription}>{description}</p>
        </div>
      </div>

      <div className={styles.apiInfoCopy}>
        <Button Icon={MdContentCopy} onClick={copyLink} />
      </div>
    </div>
  );
};

export default ApiInfo;
