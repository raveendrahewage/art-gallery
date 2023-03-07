import React, { useState, useEffect, useRef } from "react";
import "./Landing.css";
import { Image } from "../../models";

const Landing = () => {
  const showcase = useRef<HTMLDivElement>(null);
  const [slide, setSlide] = useState<number>(0);
  const [displayWidth, setDisplayWidth] = useState<number>(0);

  const slideShowcase = (slide: number): void => {
    setSlide(slide);
    setDisplayWidth(Number(showcase?.current?.clientWidth));
  };

  useEffect(() => {
    window.onresize = () => slideShowcase(slide);
    return () =>
      window.removeEventListener("resize", () => slideShowcase(slide));
  }, [slide]);

  const unsplashLink = (id: string, width: number, height: number) =>
    `https://source.unsplash.com/${id}/${width}x${height}`;

  const unsplashPhotos = [
    { id: "Osq7UAVxIOI", width: 1080, height: 720 },
    { id: "Dhmn6ete6g8", width: 1080, height: 720 },
    { id: "RkBTPqPEGDo", width: 1080, height: 720 },
  ];

  const images: Image[] = [
    {
      url: unsplashLink(
        unsplashPhotos[0].id,
        unsplashPhotos[0].width,
        unsplashPhotos[0].height
      ),
      description: "Explore the wilderness",
      info: "explore with us",
    },
    {
      url: unsplashLink(
        unsplashPhotos[1].id,
        unsplashPhotos[1].width,
        unsplashPhotos[1].height
      ),
      description: "Nature does nothing uselessly",
      info: "learn more",
    },
    {
      url: unsplashLink(
        unsplashPhotos[2].id,
        unsplashPhotos[2].width,
        unsplashPhotos[2].height
      ),
      description: "Keep calm and love nature",
      info: "read more",
    },
  ];

  return (
    <div className="showcase-wrapper">
      <div
        className="showcase-content"
        style={{ transform: `translateX(${-slide * displayWidth}px)` }}
      >
        {images.map((image: Image, i: number) => (
          <div
            className="showcase"
            key={i}
            style={{
              background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)), url(${image.url}) center/cover no-repeat`,
              backgroundPosition: "fixed",
            }}
            ref={showcase}
          >
            <h1>{image.description}</h1>
            <button type="button">{image.info}</button>
          </div>
        ))}
      </div>
      <div className="dotted-btns">
        {[...Object.keys(images)].map((i: string) => (
          <span key={i} onClick={() => slideShowcase(+i)}>
            <i className="fas fa-circle"></i>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Landing;
