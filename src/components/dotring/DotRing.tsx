import React from "react";
import "./DotRing.css";
import useMousePosition from "../../hooks/UseMousePosition";

const DotRing = () => {
  const { x, y } = useMousePosition();

  // Use transform for better performance and smoother tracking
  return (
    <>
      <div 
        style={{ transform: `translate(${x}px, ${y}px)` }} 
        className="plate"
      ></div>
      <div 
        className="brush" 
        style={{ transform: `translate(${x}px, ${y}px)` }}
      ></div>
    </>
  );
};

export default DotRing;
