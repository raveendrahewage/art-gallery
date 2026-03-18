import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Photo } from "../../models";
import "./BlogSlideshow.css";

type BlogSlideshowProps = {
  slideImages: Photo[];
};

const BlogSlideshow = ({ slideImages }: BlogSlideshowProps) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slideImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slideImages.length]);

  return (
    <div className="custom-slideshow">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="slide-image-wrapper"
        >
          <div 
            className="slide-image"
            style={{ backgroundImage: `url(${slideImages[index].src})` }}
          />
          <div className="slide-overlay"></div>
        </motion.div>
      </AnimatePresence>
      
      <div className="slide-indicators">
        {slideImages.map((_, i) => (
          <div 
            key={i} 
            className={`indicator ${i === index ? 'active' : ''}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogSlideshow;
