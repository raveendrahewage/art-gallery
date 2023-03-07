import "./DotRing.css";
import useMousePosition from "../../hooks/UseMousePosition";

const DotRing = () => {
  const { x, y } = useMousePosition();

  return (
    <>
      <div style={{ left: `${x}px`, top: `${y}px` }} className="plate"></div>
      <div className="brush" style={{ left: `${x}px`, top: `${y}px` }}></div>
    </>
  );
};

export default DotRing;
