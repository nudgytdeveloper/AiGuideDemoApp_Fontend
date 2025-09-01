import React, { useState } from "react";
import { updateChatData } from "./api";

export default function UpdateTab({ sessionId, setChatData }) {
  const [value, setValue] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    if (!sessionId) {
      alert("No sessionId. Go to the Session tab and click the button first.");
      return;
    }
    if (typeof value !== "string" || !value.length) {
      alert("Enter a non-empty chatData string.");
      return;
    }
    try {
      setBusy(true);
      const data = await updateChatData(sessionId, value);
      if (data.ok) {
        setChatData(data.data?.chatData || "");
        alert("Updated!");
      } else {
        alert(data.error || "Failed to update");
      }
    } catch (e) {
      alert(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <div className="row"><span className="label">Session ID:</span> <span>{sessionId || "N/A"}</span></div>
      <div className="row">
        <input type="text" placeholder="Enter new chatData" value={value} onChange={(e) => setValue(e.target.value)} />
        <button className="primary" onClick={submit} disabled={busy}>{busy ? "Updating..." : "Update ChatData"}</button>
      </div>
    </div>
  );
}
