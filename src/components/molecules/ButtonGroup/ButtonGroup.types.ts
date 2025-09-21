export const ButtonGroupAlignment = {
  LEFT: "left",
  CENTER: "center",
  RIGHT: "right",
  SPACE_BETWEEN: "space-between",
  SPACE_AROUND: "space-around",
  SPACE_EVENLY: "space-evenly",
} as const;

export const ButtonGroupDirection = {
  HORIZONTAL: "horizontal",
  VERTICAL: "vertical",
} as const;

export const ButtonGroupSpacing = {
  NONE: "none",
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
} as const;

export type ButtonGroupAlignmentType =
  (typeof ButtonGroupAlignment)[keyof typeof ButtonGroupAlignment];
export type ButtonGroupDirectionType =
  (typeof ButtonGroupDirection)[keyof typeof ButtonGroupDirection];
export type ButtonGroupSpacingType =
  (typeof ButtonGroupSpacing)[keyof typeof ButtonGroupSpacing];
