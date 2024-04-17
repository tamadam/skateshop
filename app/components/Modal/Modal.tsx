import React, { useEffect, useRef } from "react";
import styles from "./Modal.module.css";
import Button, { ButtonVariant } from "../Button/Button";
import Spinner from "../Spinner/Spinner";

interface ModalProps {
  open: boolean;
  title: string;
  description?: string;
  actionVariant?: ButtonVariant;
  cancelVariant?: ButtonVariant;
  actionLabel?: string;
  cancelLabel?: string;
  isActionLoading?: boolean;
  onAction: () => void;
  onCancel: () => void;
}

const Modal = ({
  title,
  description,
  open,
  actionVariant = "primary",
  cancelVariant = "cancel",
  actionLabel = "Submit",
  cancelLabel = "Cancel",
  isActionLoading,
  onAction,
  onCancel,
}: ModalProps) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (open) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [open]);

  return (
    <dialog
      ref={modalRef}
      onCancel={onCancel}
      className={styles.modalWrapper}
      onClick={(e) => {
        const dialogDimensions = modalRef.current?.getBoundingClientRect();
        if (
          dialogDimensions &&
          !isActionLoading &&
          (e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom)
        ) {
          onCancel();
        }
      }}
    >
      <div className={styles.modalContent}>
        <h1>{title}</h1>
        <span>{description}</span>
        <div className={styles.modalAction}>
          <Button
            variant={actionVariant}
            onClick={onAction}
            disabled={isActionLoading}
          >
            <span className={styles.modalActionLabel}>
              {actionLabel} {isActionLoading && <Spinner />}
            </span>
          </Button>
          <Button
            variant={cancelVariant}
            onClick={onCancel}
            disabled={isActionLoading}
          >
            <span className={styles.modalActionLabel}>{cancelLabel}</span>
          </Button>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
