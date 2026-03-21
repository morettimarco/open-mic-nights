import React, { useState } from "react";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { GOOGLE_MAPS_API_KEY, MILAN_CENTER } from "../constants";
import { Mic } from "lucide-react";

const MAP_ID = "open-mic-milano-map";

export default function MapView({ events, onMarkerClick }) {
  const [selectedId, setSelectedId] = useState(null);

  function markerKey(event) {
    return `${event.Name}__${event.Venue}`;
  }

  function handleMarkerClick(event) {
    setSelectedId(markerKey(event));
    onMarkerClick(event);
  }

  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
      <Map
        defaultCenter={MILAN_CENTER}
        defaultZoom={12}
        mapId={MAP_ID}
        className="map-container"
        gestureHandling="cooperative"
        mapTypeControl={false}
        streetViewControl={false}
        fullscreenControl={false}
      >
        {events.filter(e => e.Latitude && e.Longitude).map((event) => (
          <AdvancedMarker
            key={markerKey(event)}
            position={{ lat: event.Latitude, lng: event.Longitude }}
            onClick={() => handleMarkerClick(event)}
          >
            <div className={[
              "flex items-center justify-center w-8 h-8 rounded-full shadow-lg transition-transform",
              selectedId === markerKey(event) ? "scale-125" : "",
              event.Status === "Active"
                ? "bg-brand-500 text-white"
                : "bg-slate-400 text-white"
            ].filter(Boolean).join(" ")}>
              <Mic className="w-4 h-4" />
            </div>
          </AdvancedMarker>
        ))}
      </Map>
    </APIProvider>
  );
}
