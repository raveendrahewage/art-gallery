import { Photo, Slide } from "../../models";
import { bookmarkPhotos } from "./bookmarks";
import { bwPhotos } from "./b&w";
import { cartoonPhotos } from "./cartoon";
import { coffeePhotos } from "./coffee";
import { compassPhotos } from "./compass";
import { nostalagicPhotos } from "./nostalagic";
import { pencilPhotos } from "./pencil";

const portfolioPhotos: Photo[] = [
  ...bookmarkPhotos,
  ...bwPhotos,
  ...cartoonPhotos,
  ...coffeePhotos,
  ...compassPhotos,
  ...nostalagicPhotos,
  ...pencilPhotos,
];

const portfolioSlides: Slide[] = portfolioPhotos.map(
  ({ src, width, height, category }, index: number) => ({
    src,
    width,
    height,
    category,
    title: "Flamingo_" + index,
    description: "Vicko Mozara\n\nVeliki zali, Dubravica" + index,
  })
);

const categories: string[] = [
  "all",
  ...new Set(portfolioPhotos.map((photo: Photo) => photo.category)),
];

export {
  bookmarkPhotos,
  bwPhotos,
  cartoonPhotos,
  coffeePhotos,
  compassPhotos,
  nostalagicPhotos,
  pencilPhotos,
  portfolioPhotos,
  categories,
  portfolioSlides,
};
