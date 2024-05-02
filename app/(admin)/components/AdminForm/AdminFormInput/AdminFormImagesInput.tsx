import {
  UseFormClearErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormResetField,
  UseFormSetValue,
} from "react-hook-form";
import ImageUpload from "../../ImageUpload/ImageUpload";
import styles from "./AdminFormInput.module.css";
import ImagesUpload from "../../ImageUpload/ImagesUpload";

interface AdminFormImagesInputProps {
  id: string;
  label: string;
  imageUrls: string[];
  originalImages: string[];
  onOriginalImagesChange: (removedImage: string) => void;
  disabled?: boolean;
  required?: boolean;
  errorMessage?: string;
  register: UseFormRegister<any>;
  resetField: UseFormResetField<any>;
  getValues: UseFormGetValues<any>;
  setValue: UseFormSetValue<any>;
  clearErrors: UseFormClearErrors<any>;
}

const AdminFormImagesInput = ({
  id,
  label,
  imageUrls,
  originalImages,
  onOriginalImagesChange,
  disabled = false,
  required = false,
  errorMessage = "",
  register,
  resetField,
  getValues,
  setValue,
  clearErrors,
}: AdminFormImagesInputProps) => {
  const inputFieldLabel = [
    styles.inputFieldLabel,
    required && styles.labelRequired,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.inputField}>
      <div className={styles.inputFieldImageInput}>
        <ImagesUpload
          id={id}
          label={label}
          classNameForLabel={inputFieldLabel}
          classNameForInput={styles.inputFieldInput}
          imageUrls={imageUrls}
          resetField={resetField}
          register={register}
          getValues={getValues}
          setValue={setValue}
          clearErrors={clearErrors}
          disabled={disabled}
          originalImages={originalImages}
          onOriginalImagesChange={onOriginalImagesChange}
        />
      </div>
      {errorMessage && (
        <p className={styles.validationErrorMessage}>{errorMessage}</p>
      )}
    </div>
  );
};

export default AdminFormImagesInput;
