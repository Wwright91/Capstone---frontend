import "./Map.scss";
import React, { useEffect, useState, useMemo } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const API_key = process.env.REACT_APP_GOOGLE_API_KEY;

const MapContainer = ({ businesses }) => {
  const styles = {
    map: {
      height: "100%",
      width: "100%",
      // "grid-column":"2"
    },
  };

  const [markers, setMarkers] = useState([]);

  // const geocoder= new window.google.maps.Geocoder()

  const geocoder = useMemo(() => new window.google.maps.Geocoder(), []);

  useEffect(() => {
    setMarkers([]);

    businesses?.forEach(({ address }) => {
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === "OK") {
          const { lat, lng } = results[0].geometry.location;

          // setMarkers([...markers,{"address":address,"position":{"lat":lat,"lng":lng}}])
          setMarkers((prev) => [
            ...prev,
            { address, position: { lat: lat(), lng: lng() } },
          ]);
        } else {
          console.error(`Geocoding error:${status}`);
        }
      });
    });
  }, [businesses, geocoder]);

  return (
    <div className="MapContainer">
      <Map
        google={window.google}
        zoom={11}
        initialCenter={{ lat: 40.7128, lng: -74.006 }} // Set the initial map center
        style={styles.map}
      >
        {markers.map((marker, idx) => {
          return (
            <Marker
              key={idx}
              position={marker.position}
              // label={marker.address}
            />
          );
        })}
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: `${API_key}`,
})(MapContainer);
