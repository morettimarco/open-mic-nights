import { useState, useEffect } from "react";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { API_KEY, SPREADSHEET_ID } from "../constants";
import { mockRows } from "../mockData";

function reformatRow(row) {
  const get = (key) => {
    if (row.get) return row.get(key) || "";
    return row[key] || "";
  };
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

export function useFetchData() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const doc = new GoogleSpreadsheet(SPREADSHEET_ID, { apiKey: API_KEY });
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0];
        await sheet.loadHeaderRow();
        const rows = await sheet.getRows();
        const formatted = rows.map(reformatRow).filter(
          (r) => r.Status === "Active" || r.Status === "Inactive"
        );
        setEvents(formatted);
      } catch (err) {
        console.warn("Google Sheets fetch failed, using mock data:", err);
        setError(err);
        setEvents(mockRows.map(reformatRow));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { events, loading, error };
}
