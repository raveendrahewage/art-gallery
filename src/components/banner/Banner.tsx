import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./Banner.css";

const Banner = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="hero-banner galactic-core-sector">
      {/* The Central Singularity */}
      <div className="singularity-container">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="core-aura"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="core-glow"
        />
        <div className="core-center"></div>
      </div>

      <motion.div 
        animate={{ 
          x: mousePos.x, 
          y: mousePos.y,
          rotateX: -mousePos.y * 0.5,
          rotateY: mousePos.x * 0.5
        }}
        className="hud-orbital"
      >
        <div className="hud-ring"></div>
        <div className="hud-data-orbital mono-text">
            CORE_STABILITY: 98.4%<br/>
            GRAVITY_WELL: { (1000 + Math.abs(mousePos.x) * 10).toFixed(0) }u
        </div>
      </motion.div>
      
      <div className="hero-content">
        <motion.div
           initial={{ opacity: 0, scale: 0 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ type: "spring", delay: 0.5 }}
           className="core-descriptor"
        >
            <span className="accent-text">GALACTIC_CORE</span>
        </motion.div>
        
        <div className="title-wrapper">
          <motion.h1 
            initial={{ opacity: 0, filter: "blur(20px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 2, delay: 0.8 }}
            className="hero-main-title core-title"
          >
            ASHU
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="core-status mono-text"
          >
            THE_ARCHITECT_OF_THE_SINGULARITY
          </motion.p>
        </div>

        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 2.5 }}
           className="navigation-hint"
        >
            <div className="mouse-wheel-hint"></div>
            <span className="mono-text">DEPART_CORE</span>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
