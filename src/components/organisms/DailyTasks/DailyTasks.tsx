import { useCallback, useMemo } from "react";
import css from "./DailyTasks.module.css";
import { DateGrid } from "../../molecules/Grid/DateGrid";
import { ButtonGroup } from "../../molecules/ButtonGroup/ButtonGroup";
import { Button } from "../../atoms/Button/Button";
import { ButtonGroupAlignment } from "../../molecules/ButtonGroup/ButtonGroup.types";
import { GridVariant } from "../../molecules/Grid/Grid.types";
import type {
  DailyTasksProps,
  DailyTaskRow,
  TaskStatusType,
} from "./DailyTasks.types";

export const DailyTasks = ({
  className = "",
  styles,
  tasks = [],
  onTaskChange,
  onStatusChange,
  onTaskAdd,
  onTaskDelete,
  onTaskClick,
  ariaLabel = "Daily Tasks",
  ariaDescribedBy,
  loading = false,
  emptyMessage = "No tasks available",
  taskPlaceholder = "Enter task name",
  showDeleteButton = true,
  headerTitle = "Daily Tasks",
  addButtonText = "Add Task",
  daysBack = 5,
  locale,
  dateFormat,
}: DailyTasksProps) => {
  // Generate dates array starting from oldest date going to today
  const dates = useMemo(() => {
    const dateArray: string[] = [];
    const today = new Date();

    // Start from the oldest date and go forward to today
    for (let i = daysBack - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);

      // Format as YYYY-MM-DD using local timezone
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      dateArray.push(`${year}-${month}-${day}`);
    }

    return dateArray;
  }, [daysBack]);

  // Memoized callback for handling task name changes
  const handleTaskChange = useCallback(
    (taskIndex: number, newTaskName: string) => {
      onTaskChange?.(taskIndex, newTaskName);
    },
    [onTaskChange]
  );

  // Memoized callback for handling task status changes
  const handleStatusChange = useCallback(
    (taskIndex: number, date: string, bubbleState: number) => {
      onStatusChange?.(taskIndex, date, bubbleState as TaskStatusType);
    },
    [onStatusChange]
  );

  // Memoized callback for handling task clicks
  const handleTaskClick = useCallback(
    (params: { row: DailyTaskRow; rowIndex: number }) => {
      onTaskClick?.(params.row, params.rowIndex);
    },
    [onTaskClick]
  );

  // Memoized callback for handling task deletion
  const handleTaskDelete = useCallback(
    (taskIndex: number) => {
      onTaskDelete?.(taskIndex);
    },
    [onTaskDelete]
  );

  // Memoized callback for handling add task button click
  const handleAddTask = useCallback(() => {
    onTaskAdd?.();
  }, [onTaskAdd]);

  // Build CSS classes
  const dailyTasksClasses = [css.dailyTasks, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={dailyTasksClasses}
      style={styles}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
    >
      {/* Header */}
      <header className={css.header}>
        <h2 className={css.title}>{headerTitle}</h2>
      </header>

      {/* DateGrid */}
      <div className={css.gridContainer}>
        <DateGrid
          rows={tasks}
          dates={dates}
          onIdChange={handleTaskChange}
          onBubbleChange={handleStatusChange}
          onRowClick={handleTaskClick}
          onRowDelete={handleTaskDelete}
          ariaLabel="Daily tasks grid"
          loading={loading}
          emptyMessage={emptyMessage}
          idPlaceholder={taskPlaceholder}
          showIdHeader={true}
          variant={GridVariant.BORDERED}
          idColumnWidth={30}
          locale={locale}
          dateFormat={dateFormat}
          showDeleteButton={showDeleteButton}
        />
      </div>

      {/* Button Group */}
      <div className={css.buttonContainer}>
        <ButtonGroup
          alignment={ButtonGroupAlignment.RIGHT}
          ariaLabel="Task actions"
        >
          <Button
            variant="primary"
            size="medium"
            onClick={handleAddTask}
            aria-label="Add new task"
          >
            {addButtonText}
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};
