import React from "react";
import "./DotRing.css";
import useMousePosition from "../../hooks/UseMousePosition";

const DotRing = () => {
  const { x, y } = useMousePosition();

  // Use transform for better performance and smoother tracking
  return (
    <div className="custom-cursor">
      <div 
        style={{ transform: `translate(${x}px, ${y}px)` }} 
        className="ring"
      >
        <div className="ring-circle"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
};

export default DotRing;
