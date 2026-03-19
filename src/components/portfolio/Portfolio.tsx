import React, { useState, useEffect, useCallback, useRef } from "react";
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import { motion } from "framer-motion";
import { Slide, Photo, PortfolioProps } from "../../models";
import {
  portfolioPhotos,
  categories,
  portfolioSlides,
} from "../../assets/portfolio";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "./Portfolio.css";

const Portfolio = (props: PortfolioProps) => {
  const [index, setIndex] = useState<number>(-1);
  const [category, setCategory] = useState<string>("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSpread, setIsSpread] = useState(false);
  const [slides, setSlides] = useState<Slide[]>(portfolioSlides);
  const [filteredPhotos, setFilteredPhotos] = useState<Photo[]>(portfolioPhotos);
  const isScrolling = useRef(false);
  const isMobile = props.viewPortSize < 768;

  useEffect(() => {
    const getCategoryPhotos = (category: string): Photo[] =>
      portfolioPhotos.filter((img: Photo) => img.category === category);

    const getSlides = (photo: Photo[]) =>
      photo.map(({ src, width, height, category }, index: number) => ({
        src,
        width,
        height,
        category,
        title: "FLAMINGO_" + index,
        description: "COSMIC_ARCHIVE // DATA_ENTRY_" + index,
      }));

    const photos = category === "all" ? portfolioPhotos : getCategoryPhotos(category);
    setFilteredPhotos(photos);
    setSlides(getSlides(photos));
    setActiveIndex(0);
    setIsSpread(false);
  }, [category]);

  useEffect(() => {
    if (!isMobile && !isSpread && props.setNavLock) {
        props.setNavLock(true);
    }
  }, [isMobile, isSpread, props]);

  const handleOrbitalScroll = useCallback((dir: number) => {
    if (!isMobile && !isSpread) {
      if (dir > 0) {
        setIsSpread(true);
        // Delay unlocking to ensure visibility
        setTimeout(() => {
          if (props.setNavLock) props.setNavLock(false);
        }, 1200);
        return true; 
      }
      return false;
    }

    if (isMobile) {
      setActiveIndex((prev) => {
        const next = prev + dir;
        if (next < 0) return 0;
        if (next >= filteredPhotos.length) return filteredPhotos.length - 1;
        return next;
      });
      return true;
    }

    return false; // Let global handle if already spread or moving up
  }, [filteredPhotos.length, isMobile, isSpread]);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
        if (Math.abs(e.deltaY) < 50) return;
        if (isScrolling.current) return;
        
        const handled = handleOrbitalScroll(e.deltaY > 0 ? 1 : -1);
        if (handled) {
            isScrolling.current = true;
            setTimeout(() => { isScrolling.current = false; }, 1000);
        }
    };

    let touchStart = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStart = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const touchEnd = e.changedTouches[0].clientY;
      const delta = touchStart - touchEnd;
      if (Math.abs(delta) > 50) {
        handleOrbitalScroll(delta > 0 ? 1 : -1);
      }
    };

    window.addEventListener("wheel", onWheel);
    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [handleOrbitalScroll]);

  const renderPlanet = (photo: Photo, idx: number) => {
    const offset = idx - activeIndex;
    
    // Desktop Spread Coordinates (Pseudo-Random but deterministic)
    // Desktop Volumetric Spread (Full screen scatter)
    const spreadX = ((idx % 6) - 2.5) * 350 + (Math.sin(idx) * 100);
    const spreadY = (Math.floor(idx / 6) - 1.5) * 300 + (Math.cos(idx) * 100);
    const spreadZ = (idx % 4) * -600 - 200;

    const orbitalPos = {
      opacity: offset === 0 ? 1 : 0.4 - Math.abs(offset) * 0.1,
      scale: offset === 0 ? 1.5 : 0.7 - Math.abs(offset) * 0.1,
      z: offset * -400,
      x: offset * 250,
      y: offset * (idx % 2 === 0 ? 40 : -40),
      filter: offset === 0 ? "blur(0px)" : `blur(${Math.abs(offset) * 3}px)`
    };

    const spreadPos = {
      opacity: 0.9,
      scale: 0.5,
      z: spreadZ,
      x: spreadX,
      y: spreadY,
      filter: "blur(0px)"
    };

    const isVisible = isSpread || Math.abs(offset) < 5;
    if (!isVisible) return null;

    return (
      <motion.div
        key={idx}
        initial={orbitalPos}
        animate={isSpread ? spreadPos : orbitalPos}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className={`planet-orbital-item ${offset === 0 && !isSpread ? 'active' : ''}`}
        onClick={() => setIndex(idx)}
      >
        <div className="planet-sphere-large">
          <img src={photo.src} alt={photo.category} />
          <div className="planet-shadow"></div>
          <div className="planet-atmosphere-glow"></div>
        </div>
        {offset === 0 && !isSpread && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="orbital-info"
          >
            <div className="mono-text accent-text">PLANET_{idx} {"//"} {photo.category.toUpperCase()}</div>
            <h2 className="planet-title">{slides[idx]?.title}</h2>
            <div className="planet-action">ENGAGE_SENSOR_ARRAY {"—"}</div>
          </motion.div>
        )}
      </motion.div>
    );
  };

  return (
    <div id="portfolio" className={`galactic-orbital-system ${isSpread ? 'system-spread' : ''}`}>
      <div className="orbital-header">
        <div className="section-header">
          <motion.span className="section-subtitle mono-text">
            ARCHIVE_SCAN {"//"} {category.toUpperCase()}
          </motion.span>
          <div className="orbital-count mono-text">
            {isSpread ? (
                <>MODE: <span className="accent-text">VOLUMETRIC_SPREAD</span> | SYNC_COMPLETE</>
            ) : (
                <>OBJECTS_DETECTED: <span className="accent-text">{filteredPhotos.length}</span> | ACTIVE_TARGET: <span className="accent-text">{activeIndex + 1}</span></>
            )}
          </div>
        </div>

        <div className="orbital-selector-container">
          <div className="orbital-selector-track">
            {categories.map((cat: string, i) => (
              <button
                key={i}
                className={`orbital-btn ${cat === category ? 'active' : ''}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="orbital-stage">
        <div className="orbital-stage-center">
            {filteredPhotos.map((photo, idx) => renderPlanet(photo, idx))}
        </div>
      </div>

      <Lightbox
        slides={slides}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Fullscreen, Slideshow, Thumbnails, Zoom, Captions]}
      />
    </div>
  );
};


export default Portfolio;

