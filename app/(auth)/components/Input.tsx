import { UseFormRegister } from "react-hook-form";
import styles from "./AuthStyles.module.css";

interface InputProps {
  id: "firstName" | "lastName" | "email" | "password" | "confirmPassword";
  label: string;
  type?: string;
  disabled?: boolean;
  placeholder?: string;
  required?: boolean;
  register: UseFormRegister<any>;
  errorMessage?: string;
}

const Input = ({
  id,
  label,
  type = "text",
  disabled,
  placeholder = "",
  required = false,
  register,
  errorMessage,
}: InputProps) => {
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
      <input
        autoComplete="off"
        id={id}
        disabled={disabled}
        {...register(id)}
        placeholder={placeholder}
        type={type}
        className={styles.inputFieldInput}
      />

      {errorMessage && (
        <p className={styles.validationErrorMessage}>{errorMessage}</p>
      )}
    </div>
  );
};

export default Input;
