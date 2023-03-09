import React, { useState, useEffect } from "react";
import "./App.css";
import DotRing from "./components/dotring/DotRing";
import Portfolio from "./components/portfolio/Portfolio";
import Banner from "./components/banner/Banner";
import Navbar from "./components/navbar/Navbar";
import About from "./components/about/About";
import Footer from "./components/footer/Footer";
import Slideshow from "./components/slideshow/Slideshow";
import Blog from "./components/blog/Blog";

const App = () => {
  const [viewPortSize, setViewPortSize] = useState<number>(window.innerWidth);
  const [pageYOffset, setPageYOffset] = useState<number>(window.innerWidth);
  const viewPortChange = () => {
    setViewPortSize(window.innerWidth);
  };
  const pageYOffsetChange = () => {
    setPageYOffset(window.pageYOffset);
  };

  useEffect(() => {
    viewPortChange();
    pageYOffsetChange();
    window.onscroll = () => pageYOffsetChange();
    window.onresize = () => viewPortChange();
    return () => {
      window.removeEventListener("scroll", pageYOffsetChange)
      window.removeEventListener("resize", viewPortChange);
    }
  }, []);

  return (
    <div className="App">
      <DotRing />
      <Navbar pageYOffset={pageYOffset} />
      <Slideshow />
      {/* <Banner /> */}
      <Portfolio viewPortSize={viewPortSize} />
      <Blog viewPortSize={viewPortSize} />
      <About />
      <Footer />
    </div>
  );
};

export default App;
