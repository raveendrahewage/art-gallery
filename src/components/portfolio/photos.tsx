import slideshowPhotos from "../../assets/slideshow"

// const breakpoints = [1080, 640, 384, 256, 128, 96, 64, 48];

const generateRandom = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;

const photos = slideshowPhotos.map((photo) => ({
  src: photo.img,
  width: photo.width,
  height: photo.height,
  categoryId: generateRandom(1, 5),
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
