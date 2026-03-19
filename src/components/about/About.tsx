import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import "./About.css";

const About = () => {
  const [activeStream, setActiveStream] = useState(0);
  const isScrolling = useRef(false);
  const particles = Array.from({ length: 15 });

  const STREAMS = [
    {
        id: "STREAM_01",
        label: "IDENTITY_VECT",
        content: "Ashu is a cosmic architect and visual storyteller dedicated to exploring the infinite reaches of the digital universe. Her work maps the convergence of stellar aesthetics and futuristic landscapes."
    },
    {
        id: "STREAM_02",
        label: "ORBITAL_PATH",
        content: "Navigating the frontiers of digital art from New York to specialized orbital galleries. Her collections investigate the synthesis of human perspective and cosmic mystery."
    },
    {
        id: "STREAM_03",
        label: "CORE_MISSION",
        content: "To design visual constellations that inspire wonder and provide a gateway to the profound beauty of the digital cosmos."
    }
  ];

  const handleStreamScroll = useCallback((dir: number) => {
    setActiveStream((prev) => {
      const next = prev + dir;
      if (next < 0) return 0;
      if (next >= STREAMS.length) return STREAMS.length - 1;
      return next;
    });
  }, [STREAMS.length]);

  useEffect(() => {
  const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 30) return;
      if (isScrolling.current) return;
      
      isScrolling.current = true;
      handleStreamScroll(e.deltaY > 0 ? 1 : -1);

      setTimeout(() => {
          isScrolling.current = false;
      }, 1200);
  };

    let touchStart = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStart = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const touchEnd = e.changedTouches[0].clientY;
      const delta = touchStart - touchEnd;
      if (Math.abs(delta) > 50) {
        handleStreamScroll(delta > 0 ? 1 : -1);
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
  }, [handleStreamScroll]);

  return (
    <section id="about" className="about-orbital-section">
      <div className="particle-field">
        {particles.map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
              y: [Math.random() * 100 - 50, Math.random() * 100 - 50],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 15 + Math.random() * 15,
              repeat: Infinity,
              ease: "linear",
            }}
            className="data-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
            }}
          />
        ))}
      </div>

      <div className="orbital-header">
        <div className="section-header">
          <motion.span className="section-subtitle mono-text">
            NEBULA_SOURCE {"//"} DATA_STREAM
          </motion.span>
          <div className="orbital-count mono-text">
            STREAMS_ACTIVE: <span className="accent-text">{STREAMS.length}</span> | 
            FOCUS: <span className="accent-text">{STREAMS[activeStream].id}</span>
          </div>
        </div>
      </div>

      <div className="nebula-stage">
        <div className="nebula-center-profile">
            <motion.div 
                animate={{ 
                    scale: [1, 1.05, 1],
                    rotate: [0, 2, 0]
                }}
                transition={{ duration: 10, repeat: Infinity }}
                className="nebula-avatar-main"
            >
                <div className="avatar-orb"></div>
                <div className="nebula-aura-pulse"></div>
            </motion.div>
        </div>

        <div className="stream-container">
            {STREAMS.map((item, idx) => {
                const offset = idx - activeStream;
                const isVisible = Math.abs(offset) < 5;
                if (!isVisible) return null;

                return (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8, z: -500 }}
                        animate={{ 
                            opacity: offset === 0 ? 1 : 0.2 - Math.abs(offset) * 0.05,
                            scale: offset === 0 ? 1 : 0.9 - Math.abs(offset) * 0.1,
                            z: offset * -300,
                            y: offset * 150,
                            filter: offset === 0 ? "blur(0px)" : `blur(${Math.abs(offset) * 5}px)`,
                            pointerEvents: offset === 0 ? "auto" : "none"
                        }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="nebula-panel-orbital"
                    >
                        <div className="panel-stream-id mono-text">{item.id} {"//"} {item.label}</div>
                        <div className="panel-divider"></div>
                        <p className="panel-content">{item.content}</p>
                    </motion.div>
                );
            })}
        </div>
      </div>
    </section>
  );
};

export default About;
