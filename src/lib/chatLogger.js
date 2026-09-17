// Sends each assistant exchange to a Google Sheet via an Apps Script web app
// (see scripts/chat-log-apps-script.gs). Disabled unless VITE_CHAT_LOG_URL is set.
const ENDPOINT = import.meta.env.VITE_CHAT_LOG_URL || "";
const MAX_LOGS_PER_SESSION = 80;

export const chatLoggingEnabled = /^https:\/\/script\.google\.com\//.test(ENDPOINT);

let sent = 0;
let turn = 0;

function sessionId() {
  const key = "amaltas-chat-session";
  try {
    let id = sessionStorage.getItem(key);
    if (!id) {
      id = crypto.randomUUID?.() || `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
      sessionStorage.setItem(key, id);
    }
    return id;
  } catch {
    return "no-storage";
  }
}

// Visitors are told not to share personal details, but mask them anyway.
export function redact(text) {
  return String(text)
    .replace(/[\w.+-]+@[\w-]+(\.[\w-]+)+/g, "[email]")
    .replace(/(?:\+?\d[\s-]?){8,}\d/g, "[number]");
}

const plain = (text) => text.replace(/\*\*/g, "").replace(/\s*\n\s*/g, " | ").slice(0, 600);

export function logChat({ question, answer, meta }) {
  if (!chatLoggingEnabled || sent >= MAX_LOGS_PER_SESSION) return;
  sent += 1;
  turn += 1;
  const payload = {
    sessionId: sessionId(),
    turn,
    page: window.location.pathname,
    question: redact(question).slice(0, 300),
    answer: redact(plain(answer)),
    topic: meta?.topic || "",
    answered: meta?.answered !== false,
    courses: meta?.courses || "",
    device: window.matchMedia?.("(max-width: 640px)").matches ? "mobile" : "desktop",
    language: /[ऀ-ॿ]/.test(question) ? "hindi" : "english",
    clientTime: new Date().toISOString(),
  };
  // text/plain keeps this a "simple" request, so the browser skips the CORS
  // preflight that Apps Script can't answer; the response is opaque and ignored.
  fetch(ENDPOINT, {
    method: "POST",
    mode: "no-cors",
    keepalive: true,
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  }).catch(() => {});
}
