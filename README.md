# Milan Stand-up Comedy Map 🎤🗺️

Find free and paid comedy nights to perform at in Milano! This project is a comprehensive guide to discovering open mic and comedy events in Milan, featuring an interactive map and detailed event information.

This project is a fork of the [apuchitnis/open-mic-nights](https://github.com/apuchitnis/open-mic-nights) project, adapted for the Milan comedy scene.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Download](#download)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
- [Deployment](#deployment)
  - [GitHub Pages Setup](#github-pages-setup)
  - [Custom Domain (CNAME)](#custom-domain-cname)
  - [Deployment Process](#deployment-process)
  - [Automated Deployment](#automated-deployment)
- [Configuration](#configuration)
- [Usage](#usage)
- [Components](#components)
- [Data Management](#data-management)
- [Contributing](#contributing)
- [Credits](#credits)
- [License](#license)

## Features

- **Interactive Map:** Displays open mic night locations on Google Maps with custom markers
- **Event Table:** Lists detailed information about each event with filtering and sorting capabilities
- **Responsive Design:** Optimized for both desktop and mobile viewing
- **Google Sheets Integration:** Fetches live event data from a Google Sheet for easy management
- **Status Filtering:** Automatically filters to show only active and inactive events
- **FAQ Section:** Provides answers to common questions and project credits
- **Social Media Links:** Direct links to event organizers via Instagram, Facebook, WhatsApp, and Email
- **Multilingual Ready:** Currently displays in English

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **Git** for version control
- **NVM** (Node Version Manager) - recommended for managing Node.js versions

To install NVM:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
```

### Download

Clone the repository from GitHub:

```bash
git clone https://github.com/morettimarco/open-mic-nights.git
cd open-mic-nights
```

Or download as a ZIP file:
- Visit https://github.com/morettimarco/open-mic-nights
- Click "Code" → "Download ZIP"
- Extract the archive and navigate to the folder

### Installation

1. **Set up Node.js version:**

   The project requires Node.js >= 18.0.0. Use NVM to manage versions:

   ```bash
   # Install and use Node 18
   nvm install 18
   nvm use 18
   ```

2. **Install project dependencies:**

   ```bash
   npm install
   ```

   This will install all required packages listed in `package.json`, including:
   - React and React DOM
   - Google Maps React
   - Google Spreadsheet API
   - React Table
   - React Icons
   - Bulma CSS framework
   - gh-pages for deployment

3. **Configure Google Maps API Key:**

   The API key is already configured in `src/constants.js`. If you need to use your own:

   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the following APIs:
     - Google Maps JavaScript API
     - Google Sheets API
   - Create an API key with appropriate restrictions
   - Update `src/constants.js`:

   ```javascript
   const ApiKey = "YOUR_GOOGLE_MAPS_API_KEY";
   exports.ApiKey = ApiKey;
   ```

### Running Locally

Start the development server:

```bash
npm start
```

The application will open automatically in your browser at `http://localhost:3000`.

**Development features:**
- Hot reloading: Changes to source files automatically refresh the browser
- Error overlay: Compilation and runtime errors display in the browser
- Console logging: Check browser console for debugging information

To stop the server, press `Ctrl + C` in the terminal.

## Deployment

This project is configured to deploy to **GitHub Pages** with a custom domain.

### GitHub Pages Setup

GitHub Pages hosts the site directly from the repository. Here's how it's configured:

1. **gh-pages package:**
   - The `gh-pages` npm package automates deployment
   - Installed as a dev dependency in `package.json`

2. **Package.json configuration:**

   ```json
   {
     "homepage": "https://www.openmicmilano.com/",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

   - `homepage`: Specifies the deployed site URL
   - `predeploy`: Automatically runs before deployment to build the app
   - `deploy`: Pushes the build folder to the `gh-pages` branch

3. **GitHub Repository Settings:**
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` / `root`
   - The site will be published from the `gh-pages` branch

### Custom Domain (CNAME)

The site uses a custom domain: **openmicmilano.com**

**CNAME File Configuration:**

1. **Location:** `public/CNAME`
   ```
   openmicmilano.com
   ```

2. **Why in public folder?**
   - Files in `public/` are copied directly to the build folder
   - GitHub Pages reads the CNAME file to configure the custom domain
   - Without this, the custom domain would be removed after each deployment

3. **DNS Configuration:**
   
   Configure your domain's DNS settings with your domain registrar:

   **For apex domain (openmicmilano.com):**
   ```
   A Record → 185.199.108.153
   A Record → 185.199.109.153
   A Record → 185.199.110.153
   A Record → 185.199.111.153
   ```

   **For www subdomain (www.openmicmilano.com):**
   ```
   CNAME Record → morettimarco.github.io
   ```

4. **GitHub Settings:**
   - Go to repository Settings → Pages
   - Custom domain: Enter `openmicmilano.com`
   - Check "Enforce HTTPS"

### Deployment Process

#### Manual Deployment

To deploy the application:

```bash
npm run deploy
```

**What happens:**
1. `predeploy` script runs `npm run build`
2. React app is compiled and optimized for production
3. Build artifacts are created in the `build/` folder
4. `gh-pages` pushes the `build/` folder to the `gh-pages` branch
5. GitHub Pages serves the site from that branch

**Build output includes:**
- Minified JavaScript bundles
- Optimized CSS
- Compressed assets (images, fonts)
- HTML with cache-busting hashes
- CNAME file for custom domain

#### Step-by-Step Deployment

1. **Commit your changes:**
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin master
   ```

2. **Deploy to GitHub Pages:**
   ```bash
   npm run deploy
   ```

3. **Verify deployment:**
   - Check https://www.openmicmilano.com after 1-2 minutes
   - GitHub Pages may take a few moments to update

#### Troubleshooting Deployment

**Authentication Error:**
```
fatal: could not read Username for 'https://github.com'
```

**Solution:** Configure GitHub authentication

Option 1 - SSH (Recommended):
```bash
git remote set-url origin git@github.com:morettimarco/open-mic-nights.git
npm run deploy
```

Option 2 - Personal Access Token:
```bash
# Generate token at: https://github.com/settings/tokens
# Use token as password when prompted
npm run deploy
```

Option 3 - GitHub CLI:
```bash
gh auth login
npm run deploy
```

### Automated Deployment

#### GitHub Actions (Optional)

You can automate deployment using GitHub Actions. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ master ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm install
      
    - name: Build
      run: npm run build
      
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./build
        cname: openmicmilano.com
```

**Benefits:**
- Automatic deployment on every push to master
- No local authentication needed
- Consistent build environment
- Deploy from any device

#### Current Deployment Workflow

The project currently uses **manual deployment** with `npm run deploy`:

1. Developer makes changes locally
2. Tests changes with `npm start`
3. Commits changes to master branch
4. Runs `npm run deploy` to publish
5. GitHub Pages automatically serves the updated site

## Configuration

### Environment Variables

No environment variables are required. All configuration is done through source files.

### Key Configuration Files

- **`src/constants.js`**: Google Maps and Google Sheets API key
- **`src/TableAndMap.js`**: Google Spreadsheet ID (line 23)
- **`public/CNAME`**: Custom domain configuration
- **`package.json`**: Homepage URL and build scripts

### Google Sheet Configuration

The app fetches data from a public Google Sheet:

**Spreadsheet ID:** `1_X_znvg8kGbFMXoys011182T5ZTGONCsveY9uLEWsr8`

To use your own Google Sheet:
1. Create a Google Sheet with the required columns (see Data Management section)
2. Make the sheet publicly accessible (Share → Anyone with the link → Viewer)
3. Copy the Spreadsheet ID from the URL
4. Update the ID in `src/TableAndMap.js`:
   ```javascript
   const SpreadsheetId = "YOUR_SPREADSHEET_ID";
   ```

## Usage

### For Users

**Viewing Events:**
- Browse the interactive map to find open mic events near you
- Click on map markers to view event details in a popup
- Use the table below the map for detailed information
- Apply filters to narrow down events by status, language, frequency, etc.
- Click on social media icons to connect with organizers

**Submitting an Event:**
- Click "🎤 Submit an open mic night" in the navigation bar
- Fill out the Google Form with event details
- Your submission will be reviewed and added to the map

**FAQ:**
- Click "❓ F.A.Q." for common questions
- Learn about the project and how to contribute

### For Developers

**Local Development:**
```bash
npm start          # Run development server
npm run build      # Create production build
npm test           # Run tests (if configured)
npm run deploy     # Deploy to GitHub Pages
```

**Project Structure:**
```
open-mic-nights/
├── public/
│   ├── CNAME              # Custom domain configuration
│   ├── index.html         # HTML template
│   └── milano-2.png       # Logo image
├── src/
│   ├── assets/            # Images and styles
│   ├── components/        # React components
│   │   ├── Map.js
│   │   ├── MapMarker.js
│   │   ├── NavigationBar.js
│   │   └── TableAndMap.js
│   ├── constants.js       # API keys
│   ├── mockData.js        # Fallback data
│   └── index.js           # App entry point
├── build/                 # Production build (generated)
├── package.json           # Dependencies and scripts
└── README.md              # Documentation
```

## Components

### Core Components

#### `index.js`
- Main application entry point
- Renders NavigationBar, TableAndMap, and FAQ section
- Contains Q&A content

#### `NavigationBar.js`
- Top navigation bar component
- Links to submit events, FAQ modal, and contact information
- Handles modal interactions for FAQ display

#### `TableAndMap.js`
- Main data container component
- Fetches data from Google Sheets
- Handles data transformation and filtering
- Manages table and map state synchronization
- **Key features:**
  - Filters out events that are not "active" or "inactive"
  - Provides search and filter functionality
  - Column visibility toggle
  - Row click synchronization with map markers

#### `Map.js`
- Google Maps integration component
- Displays event markers based on coordinates
- Handles marker click events
- Synchronizes with table row selection
- Provides smooth scrolling to corresponding table rows

#### `MapMarker.js`
- Individual map marker component
- Custom microphone icon markers
- Color-coded by event status (active/inactive)
- InfoWindow popup on marker click
- Shows event name, address, weekday, and status

### Supporting Files

#### `constants.js`
- Contains Google Maps API key
- Used for both Maps and Sheets API

#### `mockData.js`
- Fallback data structure
- Used when Google Sheets API is unavailable
- Provides sample events for development/testing

#### `MapStyles.js`
- Custom Google Maps styling
- Defines color scheme and visual appearance

#### `assets/styles.css`
- Global styles using Bulma CSS framework
- Custom styling for map, table, and UI elements
- Responsive design breakpoints

## Data Management

### Google Sheets Integration

The application uses Google Sheets as a live database:

**How it works:**
1. Event data is stored in a public Google Sheet
2. The app fetches data using the Google Sheets API v4
3. Data is cached in the browser for performance
4. Updates to the sheet are reflected when users refresh the page
5. Fallback to mock data if the API is unavailable

**Status Filtering:**
- Only events with status "Active" or "Inactive" are displayed
- This filtering is automatic and done in the `useRowsData` function
- Events with other statuses (e.g., "Pending", "Cancelled") are hidden

### Google Sheet Structure

Create a Google Sheet with the following columns (exact names required):

**Required Columns:**
- `Name` - Event name
- `Venue` - Location name
- `Address` - Full address for map display
- `Latitude` - GPS coordinate for map marker
- `Longitude` - GPS coordinate for map marker
- `Status` - Must be "Active" or "Inactive" to display
- `Weekday / Month` - When the event occurs

**Optional Columns:**
- `Description` - Event details
- `Event Category` - Type of event (e.g., Stand-up Comedy)
- `Event Sub-Category` - Subcategory (e.g., Open Mic)
- `Organizer Name` - Who runs the event
- `Audience Entry Fee` - Cost for attendees
- `Comedian Level` - Beginner, Intermediate, Professional, All Levels
- `Language` - English, Italian, etc.
- `Frequency` - Weekly, Bi-weekly, Monthly, etc.
- `Event Time` - Start time
- `Wheelchair Access` - Yes/No
- `Contact / Book a Spot` - How to sign up
- `Facebook Group` - URL
- `Facebook Page` - URL
- `Instagram` - URL
- `WhatsApp` - URL
- `Google Form` - URL for sign-up
- `Email` - Contact email
- `Website` - Event website
- `Update Info Form Link` - Google Form for updates

### Setting Up Your Own Google Sheet

1. **Create the Sheet:**
   - Go to Google Sheets and create a new spreadsheet
   - Add the column headers in the first row
   - Fill in your event data

2. **Make it Public:**
   - Click "Share" button
   - Change "Restricted" to "Anyone with the link"
   - Set permission to "Viewer"
   - Copy the sharing link

3. **Get the Spreadsheet ID:**
   - From the URL: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`
   - Copy the ID between `/d/` and `/edit`

4. **Update the Code:**
   ```javascript
   // In src/TableAndMap.js (line 23)
   const SpreadsheetId = "YOUR_SPREADSHEET_ID";
   ```

5. **Enable Google Sheets API:**
   - Go to Google Cloud Console
   - Enable Google Sheets API for your project
   - Use the same API key as Google Maps

### Data Updates

**To update event data:**
1. Edit the Google Sheet directly
2. Users will see updates when they refresh the page
3. No code changes or redeployment needed

**Best practices:**
- Keep the Status column updated ("Active" or "Inactive")
- Ensure Latitude and Longitude are accurate
- Use consistent formatting for dates and times
- Test new entries on a local development server first

## Contributing

We welcome contributions from the community! Here's how you can help:

### Reporting Issues

Found a bug or have a feature request?
1. Check [existing issues](https://github.com/morettimarco/open-mic-nights/issues)
2. Create a new issue with a clear description
3. Include steps to reproduce (for bugs)
4. Add screenshots if applicable

### Contributing Code

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/open-mic-nights.git
   cd open-mic-nights
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/bug-description
   ```

3. **Make your changes**
   - Write clean, readable code
   - Follow existing code style
   - Add comments for complex logic
   - Test your changes locally

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add: Clear description of your changes"
   ```

   Commit message format:
   - `Add:` for new features
   - `Fix:` for bug fixes
   - `Update:` for modifications
   - `Remove:` for deletions

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Describe your changes clearly
   - Link any related issues

### Development Guidelines

- Test locally before submitting PR
- Ensure no linter errors
- Keep components modular and reusable
- Update README if adding new features
- Maintain mobile responsiveness

### Areas We Need Help With

- Adding more event categories
- Improving map marker clustering for many events
- Adding event calendar/schedule view
- Implementing user accounts for organizers
- Adding event photos
- Improving accessibility (a11y)
- Translation support (if we decide to add it back)

## Credits

This project stands on the shoulders of giants:

- **Original Project:** [London Standup Comedy Map](https://apuchitnis.github.io/open-mic-nights/) by [Apu Chitnis](https://apuchitnis.github.io/)
- **Framework:** [React](https://react.dev/) - UI library
- **Maps:** [Google Maps React](https://github.com/google-map-react/google-map-react) - Map integration
- **Table:** [React Table](https://react-table.tanstack.com/) - Data table functionality
- **Styling:** [Bulma](https://bulma.io/) - CSS framework
- **Icons:** [React Icons](https://react-icons.github.io/react-icons/) - Icon library
- **Deployment:** [GitHub Pages](https://pages.github.com/) - Free hosting
- **Data:** Google Sheets API - Live data management

Many thanks to all the contributors and the open-source community!

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Support

- **Live Site:** https://www.openmicmilano.com
- **GitHub Issues:** https://github.com/morettimarco/open-mic-nights/issues
- **Contact:** Instagram [@_anarchytect](https://www.instagram.com/_anarchytect/)

## Quick Reference

```bash
# Download
git clone https://github.com/morettimarco/open-mic-nights.git

# Install
cd open-mic-nights
npm install

# Run locally
npm start

# Deploy
npm run deploy
```

---

**Enjoy the Milan Stand-up Comedy Map and happy performing! 🎤**

*Last updated: November 2025*
