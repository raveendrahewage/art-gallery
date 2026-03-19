import React, { useState, useEffect, useCallback } from "react";
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
import Button from "../button/Button";
import "./Blog.css";

const Blog = (props: BlogProps) => {
  const [activeNode, setActiveNode] = useState(0);

  const CHRONICLES = [
    { photos: bookmarkPhotos, title: "BOOKMARK_PROTOCOL" },
    { photos: bwPhotos, title: "MONO_ARCHIVE" },
    { photos: cartoonPhotos, title: "VECTORS_G01" },
    { photos: coffeePhotos, title: "BREW_SESSIONS" },
    { photos: compassPhotos, title: "NAVIGATION_LOGS" },
    { photos: nostalagicPhotos, title: "ECHO_CHAMBER" },
    { photos: pencilPhotos, title: "GRAPHITE_CORE" },
  ];

  const handleNodeScroll = useCallback((dir: number) => {
    setActiveNode((prev) => {
      const next = prev + dir;
      if (next < 0) return 0;
      if (next >= CHRONICLES.length) return CHRONICLES.length - 1;
      return next;
    });
  }, [CHRONICLES.length]);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
        if (Math.abs(e.deltaY) < 30) return;
        handleNodeScroll(e.deltaY > 0 ? 1 : -1);
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
    <section id="blog" className="blog-orbital-section">
      <div className="orbital-header">
        <div className="section-header">
          <motion.span className="section-subtitle mono-text">
            SIGNAL_LOGS // CHRONICLES
          </motion.span>
          <div className="orbital-count mono-text">
            NODES_DETECTED: <span className="accent-text">{CHRONICLES.length}</span> | 
            FOCUS_NODE: <span className="accent-text">{activeNode + 1}</span>
          </div>
        </div>

        <div className="node-selector-container">
          <div className="node-selector-track">
            {CHRONICLES.map((item, i) => (
              <button
                key={i}
                className={`node-btn ${i === activeNode ? 'active' : ''}`}
                onClick={() => setActiveNode(i)}
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
                const isVisible = Math.abs(offset) < 5;
                if (!isVisible) return null;

                return (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8, z: -500 }}
                        animate={{ 
                            opacity: offset === 0 ? 1 : 0.3 - Math.abs(offset) * 0.1,
                            scale: offset === 0 ? 1 : 0.9 - Math.abs(offset) * 0.1,
                            z: offset * -250,
                            x: offset * 200,
                            filter: offset === 0 ? "blur(0px)" : `blur(${Math.abs(offset) * 4}px)`,
                            pointerEvents: offset === 0 ? "auto" : "none"
                        }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
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
