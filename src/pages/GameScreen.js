import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ImageArea from "../components/ImageArea";
import MapArea from "../components/MapArea";
import "./GameScreen.css";

const GameScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [selectedCoords, setSelectedCoords] = useState(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_ENDPOINT}/coordinates/${id}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  const handleConfirm = () => {
    if (selectedCoords) {
      setShowCorrectAnswer(true);
    }
  };

  return data ? (
    <div className="game-screen">
      <div className="main">
        <div className="image-container">
          <ImageArea
            images={data.images}
            correctImage={data.correctAnswerImage}
            showCorrectAnswer={showCorrectAnswer}
          />
        </div>
        <div className="map-container">
          <MapArea
            startPoint={data.startPoint}
            correctAnswer={data.correctAnswer}
            selectedCoords={selectedCoords}
            showCorrectAnswer={showCorrectAnswer}
            onSelectCoords={setSelectedCoords}
          />
        </div>
      </div>
      <div className="buttons">
        <button onClick={() => navigate(-1)}>Back</button>
        <button onClick={handleConfirm}>Confirm</button>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default GameScreen;
