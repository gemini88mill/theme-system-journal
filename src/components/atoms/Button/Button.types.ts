export const ButtonVariant = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  OUTLINE: "outline",
  GHOST: "ghost",
  DANGER: "danger",
  SUCCESS: "success",
} as const;

export const ButtonSize = {
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
} as const;

export const ButtonType = {
  BUTTON: "button",
  SUBMIT: "submit",
  RESET: "reset",
} as const;

export type ButtonVariantType =
  (typeof ButtonVariant)[keyof typeof ButtonVariant];
export type ButtonSizeType = (typeof ButtonSize)[keyof typeof ButtonSize];
export type ButtonTypeType = (typeof ButtonType)[keyof typeof ButtonType];
