import React, { useState, useEffect, useCallback } from "react";
import { PhotoAlbum, RenderPhotoProps, LayoutType } from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import { motion, AnimatePresence } from "framer-motion";
import { Slide, Photo, PortfolioProps } from "../../models";
import {
  portfolioPhotos,
  categories,
  portfolioSlides,
} from "../../assets/portfolio";
import Button from "../button/Button";
import CategoryDashboard from "./CategoryDashboard";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "./Portfolio.css";

const Portfolio = (props: PortfolioProps) => {
  const [index, setIndex] = useState<number>(-1);
  const [category, setCategory] = useState<string>("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const [slides, setSlides] = useState<Slide[]>(portfolioSlides);
  const [filteredPhotos, setFilteredPhotos] = useState<Photo[]>(portfolioPhotos);

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
    setActiveIndex(0); // Reset orbit on category change
  }, [category]);

  const handleOrbitalScroll = useCallback((dir: number) => {
    setActiveIndex((prev) => {
      const next = prev + dir;
      if (next < 0) return 0;
      if (next >= filteredPhotos.length) return filteredPhotos.length - 1;
      return next;
    });
  }, [filteredPhotos.length]);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
        if (Math.abs(e.deltaY) < 30) return;
        handleOrbitalScroll(e.deltaY > 0 ? 1 : -1);
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
    const isVisible = Math.abs(offset) < 5;
    if (!isVisible) return null;

    return (
      <motion.div
        key={idx}
        initial={{ opacity: 0, scale: 0.5, z: -1000 }}
        animate={{ 
          opacity: offset === 0 ? 1 : 0.4 - Math.abs(offset) * 0.1,
          scale: offset === 0 ? 1 : 0.8 - Math.abs(offset) * 0.1,
          z: offset * -200,
          x: offset * 150,
          y: offset * (idx % 2 === 0 ? 20 : -20),
          filter: offset === 0 ? "blur(0px)" : `blur(${Math.abs(offset) * 2}px)`
        }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`planet-orbital-item ${offset === 0 ? 'active' : ''}`}
        onClick={() => setIndex(idx)}
      >
        <div className="planet-sphere-large">
          <img src={photo.src} alt={photo.category} />
          <div className="planet-shadow"></div>
          <div className="planet-atmosphere-glow"></div>
        </div>
        {offset === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="orbital-info"
          >
            <div className="mono-text accent-text">PLANET_{idx} // {photo.category.toUpperCase()}</div>
            <h2 className="planet-title">{slides[idx]?.title}</h2>
            <div className="planet-action">ENGAGE_SENSOR_ARRAY —</div>
          </motion.div>
        )}
      </motion.div>
    );
  };

  return (
    <div id="portfolio" className="galactic-orbital-system">
      <div className="orbital-header">
        <div className="section-header">
          <motion.span className="section-subtitle mono-text">
            ARCHIVE_SCAN // {category.toUpperCase()}
          </motion.span>
          <div className="orbital-count mono-text">
            OBJECTS_DETECTED: <span className="accent-text">{filteredPhotos.length}</span> | 
            ACTIVE_TARGET: <span className="accent-text">{activeIndex + 1}</span>
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

