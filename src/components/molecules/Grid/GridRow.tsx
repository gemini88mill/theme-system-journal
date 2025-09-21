import { useCallback } from "react";
import css from "./Grid.module.css";
import type { GridColumn } from "./Grid.types";
import { GridCell } from "./GridCell";

interface GridRowProps<T> {
  row: T;
  rowIndex: number;
  columns: GridColumn<T>[];
  onRowClick?: (params: { row: T; rowIndex: number }) => void;
}

export const GridRow = <T,>({
  row,
  rowIndex,
  columns,
  onRowClick,
}: GridRowProps<T>) => {
  // Memoized callback for handling row clicks
  const handleRowClick = useCallback(() => {
    onRowClick?.({ row, rowIndex });
  }, [onRowClick, row, rowIndex]);

  return (
    <div
      className={css.gridRow}
      role="row"
      tabIndex={onRowClick ? 0 : -1}
      onClick={handleRowClick}
      onKeyDown={(e) => {
        if (onRowClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          handleRowClick();
        }
      }}
    >
      {columns.map((column) => (
        <GridCell key={column.field as string} column={column} row={row} />
      ))}
    </div>
  );
};
