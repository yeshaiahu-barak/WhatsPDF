# WhatsApp Chat to PDF Converter 💬📄
**[עברית למטה / Hebrew Below](#hebrew-section)**

A client-side progressive web application (PWA) that converts exported WhatsApp chat `.zip` files into a visually appealing, printable chat interface. The system processes the ZIP file entirely in the browser (100% privacy, no backend), extracts text and media, and prepares an optimized layout for native browser PDF printing.

## ✨ Features
* **100% Private:** All processing is done locally in your browser. No data is sent to any server.
* **Direct ZIP Support:** Automatically extracts and maps media files (images, videos) to the chat text.
* **PWA & Web Share Target:** Installable on Android. Export a chat from WhatsApp and share it directly to the app without saving the file manually.
* **Native Print Engine:** Relies on the browser's native print engine (Chrome/Edge) to generate lightweight, perfectly formatted PDFs with full RTL/Hebrew support and no memory crashes.
* **Smart Filtering:** Filter conversations by date, sender name, and add an optional alias/phone number for the document header.

## 🚀 How to Use
**Standard Web Usage:**
1. Export your chat from WhatsApp (this creates a `.zip` file).
2. Open the application in your browser.
3. Click "Choose File" and upload the `.zip`.
4. Filter by dates if needed, then click **Print to PDF**.

**Android Fast-Track (PWA):**
1. Open the app in Chrome on your Android device and tap **"Add to Home screen"**.
2. Go to WhatsApp -> Export Chat -> Choose **WhatsApp to PDF** from the Android share menu. The app will open and process the chat automatically.

---

## 📋 System Requirements & AI Prompt (PRD)
*This PRD is optimized for AI coding assistants (v0, Cursor, Claude, etc.).*

**1. Tech Stack & Architecture Constraints**
*   **Languages:** Pure HTML5, CSS3, Vanilla JavaScript (ES6+). No frameworks (React, Vue, etc.).
*   **Architecture:** Modular JavaScript object (e.g., `const App = { ... }`) managing state, initialization, and UI rendering inside a single `index.html`.
*   **External Libraries:** Only `JSZip` (via CDN) is permitted. Do NOT use PDF generation libraries (html2pdf, jsPDF). We rely strictly on the native browser print engine.

**2. Input & Data Processing**
*   **Input Element:** `<input type="file" accept=".zip">`.
*   **ZIP Logic (JSZip):** Iterate through the ZIP, read the `.txt` file as a string, and convert media files into `URL.createObjectURL(blob)`, mapping them by filename.

**3. Parsing Logic**
*   **Regex Pattern:** Use `/^[\u200E\u200F\s]*(\d{1,2}[./-]\d{1,2}[./-]\d{2,4})[,\s]+(\d{1,2}:\d{2}).*?-\s*(.*?):\s+(.*)$/i` to identify messages, accounting for RTL chars and variable date formats.
*   **Multi-line Messages:** Append non-matching lines to the previous message using `<br>`.
*   **Date Normalization:** Convert to JS `Date` objects with time `00:00:00`.

**4. User Interface & Filtering**
*   **Design:** CSS Variables (`--bg-body`, `--bg-me: #d9fdd3`, `--bg-other: #ffffff`).
*   **Filters:** Dropdown for user name, text inputs for aliases, date pickers auto-populated with the chat's first/last valid dates.
*   **Render:** Replace media filenames inside `msg.text` with actual `<img>` tags pointing to the ObjectURLs.

**5. Output Configuration (Print / PDF)**
*   **Print Trigger:** `window.print()`.
*   **Title Hack:** Temporarily change `document.title` to the ZIP filename before printing to set the default PDF filename.
*   **CSS Print Rules (`@media print`):** Hide controls. Prevent bubble page breaks with `page-break-inside: avoid; break-inside: avoid;`. Force background colors with `print-color-adjust: exact; -webkit-print-color-adjust: exact;`.

<br>
<hr>
<br>

<a name="hebrew-section"></a>
# ממיר שיחות וואטסאפ ל-PDF 💬📄

אפליקציית רשת (צד-לקוח בלבד, PWA) הממירה קבצי `.zip` של ייצוא שיחות וואטסאפ לממשק צ'אט ויזואלי ומעוצב, המותאם להדפסה ל-PDF. האפליקציה מעבדת את הנתונים ישירות בדפדפן (ללא שרת), מחלצת את הטקסט והמדיה, ומכינה אותם להדפסה מושלמת.

## ✨ תכונות מרכזיות
* **פרטיות מוחלטת (100%):** העיבוד מתבצע אך ורק בדפדפן המקומי שלכם. שום מידע לא נשלח לשרת חיצוני.
* **תמיכה ישירה ב-ZIP:** פתיחה אוטומטית של קובץ הייצוא וחיבור התמונות/מדיה לטקסט.
* **תמיכה באנדרואיד (PWA):** ניתנת להתקנה על מסך הבית. ניתן לשתף צ'אט ישירות מוואטסאפ אל האפליקציה באמצעות תפריט השיתוף של הטלפון.
* **מנוע הדפסה מובנה:** שימוש במנוע ההדפסה של הדפדפן (Chrome/Edge) לקבלת PDF קל-משקל, עם תמיכה מושלמת בעברית (RTL) וללא קריסות בשיחות ארוכות.
* **סינון חכם:** חיתוך השיחה לפי תאריכים, שמות שולחים, והוספת כותרת מותאמת אישית למסמך.

## 🚀 איך משתמשים?
**שימוש רגיל (מחשב / דפדפן):**
1. ייצאו שיחה מהוואטסאפ (פעולה זו יוצרת קובץ `.zip`).
2. פתחו את האפליקציה בדפדפן.
3. לחצו על "בחר קובץ" והעלו את ה-ZIP.
4. סננו תאריכים במידת הצורך ולחצו על **פתח חלון הדפסה ל-PDF**.

**המסלול המהיר באנדרואיד (PWA):**
1. פתחו את האתר בכרום באנדרואיד ולחצו על **הוסף למסך הבית** (Add to Home screen).
2. בוואטסאפ, בחרו "ייצוא צ'אט".
3. בתפריט השיתוף של הטלפון שייפתח, חפשו את סמל האפליקציה שלנו. ה-ZIP יישלח ויעובד אוטומטית.

---

## 📋 אפיון המערכת (PRD)

**1. טכנולוגיה וארכיטקטורה**
*   **שפות:** HTML5, CSS3, Vanilla JavaScript (ES6+) נקי בלבד. ללא פריימוורקים.
*   **מבנה:** קובץ `index.html` בודד הכולל את העיצוב והסקריפטים. הלוגיקה מנוהלת תחת אובייקט JS מרכזי ומודולרי (`App`).
*   **ספריות חיצוניות:** מותר להשתמש רק ב-`JSZip` לפתיחת הקבצים מקומית. **אין** להשתמש בספריות יצירת PDF, ההדפסה תתבצע רק דרך מנוע הדפדפן להבטחת תקינות העברית (RTL).

**2. קלט ועיבוד קבצים**
*   הקלט מתבצע דרך שדה `<input type="file" accept=".zip">` (או דרך Web Share Target API).
*   המערכת קוראת את ה-ZIP, מחלצת את קובץ ה-`.txt` הראשי למחרוזת, ואת קבצי המדיה הופכת לכתובות מקומיות זמניות (`URL.createObjectURL`).

**3. לוגיקת פענוח (Parsing)**
*   שימוש בביטוי רגולרי (Regex) התומך בתווי כיווניות של וואטסאפ (RTL) לאיתור הודעות חדשות:
    `/^[\u200E\u200F\s]*(\d{1,2}[./-]\d{1,2}[./-]\d{2,4})[,\s]+(\d{1,2}:\d{2}).*?-\s*(.*?):\s+(.*)$/i`
*   הודעות בעלות מספר שורות ישורשרו להודעה הקודמת עם תגית `<br>`.
*   תאריכים ינורמלו לאובייקטי `Date` של JavaScript לצורך סינון.

**4. ממשק משתמש (UI)**
*   עיצוב מבוסס משתני CSS ליצירת מראה תואם וואטסאפ (בועות ירוקות ולבנות).
*   שדות סינון מתאריך/עד תאריך יאוכלסו אוטומטית על בסיס התאריכים החוקיים הראשונים והאחרונים שאותרו בטקסט.
*   טקסט ההודעה ייסרק, ושמות קבצי מדיה יוחלפו בתגיות `<img>` המציגות את התמונה הרלוונטית.

**5. ייצוא והדפסה**
*   **שינוי שם חכם:** רגע לפני הקריאה ל-`window.print()`, המערכת תשנה את ה-`document.title` לשם קובץ ה-ZIP המקורי כדי לאלץ את הדפדפן לשמור את ה-PDF בשם זה.
*   **הגדרות הדפסה (CSS):** הסתרת אזור השליטה, הצגת כותרת מסמך מרכזית, מניעת חיתוך הודעות בין עמודים (`page-break-inside: avoid`), ואילוץ הדפסת צבעי הרקע של הבועות (`print-color-adjust: exact`).
