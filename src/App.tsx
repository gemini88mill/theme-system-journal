import { useState } from "react";
import "./App.css";
import reactLogo from "./assets/react.svg";
import {
  Button,
  ButtonVariant,
  ButtonSize,
} from "./components/atoms/Button/Button";
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
