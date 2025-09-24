import "./App.css";
import { Grid } from "./components/molecules/Grid/Grid";

function App() {
  // Example data
  const userData = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      status: "Active",
      age: 28,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      status: "Inactive",
      age: 32,
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      status: "Active",
      age: 25,
    },
  ];

  // Example column definitions
  const columns = {
    Name: "name", // String value - displays the 'name' property
    Email: "email", // String value - displays the 'email' property
    Status: "status", // String value - displays the 'status' property
    Age: "age", // String value - displays the 'age' property
    Actions: {
      renderCell: (rowData: unknown) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={() =>
              console.log("Edit user:", (rowData as Record<string, unknown>).id)
            }
            style={{ padding: "4px 8px", fontSize: "12px" }}
          >
            Edit
          </button>
          <button
            onClick={() =>
              console.log(
                "Delete user:",
                (rowData as Record<string, unknown>).id
              )
            }
            style={{ padding: "4px 8px", fontSize: "12px" }}
          >
            Delete
          </button>
        </div>
      ),
    },
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Grid Component Example</h1>

      <h2>Default Grid (30% first column)</h2>
      <Grid columns={columns} data={userData} />

      <h2>Grid with 50% First Column Width</h2>
      <Grid columns={columns} data={userData} firstColumnWidth={50} />

      <h2>Grid with 20% First Column Width</h2>
      <Grid columns={columns} data={userData} firstColumnWidth={20} />

      <h2>Borderless Grid with Custom Width</h2>
      <Grid
        columns={columns}
        data={userData}
        borderless
        firstColumnWidth={40}
      />

      <h2>Grid with Hidden First Column Header and Custom Width</h2>
      <Grid
        columns={columns}
        data={userData}
        hideFirstColumnHeader
        firstColumnWidth={25}
      />
    </div>
  );
}

export default App;
