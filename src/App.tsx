import React from "react";
import "./App.css";
import DotRing from "./components/dotring/DotRing";
import Portfolio from "./components/portfolio/Portfolio";
import Banner from "./components/banner/Banner";
import Navbar from "./components/navbar/Navbar";
import About from "./components/about/About";
import Footer from "./components/footer/Footer";
import Slideshow from "./components/slideshow/Slideshow";

const App = () => {
  return (
    <div className="App">
      <DotRing />
      <Navbar />
      <Slideshow />
      {/* <Banner /> */}
      <Portfolio />
      <About />
      <Footer />
    </div>
  );
};

export default App;
