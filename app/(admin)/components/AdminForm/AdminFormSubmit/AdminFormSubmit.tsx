"use client";

import Button from "@/app/components/Button/Button";
import styles from "./AdminFormSubmit.module.css";
import Spinner from "@/app/components/Spinner/Spinner";

interface AdminFormSubmit {
  submitLabel: string;
  cancelLabel: string;
  isSubmitting: boolean;
  onCancel: () => void;
}

const AdminFormSubmit = ({
  submitLabel,
  cancelLabel,
  isSubmitting,
  onCancel,
}: AdminFormSubmit) => {
  return (
    <div className={styles.formActionButtons}>
      <Button type="submit" variant="primary" disabled={isSubmitting}>
        {submitLabel} {isSubmitting && <Spinner />}
      </Button>
      <Button
        type="button"
        variant="cancel"
        disabled={isSubmitting}
        onClick={onCancel}
      >
        <span>{cancelLabel}</span>
      </Button>
    </div>
  );
};

export default AdminFormSubmit;
