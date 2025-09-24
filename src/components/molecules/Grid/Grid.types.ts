import type { ReactNode } from "react";

// Column definition - can be either a string (property name) or an object with renderCell and/or renderHeaderCell
export type ColumnDefinition =
  | string
  | {
      renderCell?: (rowData: unknown) => ReactNode;
      renderHeaderCell?: () => ReactNode;
    };

// Grid columns structure - Record where key is header name, value is column definition
export type GridColumns = Record<string, ColumnDefinition>;

// Grid Props
export interface GridProps {
  columns: GridColumns; // Required: Column definitions
  data: unknown[]; // Required: Row data array
  className?: string; // Optional: Custom CSS class
  borderless?: boolean; // Optional: Remove borders from the grid
  hideFirstColumnHeader?: boolean; // Optional: Hide the first column's header
  firstColumnWidth?: number; // Optional: Width percentage for the first column (default: 30)
}
