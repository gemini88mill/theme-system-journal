import css from "./InputField.module.css";

interface InputFieldProps {
  className?: string;
  styles?: React.CSSProperties;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  disabled?: boolean;
  required?: boolean;
  autoComplete?: string;
}

export const InputField = ({
  className = "",
  styles,
  placeholder,
  value,
  onChange,
  type = "text",
  disabled = false,
  required = false,
  autoComplete,
}: InputFieldProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  return (
    <input
      type={type}
      className={`${css.inputField} ${className}`.trim()}
      style={styles}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      disabled={disabled}
      required={required}
      autoComplete={autoComplete}
    />
  );
};
