import css from "./Grid.module.css";
import { GridAlignment, GridColumnWidth } from "./Grid.types";
import type { GridColumn } from "./Grid.types";

interface GridCellProps<T> {
  column: GridColumn<T>;
  row: T;
}

export const GridCell = <T,>({ column, row }: GridCellProps<T>) => {
  // Render cell content
  const renderCellContent = () => {
    if (column.renderCell) {
      return column.renderCell({
        value: row[column.field],
        row,
        field: column.field,
      });
    }
    const value = row[column.field];
    return value != null ? String(value) : "";
  };

  const cellClasses = [
    css.gridCell,
    css[column.align || GridAlignment.LEFT],
    column.width ? css[column.width] : css[GridColumnWidth.AUTO],
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div key={column.field as string} className={cellClasses} role="cell">
      {renderCellContent()}
    </div>
  );
};
