import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomeScreen.css";

const HomeScreen = () => {
  const coordinateIds = [1, 2, 3];
  const [selectedId, setSelectedId] = useState(1);
  const navigate = useNavigate();

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
        {coordinateIds.map((id) => (
          <option key={id} value={id}>
            {id}
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
