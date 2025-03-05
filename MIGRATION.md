# Node.js and React Migration Guide

This document explains the migration of the Milano Stand-up Comedy Map project to Node.js 18+ and React 18.

## Changes Made

### 1. Node.js and npm Version Updates

- Updated Node.js requirement to v18.0.0+
- Added .nvmrc file to specify Node.js version 18.18.0
- Updated package.json with "engines" field

### 2. Package Updates

- React: 16.14.0 → 18.2.0
- react-dom: 16.14.0 → 18.2.0
- react-scripts: 4.0.3 → 5.0.1
- google-map-react: 1.1.7 → 2.2.1
- google-spreadsheet: 3.0.0 → 4.1.1
- react-icons: 4.10.1 → 5.0.1
- All testing libraries and other dependencies updated

### 3. React 18 Migration

**index.js changes:**
- Replaced ReactDOM.render() with createRoot API
- Removed unused useState and useEffect imports

**Class to Functional Component Conversions:**
- MapMarker.js: Converted class component to functional component with hooks
- Map.js: Converted class component to functional component with hooks
  - Implemented useState, useEffect, and useCallback hooks
  - Fixed state mutation issues with proper immutable patterns
  - Added null check for found table cells

**google-spreadsheet v4 API Updates:**
- Updated useApiKey to be async
- Changed row access from row["Name"] to row.get("Name")
- Updated rowNumber to rowIndex + 1
- Added await sheet.loadHeaderRow() call
- Updated headerValues reference to sheet.headerRow

### 4. Documentation Updates

- Updated README.md with new Node.js requirements
- Added NVM usage instructions
- Created MIGRATION.md (this file) to document changes

## How to Migrate Your Own Fork

1. Update your Node.js version to 18.0.0 or higher
2. Copy the updated package.json and .nvmrc files
3. Delete your node_modules folder and package-lock.json
4. Run `npm install` to install updated dependencies
5. Check for any React component changes needed in your custom code
6. Test thoroughly, especially any features using Google Sheets integration

## Testing the Migration

After migration, test the following features:

1. Map display and marker interactions
2. Table data loading and filtering
3. Row highlighting when clicking map markers
4. Google Sheets data retrieval
5. Mobile responsiveness

## Troubleshooting

- If you encounter Google Sheets API errors, check the v4 documentation for updated methods
- React 18 strict mode may reveal issues that were previously hidden
- Check browser console for any errors or warnings