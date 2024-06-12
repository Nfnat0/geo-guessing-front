import React, { useRef, useEffect, useState } from "react";
import "./MapArea.css";

const MapArea = ({
  startPoint,
  correctAnswer,
  selectedCoords,
  showCorrectAnswer,
  onSelectCoords,
}) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

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
      const newMap = new window.google.maps.Map(mapRef.current, {
        center: startPoint,
        zoom: 14,
        disableDefaultUI: true,
      });
      setMap(newMap);
    });
  }, [startPoint]);

  useEffect(() => {
    if (map && showCorrectAnswer && selectedCoords) {
      const newMarkers = [
        new window.google.maps.Marker({
          position: selectedCoords,
          map: map,
          label: "Your Answer",
        }),
        new window.google.maps.Marker({
          position: correctAnswer,
          map: map,
          label: "Correct Answer",
        }),
      ];
      setMarkers(newMarkers);

      map.panTo(correctAnswer);
    }
  }, [map, showCorrectAnswer, selectedCoords, correctAnswer]);

  useEffect(() => {
    if (map && !showCorrectAnswer) {
      map.addListener("click", (e) => {
        const coords = { lat: e.latLng.lat(), lng: e.latLng.lng() };
        onSelectCoords(coords);

        if (markers.length > 0) {
          markers[0].setPosition(coords);
        } else {
          const newMarker = new window.google.maps.Marker({
            position: coords,
            map: map,
          });
          setMarkers([newMarker]);
        }
      });
    }
  }, [map, markers, showCorrectAnswer, onSelectCoords]);

  return <div ref={mapRef} className="map-area" />;
};

export default MapArea;
