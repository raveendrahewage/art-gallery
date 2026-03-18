import React, { useState, useEffect } from "react";
import { Link } from "../../models";
import "./Navbar.css";

const Navbar = () => {
  const [sticky, setSticky] = useState<boolean>(false);
  const [showNav, setShowNav] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      // Use a fixed threshold or check offsetTop safely
      if (window.scrollY > 100) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links: Link[] = [
    { url: "/#", name: "home" },
    { url: "/#about", name: "about" },
    { url: "/#portfolio", name: "portfolio" },
    { url: "/#blog", name: "blog" },
    { url: "/#contact", name: "contact" },
  ];

  return (
    <nav className={`navbar ${sticky ? "sticky" : ""}`}>
      <div className="navbar-container">
        <div className="brand-and-toggler">
          <a href="/#" className="navbar-brand">
            ASHU'S GALLERY
          </a>
          <button
            onClick={() => setShowNav(true)}
            type="button"
            className="nav-show-btn"
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>

        <div className={`navbar-collapse ${showNav ? "showNav" : ""}`}>
          <button
            onClick={() => setShowNav(false)}
            type="button"
            className="nav-hide-btn"
          >
            <i className="fas fa-times"></i>
          </button>
          <ul className="navbar-nav">
            {links.map((link: Link, i: number) => (
              <li key={i} className="nav-item">
                <a href={link.url} className="nav-link" onClick={() => setShowNav(false)}>
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
