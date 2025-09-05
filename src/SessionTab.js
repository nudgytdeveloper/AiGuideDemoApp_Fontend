import React from "react";
import { getNewSession } from "./api";

export default function SessionTab({ sessionId, setSessionId, chatData, setChatData }) {
  const handleClick = async () => {
    try {
      const data = await getNewSession();
      if (data.ok) {
        setSessionId(data.sessionId);
        setChatData(data.chatData || "");
      } else {
        alert("Failed to fetch session, ", data);
      }
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div>
      <div className="row"><button className="primary" onClick={handleClick}>Generate</button></div>
      <div className="row"><span className="label">Session ID:</span> <span>{sessionId || "N/A"}</span></div>
      <div className="row"><span className="label">Chat Data:</span> <span>{chatData || "N/A"}</span></div>
      {sessionId ? <div className="row"><div><img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${sessionId}`}></img></div></div> : null}
    </div>
  );
}
