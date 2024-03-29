import { UseFormRegister } from "react-hook-form";

interface InputProps {
  id: "firstName" | "lastName" | "email" | "password" | "confirmPassword";
  label: string;
  type?: string;
  disabled?: boolean;
  placeholder?: string;
  register: UseFormRegister<any>;
  errorMessage?: string;
}

const Input = ({
  id,
  label,
  type = "text",
  disabled,
  placeholder = "",
  register,
  errorMessage,
}: InputProps) => {
  return (
    <div>
      <input
        autoComplete="off"
        id={id}
        disabled={disabled}
        {...register(id)}
        placeholder={placeholder}
        type={type}
      />
      <label htmlFor={id}>{label}</label>
      {errorMessage && errorMessage}
    </div>
  );
};

export default Input;
