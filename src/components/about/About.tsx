import React from "react";
import { motion } from "framer-motion";
import "./About.css";

const About = () => {
  return (
    <section id="about">
      <div className="section-header">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-subtitle"
        >
          DISCOVER THE ARTIST
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-title"
        >
          ABOUT ME
        </motion.h2>
      </div>

      <div className="about-grid">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="about-image-wrapper"
        >
          <div className="about-image"></div>
          <div className="image-overlay"></div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="about-content"
        >
          <div className="content-block">
            <h3>A LITTLE INTRO</h3>
            <p>
              I am a visual storyteller dedicated to capturing the raw essence of moments. My work blends traditional techniques with modern perspectives, resulting in a unique aesthetic that resonates with collectors worldwide.
            </p>
          </div>

          <div className="content-block">
            <h3>MY EXHIBITIONS</h3>
            <p>
              Featured in galleries across New York, London, and Tokyo. My collections explore the intersection of human emotion and environmental landscapes, pushing the boundaries of contemporary photography.
            </p>
          </div>

          <div className="content-block">
            <h3>THE VISION</h3>
            <p>
              Every frame tells a story. My mission is to provide an immersive experience that invites viewers to see the world through a lens of wonder and profound beauty.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
