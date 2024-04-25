import { UseFormRegister, UseFormResetField } from "react-hook-form";
import ImageUpload from "../../ImageUpload/ImageUpload";
import styles from "./AdminFormInput.module.css";

interface AdminFormImageInputProps {
  id: string;
  label: string;
  imageUrl: string | null | undefined;
  originalImage: string | null;
  onOriginalImageChange: () => void;
  disabled?: boolean;
  required?: boolean;
  errorMessage?: string;
  register: UseFormRegister<any>;
  resetField: UseFormResetField<any>;
}

const AdminFormImageInput = ({
  id,
  label,
  imageUrl,
  originalImage,
  onOriginalImageChange,
  disabled = false,
  required = false,
  errorMessage = "",
  register,
  resetField,
}: AdminFormImageInputProps) => {
  const inputFieldLabel = [
    styles.inputFieldLabel,
    required && styles.labelRequired,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.inputField}>
      <div className={styles.inputFieldImageInput}>
        <ImageUpload
          id={id}
          label={label}
          classNameForLabel={inputFieldLabel}
          classNameForInput={styles.inputFieldInput}
          imageUrl={imageUrl}
          resetField={resetField}
          register={register}
          disabled={disabled}
          originalImage={originalImage}
          onOriginalImageChange={onOriginalImageChange}
        />
      </div>
      {errorMessage && (
        <p className={styles.validationErrorMessage}>{errorMessage}</p>
      )}
    </div>
  );
};

export default AdminFormImageInput;
