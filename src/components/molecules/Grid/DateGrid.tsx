import { useCallback } from "react";
import css from "./Grid.module.css";
import { GridSize, GridVariant } from "./Grid.types";
import type { DateGridProps, DateGridRow } from "./Grid.types";
import { InputField } from "../../atoms/InputField/InputField";
import { Bubble } from "../../atoms/Bubble/Bubble";

// DateGrid Header Component
interface DateGridHeaderProps {
  dates: string[];
  showIdHeader: boolean;
  locale?: string;
  dateFormat?: Intl.DateTimeFormatOptions;
}

const DateGridHeader = ({
  dates,
  showIdHeader,
  locale = navigator.language,
  dateFormat = { month: "short", day: "numeric" },
}: DateGridHeaderProps) => {
  // Memoized function to format dates
  const formatDate = useCallback(
    (dateString: string) => {
      try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
          // If date is invalid, return the original string
          return dateString;
        }
        return date.toLocaleDateString(locale, dateFormat);
      } catch {
        // If formatting fails, return the original string
        return dateString;
      }
    },
    [locale, dateFormat]
  );

  return (
    <div className={css.gridHeader} role="rowgroup">
      <div className={css.gridHeaderRow} role="row">
        {/* ID Column Header - conditionally shown */}
        {showIdHeader && (
          <div
            className={`${css.gridHeaderCell} ${css.left} ${css.widthMedium}`}
            role="columnheader"
          >
            {/* Empty header - no text */}
          </div>
        )}
        {/* Date Column Headers */}
        {dates.map((date) => (
          <div
            key={date}
            className={`${css.gridHeaderCell} ${css.center} ${css.widthAuto}`}
            role="columnheader"
          >
            {formatDate(date)}
          </div>
        ))}
      </div>
    </div>
  );
};

// DateGrid Row Component
interface DateGridRowProps {
  row: DateGridRow;
  rowIndex: number;
  dates: string[];
  showIdHeader: boolean;
  idPlaceholder: string;
  onIdChange: (rowIndex: number, newId: string) => void;
  onBubbleChange: (rowIndex: number, date: string, bubbleState: number) => void;
  onRowClick?: (row: DateGridRow, rowIndex: number) => void;
}

const DateGridRowComponent = ({
  row,
  rowIndex,
  dates,
  showIdHeader,
  idPlaceholder,
  onIdChange,
  onBubbleChange,
  onRowClick,
}: DateGridRowProps) => {
  // Memoized callback for handling row clicks
  const handleRowClick = useCallback(() => {
    onRowClick?.(row, rowIndex);
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
      {/* ID Cell with InputField - conditionally shown */}
      {showIdHeader && (
        <div
          className={`${css.gridCell} ${css.left} ${css.widthMedium}`}
          role="cell"
          onClick={(e) => e.stopPropagation()} // Prevent row click when editing ID
        >
          <InputField
            value={row.id}
            onChange={(newId) => onIdChange(rowIndex, newId)}
            placeholder={idPlaceholder}
            className={css.inputField}
          />
        </div>
      )}

      {/* Date Cells with Bubbles */}
      {dates.map((date) => (
        <div
          key={date}
          className={`${css.gridCell} ${css.center} ${css.widthAuto}`}
          role="cell"
          onClick={(e) => e.stopPropagation()} // Prevent row click when clicking bubble
        >
          <Bubble
            onClick={(bubbleState) =>
              onBubbleChange(rowIndex, date, bubbleState)
            }
            className={css.bubble}
          />
        </div>
      ))}
    </div>
  );
};

// DateGrid Body Component
interface DateGridBodyProps {
  rows: DateGridRow[];
  dates: string[];
  showIdHeader: boolean;
  idPlaceholder: string;
  emptyMessage: string;
  onIdChange: (rowIndex: number, newId: string) => void;
  onBubbleChange: (rowIndex: number, date: string, bubbleState: number) => void;
  onRowClick?: (row: DateGridRow, rowIndex: number) => void;
}

const DateGridBody = ({
  rows,
  dates,
  showIdHeader,
  idPlaceholder,
  emptyMessage,
  onIdChange,
  onBubbleChange,
  onRowClick,
}: DateGridBodyProps) => {
  return (
    <div className={css.gridBody} role="rowgroup">
      {rows.length === 0 ? (
        <div className={css.gridEmpty} role="cell">
          {emptyMessage}
        </div>
      ) : (
        rows.map((row, rowIndex) => (
          <DateGridRowComponent
            key={rowIndex}
            row={row}
            rowIndex={rowIndex}
            dates={dates}
            showIdHeader={showIdHeader}
            idPlaceholder={idPlaceholder}
            onIdChange={onIdChange}
            onBubbleChange={onBubbleChange}
            onRowClick={onRowClick}
          />
        ))
      )}
    </div>
  );
};

export const DateGrid = ({
  className = "",
  styles,
  rows,
  dates,
  onIdChange,
  onBubbleChange,
  onRowClick,
  ariaLabel,
  ariaDescribedBy,
  loading = false,
  emptyMessage = "No data available",
  idPlaceholder = "Enter ID",
  showIdHeader = true,
  variant = GridVariant.BORDERED,
  idColumnWidth,
  locale,
  dateFormat,
}: DateGridProps) => {
  // Memoized callback for handling ID changes
  const handleIdChange = useCallback(
    (rowIndex: number, newId: string) => {
      onIdChange?.(rowIndex, newId);
    },
    [onIdChange]
  );

  // Memoized callback for handling bubble changes
  const handleBubbleChange = useCallback(
    (rowIndex: number, date: string, bubbleState: number) => {
      onBubbleChange?.(rowIndex, date, bubbleState);
    },
    [onBubbleChange]
  );

  // Memoized callback for handling row clicks
  const handleRowClick = useCallback(
    (row: DateGridRow, rowIndex: number) => {
      onRowClick?.({ row, rowIndex });
    },
    [onRowClick]
  );

  // Build CSS classes based on props
  const gridClasses = [
    css.grid,
    css[GridSize.MEDIUM],
    css[variant],
    loading ? css.loading : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Build inline styles with CSS custom property for ID column width
  const gridStyles = {
    ...styles,
    ...(idColumnWidth !== undefined && {
      "--id-column-width": `${idColumnWidth}%`,
    }),
  };

  return (
    <div
      className={gridClasses}
      style={gridStyles}
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
        <DateGridHeader
          dates={dates}
          showIdHeader={showIdHeader}
          locale={locale}
          dateFormat={dateFormat}
        />
        <DateGridBody
          rows={rows}
          dates={dates}
          showIdHeader={showIdHeader}
          idPlaceholder={idPlaceholder}
          emptyMessage={emptyMessage}
          onIdChange={handleIdChange}
          onBubbleChange={handleBubbleChange}
          onRowClick={handleRowClick}
        />
      </div>
    </div>
  );
};
