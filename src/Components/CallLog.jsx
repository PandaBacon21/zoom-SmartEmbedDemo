import React, { useState } from "react";

const CallLog = () => {
  const [callStatus, setCallStatus] = useState("");
  const [callDetails, setCallDetails] = useState({
    callId: "",
    direction: "",
    caller: {
      name: "",
      phoneNumber: "",
    },
    callee: {
      phoneNumber: "",
    },
    dateTime: "",
    result: "",
  });

  if (callStatus === "Call Ended") {
    setTimeout(() => {
      setCallStatus("");
    }, 5000);
  }
  if (callDetails.callId != "") {
    console.log("Call Details 2");
    console.log(callDetails);
  }
  window.addEventListener("message", (e) => {
    const data = e.data;

    if (data) {
      switch (data.type) {
        case "zp-call-ringing-event": // listen to all the event types that you need
          setCallStatus("Call Ringing");
          console.log("Call Ringing");
          break;
        case "zp-call-connected-event":
          setCallStatus("Call Connected");
          console.log("Call Connected");
          break;
        case "zp-call-ended-event":
          setCallStatus("Call Ended");
          console.log("Call Ended");
          break;
        case "zp-call-log-completed-event":
          console.log("Call Details");
          console.log(data.data);
          setCallDetails({
            ...callDetails,
            callId: data.data.callId,
            direction: data.data.direction,
            caller: {
              name: data.data.caller.name,
              phoneNumber: data.data.caller.didNumber,
            },
            callee: {
              phoneNumber: data.data.callee.number,
            },
            dateTime: data.data.dateTime,
            result: data.data.result,
          });
      }
    }
  });

  return (
    <>
      {callStatus != "" ? (
        <>
          <h3>Call Status: </h3>
          <h4>{callStatus}</h4>
        </>
      ) : null}
      {callDetails.callId != "" ? (
        <div className="call-details">
          <h3>Call Details: </h3>
          <ul>
            <li>Call ID: {callDetails.callId}</li>
            <li>Direction: {callDetails.direction}</li>
            <li>Call Date/Time: {callDetails.dateTime}</li>
            <li>Call Result: {callDetails.result}</li>
            <li>Callee Phone Number: {callDetails.callee.phoneNumber}</li>
            <li>Caller Name: {callDetails.caller.name}</li>
            <li>Caller Phone Number: {callDetails.caller.phoneNumber}</li>
          </ul>
        </div>
      ) : null}
    </>
  );
};

export default CallLog;
