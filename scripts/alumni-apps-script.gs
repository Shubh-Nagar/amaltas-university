/**
 * Amaltas Alumni — registration & profile-update backend (Google Apps Script web app).
 *
 * Setup: create a Google Sheet → Extensions → Apps Script, paste this file,
 * then Deploy → New deployment → Web app (Execute as: Me, Who has access: Anyone).
 * Approve the Sheets / Drive / Gmail permissions it asks for. Put the /exec URL in
 * the site's .env.local as VITE_ALUMNI_URL and rebuild.
 *
 * Profile updates are protected by a one-time code emailed to the registered
 * address, so nobody can view or change a profile without access to that inbox.
 *
 * Actions (POST body is JSON, sent as text/plain):
 *   register    { profile, photo? }  → { ok, id }
 *   requestCode { email }            → { ok }            (same reply whether or not the email is registered)
 *   verify      { email, code }      → { ok, token, profile }
 *   update      { token, profile, photo? } → { ok }
 *   search      { letter? | first? | last? | year?, institute? } → { ok, members, more }
 *               Only alumni who opted in are returned, and only DIRECTORY_FIELDS.
 */

const SHEET_NAME = "Alumni";
const PHOTO_FOLDER = "Amaltas Alumni Photos";
const ORG_NAME = "Amaltas University Alumni";

// Sheet columns, in order. `key` matches the field names the website sends.
const COLUMNS = [
  { key: "id", header: "Alumni ID" },
  { key: "registeredAt", header: "Registered At" },
  { key: "updatedAt", header: "Updated At" },
  { key: "first_name", header: "First Name", max: 60, required: true },
  { key: "last_name", header: "Last Name", max: 60, required: true },
  { key: "institute", header: "Institute", max: 80, required: true },
  { key: "batch", header: "Batch & Year of Admission", max: 60, required: true },
  { key: "dob", header: "Date of Birth", max: 10, required: true },
  { key: "email", header: "Email", max: 120, required: true },
  { key: "phone", header: "Phone", max: 15, required: true },
  { key: "spouse", header: "Wife / Husband Name", max: 80 },
  { key: "anniversary", header: "Date of Anniversary", max: 10 },
  { key: "status", header: "Present Status", max: 160, required: true },
  { key: "qualifications", header: "Qualifications", max: 160, required: true },
  { key: "present_address", header: "Present Address", max: 400, required: true },
  { key: "permanent_address", header: "Permanent Address", max: 400 },
  { key: "achievements", header: "Achievements", max: 1500 },
  { key: "photo", header: "Photo" },
  // Opt-in for the public member directory ("Yes" or blank). Keep it last so
  // sheets created before it was added only gain a column at the end.
  { key: "directory", header: "Show in Directory", max: 3 },
];
// The only fields the public member directory ever returns.
const DIRECTORY_FIELDS = ["first_name", "last_name", "institute", "batch", "status"];
const MAX_RESULTS = 100;
const EDITABLE = COLUMNS.filter((c) => c.max && c.key !== "email");

const CODE_TTL = 10 * 60;      // seconds an emailed code stays valid
const SESSION_TTL = 30 * 60;   // seconds a verified session can save changes
const MAX_CODE_TRIES = 5;      // wrong codes allowed before a new one is needed
const MAX_CODES_PER_HOUR = 5;  // codes one address can request per hour
const MAX_PHOTO_BYTES = 2 * 1024 * 1024;

function doPost(e) {
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    switch (data.action) {
      case "register": return respond(register_(data));
      case "requestCode": return respond(requestCode_(data));
      case "verify": return respond(verify_(data));
      case "update": return respond(update_(data));
      case "search": return respond(search_(data));
      default: return respond({ ok: false, error: "Unknown request." });
    }
  } catch (err) {
    console.error(err);
    return respond({ ok: false, error: "Something went wrong. Please try again." });
  }
}

function doGet() {
  return respond({ ok: true, service: "amaltas-alumni" });
}

/* ── actions ─────────────────────────────────────────────────────────── */

function register_(data) {
  const profile = clean_(data.profile, true);
  if (profile.error) return { ok: false, error: profile.error };

  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    const sheet = sheet_();
    if (findRow_(sheet, profile.email)) {
      return { ok: false, error: "This email is already registered. Use Update Profile to change your details." };
    }
    const id = nextId_(sheet);
    const now = new Date();
    const record = Object.assign({}, profile, { id: id, registeredAt: now, updatedAt: now, photo: "" });
    if (data.photo) {
      const url = savePhoto_(data.photo, id);
      if (url && url.error) return { ok: false, error: url.error };
      record.photo = url || "";
    }
    sheet.appendRow(COLUMNS.map((c) => toCell_(record[c.key])));
    return { ok: true, id: id };
  } finally {
    lock.releaseLock();
  }
}

