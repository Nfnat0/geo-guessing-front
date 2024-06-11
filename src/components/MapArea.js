import React, { useRef, useEffect } from "react";
import "./MapArea.css";

const MapArea = ({ startPoint, onSelectCoords }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const loadGoogleMaps = (callback) => {
      if (window.google && window.google.maps) {
        callback();
      } else {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
        script.async = true;
        script.defer = true;
        script.onload = callback;
        document.head.appendChild(script);
      }
    };

    loadGoogleMaps(() => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: startPoint,
        zoom: 14,
        disableDefaultUI: true,
      });

      let marker = new window.google.maps.Marker({
        position: startPoint,
        map: map,
        draggable: true,
      });

      map.addListener("click", (e) => {
        const coords = { lat: e.latLng.lat(), lng: e.latLng.lng() };
        onSelectCoords(coords);
        marker.setPosition(coords);
      });
    });
  }, [startPoint, onSelectCoords]);

  return <div ref={mapRef} className="map-area" />;
};

export default MapArea;
