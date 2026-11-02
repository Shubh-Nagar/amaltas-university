// Talks to the alumni Google Apps Script web app (see scripts/alumni-apps-script.gs).
// Disabled unless VITE_ALUMNI_URL is set.
const ENDPOINT = import.meta.env.VITE_ALUMNI_URL || "";

export const alumniApiEnabled = /^https:\/\/script\.google\.com\//.test(ENDPOINT);

export const MAX_PHOTO_BYTES = 2 * 1024 * 1024;

export async function alumniRequest(action, payload = {}) {
  let res;
  try {
    // text/plain keeps this a "simple" request, so the browser skips the CORS
    // preflight that Apps Script can't answer; Apps Script still returns readable JSON.
    res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ action, ...payload }),
    });
  } catch {
    return { ok: false, error: "Couldn't reach the server. Check your connection and try again." };
  }
  try {
    return await res.json();
  } catch {
    return { ok: false, error: "The server sent an unexpected reply. Please try again." };
  }
}

// Directory lookups repeat often while browsing (A–Z, back and forth), so keep
// each answer for the rest of the visit instead of hitting Apps Script again.
const searchCache = new Map();
export async function searchMembers(filters) {
  const key = JSON.stringify(filters);
  if (searchCache.has(key)) return searchCache.get(key);
  const res = await alumniRequest("search", filters);
  if (res.ok) searchCache.set(key, res);
  return res;
}

// Reads an image File into { name, type, data } with base64 data, as the script expects.
export function readPhoto(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve({ name: file.name, type: file.type, data: String(reader.result).split(",")[1] || "" });
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
