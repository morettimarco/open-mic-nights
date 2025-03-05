// Mock data to be used as a fallback when the Google Sheets API is unavailable
export const mockHeaderRow = [
  "Name",
  "Address",
  "Audience Entry Fee",
  "Contact / Book a Spot",
  "Language",
  "Event Category",
  "Event Sub-Category",
  "Status",
  "Organizer Name",
  "Event Description",
  "Facebook Group",
  "Facebook Page",
  "WhatsApp",
  "Google Form",
  "Email",
  "Frequency",
  "Instagram",
  "Latitude",
  "Comedian Level",
  "Longitude",
  "Event Time",
  "Update Info Form Link",
  "Venue",
  "Weekday / Month",
  "Website",
  "Wheelchair Access"
];

// Sample mock data for the Milano comedy events
export const mockRows = [
  {
    "Name": "Comedy Milano Open Mic",
    "Address": "Via Example 123, Milano",
    "Audience Entry Fee": "Free",
    "Contact / Book a Spot": "DM on Instagram",
    "Language": "English",
    "Event Category": "Stand-up Comedy",
    "Event Sub-Category": "Open Mic",
    "Status": "Active",
    "Organizer Name": "Comedy Milano",
    "Event Description": "Weekly open mic night for new and experienced comedians",
    "Facebook Group": "https://facebook.com/groups/example",
    "Facebook Page": "https://facebook.com/comedymilano",
    "WhatsApp": "https://wa.me/1234567890",
    "Google Form": "https://forms.gle/example",
    "Email": "info@comedymilano.com",
    "Frequency": "Weekly",
    "Instagram": "https://instagram.com/comedymilano",
    "Latitude": "45.4642",
    "Comedian Level": "All Levels",
    "Longitude": "9.1900",
    "Event Time": "21:00",
    "Update Info Form Link": "https://forms.gle/update-example",
    "Venue": "Comedy Club Milano",
    "Weekday / Month": "Monday",
    "Website": "https://comedymilano.com",
    "Wheelchair Access": "Yes"
  },
  {
    "Name": "Italian Comedy Night",
    "Address": "Piazza Demo 45, Milano",
    "Audience Entry Fee": "€5",
    "Contact / Book a Spot": "Email or DM",
    "Language": "Italian",
    "Event Category": "Stand-up Comedy",
    "Event Sub-Category": "Mixed Show",
    "Status": "Active",
    "Organizer Name": "Milano Comedy",
    "Event Description": "Italian language comedy night featuring local talent",
    "Facebook Group": "",
    "Facebook Page": "https://facebook.com/milanocomedy",
    "WhatsApp": "",
    "Google Form": "",
    "Email": "info@milanocomedy.it",
    "Frequency": "Bi-weekly",
    "Instagram": "https://instagram.com/milanocomedy",
    "Latitude": "45.4773",
    "Comedian Level": "Intermediate",
    "Longitude": "9.1815",
    "Event Time": "20:30",
    "Update Info Form Link": "https://forms.gle/another-example",
    "Venue": "Bar Centrale",
    "Weekday / Month": "Wednesday",
    "Website": "https://milanocomedy.it",
    "Wheelchair Access": "No"
  },
  {
    "Name": "International Comedy Showcase",
    "Address": "Via Test 78, Milano",
    "Audience Entry Fee": "€10",
    "Contact / Book a Spot": "Email only",
    "Language": "English",
    "Event Category": "Stand-up Comedy",
    "Event Sub-Category": "Showcase",
    "Status": "Inactive",
    "Organizer Name": "Global Comedy",
    "Event Description": "International comedy showcase with performers from around the world",
    "Facebook Group": "https://facebook.com/groups/globalcomedy",
    "Facebook Page": "https://facebook.com/globalcomedymilano",
    "WhatsApp": "https://wa.me/9876543210",
    "Google Form": "",
    "Email": "bookings@globalcomedy.com",
    "Frequency": "Monthly",
    "Instagram": "https://instagram.com/globalcomedy",
    "Latitude": "45.4547",
    "Comedian Level": "Professional",
    "Longitude": "9.2010",
    "Event Time": "21:30",
    "Update Info Form Link": "https://forms.gle/yet-another-example",
    "Venue": "Teatro Milano",
    "Weekday / Month": "Last Friday",
    "Website": "https://globalcomedy.com",
    "Wheelchair Access": "Yes"
  }
];

// This function creates a mock row object with get method to match the google-spreadsheet v4 API
export function createMockRowClass(rowData, rowIndex) {
  return {
    ...rowData,
    rowIndex,
    get: function(columnName) {
      return this[columnName];
    }
  };
}

// Create properly formatted mock row objects
export function createMockRows() {
  return mockRows.map((row, index) => createMockRowClass(row, index));
}

// Print all mock data methods to verify object structure
export function debugMockData() {
  const sampleRow = createMockRowClass(mockRows[0], 0);
  console.log("Sample mock row:", {
    row: sampleRow,
    properties: Object.keys(sampleRow),
    getName: sampleRow.get('Name'),
    getMethod: typeof sampleRow.get
  });
  return sampleRow;
}