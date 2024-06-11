import React, { useState } from "react";
import "./ImageArea.css";

const ImageArea = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleDirection = (direction) => {
    if (direction === "north") setCurrentIndex(0);
    if (direction === "east") setCurrentIndex(1);
    if (direction === "south") setCurrentIndex(2);
    if (direction === "west") setCurrentIndex(3);
  };

  return (
    <div className="image-area">
      <img src={images[currentIndex]} alt="current view" />
      <button
        className="nav-button north"
        onClick={() => handleDirection("north")}
      >
        North
      </button>
      <button
        className="nav-button east"
        onClick={() => handleDirection("east")}
      >
        East
      </button>
      <button
        className="nav-button south"
        onClick={() => handleDirection("south")}
      >
        South
      </button>
      <button
        className="nav-button west"
        onClick={() => handleDirection("west")}
      >
        West
      </button>
    </div>
  );
};

export default ImageArea;
