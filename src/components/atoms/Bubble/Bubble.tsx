import { useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleHalfStroke,
  faCircle as faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import css from "./Bubble.module.css";

const bubbleIcons = [faCircle, faCircleHalfStroke, faCircleCheck];

interface BubbleProps {
  className?: string;
  styles?: React.CSSProperties;
  onClick?: (state: number) => void;
}

export const Bubble = ({ className = "", styles, onClick }: BubbleProps) => {
  // Local state for bubble fill level - just a number
  const [bubbleState, setBubbleState] = useState<number>(0);

  // Memoized callback for handling click events
  const handleClick = useCallback(() => {
    setBubbleState((prev) => {
      const nextState = (prev + 1) % bubbleIcons.length;

      onClick?.(nextState);
      return nextState;
    });
  }, [onClick]);

  return (
    <button
      type="button"
      className={`${css.bubble} ${className}`.trim()}
      style={styles}
      onClick={handleClick}
      aria-label={`Bubble state: ${bubbleState}`}
    >
      <FontAwesomeIcon
        icon={bubbleIcons[bubbleState]}
        style={{ width: "100%", height: "100%" }}
      />
    </button>
  );
};
