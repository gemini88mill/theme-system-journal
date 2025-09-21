import { useState } from "react";
import "./App.css";
import { DailyTasks } from "./components/organisms/DailyTasks/DailyTasks";
import type { DailyTaskRow } from "./components/organisms/DailyTasks/DailyTasks.types";

// Helper function to format date as YYYY-MM-DD using local timezone
const formatDateLocal = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

function App() {
  // DailyTasks state
  const [dailyTasks, setDailyTasks] = useState<DailyTaskRow[]>([
    {
      id: "Review code",
      [formatDateLocal(new Date(Date.now() - 4 * 24 * 60 * 60 * 1000))]: 2,
      [formatDateLocal(new Date(Date.now() - 3 * 24 * 60 * 60 * 1000))]: 1,
      [formatDateLocal(new Date(Date.now() - 2 * 24 * 60 * 60 * 1000))]: 0,
      [formatDateLocal(new Date(Date.now() - 1 * 24 * 60 * 60 * 1000))]: 1,
      [formatDateLocal(new Date())]: 0,
    },
    {
      id: "Write documentation",
      [formatDateLocal(new Date(Date.now() - 4 * 24 * 60 * 60 * 1000))]: 0,
      [formatDateLocal(new Date(Date.now() - 3 * 24 * 60 * 60 * 1000))]: 1,
      [formatDateLocal(new Date(Date.now() - 2 * 24 * 60 * 60 * 1000))]: 2,
      [formatDateLocal(new Date(Date.now() - 1 * 24 * 60 * 60 * 1000))]: 0,
      [formatDateLocal(new Date())]: 1,
    },
  ]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Daily Tasks Tracker</h1>

      <DailyTasks
        tasks={dailyTasks}
        onTaskChange={(taskIndex, newTaskName) => {
          setDailyTasks((prev) =>
            prev.map((task, index) =>
              index === taskIndex ? { ...task, id: newTaskName } : task
            )
          );
        }}
        onStatusChange={(taskIndex, date, status) => {
          setDailyTasks((prev) =>
            prev.map((task, index) =>
              index === taskIndex ? { ...task, [date]: status } : task
            )
          );
        }}
        onTaskAdd={() => {
          const today = formatDateLocal(new Date());
          const newTask: DailyTaskRow = {
            id: "New Task",
            [today]: 0,
          };
          setDailyTasks((prev) => [...prev, newTask]);
        }}
        onTaskDelete={(taskIndex) => {
          setDailyTasks((prev) =>
            prev.filter((_, index) => index !== taskIndex)
          );
        }}
        onTaskClick={(task, taskIndex) => {
          console.log("Task clicked:", task, "at index:", taskIndex);
        }}
        ariaLabel="Daily tasks tracker"
        emptyMessage="No tasks available. Add a task to get started!"
        taskPlaceholder="Enter task name"
        showDeleteButton={true}
        headerTitle="Daily Tasks"
        addButtonText="Add Task"
        daysBack={5}
      />
    </div>
  );
}

export default App;
