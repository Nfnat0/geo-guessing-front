import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./HomeScreen.css";

const HomeScreen = () => {
  const [coordinates, setCoordinates] = useState([]);
  const [selectedId, setSelectedId] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_ENDPOINT}/coordinates`)
      .then((response) => {
        setCoordinates(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handlePlay = () => {
    if (selectedId) {
      navigate(`/game/${selectedId}`);
    }
  };

  return (
    <div className="home-screen">
      <h1>Select a Location</h1>
      <select
        onChange={(e) => setSelectedId(e.target.value)}
        value={selectedId}
      >
        <option value="" disabled>
          Select a coordinate
        </option>
        {coordinates.map((coord) => (
          <option key={coord.id} value={coord.id}>
            {coord.id}
          </option>
        ))}
      </select>
      <button onClick={handlePlay} disabled={!selectedId}>
        Play
      </button>
    </div>
  );
};

export default HomeScreen;
