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

function post(payload) {
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

// Name / course / phone a visitor gave the chat, remembered so they aren't asked again.
export const LEAD_KEY = "amaltas-assistant-lead";

export function loadLead() {
  try {
    const lead = JSON.parse(localStorage.getItem(LEAD_KEY));
    return lead?.name && lead?.phone ? lead : null;
  } catch {
    return null;
  }
}

export function saveLead(details) {
  try {
    localStorage.setItem(LEAD_KEY, JSON.stringify(details));
  } catch {}
}

// Phone field input filter: keeps only digits, drops a pasted +91 / 0 prefix,
// and caps the value at 10 digits.
export function digitsOnly(raw) {
  let d = raw.replace(/\D/g, "");
  if (d.length > 10) d = d.replace(/^(91|0)/, "");
  return d.slice(0, 10);
}

// Shared by the chat and brochure forms. Returns { field: message } for each problem.
export function validateLead({ name, course, phone }) {
  const errors = {};
  if (!name) errors.name = "Please enter your name.";
  else if (!/^[\p{L}\p{M} .']+$/u.test(name)) errors.name = "Name can contain letters only.";
  else if (name.replace(/[ .']/g, "").length < 2) errors.name = "Please enter your full name.";
  if (!course) errors.course = "Please choose a course.";
  if (!phone) errors.phone = "Please enter your mobile number.";
  else if (phone.length !== 10) errors.phone = `Mobile number must be exactly 10 digits (${phone.length} entered).`;
  else if (!/^[6-9]/.test(phone)) errors.phone = "Please enter a valid mobile number starting with 6, 7, 8 or 9.";
  return errors;
}

// The details a visitor gives before chatting — sent unredacted, to the "Leads" sheet.
export function logLead({ name, course, phone }) {
  if (!chatLoggingEnabled) return;
  post({
    type: "lead",
    sessionId: sessionId(),
    name,
    course,
    phone,
    page: window.location.pathname,
    device: window.matchMedia?.("(max-width: 640px)").matches ? "mobile" : "desktop",
    clientTime: new Date().toISOString(),
  });
}

// A brochure download request — its own "Brochure Downloads" sheet. `trigger` says
// which entry point the visitor used ("hero button" / "scroll popup").
export function logBrochureLead({ name, course, phone }, trigger) {
  if (!chatLoggingEnabled) return;
  post({
    type: "brochure",
    trigger,
    sessionId: sessionId(),
    name,
    course,
    phone,
    page: window.location.pathname,
    device: window.matchMedia?.("(max-width: 640px)").matches ? "mobile" : "desktop",
    clientTime: new Date().toISOString(),
  });
}

export function logChat({ question, answer, meta, lead }) {
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
    name: lead?.name || "",
    course: lead?.course || "",
    phone: lead?.phone || "",
  };
  post(payload);
}