function requestCode_(data) {
  const email = normEmail_(data.email);
  if (!email) return { ok: false, error: "Please enter a valid email address." };

  const cache = CacheService.getScriptCache();
  const countKey = "count:" + email;
  const count = Number(cache.get(countKey) || 0);
  if (count >= MAX_CODES_PER_HOUR) {
    return { ok: false, error: "Too many codes requested. Please try again in an hour." };
  }
  cache.put(countKey, String(count + 1), 3600);

  const row = findRow_(sheet_(), email);
  if (row) {
    const code = String(Math.floor(100000 + Math.random() * 900000));
    cache.put("code:" + email, JSON.stringify({ code: code, tries: 0 }), CODE_TTL);
    MailApp.sendEmail({
      to: email,
      subject: "Your Amaltas Alumni verification code: " + code,
      name: ORG_NAME,
      body:
        "Dear " + row.record.first_name + ",\n\n" +
        "Your code to update your Amaltas University alumni profile is: " + code + "\n\n" +
        "It is valid for 10 minutes. If you did not ask for this, you can ignore this email.\n\n" +
        "— " + ORG_NAME,
    });
  }
  // Same reply either way, so the form can't be used to discover who is registered.
  return { ok: true };
}

function verify_(data) {
  const email = normEmail_(data.email);
  const code = String(data.code || "").trim();
  if (!email || !/^\d{6}$/.test(code)) return { ok: false, error: "Enter the 6-digit code from your email." };

  const cache = CacheService.getScriptCache();
  const key = "code:" + email;
  const saved = JSON.parse(cache.get(key) || "null");
  if (!saved) return { ok: false, error: "This code has expired. Please request a new one." };
  if (saved.code !== code) {
    saved.tries += 1;
    if (saved.tries >= MAX_CODE_TRIES) {
      cache.remove(key);
      return { ok: false, error: "Too many wrong attempts. Please request a new code." };
    }
    cache.put(key, JSON.stringify(saved), CODE_TTL);
    return { ok: false, error: "That code is not correct. Please check and try again." };
  }
  cache.remove(key);

  const row = findRow_(sheet_(), email);
  if (!row) return { ok: false, error: "No profile found for this email." };
  const token = Utilities.getUuid();
  cache.put("session:" + token, email, SESSION_TTL);
  return { ok: true, token: token, profile: publicProfile_(row.record) };
}

function update_(data) {
  const cache = CacheService.getScriptCache();
  const email = cache.get("session:" + String(data.token || ""));
  if (!email) return { ok: false, error: "Your session has expired. Please verify your email again." };

  const profile = clean_(data.profile, false);
  if (profile.error) return { ok: false, error: profile.error };

  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    const sheet = sheet_();
    const row = findRow_(sheet, email);
    if (!row) return { ok: false, error: "No profile found for this email." };
    const record = Object.assign({}, row.record, profile, { email: email, updatedAt: new Date() });
    if (data.photo) {
      const url = savePhoto_(data.photo, record.id);
      if (url && url.error) return { ok: false, error: url.error };
      record.photo = url || record.photo;
    }
    sheet.getRange(row.index, 1, 1, COLUMNS.length).setValues([COLUMNS.map((c) => toCell_(record[c.key]))]);
    return { ok: true, profile: publicProfile_(record) };
  } finally {
    lock.releaseLock();
  }
}

function search_(data) {
  const letter = String(data.letter || "").trim().toUpperCase();
  const first = String(data.first || "").trim().toLowerCase().slice(0, 60);
  const last = String(data.last || "").trim().toLowerCase().slice(0, 60);
  const year = String(data.year || "").trim();
  const institute = String(data.institute || "").trim();

  if (letter && !/^[A-Z]$/.test(letter)) return { ok: false, error: "Choose a letter from A to Z." };
  if (year && !/^(19|20)\d{2}$/.test(year)) return { ok: false, error: "Enter a 4-digit year, e.g. 2018." };
  if ((first && first.length < 2) || (last && last.length < 2)) return { ok: false, error: "Type at least 2 letters of the name." };
  if (!letter && !first && !last && !year) return { ok: false, error: "Choose a letter, a year or a name to search." };

  const values = sheet_().getDataRange().getValues();
  const idx = {};
  COLUMNS.forEach((c, j) => { idx[c.key] = j; });
  const get = (row, key) => fromCell_(row[idx[key]]).trim();

  const members = [];
  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    if (get(row, "directory") !== "Yes") continue;
    const fn = get(row, "first_name").toLowerCase();
    const ln = get(row, "last_name").toLowerCase();
    if (letter && ln.charAt(0).toUpperCase() !== letter) continue;
    if (first && fn.indexOf(first) !== 0) continue;
    if (last && ln.indexOf(last) !== 0) continue;
    if (year && !new RegExp("\\b" + year + "\\b").test(get(row, "batch"))) continue;
    if (institute && get(row, "institute") !== institute) continue;
    const m = {};
    DIRECTORY_FIELDS.forEach((k) => { m[k] = get(row, k); });
    members.push(m);
  }
  members.sort((a, b) => (a.last_name + " " + a.first_name).localeCompare(b.last_name + " " + b.first_name));
  return { ok: true, members: members.slice(0, MAX_RESULTS), more: members.length > MAX_RESULTS };
}

