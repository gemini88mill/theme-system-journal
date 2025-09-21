import { useCallback } from "react";
import css from "./Grid.module.css";
import {
  GridAlignment,
  GridSortDirection,
  GridColumnWidth,
} from "./Grid.types";
import type {
  GridColumn,
  GridSortDirectionType,
  GridSortModel,
} from "./Grid.types";

interface GridHeaderProps<T> {
  columns: GridColumn<T>[];
  sortModel: GridSortModel[];
  onSortModelChange?: (sortModel: GridSortModel[]) => void;
}

export const GridHeader = <T,>({
  columns,
  sortModel,
  onSortModelChange,
}: GridHeaderProps<T>) => {
  // Memoized callback for handling column header clicks (sorting)
  const handleHeaderClick = useCallback(
    (column: GridColumn<T>) => {
      if (!column.sortable || !onSortModelChange) return;

      const currentSort = sortModel.find((sort) => sort.field === column.field);
      let newSortDirection: GridSortDirectionType;

      if (!currentSort) {
        newSortDirection = GridSortDirection.ASC;
      } else if (currentSort.sort === GridSortDirection.ASC) {
        newSortDirection = GridSortDirection.DESC;
      } else if (currentSort.sort === GridSortDirection.DESC) {
        newSortDirection = GridSortDirection.NONE;
      } else {
        newSortDirection = GridSortDirection.ASC;
      }

      const newSortModel =
        newSortDirection === GridSortDirection.NONE
          ? sortModel.filter((sort) => sort.field !== column.field)
          : [
              ...sortModel.filter((sort) => sort.field !== column.field),
              { field: column.field as string, sort: newSortDirection },
            ];

      onSortModelChange(newSortModel);
    },
    [sortModel, onSortModelChange]
  );

  // Get sort direction for a column
  const getSortDirection = (field: keyof T): GridSortDirectionType => {
    const sort = sortModel.find((s) => s.field === field);
    return sort?.sort || GridSortDirection.NONE;
  };

  // Render header content
  const renderHeaderContent = (column: GridColumn<T>) => {
    if (column.renderHeader) {
      return column.renderHeader({ column });
    }
    return column.headerName;
  };

  return (
    <div className={css.gridHeader} role="rowgroup">
      <div className={css.gridHeaderRow} role="row">
        {columns.map((column) => {
          const sortDirection = getSortDirection(column.field);
          const headerClasses = [
            css.gridHeaderCell,
            css[column.align || GridAlignment.LEFT],
            column.sortable ? css.sortable : "",
            sortDirection !== GridSortDirection.NONE ? sortDirection : "",
            column.width ? css[column.width] : css[GridColumnWidth.AUTO],
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <div
              key={column.field as string}
              className={headerClasses}
              role="columnheader"
              tabIndex={column.sortable ? 0 : -1}
              onClick={() => handleHeaderClick(column)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleHeaderClick(column);
                }
              }}
              aria-sort={
                sortDirection === GridSortDirection.ASC
                  ? "ascending"
                  : sortDirection === GridSortDirection.DESC
                  ? "descending"
                  : "none"
              }
            >
              {renderHeaderContent(column)}
            </div>
          );
        })}
      </div>
    </div>
  );
};
