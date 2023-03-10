import React from "react";
import BlogSlideshow from "../blog-slideshow/BlogSlideshow";
import { BlogArticleProps } from "../../models";
import "./BlogArticle.css";

const BlogArticle = (props: BlogArticleProps) => {
  return (
    <>
      {props.isSlideShowLeft ? (
        <div className="blog-section-row">
          <div className="blog-section-column slideshow-column">
            <BlogSlideshow slideImages={props.slideImages} />
          </div>
          <div className="blog-section-column description-column">
            <h3>{props.slideImages[0].category}</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore
            </p>
          </div>
        </div>
      ) : (
        <div className="blog-section-row">
          <div className="blog-section-column description-column">
            <h3>{props.slideImages[0].category}</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore
            </p>
          </div>
          <div className="blog-section-column slideshow-column">
            <BlogSlideshow slideImages={props.slideImages} />
          </div>
        </div>
      )}
    </>
  );
};

export default BlogArticle;
