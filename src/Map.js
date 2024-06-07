// Import necessary modules and components
import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import MapMarker from "./MapMarker";
import mapStyles from "./MapStyles.js";
// Import the API key from constants file
const { ApiKey } = require("./constants");

const options = {
  styles: mapStyles, // Uncomment and provide map styles if needed
  //disableDefaultUI: true,
  // Disables default UI (e.g., satellite option)
  //zoomControl: true,
};

// Define the Map component
class Map extends React.Component {
  // Constructor for the Map component
  constructor(props) {
    super(props);

    // Initialize the state with an empty results array
    this.state = {
      results: [],
    };
  }

  // Method to handle click events on the map markers
  _onChildClick = (key, childProps) => {
    // Update the state based on the clicked marker
    this.setState((state) => {
      // Find the index of the currently shown marker
      let index = state.results.findIndex((e) => e.show);
      // If a marker is shown and it's not the clicked one, hide it
      if (
        index > 0 &&
        state.results[index].original.RowNumber != parseInt(key)
      ) {
        state.results[index].show = false;
      }
      // Find the index of the clicked marker
      index = state.results.findIndex(
        (e) => e.original.RowNumber == parseInt(key)
      );
      // Toggle the show state of the clicked marker
      state.results[index].show = !state.results[index].show;

      // Find the table cell with the same name as the clicked marker
      const cells = document.querySelectorAll("td");
      var found = null;
      for (var i = 0; i < cells.length; i++) {
        if (cells[i].textContent == state.results[index].original.Name) {
          found = cells[i];
          break;
        }
      }
      // Highlight the found cell and scroll it into view
      found.parentNode.style.backgroundColor = "#fffcb3";
      setTimeout(
        () => (found.parentNode.style.backgroundColor = "white"),
        2000
      );
      found.scrollIntoView({ behavior: "smooth", block: "nearest" });

      // Return the updated results array
      return { results: state.results };
    });
  };

  // Update the state when the props change
  componentDidUpdate(prevProps) {
    if (this.props.results != prevProps.results) {
      this.setState((_, props) => {
        // Create a new state with the updated results
        const newState = props.results.map((result) => ({
          ...result,
          show: false,
        }));
        return { results: newState };
      });
    }
  }

  // Render the Map component
  render() {
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
          onChildClick={this._onChildClick}
        >
          {/* Render a MapMarker for each item in the results array */}
          {this.state.results.map((item) => (
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
}

// Export the Map component
export default Map;
