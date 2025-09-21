import { useState } from "react";
import "./App.css";
import reactLogo from "./assets/react.svg";
import {
  Button,
  ButtonVariant,
  ButtonSize,
} from "./components/atoms/Button/Button";
import { ButtonGroup } from "./components/molecules/ButtonGroup/ButtonGroup";
import {
  ButtonGroupAlignment,
  ButtonGroupDirection,
  ButtonGroupSpacing,
} from "./components/molecules/ButtonGroup/ButtonGroup.types";
import { Grid } from "./components/molecules/Grid/Grid";
import { DateGrid } from "./components/molecules/Grid/DateGrid";
import {
  GridAlignment,
  GridSize,
  GridColumnWidth,
  GridVariant,
} from "./components/molecules/Grid/Grid.types";
import type {
  GridColumn,
  GridSortModel,
  DateGridRow,
} from "./components/molecules/Grid/Grid.types";
import viteLogo from "/vite.svg";

// Sample data type for the grid
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  lastLogin: string;
}

function App() {
  const [count, setCount] = useState(0);
  const [sortModel, setSortModel] = useState<GridSortModel[]>([]);
  const [dateGridData, setDateGridData] = useState<DateGridRow[]>([
    {
      id: "Task 1",
      "2024-01-15": 0,
      "2024-01-16": 1,
      "2024-01-17": 2,
      "2024-01-18": 0,
      "2024-01-19": 1,
    },
    {
      id: "Task 2",
      "2024-01-15": 1,
      "2024-01-16": 2,
      "2024-01-17": 0,
      "2024-01-18": 1,
      "2024-01-19": 2,
    },
    {
      id: "Task 3",
      "2024-01-15": 2,
      "2024-01-16": 0,
      "2024-01-17": 1,
      "2024-01-18": 2,
      "2024-01-19": 0,
    },
  ]);

  // Sample data for the grid
  const sampleUsers: User[] = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Admin",
      status: "active",
      lastLogin: "2024-01-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "User",
      status: "active",
      lastLogin: "2024-01-14",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      role: "Editor",
      status: "inactive",
      lastLogin: "2024-01-10",
    },
    {
      id: 4,
      name: "Alice Brown",
      email: "alice.brown@example.com",
      role: "User",
      status: "active",
      lastLogin: "2024-01-16",
    },
  ];

  // Column definitions for the grid
  const userColumns: GridColumn<User>[] = [
    {
      field: "id",
      headerName: "ID",
      width: GridColumnWidth.SMALL,
      align: GridAlignment.CENTER,
      sortable: true,
    },
    {
      field: "name",
      headerName: "Name",
      width: GridColumnWidth.MEDIUM,
      align: GridAlignment.LEFT,
      sortable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: GridColumnWidth.LARGE,
      align: GridAlignment.LEFT,
      sortable: true,
    },
    {
      field: "role",
      headerName: "Role",
      width: GridColumnWidth.MEDIUM,
      align: GridAlignment.CENTER,
      sortable: true,
    },
    {
      field: "status",
      headerName: "Status",
      width: GridColumnWidth.SMALL,
      align: GridAlignment.CENTER,
      sortable: true,
      renderCell: ({ value }) => (
        <span
          style={{
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "12px",
            fontWeight: "500",
            backgroundColor: value === "active" ? "#e8f5e8" : "#ffeaea",
            color: value === "active" ? "#2e7d32" : "#d32f2f",
          }}
        >
          {value}
        </span>
      ),
    },
    {
      field: "lastLogin",
      headerName: "Last Login",
      width: GridColumnWidth.MEDIUM,
      align: GridAlignment.CENTER,
      sortable: true,
    },
  ];

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div
        style={{
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
          margin: "20px 0",
        }}
      >
        <Button variant={ButtonVariant.PRIMARY} size={ButtonSize.SMALL}>
          Primary Small
        </Button>
        <Button variant={ButtonVariant.SECONDARY} size={ButtonSize.MEDIUM}>
          Secondary Medium
        </Button>
        <Button variant={ButtonVariant.OUTLINE} size={ButtonSize.LARGE}>
          Outline Large
        </Button>
        <Button variant={ButtonVariant.GHOST}>Ghost Default</Button>
        <Button variant={ButtonVariant.SUCCESS}>Success</Button>
        <Button variant={ButtonVariant.DANGER} disabled>
          Disabled Danger
        </Button>
      </div>

      {/* ButtonGroup Examples */}
      <div style={{ margin: "40px 0" }}>
        <h2>ButtonGroup Examples</h2>

        {/* Save and Close buttons example */}
        <div style={{ margin: "20px 0" }}>
          <h3>Save and Close Actions</h3>
          <ButtonGroup
            alignment={ButtonGroupAlignment.RIGHT}
            spacing={ButtonGroupSpacing.MEDIUM}
            ariaLabel="Form action buttons"
          >
            <Button
              variant={ButtonVariant.OUTLINE}
              onClick={() => console.log("Cancel clicked")}
            >
              Cancel
            </Button>
            <Button
              variant={ButtonVariant.SUCCESS}
              onClick={() => console.log("Save clicked")}
            >
              Save
            </Button>
          </ButtonGroup>
        </div>

        {/* Multiple buttons with different alignments */}
        <div style={{ margin: "20px 0" }}>
          <h3>Center Aligned</h3>
          <ButtonGroup
            alignment={ButtonGroupAlignment.CENTER}
            spacing={ButtonGroupSpacing.LARGE}
          >
            <Button variant={ButtonVariant.PRIMARY}>Primary</Button>
            <Button variant={ButtonVariant.SECONDARY}>Secondary</Button>
            <Button variant={ButtonVariant.OUTLINE}>Outline</Button>
          </ButtonGroup>
        </div>

        {/* Space between alignment */}
        <div style={{ margin: "20px 0" }}>
          <h3>Space Between</h3>
          <ButtonGroup
            alignment={ButtonGroupAlignment.SPACE_BETWEEN}
            spacing={ButtonGroupSpacing.MEDIUM}
          >
            <Button variant={ButtonVariant.GHOST}>Back</Button>
            <Button variant={ButtonVariant.DANGER}>Delete</Button>
          </ButtonGroup>
        </div>

        {/* Vertical direction */}
        <div style={{ margin: "20px 0" }}>
          <h3>Vertical Layout</h3>
          <ButtonGroup
            direction={ButtonGroupDirection.VERTICAL}
            alignment={ButtonGroupAlignment.LEFT}
            spacing={ButtonGroupSpacing.SMALL}
          >
            <Button variant={ButtonVariant.PRIMARY}>Option 1</Button>
            <Button variant={ButtonVariant.OUTLINE}>Option 2</Button>
            <Button variant={ButtonVariant.OUTLINE}>Option 3</Button>
          </ButtonGroup>
        </div>
      </div>

      {/* Grid Examples */}
      <div style={{ margin: "40px 0" }}>
        <h2>Grid Examples</h2>

        {/* User data grid */}
        <div style={{ margin: "20px 0" }}>
          <h3>User Management Grid (Bordered)</h3>
          <Grid
            columns={userColumns}
            rows={sampleUsers}
            size={GridSize.MEDIUM}
            variant={GridVariant.BORDERED}
            sortModel={sortModel}
            onSortModelChange={setSortModel}
            onRowClick={({ row, rowIndex }) => {
              console.log("Row clicked:", row, "at index:", rowIndex);
            }}
            ariaLabel="User management data grid"
            emptyMessage="No users found"
          />
        </div>

        {/* User data grid borderless */}
        <div style={{ margin: "20px 0" }}>
          <h3>User Management Grid (Borderless)</h3>
          <Grid
            columns={userColumns}
            rows={sampleUsers}
            size={GridSize.MEDIUM}
            variant={GridVariant.BORDERLESS}
            sortModel={sortModel}
            onSortModelChange={setSortModel}
            onRowClick={({ row, rowIndex }) => {
              console.log("Row clicked:", row, "at index:", rowIndex);
            }}
            ariaLabel="User management data grid borderless"
            emptyMessage="No users found"
          />
        </div>

        {/* Empty grid example */}
        <div style={{ margin: "20px 0" }}>
          <h3>Empty Grid</h3>
          <Grid
            columns={userColumns}
            rows={[]}
            size={GridSize.SMALL}
            ariaLabel="Empty data grid"
            emptyMessage="No data available"
          />
        </div>
      </div>

      {/* DateGrid Examples */}
      <div style={{ margin: "40px 0" }}>
        <h2>DateGrid Examples</h2>

        {/* Task tracking grid */}
        <div style={{ margin: "20px 0" }}>
          <h3>Task Progress Tracker (Bordered)</h3>
          <DateGrid
            rows={dateGridData}
            dates={[
              "2024-01-15",
              "2024-01-16",
              "2024-01-17",
              "2024-01-18",
              "2024-01-19",
            ]}
            variant={GridVariant.BORDERED}
            onIdChange={(rowIndex, newId) => {
              setDateGridData((prev) =>
                prev.map((row, index) =>
                  index === rowIndex ? { ...row, id: newId } : row
                )
              );
            }}
            onBubbleChange={(rowIndex, date, bubbleState) => {
              setDateGridData((prev) =>
                prev.map((row, index) =>
                  index === rowIndex ? { ...row, [date]: bubbleState } : row
                )
              );
            }}
            onRowClick={({ row, rowIndex }) => {
              console.log("Row clicked:", row, "at index:", rowIndex);
            }}
            ariaLabel="Task progress tracking grid"
            emptyMessage="No tasks found"
            idPlaceholder="Enter task name"
          />
        </div>

        {/* Task tracking grid borderless */}
        <div style={{ margin: "20px 0" }}>
          <h3>Task Progress Tracker (Borderless)</h3>
          <DateGrid
            rows={dateGridData}
            dates={[
              "2024-01-15",
              "2024-01-16",
              "2024-01-17",
              "2024-01-18",
              "2024-01-19",
            ]}
            variant={GridVariant.BORDERLESS}
            onIdChange={(rowIndex, newId) => {
              setDateGridData((prev) =>
                prev.map((row, index) =>
                  index === rowIndex ? { ...row, id: newId } : row
                )
              );
            }}
            onBubbleChange={(rowIndex, date, bubbleState) => {
              setDateGridData((prev) =>
                prev.map((row, index) =>
                  index === rowIndex ? { ...row, [date]: bubbleState } : row
                )
              );
            }}
            onRowClick={({ row, rowIndex }) => {
              console.log("Row clicked:", row, "at index:", rowIndex);
            }}
            ariaLabel="Task progress tracking grid borderless"
            emptyMessage="No tasks found"
            idPlaceholder="Enter task name"
          />
        </div>

        {/* DateGrid with blank ID header */}
        <div style={{ margin: "20px 0" }}>
          <h3>DateGrid with Blank ID Header</h3>
          <DateGrid
            rows={dateGridData}
            dates={[
              "2024-01-15",
              "2024-01-16",
              "2024-01-17",
              "2024-01-18",
              "2024-01-19",
            ]}
            showIdHeader={true} // Shows ID column with blank header
            onIdChange={(rowIndex, newId) => {
              setDateGridData((prev) =>
                prev.map((row, index) =>
                  index === rowIndex ? { ...row, id: newId } : row
                )
              );
            }}
            onBubbleChange={(rowIndex, date, bubbleState) => {
              setDateGridData((prev) =>
                prev.map((row, index) =>
                  index === rowIndex ? { ...row, [date]: bubbleState } : row
                )
              );
            }}
            ariaLabel="Date grid with blank ID header"
            emptyMessage="No data available"
          />
        </div>

        {/* DateGrid with custom ID column width */}
        <div style={{ margin: "20px 0" }}>
          <h3>DateGrid with 50% ID Column Width</h3>
          <DateGrid
            rows={dateGridData}
            dates={[
              "2024-01-15",
              "2024-01-16",
              "2024-01-17",
              "2024-01-18",
              "2024-01-19",
            ]}
            idColumnWidth={50} // ID takes 50%, dates share remaining 50%
            onIdChange={(rowIndex, newId) => {
              setDateGridData((prev) =>
                prev.map((row, index) =>
                  index === rowIndex ? { ...row, id: newId } : row
                )
              );
            }}
            onBubbleChange={(rowIndex, date, bubbleState) => {
              setDateGridData((prev) =>
                prev.map((row, index) =>
                  index === rowIndex ? { ...row, [date]: bubbleState } : row
                )
              );
            }}
            ariaLabel="Date grid with 50% ID column width"
            emptyMessage="No data available"
          />
        </div>

        {/* DateGrid with localized dates */}
        <div style={{ margin: "20px 0" }}>
          <h3>DateGrid with Localized Dates (US Format)</h3>
          <DateGrid
            rows={dateGridData}
            dates={[
              "2024-01-15",
              "2024-01-16",
              "2024-01-17",
              "2024-01-18",
              "2024-01-19",
            ]}
            locale="en-US"
            dateFormat={{ month: "short", day: "numeric" }}
            onIdChange={(rowIndex, newId) => {
              setDateGridData((prev) =>
                prev.map((row, index) =>
                  index === rowIndex ? { ...row, id: newId } : row
                )
              );
            }}
            onBubbleChange={(rowIndex, date, bubbleState) => {
              setDateGridData((prev) =>
                prev.map((row, index) =>
                  index === rowIndex ? { ...row, [date]: bubbleState } : row
                )
              );
            }}
            ariaLabel="Date grid with US localized dates"
            emptyMessage="No data available"
          />
        </div>

        {/* DateGrid with different locale */}
        <div style={{ margin: "20px 0" }}>
          <h3>DateGrid with Localized Dates (German Format)</h3>
          <DateGrid
            rows={dateGridData}
            dates={[
              "2024-01-15",
              "2024-01-16",
              "2024-01-17",
              "2024-01-18",
              "2024-01-19",
            ]}
            locale="de-DE"
            dateFormat={{ day: "numeric", month: "short" }}
            onIdChange={(rowIndex, newId) => {
              setDateGridData((prev) =>
                prev.map((row, index) =>
                  index === rowIndex ? { ...row, id: newId } : row
                )
              );
            }}
            onBubbleChange={(rowIndex, date, bubbleState) => {
              setDateGridData((prev) =>
                prev.map((row, index) =>
                  index === rowIndex ? { ...row, [date]: bubbleState } : row
                )
              );
            }}
            ariaLabel="Date grid with German localized dates"
            emptyMessage="No data available"
          />
        </div>

        {/* DateGrid with 30% ID column width */}
        <div style={{ margin: "20px 0" }}>
          <h3>DateGrid with 30% ID Column Width</h3>
          <DateGrid
            rows={dateGridData}
            dates={[
              "2024-01-15",
              "2024-01-16",
              "2024-01-17",
              "2024-01-18",
              "2024-01-19",
            ]}
            idColumnWidth={30} // ID takes 30%, dates share remaining 70%
            onIdChange={(rowIndex, newId) => {
              setDateGridData((prev) =>
                prev.map((row, index) =>
                  index === rowIndex ? { ...row, id: newId } : row
                )
              );
            }}
            onBubbleChange={(rowIndex, date, bubbleState) => {
              setDateGridData((prev) =>
                prev.map((row, index) =>
                  index === rowIndex ? { ...row, [date]: bubbleState } : row
                )
              );
            }}
            ariaLabel="Date grid with 30% ID column width"
            emptyMessage="No data available"
          />
        </div>

        {/* DateGrid without ID column at all */}
        <div style={{ margin: "20px 0" }}>
          <h3>DateGrid without ID Column</h3>
          <DateGrid
            rows={dateGridData}
            dates={[
              "2024-01-15",
              "2024-01-16",
              "2024-01-17",
              "2024-01-18",
              "2024-01-19",
            ]}
            showIdHeader={false} // Completely hides ID column
            onBubbleChange={(rowIndex, date, bubbleState) => {
              setDateGridData((prev) =>
                prev.map((row, index) =>
                  index === rowIndex ? { ...row, [date]: bubbleState } : row
                )
              );
            }}
            ariaLabel="Date grid without ID column"
            emptyMessage="No data available"
          />
        </div>

        {/* Empty date grid example */}
        <div style={{ margin: "20px 0" }}>
          <h3>Empty DateGrid</h3>
          <DateGrid
            rows={[]}
            dates={["2024-01-15", "2024-01-16", "2024-01-17"]}
            ariaLabel="Empty date grid"
            emptyMessage="No data available"
          />
        </div>
      </div>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
