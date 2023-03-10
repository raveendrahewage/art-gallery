import { useEffect, useState } from "react";
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const mouseMoveHandler = (event: MouseEvent) => {
    const { clientX, clientY } = event;
    setMousePosition({ x: clientX, y: clientY });
  };

  const touchMove = (event: TouchEvent) => {
    const { pageX, pageY } = event.changedTouches[0];
    setMousePosition({ x: pageX, y: pageY });
  };

  useEffect(() => {
    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("touchmove", touchMove);
    document.addEventListener("touchstart", touchMove);
    document.addEventListener("touchend", touchMove);

    return () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("touchmove", touchMove);
      document.removeEventListener("touchstart", touchMove);
      document.removeEventListener("touchend", touchMove);
    };
  }, []);

  return mousePosition;
};

export default useMousePosition;
