// Import necessary modules and components
import React, { useState, useEffect } from "react";
import { PiMicrophoneStageFill } from "react-icons/pi";

// MapMarker Component
class MapMarker extends React.Component {
  // Constructor for the MapMarker component
  constructor(props) {
    super(props);
    // Initialize the state with the show prop
    this.state = { show: props.show };
  }

  // Method to handle close events
  handleClose = () => {
    // Set the show state to false
    this.setState({ show: false });
  };

  // Render the MapMarker component
  render() {
    // Define the style for the marker
    const markerStyle = {
      height: 23,
      width: 23,
      zIndex: 10,
      cursor: "pointer",
    };
    return (
      <div>
        {/* Render the microphone icon */}
        <PiMicrophoneStageFill
          style={markerStyle}
          // Set the class based on the status prop
          className={this.props.status === "Active" ? "is-link" : "is-danger"}
          // Handle click events on the icon
          onClick={() => this.setState({ show: !this.state.show })}
        />
        {/* Render the InfoWindow component if the show state is true */}
        {this.state.show && (
          <InfoWindow
            name={this.props.name}
            address={this.props.address}
            weekday={this.props.weekday}
            status={this.props.status}
            onClose={this.handleClose}
          />
        )}
      </div>
    );
  }
}

// InfoWindow component
const InfoWindow = (props) => {
  // Destructure the props
  const { name, address, weekday, status, onClose } = props;
  // Define the style for the info window
  const infoWindowStyle = {
    position: "relative",
    bottom: 50,
    left: "-45px",
    textAlign: "center",
    width: 220,
    backgroundColor: "white",
    boxShadow: "0 2px 7px 1px rgba(0, 0, 0, 0.3)",
    padding: 10,
    fontSize: 14,
    zIndex: 100,
    borderRadius: "25px",
  };

  // Define the style for inactive status
  const inactiveStyle = {
    color: "red",
    fontWeight: "bold",
  };

  // Render the InfoWindow component
  return (
    <div style={infoWindowStyle}>
      {/* Render the close button */}
      <button
        onClick={onClose}
        style={{
          float: "right",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        ✖️
      </button>
      {/* Render the name */}
      <div style={{ fontSize: 14 }}>{name} </div>
      {/* Render the weekday and address */}
      <div style={{ fontSize: 10 }}>
        {weekday} at {address}
      </div>
      {/* Render the status if it's inactive */}
      {status === "Inactive" && <div style={inactiveStyle}>Inactive</div>}
    </div>
  );
};

// Export the MapMarker component
export default MapMarker;
