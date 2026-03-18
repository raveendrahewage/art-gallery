import React from "react";
import { motion } from "framer-motion";
import BlogSlideshow from "../blog-slideshow/BlogSlideshow";
import { BlogArticleProps } from "../../models";
import "./BlogArticle.css";

const BlogArticle = (props: BlogArticleProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8 }}
      className={`blog-article-row ${props.isSlideShowLeft ? '' : 'row-reverse'}`}
    >
      <div className="article-column slideshow-column">
        <div className="slideshow-wrapper">
          <BlogSlideshow slideImages={props.slideImages} />
        </div>
      </div>
      
      <div className="article-column content-column">
        <span className="article-category">{props.slideImages[0].category}</span>
        <h3 className="article-title">Capturing the Essence: {props.slideImages[0].category}</h3>
        <p className="article-text">
          Dive into the world of {props.slideImages[0].category} artistry. This collection explores the intricate details and emotional depth found within these unique perspectives, offering a truly immersive visual journey for the discerning viewer.
        </p>
        <div className="article-footer">
            <span className="read-time">5 MIN READ</span>
            <div className="article-link">LEARN MORE —</div>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogArticle;
