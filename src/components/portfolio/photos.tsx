import portfolioImages from "../../assets/slideshow";
import { CategoryPhoto, Photo } from "../../models";

// const breakpoints = [1080, 640, 384, 256, 128, 96, 64, 48];

const photos: Photo[] = portfolioImages.map((photo: CategoryPhoto) => ({
  src: photo.img,
  width: photo.width,
  height: photo.height,
  category: photo.category,
  // images: breakpoints.map((breakpoint) => {
  //   const height = Math.round((photo.height / photo.width) * breakpoint);
  //   return {
  //     src: photo.img,
  //     width: breakpoint,
  //     height,
  //   };
  // }),
}));

export default photos;
