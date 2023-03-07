import React, { useState, useEffect, useCallback } from "react";
import { PhotoAlbum, RenderPhotoProps, LayoutType } from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import photos from "./photos";
import "./Album.css";
import { Category } from "../../models";

const Album = () => {
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
      title: "Flamingo " + index,
      description: "Vicko Mozara\n\nVeliki zali, Dubravica, Croatia " + index,
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
        <div className="border">
          <img
            alt={alt}
            style={{
              ...style,
              marginBottom: 0,
              backgroundColor: "white",
            }}
            {...rest}
          />
        </div>
        <div className="middle">
          <div className="text">{slides[index].title}</div>
        </div>
      </div>
    ),
    [slides]
  );

  return (
    <>
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
    </>
  );
};

export default Album;
