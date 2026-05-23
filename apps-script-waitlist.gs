/**
 * Zeeb waitlist — Google Apps Script Web App.
 *
 * SETUP (one time, ~3 minutes):
 *   1. Create a new Google Sheet. Name the first tab "Waitlist".
 *      Row 1, column A = "Timestamp"
 *      Row 1, column B = "Email"
 *   2. Extensions → Apps Script. Delete everything in the editor.
 *   3. Paste this entire file. Save.
 *   4. Click "Deploy" → "New deployment".
 *      • Type: Web app
 *      • Execute as: Me
 *      • Who has access: Anyone
 *      Click Deploy. Authorize when prompted.
 *   5. Copy the "Web app URL" Google gives you.
 *      Paste it into zeeb-app.jsx where it says
 *        const ZEEB_WAITLIST_ENDPOINT = "PASTE_YOUR_APPS_SCRIPT_URL_HERE";
 *
 * Every submission from the site appends one row: timestamp + email.
 */

function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Waitlist") || ss.getActiveSheet();

    var email = (e && e.parameter && e.parameter.email) || "";
    var ts    = (e && e.parameter && e.parameter.timestamp) || new Date().toISOString();

    // Basic email sanity check — discards obvious junk.
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return _json({ ok: false, error: "invalid_email" });
    }

    sheet.appendRow([ts, email]);
    return _json({ ok: true });
  } catch (err) {
    return _json({ ok: false, error: String(err) });
  }
}

// Optional: lets you sanity-check the URL in a browser tab.
function doGet() {
  return _json({ ok: true, ping: "zeeb-waitlist" });
}

function _json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
