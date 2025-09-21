export const GridAlignment = {
  LEFT: "left",
  CENTER: "center",
  RIGHT: "right",
} as const;

export const GridSortDirection = {
  ASC: "asc",
  DESC: "desc",
  NONE: "none",
} as const;

export const GridSize = {
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
} as const;

export const GridVariant = {
  BORDERED: "bordered",
  BORDERLESS: "borderless",
} as const;

export const GridColumnWidth = {
  SMALL: "widthSmall",
  MEDIUM: "widthMedium",
  LARGE: "widthLarge",
  XLARGE: "widthXLarge",
  AUTO: "widthAuto",
  FIT: "widthFit",
} as const;

export type GridAlignmentType =
  (typeof GridAlignment)[keyof typeof GridAlignment];
export type GridSortDirectionType =
  (typeof GridSortDirection)[keyof typeof GridSortDirection];
export type GridSizeType = (typeof GridSize)[keyof typeof GridSize];
export type GridVariantType = (typeof GridVariant)[keyof typeof GridVariant];
export type GridColumnWidthType =
  (typeof GridColumnWidth)[keyof typeof GridColumnWidth];

// Column definition interface
export interface GridColumn<T = Record<string, unknown>> {
  field: keyof T;
  headerName: string;
  width?: GridColumnWidthType;
  align?: GridAlignmentType;
  sortable?: boolean;
  resizable?: boolean;
  renderCell?: (params: {
    value: T[keyof T];
    row: T;
    field: keyof T;
  }) => React.ReactNode;
  renderHeader?: (params: { column: GridColumn<T> }) => React.ReactNode;
}

// Sort state interface
export interface GridSortModel {
  field: string;
  sort: GridSortDirectionType;
}

// Grid props interface
export interface GridProps<T = Record<string, unknown>> {
  className?: string;
  styles?: React.CSSProperties;
  columns: GridColumn<T>[];
  rows: T[];
  size?: GridSizeType;
  variant?: GridVariantType;
  sortModel?: GridSortModel[];
  onSortModelChange?: (sortModel: GridSortModel[]) => void;
  onRowClick?: (params: { row: T; rowIndex: number }) => void;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  loading?: boolean;
  emptyMessage?: string;
}

// Date-based grid types
export interface DateGridRow {
  id: string;
  [date: string]: string | number; // Date keys with bubble state values
}

export interface DateGridProps {
  className?: string;
  styles?: React.CSSProperties;
  rows: DateGridRow[];
  dates: string[]; // Array of date strings for column headers
  onIdChange?: (rowIndex: number, newId: string) => void;
  onBubbleChange?: (
    rowIndex: number,
    date: string,
    bubbleState: number
  ) => void;
  onRowClick?: (params: { row: DateGridRow; rowIndex: number }) => void;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  loading?: boolean;
  emptyMessage?: string;
  idPlaceholder?: string;
  showIdHeader?: boolean; // Whether to show the ID column (with blank header)
  variant?: GridVariantType; // Border variant
  idColumnWidth?: number; // Percentage width for ID column (0-100)
}
