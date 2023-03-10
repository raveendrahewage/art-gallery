import React from "react";
import "./About.css";
import aboutImg from "../../assets/about.png";

const About = () => {
  return (
    <div id="about">
      <div className="about">
        <h1 className="title">ABOUT ME</h1>
        <sub>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        </sub>
      </div>
      <div className="about-section">
        <div className="about-section-row">
          <div className="about-section-column">
            <img src={aboutImg} alt="about" />
          </div>
          <div className="about-section-column second-column">
            <h3>A LITTLE INTRO</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore
            </p>
            <h3>MY EXHIBITIONS</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore
            </p>
            <h3>NEWSLETTER</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
