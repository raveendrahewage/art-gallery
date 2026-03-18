import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BannerProps } from "../../models";
import "./Banner.css";

const Banner = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="hero-banner">
      <motion.div 
        style={{ y: y1, opacity }}
        className="hero-content"
      >
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="hero-badge"
        >
            ESTABLISHED 2026
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="hero-main-title"
        >
          ASHU'S <span className="accent-text">GALLERY</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="hero-subtitle"
        >
          Digital Curations of Visual Storytelling & Artistic Vision
        </motion.p>
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.8 }}
           className="scroll-indicator"
        >
            <div className="mouse">
                <div className="wheel"></div>
            </div>
            <span>SCROLL TO DISCOVER</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Banner;
