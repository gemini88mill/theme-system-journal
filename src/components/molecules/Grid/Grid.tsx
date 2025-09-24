import type { GridProps, ColumnDefinition } from "./Grid.types";
import styles from "./Grid.module.css";

export const Grid = ({
  columns,
  data,
  className,
  borderless = false,
  hideFirstColumnHeader = false,
  firstColumnWidth = 30,
}: GridProps) => {
  // Get column headers from the keys of the columns object
  const columnHeaders = Object.keys(columns);

  // Helper function to render cell content
  const renderCellContent = (columnDef: ColumnDefinition, rowData: unknown) => {
    if (typeof columnDef === "string") {
      // If columnDef is a string, it's a property name - access it from rowData
      return (rowData as Record<string, unknown>)[columnDef] as string;
    } else {
      // If columnDef is an object with renderCell, call the function
      return columnDef.renderCell(rowData);
    }
  };

  // Calculate the remaining width for other columns
  const remainingWidth = 100 - firstColumnWidth;
  const otherColumnsWidth = remainingWidth / (columnHeaders.length - 1);

  return (
    <table
      className={`${styles.grid} ${
        borderless ? styles["grid--borderless"] : ""
      } ${styles["grid--custom-width"]} ${className || ""}`}
      style={
        {
          "--first-column-width": `${firstColumnWidth}%`,
          "--other-columns-width": `${otherColumnsWidth}%`,
        } as React.CSSProperties
      }
    >
      <thead>
        <tr>
          {columnHeaders.map((header, index) => (
            <th
              key={header}
              className={styles.grid__header}
              style={{
                width:
                  index === 0
                    ? `${firstColumnWidth}%`
                    : `${otherColumnsWidth}%`,
              }}
            >
              {hideFirstColumnHeader && index === 0 ? "" : header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((rowData, rowIndex) => (
          <tr key={rowIndex}>
            {columnHeaders.map((header, index) => (
              <td
                key={header}
                className={styles.grid__cell}
                style={{
                  width:
                    index === 0
                      ? `${firstColumnWidth}%`
                      : `${otherColumnsWidth}%`,
                }}
              >
                {renderCellContent(columns[header], rowData)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
