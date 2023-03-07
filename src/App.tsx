import React from "react";
import "./App.css";
import DotRing from "./components/dotring/DotRing";
import Album from "./components/album/Album";
import Landing from "./components/landing/Landing";
import Banner from "./components/banner/Banner";
import Navbar from "./components/navbar/Navbar";
import About from "./components/about/About";

const App = () => {
  return (
    <div className="App">
      <DotRing />
      <Navbar />
      <Banner />
      <Album />
      <Landing />
      <About />
    </div>
  );
};

export default App;
