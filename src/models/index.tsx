type Image = {
  src: string;
  width: number;
  height: number;
};

type CategoryPhoto = {
  category: string;
  img: string;
  width: number;
  height: number;
};

type Link = {
  url: string;
  name: string;
};

type Slide = {
  src: string;
  width: number;
  height: number;
  category: string;
  title: string;
  description: string;
  // srcSet: Image[];
};

type Photo = {
  src: string;
  width: number;
  height: number;
  category: string;
  // images: Image[];
};

type SlideshowImage = {
  id: string;
  url: string;
  caption: string;
};

type BlogArticleProps = {
  slideImages: SlideshowImage[];
  isSlideShowLeft: boolean;
};

type BlogSlideshowProps = {
  slideImages: SlideshowImage[];
};

type BlogProps = {
  viewPortSize: number;
};

type PortfolioProps = {
  viewPortSize: number;
};

type NavbarProps = {
  pageYOffset: number;
};

type BannerProps = {
  pageYOffset: number;
};

export type {
  Image,
  Link,
  Slide,
  Photo,
  SlideshowImage,
  CategoryPhoto,
  BlogArticleProps,
  BlogSlideshowProps,
  BlogProps,
  PortfolioProps,
  NavbarProps,
  BannerProps,
};
