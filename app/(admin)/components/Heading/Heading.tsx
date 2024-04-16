"use client";

import Button from "@/app/components/Button/Button";
import styles from "./Heading.module.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { useAdminNav } from "../AdminNav/AdminNavContext";

interface HeadingProps {
  title: string;
  description: string;
}

const Heading = ({ title, description }: HeadingProps) => {
  const { toggleOpen } = useAdminNav();

  return (
    <div className={`${styles.headingWrapper} ${styles.headingFontSize}`}>
      <div>
        <h1 className={styles.headingTitle}>{title}</h1>
        <span className={styles.headingDescription}>{description}</span>
      </div>
      <div>
        <Button
          Icon={GiHamburgerMenu}
          onClick={toggleOpen}
          className="desktop--hide"
        />
      </div>
    </div>
  );
};

export default Heading;
