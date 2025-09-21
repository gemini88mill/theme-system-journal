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
import viteLogo from "/vite.svg";

function App() {
  const [count, setCount] = useState(0);

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
              variant={ButtonVariant.PRIMARY}
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
