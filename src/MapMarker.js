import React, { useState, useEffect } from "react";
import { PiMicrophoneStageFill } from "react-icons/pi";

// MapMarker Component
class MapMarker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: props.show };
  }

  handleClose = () => {
    this.setState({ show: false });
  };

  render() {
    const markerStyle = {
      height: 20,
      width: 20,
      zIndex: 10,
      cursor: "pointer",
    };
    return (
      <div>
        <PiMicrophoneStageFill
          style={markerStyle}
          className={this.props.status === "Active" ? "is-link" : "is-danger"}
          onClick={() => this.setState({ show: !this.state.show })}
        />
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

const InfoWindow = (props) => {
  const { name, address, weekday, status, onClose } = props;
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

  const inactiveStyle = {
    color: "red",
    fontWeight: "bold",
  };

  return (
    <div style={infoWindowStyle}>
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
      <div style={{ fontSize: 14 }}>{name} </div>
      <div style={{ fontSize: 10 }}>
        {weekday} at {address}
      </div>
      {status === "Inactive" && <div style={inactiveStyle}>Inactive</div>}
    </div>
  );
};

export default MapMarker;
