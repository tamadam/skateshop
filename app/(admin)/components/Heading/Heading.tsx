"use client";

import Button from "@/app/components/Button/Button";
import styles from "./Heading.module.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSidebar } from "@/app/providers/Sidebar/SidebarContext";

interface HeadingProps {
  title: string;
  description: string;
  showSidebarButton?: boolean;
}

const Heading = ({
  title,
  description,
  showSidebarButton = true,
}: HeadingProps) => {
  const { toggleOpen } = useSidebar();

  return (
    <div className={`${styles.headingWrapper} ${styles.headingFontSize}`}>
      <div>
        <h1 className={styles.headingTitle}>{title}</h1>
        <span className={styles.headingDescription}>{description}</span>
      </div>
      {showSidebarButton && (
        <div>
          <Button
            Icon={GiHamburgerMenu}
            onClick={toggleOpen}
            className="desktop--hide"
          />
        </div>
      )}
    </div>
  );
};

export default Heading;
