/**
 * Amaltas Assistant — chat log receiver (Google Apps Script web app).
 *
 * Setup: open your Google Sheet → Extensions → Apps Script, paste this file,
 * then Deploy → New deployment → Web app (Execute as: Me, Who has access: Anyone).
 * Put the /exec URL in the site's .env as VITE_CHAT_LOG_URL and rebuild.
 */

const LOG_SHEET = "Chat Log";
const LEADS_SHEET = "Leads";
const UNANSWERED_SHEET = "Unanswered";
const BROCHURE_SHEET = "Brochure Downloads";
const HEADERS = [
  "Received At", "Session ID", "Turn", "Page", "Question", "Answer",
  "Topic", "Answered", "Courses", "Device", "Language", "Client Time",
  "Name", "Course Interested", "Contact Number",
];
const LEAD_HEADERS = [
  "Received At", "Session ID", "Name", "Course", "Phone", "Page", "Device", "Client Time",
];
const BROCHURE_HEADERS = [
  "Received At", "Name", "Course Interested", "Contact Number", "Trigger", "Page", "Device", "Session ID", "Client Time",
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    const clip = (v, n) => String(v == null ? "" : v).slice(0, n);
    // A leading = + - @ would make Sheets treat visitor text as a formula.
    const safe = (v, n) => clip(v, n).replace(/^[=+\-@]/, "'$&");

    if (data.type === "lead") {
      if (!data.sessionId || !data.name || !data.phone) return respond({ ok: false, error: "invalid" });
      lock.waitLock(10000);
      sheet_(LEADS_SHEET, LEAD_HEADERS).appendRow([
        new Date(),
        clip(data.sessionId, 64),
        safe(data.name, 80),
        safe(data.course, 80),
        safe(data.phone, 20),
        safe(data.page, 200),
        clip(data.device, 20),
        clip(data.clientTime, 40),
      ]);
      return respond({ ok: true });
    }

    if (data.type === "brochure") {
      if (!data.sessionId || !data.name || !data.phone) return respond({ ok: false, error: "invalid" });
      lock.waitLock(10000);
      sheet_(BROCHURE_SHEET, BROCHURE_HEADERS).appendRow([
        new Date(),
        safe(data.name, 80),
        safe(data.course, 80),
        safe(data.phone, 20),
        clip(data.trigger, 30),
        safe(data.page, 200),
        clip(data.device, 20),
        clip(data.sessionId, 64),
        clip(data.clientTime, 40),
      ]);
      return respond({ ok: true });
    }

    if (!data.sessionId || !data.question) return respond({ ok: false, error: "invalid" });
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
      safe(data.name, 80),
      safe(data.course, 80),
      safe(data.phone, 20),
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
  return respond({ ok: true, service: "amaltas-chat-log", version: 4 });
}

// Run once from the Apps Script editor (select setupSheets → Run) to create the
// tabs and add any missing header columns without waiting for a visitor.
function setupSheets() {
  sheet_(LOG_SHEET);
  sheet_(UNANSWERED_SHEET);
  sheet_(LEADS_SHEET, LEAD_HEADERS);
  sheet_(BROCHURE_SHEET, BROCHURE_HEADERS);
}

function sheet_(name, headers) {
  headers = headers || HEADERS;
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.appendRow(headers);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, headers.length).setFontWeight("bold");
  } else if (sh.getLastColumn() < headers.length) {
    // Sheets created before a column was added get the new header cells appended.
    sh.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight("bold");
  }
  return sh;
}

function respond(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
