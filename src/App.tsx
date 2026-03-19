import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";
import DotRing from "./components/dotring/DotRing";
import Portfolio from "./components/portfolio/Portfolio";
import Banner from "./components/banner/Banner";
import About from "./components/about/About";
import Footer from "./components/footer/Footer";
import Slideshow from "./components/slideshow/Slideshow";
import Blog from "./components/blog/Blog";

const SECTORS = ["HERO", "ARCHIVES", "CHRONICLES", "NEBULA_CORE"];

const App = () => {
  const [viewPortSize, setViewPortSize] = useState<number>(window.innerWidth);
  const [activeSector, setActiveSector] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const lastScrollTime = useRef(0);

  const handleSectorChange = (dir: number) => {
    const now = Date.now();
    if (now - lastScrollTime.current < 1000) return; // Debounce for cinematic feel
    
    lastScrollTime.current = now;
    setActiveSector((prev) => {
      const next = prev + dir;
      if (next < 0) return 0;
      if (next >= SECTORS.length) return SECTORS.length - 1;
      return next;
    });
  };

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      // Ignore small movements
      if (Math.abs(e.deltaY) < 50) return;
      
      // Debounce to prevent rapid sector skipping
      const now = Date.now();
      if (now - lastScrollTime.current < 1000) return;

      handleSectorChange(e.deltaY > 0 ? 1 : -1);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") handleSectorChange(1);
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") handleSectorChange(-1);
    };

    // Touch Support
    let touchStart = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStart = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const touchEnd = e.changedTouches[0].clientY;
      const delta = touchStart - touchEnd;
      if (Math.abs(delta) > 100) { // Increased threshold for global swipe
        handleSectorChange(delta > 0 ? 1 : -1);
      }
    };

    window.addEventListener("wheel", onWheel);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  useEffect(() => {
    const viewPortChange = () => setViewPortSize(window.innerWidth);
    window.addEventListener("resize", viewPortChange);
    return () => window.removeEventListener("resize", viewPortChange);
  }, []);

  // Background Parallax based on state
  const bgRotation = activeSector * 15;
  const bgScale = 1 + activeSector * 0.1;

  return (
    <div className="App galactic-navigator">
      <div id="fb-root"></div>
      
      {/* Immersive Cosmic Background (State Driven) */}
      <motion.div 
        animate={{ 
          rotate: bgRotation,
          scale: bgScale
        }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="cosmic-bg"
      >
        <div className="stars-1" />
        <div className="stars-2" />
        <div className="stars-3" />
        <div className="nebula" />
      </motion.div>

      <DotRing />
      
      {/* Navigation HUD */}
      <div className="galactic-hud">
        <div className="sector-indicator mono-text">
            SECTOR: <span className="accent-text">{SECTORS[activeSector]}</span>
        </div>
        <div className="sector-dots">
            {SECTORS.map((_, i) => (
                <div 
                    key={i} 
                    className={`dot ${i === activeSector ? 'active' : ''}`}
                    onClick={() => setActiveSector(i)}
                />
            ))}
        </div>
      </div>

      <main className="content-deck">
        <AnimatePresence mode="wait">
          {activeSector === 0 && (
            <motion.div
              key="sector-0"
              initial={{ opacity: 0, scale: 1.5, filter: "blur(20px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.5, filter: "blur(20px)" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <Banner />
            </motion.div>
          )}
          {activeSector === 1 && (
            <motion.div
              key="sector-1"
              initial={{ opacity: 0, scale: 0.5, filter: "blur(20px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.5, filter: "blur(20px)" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="atmospheric-panel"
            >
              <Portfolio viewPortSize={viewPortSize} />
            </motion.div>
          )}
          {activeSector === 2 && (
            <motion.div
              key="sector-2"
              initial={{ opacity: 0, scale: 0.5, filter: "blur(20px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.5, filter: "blur(20px)" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="atmospheric-panel"
            >
              <Blog viewPortSize={viewPortSize} />
            </motion.div>
          )}
          {activeSector === 3 && (
            <motion.div
              key="sector-3"
              initial={{ opacity: 0, scale: 0.5, filter: "blur(20px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.5, filter: "blur(20px)" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="atmospheric-panel"
            >
              <About />
              <Footer />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;
