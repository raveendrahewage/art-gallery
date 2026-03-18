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
  const [layout, setLayout] = useState<LayoutType>("masonry");
  const [targetRowHeight, setTargetRowHeight] = useState(300);
  const [columns, setColumns] = useState<number>(5);
  const [spacing, setSpacing] = useState<number>(30);
  const [index, setIndex] = useState<number>(-1);
  const [displayImageCount, setDisplayeImageCount] = useState<number>(10);
  const [category, setCategory] = useState<string>("all");
  const [showDashboard, setShowDashboard] = useState<boolean>(false);
  const [slides, setSlides] = useState<Slide[]>(portfolioSlides);
  const [filteredPhotos, setFilteredPhotos] =
    useState<Photo[]>(portfolioPhotos);

  useEffect(() => {
    const getCategoryPhotos = (category: string): Photo[] =>
      portfolioPhotos.filter((img: Photo) => img.category === category);

    const getSlides = (photo: Photo[]) =>
      photo.map(({ src, width, height, category }, index: number) => ({
        src,
        width,
        height,
        category,
        title: "Flamingo_" + index,
        description: "Vicko Mozara\n\nVeliki zali, Dubravica" + index,
      }));

    const photos = category === "all" ? portfolioPhotos : getCategoryPhotos(category);
    setFilteredPhotos(photos);
    setSlides(getSlides(photos));
    
    // Show dashboard only for specific categories, not for "all"
    if (category !== "all") {
      setShowDashboard(true);
    } else {
      setShowDashboard(false);
    }
  }, [category]);

  const layoutChange = (viewPortSize: number = window.innerWidth) => {
    setLayout(viewPortSize < 480 ? "columns" : "masonry");
    setColumns(viewPortSize < 480 ? 1 : viewPortSize < 900 ? 3 : 4);
    setSpacing(viewPortSize < 480 ? 10 : viewPortSize < 900 ? 20 : 30);
    setTargetRowHeight(
      viewPortSize < 480 ? 100 : viewPortSize < 900 ? 500 : 300
    );
  };

  useEffect(() => {
    layoutChange(props.viewPortSize);
  }, [props.viewPortSize]);

  const renderPhoto = useCallback(
    ({
      layout: { index, ...layout },
      imageProps: { alt, style, src, onClick, ...rest },
    }: RenderPhotoProps<Photo>) => (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
        className="frame"
        style={{
          display: index < displayImageCount ? "block" : "none",
        }}
      >
        <div className="inner-frame">
          <div className="border" onClick={onClick}>
            <img
              alt={alt}
              src={src}
              style={{
                ...style,
                marginBottom: 0,
                maxWidth: "100%",
                height: "auto",
              }}
              {...rest}
            />
            <div className="middle">
              <div className="portfolio-info">
                 <svg viewBox="0 0 24 24" className="camera-icon" style={{ width: 24, height: 24, marginBottom: 12 }}><path fill="currentColor" d="M4 4h3l2-2h6l2 2h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2m8 3a5 5 0 0 0-5 5 5 5 0 0 0 5 5 5 5 0 0 0 5-5 5 5 0 0 0-5-5m0 2a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3z"/></svg>
                 <h3 className="photo-title">{slides[index]?.title || "Gallery Piece"}</h3>
                 <p className="description">VIEW ARTWORK</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    ),
    [displayImageCount, slides]
  );

  return (
    <div id="portfolio">
      <div className="portfolio">
        <div className="section-header">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="section-subtitle"
          >
            ARTISTIC PERSPECTIVES
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            PORTFOLIO
          </motion.h1>
        </div>
        <div className="btn-group">
          <div>
            {categories.map((cat: string, index: number) => (
              <Button
                key={index}
                className={cat === category ? "div-active" : ""}
                onClick={() => {
                  setCategory(cat);
                  setDisplayeImageCount(10);
                }}
                buttonText={cat}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="container">
        <AnimatePresence mode="wait">
          {showDashboard && category !== "all" ? (
            <CategoryDashboard
              key={category}
              category={category}
              photoCount={filteredPhotos.length}
              featuredPhoto={filteredPhotos[0]?.src}
              onExplore={() => setShowDashboard(false)}
            />
          ) : (
            <motion.div
              key="gallery"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <PhotoAlbum
                photos={filteredPhotos}
                layout={layout}
                columns={columns}
                spacing={spacing}
                targetRowHeight={targetRowHeight}
                renderPhoto={renderPhoto}
                onClick={({ index }) => setIndex(index)}
                componentsProps={(containerWidth) => ({
                  imageProps: {
                    loading: (containerWidth || 0) > 600 ? "eager" : "lazy",
                  },
                })}
              />
              <div className="load-more-btn-container" style={{ marginTop: '50px' }}>
                <Button
                  buttonText={
                    displayImageCount === filteredPhotos.length
                      ? "Show Less"
                      : "Load More"
                  }
                  onClick={() =>
                    setDisplayeImageCount(
                      filteredPhotos.length === displayImageCount
                        ? 10
                        : displayImageCount + 10 < filteredPhotos.length
                        ? displayImageCount + 10
                        : filteredPhotos.length
                    )
                  }
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Lightbox
          slides={slides}
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          plugins={[Fullscreen, Slideshow, Thumbnails, Zoom, Captions]}
        />
      </div>
    </div>
  );
};

export default Portfolio;

