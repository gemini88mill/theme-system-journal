import { useCallback } from "react";
import css from "./ButtonGroup.module.css";
import {
  ButtonGroupAlignment,
  ButtonGroupDirection,
  ButtonGroupSpacing,
} from "./ButtonGroup.types";
import type {
  ButtonGroupAlignmentType,
  ButtonGroupDirectionType,
  ButtonGroupSpacingType,
} from "./ButtonGroup.types";

interface ButtonGroupProps {
  className?: string;
  styles?: React.CSSProperties;
  children: React.ReactNode;
  alignment?: ButtonGroupAlignmentType;
  direction?: ButtonGroupDirectionType;
  spacing?: ButtonGroupSpacingType;
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

export const ButtonGroup = ({
  className = "",
  styles,
  children,
  alignment = ButtonGroupAlignment.LEFT,
  direction = ButtonGroupDirection.HORIZONTAL,
  spacing = ButtonGroupSpacing.MEDIUM,
  ariaLabel,
  ariaDescribedBy,
}: ButtonGroupProps) => {
  // Memoized callback for handling keyboard navigation
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      // Allow arrow key navigation between buttons
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        const buttons = event.currentTarget.querySelectorAll("button");
        const currentIndex = Array.from(buttons).indexOf(
          document.activeElement as HTMLButtonElement
        );

        if (currentIndex !== -1) {
          event.preventDefault();
          const nextIndex =
            event.key === "ArrowLeft"
              ? Math.max(0, currentIndex - 1)
              : Math.min(buttons.length - 1, currentIndex + 1);
          buttons[nextIndex]?.focus();
        }
      }
    },
    []
  );

  // Build CSS classes based on props
  const buttonGroupClasses = [
    css.buttonGroup,
    css[direction],
    css[alignment],
    css[`spacing${spacing.charAt(0).toUpperCase() + spacing.slice(1)}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={buttonGroupClasses}
      style={styles}
      onKeyDown={handleKeyDown}
      role="group"
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
    >
      {children}
    </div>
  );
};
