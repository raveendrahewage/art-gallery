import React from "react";
import { Slide } from "react-slideshow-image";
import { SlideshowImage } from "../../models";
// import Facebook from "../facebook/Facebook";
import "react-slideshow-image/dist/styles.css";
import "./Slideshow.css";

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
  height: "100vh",
};
const slideImages: SlideshowImage[] = [
  {
    url: "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    caption: "Portfolio",
    id: "portfolio",
  },
  {
    url: "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
    caption: "About Me",
    id: "about",
  },
  {
    url: "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    caption: "Blog",
    id: "blog",
  },
];

const Slideshow = () => {
  return (
    <div className="slideshow">
      <Slide>
        {slideImages.map((slideImage, index) => (
          <div key={index}>
            <div
              style={{ ...divStyle, backgroundImage: `url(${slideImage.url})` }}
            >
              <div className="showcase">
                <h1>{slideImage.caption}</h1>
                <a type="button" href={`#${slideImage.id}`}>
                  Bring Me There
                </a>
                {/* <Facebook /> */}
              </div>
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default Slideshow;
