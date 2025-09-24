# Grid Component Planning Document - MVP Version

## Overview

A simple, minimal Grid component that takes columns as props in the format `Record<string, object>`. The string key represents the column header, and the object contains either a string for text content or a `renderCell` function for custom React components.

## Component Architecture

### Core Structure

```
Grid/
├── Grid.tsx                 # Main component
├── Grid.module.css         # Minimal component styles
└── Grid.types.ts           # Simplified TypeScript interfaces
```

## Column Structure

The Grid component uses a simple `Record<string, object>` structure where:

- **String Key**: Column header text
- **Object Value**: Contains either:
  - `string`: Text content to display in cells
  - `renderCell`: Function that returns a React component

### Data Structure

The number of rows is determined by the number of objects in the data array. Each object should have properties that match the column keys.

### Examples

```typescript
// Example data structure
const userData = [
  { id: 1, name: "John Doe", email: "john@example.com", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Inactive" },
];

// Column definitions using Record<string, object> structure
const columns = {
  Name: "name", // String value - displays the 'name' property from each row
  Email: "email", // String value - displays the 'email' property from each row
  Status: "status", // String value - displays the 'status' property from each row
  Actions: {
    renderCell: (rowData: unknown) => (
      <div>
        <button onClick={() => editUser((rowData as any).id)}>Edit</button>
        <button onClick={() => deleteUser((rowData as any).id)}>Delete</button>
      </div>
    ),
  },
};

// Usage
<Grid columns={columns} data={userData} />;
```

### Column Object Structure

```typescript
// For text columns - just provide the property name as a string
"Column Header": "propertyName"

// For custom rendered columns - provide an object with renderCell function
"Column Header": {
  renderCell: (rowData: unknown) => React.ReactNode
}
```

## TypeScript Interfaces

### Core Types

```typescript
// Column definition - can be either a string (property name) or an object with renderCell
type ColumnDefinition =
  | string
  | {
      renderCell: (rowData: unknown) => React.ReactNode;
    };

// Grid columns structure - Record where key is header name, value is column definition
type GridColumns = Record<string, ColumnDefinition>;

// Grid Props
interface GridProps {
  columns: GridColumns; // Required: Column definitions
  data: unknown[]; // Required: Row data array
  className?: string; // Optional: Custom CSS class
}
```

## Component Features - MVP

### Core Features

1. **Basic Grid Rendering**

   - Simple table-like layout
   - Column headers from Record keys
   - Row rendering with data
   - Minimal styling

2. **Data Display**

   - String text display (default)
   - Custom cell renderers via renderCell function
   - Dynamic row count based on data array length

3. **Simple Structure**
   - No sorting, filtering, or pagination
   - No complex state management
   - Minimal CSS for basic table appearance

## Styling Strategy - MVP

### Minimal CSS Approach

- Simple table-based layout
- Basic border and spacing
- No complex responsive design
- Minimal styling for clean appearance

### Key Style Classes

```css
.grid {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ddd;
}

.grid__header {
  background-color: #f5f5f5;
  font-weight: bold;
  padding: 8px;
  border: 1px solid #ddd;
}

.grid__cell {
  padding: 8px;
  border: 1px solid #ddd;
}
```

## State Management - MVP

### No Internal State

The MVP Grid component is stateless and purely presentational. It receives data and columns as props and renders them without any internal state management.

## Dependencies

### Required

- React 18+
- TypeScript 4.9+
- CSS Modules support

## Implementation

### Simple Structure

The component will be implemented as a simple functional component that:

1. Takes `columns` and `data` as props
2. Renders a table with headers from column keys
3. Renders rows with data from the data array
4. Handles both string and renderCell column definitions

## Conclusion

This MVP Grid component provides a simple, minimal foundation for data display with:

- **Simple**: Easy to understand and use
- **Flexible**: Supports both text and custom rendered cells
- **Minimal**: No complex features or dependencies
- **Clean**: Basic styling for professional appearance
