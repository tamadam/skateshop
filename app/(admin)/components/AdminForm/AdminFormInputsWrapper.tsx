import { ReactNode } from "react";
import styles from "./AdminForm.module.css";

interface AdminFormInputsWrapperProps {
  singleColumn?: boolean;
  multiplieColumn?: boolean;
  children: ReactNode;
}

const AdminFormInputsWrapper = ({
  singleColumn = false,
  multiplieColumn = false,
  children,
}: AdminFormInputsWrapperProps) => {
  const inputsWrapperStyles = [
    styles.inputFieldsWrapper,
    singleColumn && styles.singleColumn,
    multiplieColumn && styles.multiplieColumn,
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={inputsWrapperStyles}>{children}</div>;
};

export default AdminFormInputsWrapper;
