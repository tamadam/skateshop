import { PropsWithChildren, ReactNode } from "react";
import styles from "./AdminForm.module.css";

interface AdminFormProps {
  children: ReactNode;
  onSubmit: () => void;
}

const AdminForm = ({ children, onSubmit }: AdminFormProps) => {
  return (
    <form onSubmit={onSubmit} className={styles.formWrapper}>
      {children}
    </form>
  );
};

export default AdminForm;
