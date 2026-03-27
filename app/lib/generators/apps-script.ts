import type { BuilderConfig } from "../builder-config";

export function generateAppsScript(config: BuilderConfig) {
  const headers = ["Submitted At", ...config.fields.map((field) => field.label)];

  return `const SHEET_NAME = "${config.formSettings.pageName}";
const HEADERS = ${JSON.stringify(headers, null, 2)};

function doPost(e) {
  const payload = JSON.parse(e.postData.contents);
  const sheet = getOrCreateSheet_();
  const row = [
    payload.submittedAt,
    ...HEADERS.slice(1).map((header) => payload.values[normalizeHeader_(header)] || ""),
  ];

  sheet.appendRow(row);
  return ContentService.createTextOutput(
    JSON.stringify({ ok: true })
  ).setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet =
    spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
  }

  return sheet;
}

function normalizeHeader_(header) {
  return header
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}`;
}
