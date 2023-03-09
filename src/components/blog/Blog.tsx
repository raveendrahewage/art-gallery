import React from "react";
import { SlideshowImage } from "../../models";
import BlogArticle from "../blog-article/BlogArticle";
import { BlogProps } from "../../models"
import "./Blog.css";

const Blog = (props: BlogProps) => {
  const slideImages: SlideshowImage[] = [
    {
      url: 'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
      caption: 'Portfolio',
      id: 'portfolio'
    },
    {
      url: 'https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80',
      caption: 'About Me',
      id: "about"
    },
    {
      url: 'https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
      caption: 'Slide 3',
      id: ""
    },
  ];

  return (
    <div id="blog">
      <div className="blog">
        <h1 className="title">BLOG</h1>
        <sub>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        </sub>
      </div>
      <div className="blog-section">
        <BlogArticle slideImages={slideImages} isSlideShowLeft={true} />
        <BlogArticle slideImages={slideImages} isSlideShowLeft={props.viewPortSize < 800} />
        <BlogArticle slideImages={slideImages} isSlideShowLeft={true} />
        <BlogArticle slideImages={slideImages} isSlideShowLeft={props.viewPortSize < 800} />
      </div>
    </div>
  );
};

export default Blog;
