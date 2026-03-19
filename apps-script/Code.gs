/**
 * Open Mic Milano – Google Apps Script Web App
 *
 * Receives POST requests from the React submission form and appends
 * a new "Pending" row to the first sheet of the spreadsheet.
 *
 * SETUP STEPS:
 *   1. Open your Google Sheet → Extensions → Apps Script
 *   2. Replace any existing code with the contents of this file
 *   3. Click "Deploy" → "New deployment" → Type: Web App
 *      - Execute as: Me (your Google account)
 *      - Who has access: Anyone
 *   4. Authorise the script when prompted
 *   5. Copy the Web App URL and save it as the repository secret
 *      VITE_APPS_SCRIPT_URL in GitHub (Settings → Secrets → Actions)
 *   6. Also add it to your local .env file for development:
 *      VITE_APPS_SCRIPT_URL=https://script.google.com/macros/s/.../exec
 *
 * Every time you edit this script you must create a NEW deployment
 * (or update the existing one) to publish the changes.
 */

var SHEET_NAME = ""; // Leave empty to use the first sheet, or set e.g. "Events"

/**
 * Handles the POST request sent by the React form.
 * Returns a JSON response (only readable in non-no-cors contexts, but
 * the payload is still processed regardless of CORS mode).
 */
function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = SHEET_NAME
      ? ss.getSheetByName(SHEET_NAME)
      : ss.getSheets()[0];

    if (!sheet) {
      return jsonResponse({ success: false, error: "Sheet not found" });
    }

    // Parse the JSON body sent by the React app
    var data = JSON.parse(e.postData.contents);

    // Build a map of { "Sheet Column Header": value }
    // These MUST match the exact header row in your Google Sheet
    var rowData = {
      "Name":                 data.Name               || "",
      "Venue":                data.Venue              || "",
      "Address":              data.Address            || "",
      "Latitude":             "",   // geocoded later in the sheet
      "Longitude":            "",   // geocoded later in the sheet
      "Status":               "Pending",
      "Weekday / Month":      data.Weekday            || "",
      "Event Time":           data.Time               || "",
      "Frequency":            data.Frequency          || "",
      "Event Category":       data.Category           || "",
      "Event Sub-Category":   "",
      "Language":             data.Language           || "",
      "Comedian Level":       data.Level              || "",
      "Audience Entry Fee":   data.AudienceEntryFee   || "",
      "Wheelchair Access":    data.WheelchairAccess   || "",
      "Instagram":            data.Instagram          || "",
      "Facebook Page":        data.FacebookPage       || "",
      "Facebook Group":       "",
      "WhatsApp":             data.WhatsApp           || "",
      "Email":                data.Email              || "",
      "Website":              data.Website            || "",
      "Event Description":    data.Description        || "",
      "Organizer Name":       data.OrganizerName      || "",
      "Submitted At":         new Date().toISOString(),
    };

    // Read the header row to determine column order
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

    // Build the new row in the correct column order
    var newRow = headers.map(function (header) {
      return rowData.hasOwnProperty(header) ? rowData[header] : "";
    });

    sheet.appendRow(newRow);

    // Optional: send a notification email to the sheet owner
    // MailApp.sendEmail(Session.getEffectiveUser().getEmail(),
    //   "New Open Mic submission: " + data.Name,
    //   "A new event was submitted:\n\n" + JSON.stringify(data, null, 2));

    return jsonResponse({ success: true });

  } catch (err) {
    return jsonResponse({ success: false, error: err.message });
  }
}

/**
 * Handles GET requests (used to verify the Web App is live).
 * Visit the Web App URL in a browser to confirm it's deployed correctly.
 */
function doGet() {
  return ContentService
    .createTextOutput("Open Mic Milano – Apps Script is running ✓")
    .setMimeType(ContentService.MimeType.TEXT);
}

// ---------------------------------------------------------------------------

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
