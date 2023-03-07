import React from "react";
import { ParallaxBanner } from "react-scroll-parallax";
import background from "../../assets/banner-background.jpg";
import foreground from "../../assets/banner-foreground.png";
import "./Banner.css";

const Banner = () => {
  return (
    <ParallaxBanner
      layers={[
        { image: background, speed: -20 },
        { image: foreground, speed: -10 },
      ]}
      className="aspect-[2/1] banner"
    >
      <div className="headline">
        <p className="first-name">RAVEENDRA</p>
        <p className="last-name">HEWAGE</p>
      </div>
    </ParallaxBanner>
  );
};

export default Banner;
