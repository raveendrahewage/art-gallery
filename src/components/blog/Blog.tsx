import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import BlogArticle from "../blog-article/BlogArticle";
import { BlogProps } from "../../models";
import {
  bookmarkPhotos,
  bwPhotos,
  cartoonPhotos,
  coffeePhotos,
  compassPhotos,
  nostalagicPhotos,
  pencilPhotos,
} from "../../assets/portfolio";
import "./Blog.css";

const Blog = (props: BlogProps) => {
  const { setNavLock } = props;
  const [activeNode, setActiveNode] = useState(0);
  const [isSpread, setIsSpread] = useState(false);
  const isScrolling = useRef(false);
  const isMobile = props.viewPortSize < 768;

  const CHRONICLES = [
    { photos: bookmarkPhotos, title: "BOOKMARK_PROTOCOL" },
    { photos: bwPhotos, title: "MONO_ARCHIVE" },
    { photos: cartoonPhotos, title: "VECTORS_G01" },
    { photos: coffeePhotos, title: "BREW_SESSIONS" },
    { photos: compassPhotos, title: "NAVIGATION_LOGS" },
    { photos: nostalagicPhotos, title: "ECHO_CHAMBER" },
    { photos: pencilPhotos, title: "GRAPHITE_CORE" },
  ];

  useEffect(() => {
    if (!isMobile && !isSpread && setNavLock) {
        setNavLock(true);
    }
  }, [isMobile, isSpread, setNavLock]);

  const handleNodeScroll = useCallback((dir: number) => {
    if (!isMobile && !isSpread) {
      if (dir > 0) {
        setIsSpread(true);
        setTimeout(() => {
          if (setNavLock) setNavLock(false);
        }, 1200);
        return true;
      }
      return false;
    }

    if (isMobile || isSpread) {
      setActiveNode((prev) => {
        const next = prev + dir;
        if (next < 0) return 0;
        if (next >= CHRONICLES.length) return CHRONICLES.length - 1;
        return next;
      });
      return true;
    }

    return false;
  }, [CHRONICLES.length, isMobile, isSpread, setNavLock]);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
        if (Math.abs(e.deltaY) < 30) return;
        if (isScrolling.current) return;
        
        const handled = handleNodeScroll(e.deltaY > 0 ? 1 : -1);
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
        handleNodeScroll(delta > 0 ? 1 : -1);
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
  }, [handleNodeScroll]);

  return (
    <section id="blog" className={`blog-orbital-section ${isSpread ? 'constellation-spread' : ''}`}>
      <div className="orbital-header">
        <div className="section-header">
          <motion.span className="section-subtitle mono-text">
            SIGNAL_LOGS {"//"} CHRONICLES
          </motion.span>
          <div className="orbital-count mono-text">
            {isSpread ? (
                <>STATUS: <span className="accent-text">VOLUMETRIC_MANIFESTED</span></>
            ) : (
                <>NODES_DETECTED: <span className="accent-text">{CHRONICLES.length}</span> | FOCUS_NODE: <span className="accent-text">{activeNode + 1}</span></>
            )}
          </div>
        </div>

        <div className="node-selector-container">
          <div className="node-selector-track">
            {CHRONICLES.map((item, i) => (
              <button
                key={i}
                className={`node-btn ${i === activeNode ? 'active' : ''}`}
                onClick={() => {
                    setActiveNode(i);
                    setIsSpread(false);
                }}
              >
                {item.photos[0].category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="constellation-stage">
        <div className="constellation-center">
            {CHRONICLES.map((item, idx) => {
                const offset = idx - activeNode;
                
                // Desktop Volumetric Positions (Scattered across screen)
                const spreadX = ((idx % 3) - 1) * 550 + (Math.sin(idx) * 50);
                const spreadY = (Math.floor(idx / 3) - 0.8) * 450;
                const spreadZ = idx * -250 - 100;

                const orbitalPos = {
                    opacity: offset === 0 ? 1 : 0.2 - Math.abs(offset) * 0.1,
                    scale: offset === 0 ? 1.6 : 0.8 - Math.abs(offset) * 0.1,
                    z: offset * -350,
                    x: offset * 300,
                    y: offset * 50,
                    filter: offset === 0 ? "blur(0px)" : `blur(${Math.abs(offset) * 5}px)`,
                    pointerEvents: offset === 0 ? "auto" : "none" as any
                };

                const spreadPos = {
                    opacity: 0.9,
                    scale: 0.7,
                    z: spreadZ,
                    x: spreadX,
                    y: spreadY,
                    filter: "blur(0px)",
                    pointerEvents: "auto" as any
                };

                const isVisible = isSpread || Math.abs(offset) < 5;
                if (!isVisible) return null;

                return (
                    <motion.div
                        key={idx}
                        initial={orbitalPos}
                        animate={isSpread ? spreadPos : orbitalPos}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="constellation-node-wrapper"
                    >
                        <BlogArticle 
                            slideImages={item.photos} 
                            isSlideShowLeft={true} 
                        />
                    </motion.div>
                );
            })}
        </div>
      </div>
    </section>
  );
};

export default Blog;
