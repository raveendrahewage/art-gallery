import React from 'react';
import { Slide } from 'react-slideshow-image';
import { SlideshowImage, BlogSlideshowProps } from '../../models';
import 'react-slideshow-image/dist/styles.css'
import "./BlogSlideshow.css"

const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    minHeight: '350px'
}

const BlogSlideshow = (props: BlogSlideshowProps) => {
    return (
        <div className="blog-slideshow" style={{ height: 200 }}>
            <Slide>
                {props.slideImages.map((slideImage: SlideshowImage, index: number) => (
                    <div key={index}>
                        <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
                        </div>
                    </div>
                ))}
            </Slide>
        </div>
    )
}

export default BlogSlideshow;