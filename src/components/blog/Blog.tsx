import React, { useState } from "react";
import BlogArticle from "../blog-article/BlogArticle";
import { BlogProps } from "../../models";
import {
  bookmarkPhotos,
  bwPhotos,
  cartoonPhotos,
  coffeePhotos,
  compassPhotos,
  nostalagicPhotos,
  pencilPhotos,
} from "../../assets/portfolio";
import Button from "../button/Button";
import "./Blog.css";

const Blog = (props: BlogProps) => {
  const [loadMore, setLoadMore] = useState<boolean>(false);
  return (
    <div id="blog">
      <div className="blog">
        <h1 className="title">BLOG</h1>
        <sub>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        </sub>
      </div>
      <div className="blog-section">
        <BlogArticle slideImages={bookmarkPhotos} isSlideShowLeft={true} />
        <BlogArticle
          slideImages={bwPhotos}
          isSlideShowLeft={props.viewPortSize < 800}
        />
        <BlogArticle slideImages={cartoonPhotos} isSlideShowLeft={true} />
        <BlogArticle
          slideImages={coffeePhotos}
          isSlideShowLeft={props.viewPortSize < 800}
        />
        {loadMore && (
          <>
            <BlogArticle slideImages={compassPhotos} isSlideShowLeft={true} />
            <BlogArticle
              slideImages={nostalagicPhotos}
              isSlideShowLeft={props.viewPortSize < 800}
            />
            <BlogArticle slideImages={pencilPhotos} isSlideShowLeft={true} />
          </>
        )}
        <div className="load-more-btn-container">
          <Button
            buttonText={loadMore ? "Show Less" : "Load More"}
            onClick={() => setLoadMore(!loadMore)}
          />
        </div>
      </div>
    </div>
  );
};

export default Blog;
