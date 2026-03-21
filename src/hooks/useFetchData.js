import { useState, useEffect } from "react";
import { API_KEY, SPREADSHEET_ID } from "../constants";
import { mockRows } from "../mockData";

// Maps the first occurrence of each column name to its index.
// Duplicate headers are silently ignored (first one wins).
function buildColumnMap(headers) {
  const map = {};
  headers.forEach((h, i) => {
    const name = (h || "").trim();
    if (name && !(name in map)) map[name] = i;
  });
  return map;
}

function reformatRow(values, colMap) {
  const get = (key) => (values[colMap[key]] || "").trim();
  return {
    Name: get("Name"),
    Venue: get("Venue"),
    Address: get("Address"),
    Latitude: parseFloat(get("Latitude")) || 0,
    Longitude: parseFloat(get("Longitude")) || 0,
    Status: get("Status"),
    Weekday: get("Weekday / Month"),
    Time: get("Event Time"),
    Frequency: get("Frequency"),
    Category: get("Event Category"),
    SubCategory: get("Event Sub-Category"),
    Language: get("Language"),
    Level: get("Comedian Level"),
    AudienceEntryFee: get("Audience Entry Fee"),
    WheelchairAccess: get("Wheelchair Access"),
    Instagram: get("Instagram"),
    FacebookPage: get("Facebook Page"),
    FacebookGroup: get("Facebook Group"),
    WhatsApp: get("WhatsApp"),
    Email: get("Email"),
    Website: get("Website"),
    Description: get("Event Description"),
    OrganizerName: get("Organizer Name"),
    GForm: get("Google Form"),
    ContactBooking: get("Contact / Book a Spot"),
    UpdateInfoFormLink: get("Update Info Form Link"),
  };
}

// Fetch via the raw Sheets REST API — no library, no duplicate-header issues.
// Reads the spreadsheet metadata first to get the real first-sheet title,
// so the code works regardless of whether the tab is named "Sheet1", "Foglio1", etc.
async function fetchSheet(spreadsheetId, apiKey) {
  const base = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}`;

  // Step 1: get the actual tab name
  const metaRes = await fetch(`${base}?key=${apiKey}&fields=sheets.properties.title`);
  if (!metaRes.ok) throw new Error(`Sheets metadata error ${metaRes.status}`);
  const meta = await metaRes.json();
  const sheetTitle = meta.sheets?.[0]?.properties?.title;
  if (!sheetTitle) throw new Error("Could not determine sheet name");

  // Step 2: fetch values using the real tab name
  const valRes = await fetch(`${base}/values/${encodeURIComponent(sheetTitle)}?key=${apiKey}`);
  if (!valRes.ok) throw new Error(`Sheets API error ${valRes.status}`);
  const json = await valRes.json();
  const [headerRow, ...dataRows] = json.values || [];
  const colMap = buildColumnMap(headerRow);
  return dataRows
    .map((row) => reformatRow(row, colMap))
    .filter((r) => r.Status === "Active" || r.Status === "Inactive");
}

export function useFetchData() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const formatted = await fetchSheet(SPREADSHEET_ID, API_KEY);
        setEvents(formatted);
      } catch (err) {
        console.warn("Google Sheets fetch failed, using mock data:", err);
        setError(err);
        // mockRows are already plain objects matching the reformatRow output shape
        setEvents(mockRows);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { events, loading, error };
}
