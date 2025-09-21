import css from "./Grid.module.css";
import type { GridColumn } from "./Grid.types";
import { GridRow } from "./GridRow";

interface GridBodyProps<T> {
  rows: T[];
  columns: GridColumn<T>[];
  onRowClick?: (params: { row: T; rowIndex: number }) => void;
  emptyMessage?: string;
}

export const GridBody = <T,>({
  rows,
  columns,
  onRowClick,
  emptyMessage = "No data available",
}: GridBodyProps<T>) => {
  return (
    <div className={css.gridBody} role="rowgroup">
      {rows.length === 0 ? (
        <div className={css.gridEmpty} role="cell">
          {emptyMessage}
        </div>
      ) : (
        rows.map((row, rowIndex) => (
          <GridRow
            key={rowIndex}
            row={row}
            rowIndex={rowIndex}
            columns={columns}
            onRowClick={onRowClick}
          />
        ))
      )}
    </div>
  );
};
