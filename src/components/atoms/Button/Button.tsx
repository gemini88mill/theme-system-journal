import { useCallback } from "react";
import css from "./Button.module.css";
import { ButtonVariant, ButtonSize, ButtonType } from "./Button.types";
import type {
  ButtonVariantType,
  ButtonSizeType,
  ButtonTypeType,
} from "./Button.types";

// Re-export constants for convenience
export { ButtonVariant, ButtonSize, ButtonType };

interface ButtonProps {
  className?: string;
  styles?: React.CSSProperties;
  children: React.ReactNode;
  variant?: ButtonVariantType;
  size?: ButtonSizeType;
  disabled?: boolean;
  type?: ButtonTypeType;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

export const Button = ({
  className = "",
  styles,
  children,
  variant = ButtonVariant.PRIMARY,
  size = ButtonSize.MEDIUM,
  disabled = false,
  type = ButtonType.BUTTON,
  onClick,
  onFocus,
  onBlur,
  ariaLabel,
  ariaDescribedBy,
}: ButtonProps) => {
  // Memoized callback for handling click events
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled) {
        onClick?.(event);
      }
    },
    [onClick, disabled]
  );

  // Memoized callback for handling focus events
  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLButtonElement>) => {
      onFocus?.(event);
    },
    [onFocus]
  );

  // Memoized callback for handling blur events
  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLButtonElement>) => {
      onBlur?.(event);
    },
    [onBlur]
  );

  // Build CSS classes based on variant and size
  const buttonClasses = [
    css.button,
    css[variant],
    css[size],
    disabled ? css.disabled : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={buttonClasses}
      style={styles}
      disabled={disabled}
      onClick={handleClick}
      onFocus={handleFocus}
      onBlur={handleBlur}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
    >
      {children}
    </button>
  );
};
