"use client";

import { UseFormRegister } from "react-hook-form";
import styles from "./AdminFormInput.module.css";

type AdminFormInputPropsBase = {
  id: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
  errorMessage?: string;
  placeholder?: string;
  register: UseFormRegister<any>;
};

type AdminFormTextInputProps = AdminFormInputPropsBase & {
  type: "text";
  options?: { value: string; label: string }[];
};

type AdminFormSelectInputProps = AdminFormInputPropsBase & {
  type: "select";
  options: { value: string; label: string }[];
};

type AdminFormInputProps = AdminFormTextInputProps | AdminFormSelectInputProps;

const AdminFormInput = ({
  type,
  id,
  label,
  disabled = false,
  required = false,
  placeholder = "",
  errorMessage = "",
  register,
  options,
}: AdminFormInputProps) => {
  const inputFieldLabel = [
    styles.inputFieldLabel,
    required && styles.labelRequired,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div>
      <label htmlFor={id} className={inputFieldLabel}>
        {label}
      </label>

      {/* INPUT TEXT */}
      {type === "text" && (
        <input
          autoComplete="off"
          type={type}
          id={id}
          disabled={disabled}
          placeholder={placeholder}
          className={styles.inputFieldInput}
          {...register(id)}
        />
      )}

      {/* INPUT SELECT */}
      {type === "select" && (
        <select
          id={id}
          disabled={disabled}
          className={styles.inputFieldInput}
          {...register(id)}
        >
          {options.map((opt) => {
            return (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            );
          })}
        </select>
      )}

      {errorMessage && (
        <p className={styles.validationErrorMessage}>{errorMessage}</p>
      )}
    </div>
  );
};

export default AdminFormInput;
