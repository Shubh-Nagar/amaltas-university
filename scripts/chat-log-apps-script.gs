/**
 * Amaltas Assistant — chat log receiver (Google Apps Script web app).
 *
 * Setup: open your Google Sheet → Extensions → Apps Script, paste this file,
 * then Deploy → New deployment → Web app (Execute as: Me, Who has access: Anyone).
 * Put the /exec URL in the site's .env as VITE_CHAT_LOG_URL and rebuild.
 */

const LOG_SHEET = "Chat Log";
const UNANSWERED_SHEET = "Unanswered";
const HEADERS = [
  "Received At", "Session ID", "Turn", "Page", "Question", "Answer",
  "Topic", "Answered", "Courses", "Device", "Language", "Client Time",
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    if (!data.sessionId || !data.question) return respond({ ok: false, error: "invalid" });

    const clip = (v, n) => String(v == null ? "" : v).slice(0, n);
    // A leading = + - @ would make Sheets treat visitor text as a formula.
    const safe = (v, n) => clip(v, n).replace(/^[=+\-@]/, "'$&");
    const row = [
      new Date(),
      clip(data.sessionId, 64),
      Number(data.turn) || 0,
      safe(data.page, 200),
      safe(data.question, 300),
      safe(data.answer, 600),
      clip(data.topic, 40),
      data.answered === false ? "No" : "Yes",
      safe(data.courses, 200),
      clip(data.device, 20),
      clip(data.language, 20),
      clip(data.clientTime, 40),
    ];

    lock.waitLock(10000);
    sheet_(LOG_SHEET).appendRow(row);
    if (data.answered === false) sheet_(UNANSWERED_SHEET).appendRow(row);
    return respond({ ok: true });
  } catch (err) {
    return respond({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return respond({ ok: true, service: "amaltas-chat-log" });
}

function sheet_(name) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.appendRow(HEADERS);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
  }
  return sh;
}

function respond(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
