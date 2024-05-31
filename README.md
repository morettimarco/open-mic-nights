# Milan comedy standup nights

Find free and paid comedy nights to perform at in Milano 🎙

# Milan Standup Comedy Map 🎤🗺️

This project is a guide to finding free and paid comedy nights to perform at in Milan. It's a fork of the [apuchitnis/open-mic-nights](https://github.com/apuchitnis/open-mic-nights) project.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Deployment](#deploment)
- [Usage](#usage)
- [Components](#components)
- [Data Management](#data-management)
- [Contributing](#contributing)
- [Credits](#credits)
- [License](#license)

## Features

- **Interactive Map:** Displays open mic night locations with custom markers.
- **Event Table:** Lists detailed information about each event, with filtering and sorting options.
- **Responsive Design:** Optimized for both desktop and mobile viewing.
- **Google Sheets Integration:** Fetches event data from a Google Sheet for easy management.
- **FAQ Section:** Provides answers to common questions and project credits.
- **Social Media Links:** Connects users to event organizers via Instagram, Facebook, WhatsApp, and Email.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/morettimarco/open-mic-nights.git
   cd open-mic-nights
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Add your Google Maps API Key:**

   - Create a file named `constants.js` in the `src` directory.
   - Add the following code, replacing `YOUR_GOOGLE_MAPS_API_KEY` with your actual API key:

   ```javascript
   const ApiKey = "YOUR_GOOGLE_MAPS_API_KEY";
   exports.ApiKey = ApiKey;
   ```

4. **Start the development server:**

   ```bash
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000`.

## Deployment

```bash
npm run build
npm run deploy
```

## Usage

### Viewing Events

- Use the interactive map to find open mic events near you.
- Click on markers to view event details.
- Use the table to browse events and apply filters to narrow down your search.

### Submitting an Event

- Click on the "Submit an open mic night" link in the navigation bar to submit a new event using the Google Form.

### Contributing to the Project

- Found a bug or want to contribute? Head over to our [GitHub repository](https://github.com/morettimarco/open-mic-nights) and submit a pull request.

## Components

### `NavigationBar.js`

- Renders the navigation bar with links to submit events, view FAQs, and contact the site owner.

### `Map.js`

- Integrates Google Maps and displays event markers.
- Handles marker clicks to show event info windows.

### `MapMarker.js`

- Custom React component for rendering map markers with conditional styling.

### `TableAndMap.js`

- Displays a table of events with filtering options.
- Syncs table and map interactions.

### `constants.js`

- Contains the Google Maps API key.

### `styles.css`

- Custom styles for the map, table, and navigation bar using Bulma CSS framework.

## Data Management

### Google Sheets Integration

- Event data is stored in a Google Sheet.
- The app fetches data from the sheet using the Google Sheets API.
- To update event data, modify the Google Sheet and the changes will be reflected in the app.

### Google Sheet Setup

- Create a Google Sheet with the following columns:
  - `Name`, `Description`, `Category`, `Sub Category`, `Status`, `Organizer Name`, `Audience Entry Fee`, `Level`, `Language`, `Frequency`, `Weekday / Month`, `Time`, `Venue`, `Address`, `Wheelchair Access`, `Contact / Book a Spot`, `Facebook Group`, `Facebook Page`, `WhatsApp`, `Google Form`, `Email`, `Website`, `Latitude`, `Longitude`, `Update Info Form Link`, `RowNumber`
- Obtain the Google Sheet ID and update the `SpreadsheetId` in `TableAndMap.js`:
  ```javascript
  const SpreadsheetId = "YOUR_SPREADSHEET_ID";
  ```

## Contributing

We welcome contributions from the community! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

## Credits

- This project is inspired by the [London Standup Comedy Map](https://apuchitnis.github.io/open-mic-nights/) by [Apu Chitnis](https://apuchitnis.github.io/).
- Many thanks to the original project and its contributors.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

Enjoy the Milan Standup Comedy Map and happy performing! 🎤
