import React, { useState, useRef, useEffect } from "react";
import { Link } from "../../models";
import "./Navbar.css";

const Navbar = () => {
  const navbar = useRef<HTMLDivElement>(null);
  const [sticky, setSticky] = useState<boolean>(false);
  const [showNav, setShowNav] = useState<boolean>(false);

  const stickyNav = (): void => {
    setSticky(window.pageYOffset > Number(navbar.current?.offsetTop));
  };

  useEffect(() => {
    window.onscroll = () => stickyNav();
    return () => window.removeEventListener("scroll", stickyNav)
  }, []);

  const links: Link[] = [
    {
      url: "/#",
      name: "home",
    },
    {
      url: "/#",
      name: "about",
    },
    {
      url: "/#",
      name: "features",
    },
    {
      url: "/#",
      name: "services",
    },
    {
      url: "/#",
      name: "contact",
    },
  ];

  return (
    <nav ref={navbar} className={`navbar ${sticky ? "sticky" : ""}`}>
      <div className="brand-and-toggler">
        <a href="/#" className="navbar-brand">
          RV
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
              <a href={link.url} className="nav-link">
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
