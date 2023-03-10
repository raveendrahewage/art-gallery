import React from "react";
import { Slide } from "react-slideshow-image";
import { Photo, BlogSlideshowProps } from "../../models";
import "react-slideshow-image/dist/styles.css";
import "./BlogSlideshow.css";
// import { Photo } from "react-photo-album";

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
  minHeight: "350px",
  backgroundRepeat: "no-repeat",
  //   backgroundSize: "100% 100%",
  backgroundPosition: "center",
};

const BlogSlideshow = (props: BlogSlideshowProps) => {
  return (
    <div className="blog-slideshow" style={{ height: 200 }}>
      <Slide>
        {props.slideImages.map((slideImage: Photo, index: number) => (
          <div key={index}>
            <div
              style={{ ...divStyle, backgroundImage: `url(${slideImage.src})` }}
            ></div>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default BlogSlideshow;
