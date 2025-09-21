import type { DateGridRow } from "../../molecules/Grid/Grid.types";

// Task status enum for bubble states
export const TaskStatus = {
  NOT_STARTED: 0,
  IN_PROGRESS: 1,
  COMPLETED: 2,
  BLOCKED: 3,
} as const;

export type TaskStatusType = (typeof TaskStatus)[keyof typeof TaskStatus];

// Daily task row interface extending DateGridRow
export interface DailyTaskRow extends DateGridRow {
  id: string; // Task name/description
  [date: string]: string | number; // Date keys with task status values (0-3)
}

// DailyTasks component props
export interface DailyTasksProps {
  className?: string;
  styles?: React.CSSProperties;
  tasks?: DailyTaskRow[]; // Array of task rows
  onTaskChange?: (taskIndex: number, newTaskName: string) => void;
  onStatusChange?: (
    taskIndex: number,
    date: string,
    status: TaskStatusType
  ) => void;
  onTaskAdd?: () => void;
  onTaskDelete?: (taskIndex: number) => void;
  onTaskClick?: (task: DailyTaskRow, taskIndex: number) => void;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  loading?: boolean;
  emptyMessage?: string;
  taskPlaceholder?: string;
  showDeleteButton?: boolean;
  headerTitle?: string;
  addButtonText?: string;
  daysBack?: number; // Number of days to go back from today (default: 5)
  locale?: string;
  dateFormat?: Intl.DateTimeFormatOptions;
}
