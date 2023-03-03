import React, { useState, useCallback } from 'react';
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
import useLayoutEffect from "./LayoutEffect";
import photos from "./photos";
import './Album.css'

const Album = () => {
    const [layout, setLayout] = useState<LayoutType>("masonry");
    const [targetRowHeight, setTargetRowHeight] = useState(300);
    const [columns, setColumns] = useState<number>(5);
    const [spacing, setSpacing] = useState<number>(30);
    // const [padding, setPadding] = useState<number>(10);
    const [index, setIndex] = useState<number>(-1);

    const slides = photos.map(({ src, width, height, images }) => ({
        src,
        width,
        height,
        title: "Flamingo",
        description: "Vicko Mozara\n\nVeliki zali, Dubravica, Croatia",
        srcSet: images.map((image) => ({
            src: image.src,
            width: image.width,
            height: image.height,
        })),
    }));

    // const layoutChange = () => {
    //     const viewportSize = window.innerWidth;
    //     setLayout(viewportSize < 480 ? "columns" : "masonry");
    //     setColumns(viewportSize < 480 ? 1 : viewportSize < 900 ? 3 : 5);
    //     setSpacing(viewportSize < 480 ? 10 : viewportSize < 900 ? 20 : 30);
    //     // setPadding(viewportSize < 480 ? 5 : viewportSize < 900 ? 10 : 10);
    //     setTargetRowHeight(viewportSize < 480 ? 100 : viewportSize < 900 ? 500 : 300);
    // }

    useLayoutEffect(() => {
        console.log("xxxxx")
        const viewportSize = window.innerWidth;
        setLayout(viewportSize < 480 ? "columns" : "masonry");
        setColumns(viewportSize < 480 ? 1 : viewportSize < 900 ? 3 : 5);
        setSpacing(viewportSize < 480 ? 10 : viewportSize < 900 ? 20 : 30);
        // setPadding(viewportSize < 480 ? 5 : viewportSize < 900 ? 10 : 10);
        setTargetRowHeight(viewportSize < 480 ? 100 : viewportSize < 900 ? 500 : 300);
    }, []);

    // window.onresize = () => layoutChange();

    const renderPhoto = useCallback(
        ({ layout: { index, ...layout }, imageProps: { alt, style, ...rest } }: RenderPhotoProps) => (
            <div
                className="frame"
            >
                <div className="border">
                    <img
                        alt={alt}
                        style={{
                            ...style,
                            marginBottom: 0,
                            backgroundColor: "white"
                        }}
                        {...rest}
                    />
                </div>
                <div
                    className="middle"
                >
                    <div className="text">{slides[index].title}</div>
                </div>
            </div>
        ),
        [slides]
    );

    return (
        <div className='container'>
            <PhotoAlbum
                photos={photos}
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
    )
}

export default Album;