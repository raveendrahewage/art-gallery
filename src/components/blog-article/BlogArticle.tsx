import React from "react";
import { motion } from "framer-motion";
import BlogSlideshow from "../blog-slideshow/BlogSlideshow";
import { BlogArticleProps } from "../../models";
import "./BlogArticle.css";

const BlogArticle = (props: BlogArticleProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ duration: 0.8 }}
      className="constellation-node"
    >
      <div className="node-slideshow-container">
        <div className="node-slideshow-glow"></div>
        <BlogSlideshow slideImages={props.slideImages} />
      </div>
      
      <div className="node-content">
        <div className="node-header mono-text">
            NODE_CHRONICLE // {props.slideImages[0].category.toUpperCase()}
        </div>
        <h3 className="node-title">EXTRACTING_DATA: {props.slideImages[0].category}</h3>
        <p className="node-text">
          SATELLITE_LOG: Decoding the visual essence of {props.slideImages[0].category}. 
          Archives indicate a high density of aesthetic harmonics.
        </p>
        <div className="node-footer">
            <span className="mono-text">ACCESS_FULL_CHRONICLE ||</span>
            <div className="node-action-line"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogArticle;
