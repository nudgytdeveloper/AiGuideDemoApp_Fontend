const BASE = process.env.REACT_APP_API_BASE || "http://localhost:3000";

export async function getNewSession() {
  const res = await fetch(`${BASE}/generate`);
  let str = `${BASE}/generate`
  console.debug('string: ', str)
  if (!res.ok) throw new Error(`GET / failed: ${res.status}`)
  console.debug('HERE...')
  return res.json()
}

export async function updateChatData(sessionId, chatData) {
  const res = await fetch(`${BASE}/update?session=${encodeURIComponent(sessionId)}&chatData=${encodeURIComponent(chatData)}`, { method: "POST" });
  if (!res.ok) throw new Error(`POST /update failed: ${res.status}`);
  return res.json();
}

export async function listSessions(limit = 20) {
  const res = await fetch(`${BASE}/?limit=${encodeURIComponent(limit)}`);
  if (!res.ok) throw new Error(`GET /sessions failed: ${res.status}`);
  return res.json();
}
