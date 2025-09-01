import React, { useState } from "react";
import SessionTab from "./SessionTab";
import UpdateTab from "./UpdateTab";
import SessionsListTab from "./SessionsListTab";

export default function App() {
  const [active, setActive] = useState("session");
  const [sessionId, setSessionId] = useState("");
  const [chatData, setChatData] = useState("");

  return (
    <div className="App">
      <h1>AIGuide demo App</h1>
      <div className="tabs">
        <button className={active === "session" ? "active" : ""} onClick={() => setActive("session")}>Session</button>
        <button className={active === "update" ? "active" : ""} onClick={() => setActive("update")}>Update ChatData</button>
        <button className={active === "list" ? "active" : ""} onClick={() => setActive("list")}>All Sessions</button>
      </div>

      <div className="panel">
        {active === "session" && (
          <SessionTab sessionId={sessionId} setSessionId={setSessionId} chatData={chatData} setChatData={setChatData} />
        )}
        {active === "update" && (
          <UpdateTab sessionId={sessionId} setChatData={setChatData} />
        )}
        {active === "list" && (
          <SessionsListTab />
        )}
      </div>
      <p className="muted">API Base: {process.env.REACT_APP_API_BASE || "http://localhost:3000"}</p>
    </div>
  );
}
