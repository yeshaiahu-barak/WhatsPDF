# Role & Goal
Act as a senior frontend engineer. Develop a Client-Side Progressive Web App (PWA) that converts exported WhatsApp chat `.zip` files into a visually appealing, printable chat interface optimized for legal fidelity. 

# Tech Stack & Constraints
*   **Languages:** HTML5, CSS3, Vanilla JavaScript (ES6+). NO frameworks (No React, Vue, etc.).
*   **Architecture:** Use a highly modular, object-oriented design. Wrap the logic in a main object `const WhatsAppApp = { ... }` inside a single `index.html` file.
*   **Libraries:** ONLY use `JSZip` via CDN for local ZIP extraction. Do NOT use any PDF generation libraries (e.g., html2pdf). Rely strictly on the native browser `window.print()`.

# Architecture & Modules Requirements

## 1. PWA & Web Share Target (Input Handling)
*   **Manual:** Provide a standard `<input type="file" accept=".zip">`.
*   **PWA Setup:** Provide the code for `manifest.json` defining a `share_target` to accept `.zip` files via POST.
*   **Service Worker (`sw.js`):** Intercept the POST request from the Android Share Menu. Extract the file, append its original name to a custom header `X-Original-Name` (URL encoded), cache the file/response, and redirect (303) to `index.html`.
*   **App Init:** On load, check the cache for a shared file. If found, decode the original name, recreate the `File` object, delete the cache, and process it automatically.

## 2. Parser Logic
*   Read `_chat.txt` from the ZIP. Remove BOM (`\uFEFF`) and `\r`.
*   Convert all media files to `URL.createObjectURL` and store them in a dictionary mapping filename to URL.
*   **Regex:** Use this exact regex to account for RTL characters and varying date formats:
    `/^[\u200E\u200F\s]*(\d{1,2}[./-]\d{1,2}[./-]\d{2,4})[,\s]+(\d{1,2}:\d{2}).*?-\s*(.*?):\s+(.*)$/i`
*   **Multiline:** Lines not matching the regex must be appended to the `text` of the previous message using a `\n` line break.

## 3. Strict Legal Fidelity & Rendering
*   **XSS Protection:** Implement and use an `escapeHTML` function for ALL parsed text (sender names, message text).
*   **Fidelity:** The rendered chat MUST be a 100% accurate mirror of the `.txt` file. Do NOT hide, remove, or deduplicate any text. If WhatsApp generated "(file attached)", it must remain visible.
*   **Media Rendering:** Iterate through the media URL dictionary. If a media filename is found within `msg.text`, render an `<img>` tag pointing to the URL **below** the original message text. Do NOT delete the filename from the text.
*   Render messages in bubbles (WhatsApp style: green for "Me", white for "Other"). Replace `\n` with `<br>` for HTML rendering.

## 4. Print & PDF Optimization (@media print)
*   Trigger `window.print()` via a button.
*   **Filename Hack:** Dynamically set `document.title` to the original ZIP filename (without extension) upon upload, so the browser's "Save as PDF" dialog suggests the exact input name.
*   Hide UI controls during print. Show a dynamic `#docHeader` with the date range and participant names.
*   **Crucial Print CSS:** 
    *   Force background colors: `print-color-adjust: exact; -webkit-print-color-adjust: exact;`
    *   Fix Chrome pagination bugs: `.message` must have `page-break-inside: avoid; break-inside: avoid;`. 
    *   Images (`.media-attachment`) MUST be `display: inline-block; max-height: 400px; page-break-inside: avoid; break-inside: avoid;` to prevent Chrome from duplicating images across page breaks.

Provide the complete codes for `index.html`, `manifest.json`, and `sw.js`. Ensure the code is production-ready, heavily commented, and extremely robust.
