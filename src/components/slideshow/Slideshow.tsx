import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Slideshow.css";

const slideImages = [
  {
    url: "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    caption: "MOMENTS IN TIME",
    id: "portfolio",
    subtitle: "A curated collection of visual narratives."
  },
  {
    url: "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
    caption: "THE ARTIST'S VISION",
    id: "about",
    subtitle: "Behind the lens of Ashu's Gallery."
  },
  {
    url: "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    caption: "EDITORIAL INSIGHTS",
    id: "blog",
    subtitle: "Stories and techniques from the field."
  },
];

const Slideshow = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slideImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="slideshow-section">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="main-slide"
        >
          <div 
            className="main-slide-bg"
            style={{ backgroundImage: `url(${slideImages[index].url})` }}
          />
          <div className="main-slide-overlay" />
          
          <div className="main-slide-content">
            <motion.span 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="slide-subtitle"
            >
              {slideImages[index].subtitle}
            </motion.span>
            <motion.h2 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="slide-title"
            >
              {slideImages[index].caption}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <a href={`#${slideImages[index].id}`} className="slide-cta">
                EXPLORE NOW <span className="arrow">→</span>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="slide-controls">
        {slideImages.map((_, i) => (
          <button 
            key={i} 
            className={`slide-dot ${i === index ? 'active' : ''}`}
            onClick={() => setIndex(i)}
          >
             <span className="dot-label">0{i + 1}</span>
             <div className="dot-progress">
                {i === index && (
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 5, ease: "linear" }}
                        className="progress-fill"
                    />
                )}
             </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default Slideshow;
