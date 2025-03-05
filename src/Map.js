// Import necessary modules and components
import React, { useState, useEffect, useCallback } from "react";
import GoogleMapReact from "google-map-react";
import MapMarker from "./MapMarker";
import mapStyles from "./MapStyles.js";
// Import the API key from constants file
const { ApiKey } = require("./constants");

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: false,
  gestureHandling: "greedy",
};

// Define the Map component - converted to functional component for React 18
const Map = (props) => {
  // Initialize state with an empty results array
  const [results, setResults] = useState([]);
  const [maps, setMaps] = useState(null);
  const [map, setMap] = useState(null);

  // Method to handle click events on the map markers
  const handleChildClick = useCallback((key, childProps) => {
    showMarkerInfo(parseInt(key));
  }, []);

  // Function to show marker info - exposed for both marker clicks and table row clicks
  const showMarkerInfo = (rowNumber) => {
    setResults(prevResults => {
      // Create a copy of results to avoid mutating state directly
      const updatedResults = [...prevResults];
      
      // Find the index of the currently shown marker
      let index = updatedResults.findIndex((e) => e.show);
      
      // If a marker is shown and it's not the clicked one, hide it
      if (
        index > 0 &&
        updatedResults[index].original.RowNumber !== rowNumber
      ) {
        updatedResults[index] = {
          ...updatedResults[index],
          show: false
        };
      }
      
      // Find the index of the clicked marker
      index = updatedResults.findIndex(
        (e) => e.original.RowNumber === rowNumber
      );
      
      if (index >= 0) {
        // Toggle the show state of the clicked marker
        updatedResults[index] = {
          ...updatedResults[index],
          show: !updatedResults[index].show
        };
  
        // Find the table cell with the same name as the clicked marker
        const cells = document.querySelectorAll("td");
        let found = null;
        for (let i = 0; i < cells.length; i++) {
          if (cells[i].textContent === updatedResults[index].original.Name) {
            found = cells[i];
            break;
          }
        }
        
        if (found) {
          // Highlight the found cell and scroll it into view
          found.parentNode.style.backgroundColor = "#fffcb3";
          setTimeout(
            () => (found.parentNode.style.backgroundColor = "white"),
            2000
          );
          found.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      }

      return updatedResults;
    });
  };

  // If the parent component wants to show a specific marker
  useEffect(() => {
    if (props.selectedRowNumber !== undefined && props.selectedRowNumber !== null) {
      showMarkerInfo(props.selectedRowNumber);
    } else {
      // Hide all markers when selectedRowNumber is null
      setResults(prevResults => {
        return prevResults.map(result => ({
          ...result,
          show: false
        }));
      });
    }
  }, [props.selectedRowNumber]);

  // Update the state when the props change
  useEffect(() => {
    if (props.results) {
      // Create a new state with the updated results
      const newResults = props.results.map((result) => ({
        ...result,
        show: false,
      }));
      setResults(newResults);
    }
  }, [props.results]);

  // Handle the API being loaded
  const handleApiLoaded = (map, maps) => {
    setMap(map);
    setMaps(maps);
  };

  return (
    // Container for the map
    <div id="map">
      <GoogleMapReact
        // Pass the API key to GoogleMapReact
        bootstrapURLKeys={{ key: ApiKey }}
        options={options}
        // Set the default center and zoom level of the map
        defaultCenter={{ lat: 45.463336, lng: 9.187174 }}
        defaultZoom={12.8}
        // Handle click events on the map markers
        onChildClick={handleChildClick}
        // Enable yesIWantToUseGoogleMapApiInternals to get access to map instance
        yesIWantToUseGoogleMapApiInternals={true}
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
        {/* Render a MapMarker for each item in the results array */}
        {results.map((item) => (
          <MapMarker
            key={item.original.RowNumber}
            lat={item.original.Latitude}
            lng={item.original.Longitude}
            address={item.original.Address}
            weekday={item.original.Weekday}
            name={item.original.Name}
            status={item.original.Status}
            show={item.show}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
}

// Export the Map component
export default Map;
