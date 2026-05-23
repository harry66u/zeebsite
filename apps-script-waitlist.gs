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

function _parseParams(e) {
  var email = "", ts = new Date().toISOString();

  // 1. URL params (GET, or POST where body was also query-encoded)
  if (e && e.parameter && e.parameter.email) {
    email = e.parameter.email;
    ts = e.parameter.timestamp || ts;
    return { email: email, ts: ts };
  }

  // 2. Form-encoded POST body (sendBeacon / fetch POST with URLSearchParams)
  if (e && e.postData && e.postData.contents) {
    try {
      var pairs = e.postData.contents.split("&");
      var params = {};
      pairs.forEach(function(pair) {
        var kv = pair.split("=");
        if (kv.length === 2) {
          params[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1].replace(/\+/g, " "));
        }
      });
      if (params.email) {
        email = params.email;
        ts = params.timestamp || ts;
        return { email: email, ts: ts };
      }
    } catch (err) {}
  }

  // 3. JSON body fallback
  if (e && e.postData && e.postData.type === "application/json") {
    try {
      var data = JSON.parse(e.postData.contents);
      if (data.email) {
        email = data.email;
        ts = data.timestamp || ts;
        return { email: email, ts: ts };
      }
    } catch (err) {}
  }

  return { email: "", ts: ts };
}

function doPost(e) {
  try {
    var p = _parseParams(e);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) {
      return _json({ ok: false, error: "invalid_email" });
    }
    var sheet = SpreadsheetApp.getActiveSpreadsheet()
                  .getSheetByName("Waitlist") || SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.appendRow([p.ts, p.email]);
    return _json({ ok: true });
  } catch (err) {
    return _json({ ok: false, error: String(err) });
  }
}

function doGet(e) {
  var p = _parseParams(e);
  if (!p.email) return _json({ ok: true, ping: "zeeb-waitlist" });
  try {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) {
      return _json({ ok: false, error: "invalid_email" });
    }
    var sheet = SpreadsheetApp.getActiveSpreadsheet()
                  .getSheetByName("Waitlist") || SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.appendRow([p.ts, p.email]);
    return _json({ ok: true });
  } catch (err) {
    return _json({ ok: false, error: String(err) });
  }
}

function _json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
