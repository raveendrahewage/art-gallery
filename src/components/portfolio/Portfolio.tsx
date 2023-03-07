import React, { useState, useEffect, useCallback } from "react";
import { PhotoAlbum, RenderPhotoProps, LayoutType } from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "./Portfolio.css";
import photos from "./photos";
import { Category } from "../../models";

const Portfolio = () => {
  const [layout, setLayout] = useState<LayoutType>("masonry");
  const [targetRowHeight, setTargetRowHeight] = useState(300);
  const [columns, setColumns] = useState<number>(5);
  const [spacing, setSpacing] = useState<number>(30);
  // const [padding, setPadding] = useState<number>(10);
  const [index, setIndex] = useState<number>(-1);
  const [categoryId, setCategoryId] = useState<number>(0);
  const [photoList, setPhotoList] = useState(photos);

  const categories: Category[] = [
    {
      id: 0,
      name: "ALL",
    },
    {
      id: 1,
      name: "Cat 1",
    },
    {
      id: 2,
      name: "Cat 2",
    },
    {
      id: 3,
      name: "Cat 3",
    },
    {
      id: 4,
      name: "Cat 4",
    },
  ];

  const filterCategory = (id: number) => {
    setCategoryId(id);
    console.log(photos);
    setPhotoList(
      id === 0 ? photos : photos.filter((img) => img.categoryId === id)
    );
  };

  const layoutChange = () => {
    const viewportSize = window.innerWidth;
    setLayout(viewportSize < 480 ? "columns" : "masonry");
    setColumns(viewportSize < 480 ? 1 : viewportSize < 900 ? 3 : 4);
    setSpacing(viewportSize < 480 ? 10 : viewportSize < 900 ? 20 : 30);
    // setPadding(viewportSize < 480 ? 5 : viewportSize < 900 ? 10 : 10);
    setTargetRowHeight(
      viewportSize < 480 ? 100 : viewportSize < 900 ? 500 : 300
    );
  };

  useEffect(() => {
    layoutChange();
    window.onresize = () => layoutChange();
    return () => window.removeEventListener("resize", layoutChange);
  }, []);

  const slides = photos.map(
    ({ src, width, height, images, categoryId }, index: number) => ({
      src,
      width,
      height,
      categoryId,
      title: "Flamingo_" + index,
      description: "Vicko Mozara\n\nVeliki zali, Dubravica" + index,
      srcSet: images.map((image) => ({
        src: image.src,
        width: image.width,
        height: image.height,
      })),
    })
  );

  const renderPhoto = useCallback(
    ({
      layout: { index, ...layout },
      imageProps: { alt, style, ...rest },
    }: RenderPhotoProps) => (
      <div className="frame">
        <div className="inner-frame">
          <div className="border">
            <img
              alt={alt}
              style={{
                ...style,
                marginBottom: 0,
              }}
              {...rest}
            />
          </div>
          <div className="middle" onClick={() => setIndex(index)}>
            <div className="row">
              <div className="column1">
                <svg className="camera" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M220.6 121.2L271.1 96 448 96v96H333.2c-21.9-15.1-48.5-24-77.2-24s-55.2 8.9-77.2 24H64V128H192c9.9 0 19.7-2.3 28.6-6.8zM0 128V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H271.1c-9.9 0-19.7 2.3-28.6 6.8L192 64H160V48c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16l0 16C28.7 64 0 92.7 0 128zM168 304a88 88 0 1 1 176 0 88 88 0 1 1 -176 0z" /></svg>
                <div className="index">{index + 1}</div>
              </div>
              <div className="column2">
                <div className="photo-title">{slides[index].title}</div>
                <div className="description">{slides[index].description}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    [slides]
  );

  return (
    <div id="portfolio">
      <div className="portfolio">
        <h1 className="title">PORTFOLIO</h1>
        <sub>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        </sub>
        <div className="btn-group">
          <div>
            {categories.map((category: Category) => (
              <div
                key={category.id}
                className={category.id === categoryId ? "div-active" : ""}
                onClick={() => filterCategory(category.id)}
              >
                {category.name}
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="container">
        <PhotoAlbum
          photos={photoList}
          layout={layout}
          columns={columns}
          spacing={spacing}
          targetRowHeight={targetRowHeight}
          renderPhoto={renderPhoto}
          onClick={({ index }) => setIndex(index)}
        />
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
