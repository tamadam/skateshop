import { ReactNode } from "react";
import styles from "./Container.module.css";

interface ContainerProps {
  children?: ReactNode | undefined;
  includeSidebar?: boolean;
}

const Container = ({
  children = undefined,
  includeSidebar = false,
}: ContainerProps) => {
  return (
    <div
      className={[
        styles.containerBase,
        includeSidebar ? styles.containerWithSidebar : styles.containerSingle,
      ].join(" ")}
    >
      {children}
    </div>
  );
};

export default Container;
