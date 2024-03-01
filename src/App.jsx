import { useState } from "react";
import "./App.css";
import CallLog from "./Components/CallLog";

function App() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [displayNumber, setDisplayNumber] = useState("");

  const displayPhoneNumber = () => {
    setDisplayNumber(phoneNumber);
  };
  document
    .querySelector("iframe#zoom-embeddable-phone-iframe")
    .contentWindow.postMessage(
      {
        type: "zp-init-config",
        data: {
          enableSavingLog: false,
          enableAutoLog: false,
          enableContactSearching: false,
          enableContactMatching: false,
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

  const clickToDial = () => {
    document
      .querySelector("iframe#zoom-embeddable-phone-iframe")
      .contentWindow.postMessage(
        {
          type: "zp-make-call",
          data: {
            number: phoneNumber,
            // callerId:
            autoDial: true,
          },
        },
        "https://applications.zoom.us"
      );
  };

  return (
    <>
      <div>
        <h1>Zoom Phone Smart Embed Demo</h1>
        {displayNumber === "" ? (
          <>
            {" "}
            <div>
              <label id="input-label">
                Add Phone Number to Test Click to Dial:{" "}
              </label>
              <input
                type="text"
                id="phone-number-input"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <button type="button" className="btn" onClick={displayPhoneNumber}>
              Set Phone Number
            </button>
          </>
        ) : (
          <>
            <h2>Click to Call Here:</h2>
            <h2>
              <a id="phone-number" onClick={clickToDial}>
                {displayNumber}
              </a>
            </h2>
            <button
              type="button"
              className="btn"
              onClick={() => {
                setDisplayNumber("");
              }}
            >
              Clear Phone Number
            </button>
          </>
        )}
        <div id="call-log-container">
          <CallLog />
        </div>
      </div>
    </>
  );
}

export default App;
