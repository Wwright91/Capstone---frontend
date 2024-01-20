import "./Map.scss";
import React, { useEffect, useState } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const API_key = process.env.REACT_APP_GOOGLE_API_KEY;

const ShowMap = ({ business }) => {
  const styles = {
    map: {
      height: "200px",
      "max-width": "100%",

      "grid-row": "span 1",
      overflow: "auto",
      position: "relative",
    },
  };

  const { address } = business;

  const [marker, setMarker] = useState([]);

  const geocoder = new window.google.maps.Geocoder();

  useEffect(() => {
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === "OK") {
        console.log(business);
        const { lat, lng } = results[0].geometry.location;

        setMarker({ address, position: { lat: lat(), lng: lng() } });
      } else {
        console.error(`Geocoding error:${status}`);
      }
    });
  }, []);

  return (
    <div className="ShowMap">
      <Map
        google={window.google}
        zoom={12}
        initialCenter={{ lat: 40.7128, lng: -74.006 }} // Set the initial map center
        style={styles.map}
      >
        <Marker position={marker.position} label={marker.address} />
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: `${API_key}`,
})(ShowMap);
