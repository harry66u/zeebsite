# Zeeb

> They took your phone. We gave it back.

Marketing landing page for **Zeeb** — a note-taking device for students whose
schools confiscated their phones. Built as a single static HTML file plus
three React components transpiled in the browser (no build step).

Live: **https://getzeeb.com**

## Run locally

```
python -m http.server 8000
# open http://localhost:8000/
```

No build, no install — `index.html` is the entry point.

## Project layout

```
index.html              entry page — loads React + the JSX modules
zeeb-app.jsx            App + Section 1/2/3 + waitlist form
zeeb-device.jsx         The Zeeb device mockup (Notes + TikTok side, HIDE button)
tweaks-panel.jsx        Hidden dev panel
logos/                  Real brand SVGs + the TikTok ramen screenshot
apps-script-waitlist.gs Google Apps Script for the waitlist Sheet (see below)
```

## Waitlist (email → Google Sheet)

The email form POSTs `email` + ISO `timestamp` to a Google Apps Script Web App
that appends a row to a Google Sheet.

To wire it up:

1. Create a Google Sheet, name the first tab `Waitlist`, with `Timestamp` in
   `A1` and `Email` in `B1`.
2. **Extensions → Apps Script**, paste the contents of
   `apps-script-waitlist.gs`, save.
3. **Deploy → New deployment → Web app**. Execute as: Me. Access: Anyone.
4. Copy the resulting Web App URL.
5. In `zeeb-app.jsx`, replace
   `ZEEB_WAITLIST_ENDPOINT = "PASTE_YOUR_APPS_SCRIPT_URL_HERE"`
   with your URL.

## Deployment

Deployed as a static site on Vercel. Domain `getzeeb.com` (Namecheap) points
to Vercel via:

- `A` `@` → `76.76.21.21`
- `CNAME` `www` → `cname.vercel-dns.com.`
