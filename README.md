# Open Mic Milano 🎤

**[openmicmilano.com](https://www.openmicmilano.com)** — A community directory of open mic nights in Milan. Browse an interactive map, filter by day, category or language, and submit new nights directly from the site.

This project is a fork of [apuchitnis/open-mic-nights](https://github.com/apuchitnis/open-mic-nights), rebuilt as a modern React SPA and adapted for the Milan comedy and performance scene.

---

## Tech stack

| Layer | Tool |
|---|---|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS |
| Map | Google Maps via `@vis.gl/react-google-maps` |
| Data | Google Sheets API (public sheet, read-only) |
| Form submissions | Google Apps Script (Web App) |
| Deployment | GitHub Pages via GitHub Actions |

---

## Prerequisites

- **Node.js** ≥ 18 and **npm** ≥ 9
- A **Google account** (for the Sheets + Apps Script setup)
- A **Google Cloud project** with the Maps JavaScript API and Sheets API enabled
- A **GitHub account** (for deployment)

---

## Quick start (local development)

```bash
# 1. Clone the repo
git clone https://github.com/morettimarco/open-mic-nights.git
cd open-mic-nights

# 2. Install dependencies
npm install

# 3. Create your local environment file
cp .env.example .env
# Edit .env and fill in VITE_APPS_SCRIPT_URL (see setup steps below)

# 4. Start the dev server
npm run dev
```

The site will be available at `http://localhost:5173`.

---

## Adapting this project for your city

### 1. Set up the Google Sheet

1. Make a copy of the [Open Mic Milano sheet](https://docs.google.com/spreadsheets/d/1_X_znvg8kGbFMXoys011182T5ZTGONCsveY9uLEWsr8) or create your own with the same column headers (see [Column reference](#column-reference) below).
2. **Share → Anyone with the link → Viewer** to make it public.
3. Copy the **Spreadsheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
   ```
4. Open `src/constants.js` and update:
   ```js
   export const SPREADSHEET_ID = "YOUR_SPREADSHEET_ID";
   ```

### 2. Set up Google APIs

1. Go to [Google Cloud Console](https://console.cloud.google.com) and create a project.
2. Enable **Maps JavaScript API** and **Google Sheets API**.
3. Create an **API key** and restrict it to your domain (e.g. `yourdomain.com`).
4. Open `src/constants.js` and update:
   ```js
   export const API_KEY = "YOUR_GOOGLE_API_KEY";
   ```

### 3. Set up the submission form (Google Apps Script)

The built-in submission form posts new events to a Google Apps Script Web App, which appends them as `Pending` rows in your sheet.

1. Open your Google Sheet → **Extensions → Apps Script**.
2. Replace all existing code with the contents of [`apps-script/Code.gs`](apps-script/Code.gs).
3. Click **Deploy → New deployment**:
   - Type: **Web App**
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Authorise** when prompted.
5. Copy the **Web App URL** (looks like `https://script.google.com/macros/s/.../exec`).

> ⚠️ Every time you edit `Code.gs` you must create a new deployment (or update the existing one) for the changes to take effect.

### 4. Configure the environment variable

Create a `.env` file in the project root (this file is git-ignored and must never be committed):

```bash
cp .env.example .env
```

Edit `.env`:
```
VITE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

### 5. Update branding and location

In `src/constants.js`, update the map centre to your city:
```js
export const MILAN_CENTER = { lat: 45.4654, lng: 9.1859 }; // replace with your coordinates
```

Update the logo and any city references in:
- `public/milano-2.png` — replace with your logo
- `src/components/NavigationBar.jsx` — site title and subtitle
- `public/CNAME` — your custom domain (or delete if using `yourusername.github.io`)
- `index.html` — page `<title>` and meta tags

---

## Deploying to GitHub Pages

### 1. Prepare the repository

- Go to your repo on GitHub → **Settings → Pages → Source** → set to **GitHub Actions**.
- Go to **Settings → Secrets and variables → Actions → New repository secret**:
  - Name: `VITE_APPS_SCRIPT_URL`
  - Value: your Web App URL from step 3 above

### 2. Push to `master`

The GitHub Actions workflow (`.github/workflows/deploy.yml`) runs automatically on every push to `master`. It:
1. Installs dependencies
2. Runs `npm run build` with the secret injected as an env variable
3. Deploys the `dist/` folder to GitHub Pages

### 3. Custom domain (optional)

1. Edit `public/CNAME` with your domain:
   ```
   yourdomain.com
   ```
2. Configure DNS at your registrar:

   | Type | Name | Value |
   |---|---|---|
   | A | `@` | `185.199.108.153` |
   | A | `@` | `185.199.109.153` |
   | A | `@` | `185.199.110.153` |
   | A | `@` | `185.199.111.153` |
   | CNAME | `www` | `yourusername.github.io` |

3. In GitHub → **Settings → Pages → Custom domain**, enter your domain and enable **Enforce HTTPS**.

---

## Column reference

The Google Sheet must have a header row with the following column names. Columns marked **required** must be present for the app to work correctly.

| Column | Required | Description |
|---|---|---|
| `Name` | ✅ | Event name |
| `Venue` | ✅ | Venue name |
| `Address` | ✅ | Full street address (used for display) |
| `Latitude` | ✅ | GPS latitude for the map marker |
| `Longitude` | ✅ | GPS longitude for the map marker |
| `Status` | ✅ | `Active` rows show by default; `Inactive` rows are hidden unless the "Show inactive" toggle is on. Any other value (e.g. `Pending`) is never shown. |
| `Weekday` | ✅ | Day of the week (e.g. `Monday`) |
| `Time` | | Start time |
| `Frequency` | | How often it occurs (e.g. `Weekly`, `Monthly`) |
| `Category` | | Type of event — drives the filter chips dynamically |
| `Language` | | `English`, `Italian`, `Bilingual`, etc. |
| `Level` | | `All levels`, `Beginners`, etc. |
| `AudienceEntryFee` | | e.g. `Free` or `€5` |
| `WheelchairAccess` | | `Yes`, `No`, or `Partial` |
| `OrganizerName` | | Name of the organiser |
| `Description` | | Short description (shown in the detail sheet) |
| `Instagram` | | Full URL |
| `FacebookPage` | | Full URL |
| `Email` | | Contact email |
| `Website` | | Full URL |
| `WhatsApp` | | Phone number or group link |

---

## Project structure

```
open-mic-nights/
├── public/
│   ├── CNAME                  # Custom domain
│   ├── milano-2.png           # Logo
│   └── manifest.json          # PWA manifest
├── src/
│   ├── components/
│   │   ├── ui/                # Primitive UI components (Button, Input, etc.)
│   │   ├── EventDetailSheet   # Side panel shown when clicking a row or marker
│   │   ├── EventTable         # Filterable event list
│   │   ├── FilterBar          # Search bar + filter chips + "Show inactive" toggle
│   │   ├── MapView            # Google Maps with synced markers
│   │   ├── NavigationBar      # Header with logo, title and submit button
│   │   └── SubmitForm         # Dialog form for submitting new events
│   ├── hooks/
│   │   ├── useDarkMode        # Detects and applies dark/light mode
│   │   ├── useFavorites       # Persists favourite events in localStorage
│   │   ├── useFetchData       # Fetches and parses the Google Sheet
│   │   └── useSubmitEvent     # Posts form data to the Apps Script endpoint
│   ├── App.jsx                # Root layout and state
│   ├── constants.js           # API keys, spreadsheet ID, static lists
│   ├── index.css              # Global styles
│   └── main.jsx               # Entry point
├── apps-script/
│   └── Code.gs                # Google Apps Script for form submissions
├── .env.example               # Template for local environment variables
├── .github/workflows/
│   └── deploy.yml             # CI/CD: build + deploy to GitHub Pages
├── index.html                 # HTML shell
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## Available scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server at `http://localhost:5173` |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |

---

## Contributing

Pull requests are welcome. For significant changes please open an issue first.

1. Fork the repo and create a feature branch
2. Make your changes and test locally with `npm run dev`
3. Open a pull request against `master`

---

## Credits

- Original project: [London Stand-up Comedy Map](https://apuchitnis.github.io/open-mic-nights/) by [Apu Chitnis](https://apuchitnis.github.io/)
- Map: [Google Maps Platform](https://mapsplatform.google.com/)
- Data: [Google Sheets](https://sheets.google.com/)
- Hosting: [GitHub Pages](https://pages.github.com/)

## License

MIT
