import React, { useState } from "react";

const CallLog = () => {
  const [status, setStatus] = useState("");
  if (status === "Call Ended") {
    setTimeout(() => {
      setStatus("");
    }, 5000);
  }
  window.addEventListener("message", (e) => {
    const data = e.data;

    if (data) {
      switch (data.type) {
        case "zp-call-ringing-event": // listen to all the event types that you need
          setStatus("Call Ringing");
          console.log("Call Ringing");
          break;
        case "zp-call-connected-event":
          setStatus("Call Connected");
          console.log("Call Connected");
          break;
        case "zp-call-ended-event":
          setStatus("Call Ended");
          console.log("Call Ended");
      }
    }
  });

  return <>{status != "" ? <h4>Call Status: {status}</h4> : null}</>;
};

export default CallLog;
