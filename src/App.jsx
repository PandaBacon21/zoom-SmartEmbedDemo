import "./App.css";
import CallLog from "./Components/CallLog";

function App() {
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

  const phoneNumber = "<PhoneNumberHere>";

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
        <h1>Smart Embed Demo</h1>
        <h2>Click to Call Me Here:</h2>
        <h2>
          <a id="phone-number" onClick={clickToDial}>
            {phoneNumber}
          </a>
        </h2>
        <CallLog />
      </div>
    </>
  );
}

export default App;
