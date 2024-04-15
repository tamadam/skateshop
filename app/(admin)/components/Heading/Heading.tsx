import React from "react";
import AdminActionButton from "../AdminActionButton";
import styles from "./Heading.module.css";

interface HeadingProps {
  title: string;
  description: string;
}

const Heading = ({ title, description }: HeadingProps) => {
  return (
    <div className={`${styles.headingWrapper} ${styles.headingProps}`}>
      <div className={styles.headingTitleContainer}>
        <h1 className={styles.headingTitle}>{title}</h1>
        <span className={styles.headingDescription}>{description}</span>
      </div>
      <div className={`${styles.headingProps}`}>
        <AdminActionButton />
      </div>
    </div>
  );
};

export default Heading;
