import { useMemo } from "react";
import css from "./Grid.module.css";
import type { GridProps } from "./Grid.types";
import { GridSize, GridVariant, GridSortDirection } from "./Grid.types";
import { GridHeader } from "./GridHeader";
import { GridBody } from "./GridBody";

export const Grid = <T,>({
  className = "",
  styles,
  columns,
  rows,
  size = GridSize.MEDIUM,
  variant = GridVariant.BORDERED,
  sortModel = [],
  onSortModelChange,
  onRowClick,
  ariaLabel,
  ariaDescribedBy,
  loading = false,
  emptyMessage = "No data available",
}: GridProps<T>) => {
  // Memoized sorted rows
  const sortedRows = useMemo(() => {
    if (sortModel.length === 0) return rows;

    return [...rows].sort((a, b) => {
      for (const sort of sortModel) {
        const column = columns.find((col) => col.field === sort.field);
        if (!column) continue;

        const aValue = a[column.field];
        const bValue = b[column.field];

        if (aValue === bValue) continue;

        let comparison = 0;
        if (aValue < bValue) comparison = -1;
        else if (aValue > bValue) comparison = 1;

        if (sort.sort === GridSortDirection.DESC) {
          comparison = -comparison;
        }

        return comparison;
      }
      return 0;
    });
  }, [rows, sortModel, columns]);

  // Build CSS classes based on props
  const gridClasses = [
    css.grid,
    css[size],
    css[variant],
    loading ? css.loading : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={gridClasses}
      style={styles}
      role="table"
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
    >
      {loading && (
        <div className={css.gridLoadingOverlay}>
          <div>Loading...</div>
        </div>
      )}

      <div className={css.gridTable}>
        <GridHeader
          columns={columns}
          sortModel={sortModel}
          onSortModelChange={onSortModelChange}
        />
        <GridBody
          rows={sortedRows}
          columns={columns}
          onRowClick={onRowClick}
          emptyMessage={emptyMessage}
        />
      </div>
    </div>
  );
};