/* ── helpers ─────────────────────────────────────────────────────────── */

function clean_(input, withEmail) {
  const src = input || {};
  const out = {};
  const cols = withEmail ? COLUMNS.filter((c) => c.max) : EDITABLE;
  for (const c of cols) {
    const v = String(src[c.key] == null ? "" : src[c.key]).trim().slice(0, c.max);
    if (c.required && !v) return { error: "Please fill in " + c.header + "." };
    out[c.key] = v;
  }
  if (withEmail) {
    out.email = normEmail_(out.email);
    if (!out.email) return { error: "Please enter a valid email address." };
  }
  if (!/^\d{10}$/.test(out.phone)) return { error: "Please enter a 10-digit phone number." };
  out.directory = out.directory === "Yes" ? "Yes" : "";
  for (const k of ["dob", "anniversary"]) {
    if (out[k] && !/^\d{4}-\d{2}-\d{2}$/.test(out[k])) return { error: "Please enter a valid date." };
  }
  return out;
}

function normEmail_(v) {
  const email = String(v || "").trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 120 ? email : "";
}

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(COLUMNS.map((c) => c.header));
    sheet.setFrozenRows(1);
    // Plain text, so phone numbers keep leading zeros and dates stay yyyy-mm-dd.
    sheet.getRange("A:Z").setNumberFormat("@");
  } else if (sheet.getLastColumn() < COLUMNS.length) {
    // Sheet predates a newer column: bring the header row up to date.
    sheet.getRange(1, 1, 1, COLUMNS.length).setValues([COLUMNS.map((c) => c.header)]);
  }
  return sheet;
}

function findRow_(sheet, email) {
  const values = sheet.getDataRange().getValues();
  const col = COLUMNS.findIndex((c) => c.key === "email");
  for (let i = 1; i < values.length; i++) {
    if (String(values[i][col]).trim().toLowerCase() === email) {
      const record = {};
      COLUMNS.forEach((c, j) => { record[c.key] = fromCell_(values[i][j]); });
      return { index: i + 1, record: record };
    }
  }
  return null;
}

function nextId_(sheet) {
  const year = new Date().getFullYear();
  return "AUA-" + year + "-" + String(sheet.getLastRow()).padStart(4, "0");
}

function publicProfile_(record) {
  const out = { id: record.id, email: record.email, hasPhoto: Boolean(record.photo) };
  EDITABLE.forEach((c) => { out[c.key] = record[c.key] || ""; });
  return out;
}

// A leading = + - @ would make Sheets treat visitor text as a formula.
function toCell_(v) {
  if (v instanceof Date) return Utilities.formatDate(v, Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss");
  return String(v == null ? "" : v).replace(/^[=+\-@]/, "'$&");
}

function fromCell_(v) {
  if (v instanceof Date) return Utilities.formatDate(v, Session.getScriptTimeZone(), "yyyy-MM-dd");
  return String(v == null ? "" : v);
}

function savePhoto_(photo, id) {
  const type = String(photo.type || "");
  if (!/^image\/(jpeg|png|webp)$/.test(type)) return { error: "Photo must be a JPG, PNG or WebP image." };
  const bytes = Utilities.base64Decode(String(photo.data || ""));
  if (!bytes.length || bytes.length > MAX_PHOTO_BYTES) return { error: "Photo must be smaller than 2 MB." };
  const ext = type.split("/")[1].replace("jpeg", "jpg");
  const blob = Utilities.newBlob(bytes, type, id + "." + ext);
  return folder_().createFile(blob).getUrl(); // stays private to the sheet owner
}

function folder_() {
  const found = DriveApp.getFoldersByName(PHOTO_FOLDER);
  return found.hasNext() ? found.next() : DriveApp.createFolder(PHOTO_FOLDER);
}

function respond(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
