import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  document
    .querySelector("iframe#zoom-embeddable-phone-iframe")
    .contentWindow.postMessage(
      {
        type: "zp-init-config",
        data: {
          enableSavingLog: false,
          enableAutoLog: false,
          enableContactSearching: true,
          enableContactMatching: true,
          notePageConfiguration: [
            {
              fieldName: "Disposition",
              fieldType: "select",
              selectOptions: [
                {
                  label: "mock_label_1",
                  value: "mock_value_1",
                },
                {
                  label: "mock_label_2",
                  value: "mock_value_2",
                },
                {
                  label: "mock_label_3",
                  value: "mock_value_3",
                },
              ],
              placeholder: "Select an Option",
            },
            {
              fieldName: "Description",
              fieldType: "text",
              placeholder: "Enter notes",
            },
          ],
          // Optional. Build your note page with the fields listed in "Add notes" section
        },
      },
      "https://applications.zoom.us"
    );

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
