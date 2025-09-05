import React, { useEffect, useState } from "react";
import { listSessions } from "./api";
import { getDb } from "./firebase";
import {
  collection,
  query as fsQuery,
  orderBy,
  limit as fsLimit,
  onSnapshot,
} from "firebase/firestore";

export default function SessionsListTab() {
  const [limit, setLimit] = useState(20);
  const [items, setItems] = useState([]);
  const [busy, setBusy] = useState(false);
  const [realtime, setRealtime] = useState(false);

  // Realtime subscription if Firebase is configured
  useEffect(() => {
    const db = getDb();
    if (!db) return; // fallback to REST if no Firebase env set
    setBusy(true);
    setRealtime(true);
    const q = fsQuery(
      collection(db, "sessions"),
      orderBy("issuedAt", "desc"),
      fsLimit(Number(limit) || 20)
    );
    const unsub = onSnapshot(
      q,
      (snap) => {
        const arr = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setItems(arr);
        setBusy(false);
      },
      (err) => {
        console.error("Firestore onSnapshot error:", err);
        setBusy(false);
      }
    );
    return () => unsub();
  }, [limit]);

  // One-shot REST load (used when Firebase not configured)
  const load = async () => {
    try {
      setBusy(true);
      const data = await listSessions(limit);
      if (data.ok) setItems(data.sessions || []);
      else alert(data.error || "Failed to list sessions");
    } catch (e) {
      alert(e.message);
    } finally {
      setBusy(false);
    }
  };

  // On mount, if not using realtime, do an initial REST fetch
  useEffect(() => {
    const db = getDb();
    if (!db) load();
  }, [limit]);

  return (
    <div>
      <h2>All Sessions {realtime ? <small>(live)</small> : <small>(manual)</small>}</h2>
      <div className="row">
        <label>
          Limit:&nbsp;
          <input
            type="number"
            value={limit}
            min={1}
            onChange={(e) => setLimit(Number(e.target.value) || 1)}
            style={{ width: 80 }}
          />
        </label>
        {!realtime && (
          <button className="btn" disabled={busy} onClick={load}>
            {busy ? "Loading..." : "Refresh"}
          </button>
        )}
      </div>
      <div className="list">
        {items.length === 0 && <p className="muted">No sessions found.</p>}
        {items.map((s) => (
          <div className="card" key={s.id}>
            <div>
              <strong>ID:</strong> {s.id}
            </div>
            {"issuedAt" in s && (
              <div>
                <strong>issuedAt:</strong>{" "}
                {typeof s.issuedAt?.toDate === "function"
                  ? s.issuedAt.toDate().toISOString()
                  : String(s.issuedAt)}
              </div>
            )}
            {"chatData" in s && (
              <div>
                <strong>chatData:</strong> {String(s.chatData)}
              </div>
            )}
            {s.id ? <div className="row"><div><img src={`https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${s.id}`}></img></div></div> : null}
          </div>
        ))}
      </div>
    </div>
  );
}