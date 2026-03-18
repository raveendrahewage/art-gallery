import React, { useState } from "react";
import { motion } from "framer-motion";
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
    <section id="blog">
      <div className="section-header">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-subtitle"
        >
          LATEST INSIGHTS
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-title"
        >
          BLOG & STORIES
        </motion.h2>
      </div>

      <div className="blog-container">
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <BlogArticle slideImages={compassPhotos} isSlideShowLeft={true} />
            <BlogArticle
              slideImages={nostalagicPhotos}
              isSlideShowLeft={props.viewPortSize < 800}
            />
            <BlogArticle slideImages={pencilPhotos} isSlideShowLeft={true} />
          </motion.div>
        )}
        
        <div className="load-more-btn-container" style={{ marginTop: '60px' }}>
          <Button
            buttonText={loadMore ? "Show Less" : "Load More Articles"}
            onClick={() => setLoadMore(!loadMore)}
          />
        </div>
      </div>
    </section>
  );
};

export default Blog;
