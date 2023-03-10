import React from "react";
import { BannerProps } from "../../models";
import "./Banner.css";

const Banner = (props: BannerProps) => {
  return (
    <div className="hero-banner">
      <div className="hero-banner-title" aria-hidden="true">
        ASHU'S GALLERY
      </div>
      <div
        className="scene"
        style={{ top: `${0 + (0 - props.pageYOffset / 5.5)}%` }}
      >
        <div className="cube">
          <div className="side back"></div>
          <div className="side left"></div>
          <div className="side right"></div>
          <div className="side top"></div>
          <div className="side bottom"></div>
          <div className="side front"></div>
        </div>
      </div>
      <h1 className="hero-banner-title hero-banner-stroked-title">
        ASHU'S GALLERY
      </h1>
    </div>
  );
};

export default Banner;
