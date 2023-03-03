import React, { useState, useRef } from 'react';
import './Landing.css'
import { Image, Link } from '../../models';

const Landing = () => {
    const showcase = useRef<HTMLDivElement>(null);
    const navbar = useRef<HTMLDivElement>(null);
    const [showNav, setShowNav] = useState<boolean>(false);
    const [sticky, setSticky] = useState<boolean>(false);
    const [slide, setSlide] = useState<number>(0);
    const [displayWidth, setDisplayWidth] = useState<number>(0);

    const unsplashLink = (id: string, width: number, height: number) =>
        `https://source.unsplash.com/${id}/${width}x${height}`;

    const unsplashPhotos = [
        { id: "Osq7UAVxIOI", width: 1080, height: 720 },
        { id: "Dhmn6ete6g8", width: 1080, height: 720 },
        { id: "RkBTPqPEGDo", width: 1080, height: 720 }
    ];

    const images: Image[] = [{
        url: unsplashLink(unsplashPhotos[0].id, unsplashPhotos[0].width, unsplashPhotos[0].height),
        description: 'Explore the wilderness',
        info: 'explore with us'
    }, {
        url: unsplashLink(unsplashPhotos[1].id, unsplashPhotos[1].width, unsplashPhotos[1].height),
        description: 'Nature does nothing uselessly',
        info: 'learn more'
    }, {
        url: unsplashLink(unsplashPhotos[2].id, unsplashPhotos[2].width, unsplashPhotos[2].height),
        description: 'Keep calm and love nature',
        info: 'read more'
    }]

    const links: Link[] = [
        {
            url: '/#',
            name: 'home'
        },
        {
            url: '/#',
            name: 'about'
        },
        {
            url: '/#',
            name: 'features'
        },
        {
            url: '/#',
            name: 'services'
        },
        {
            url: '/#',
            name: 'contact'
        }
    ]

    const slideShowcase = (slide: number): void => {
        setSlide(slide)
        setDisplayWidth(Number(showcase?.current?.clientWidth))
    }

    const stickyNav = (): void => {
        setSticky(window.pageYOffset > Number(navbar.current?.offsetTop))
    }

    window.onresize = () => slideShowcase(slide);
    window.onscroll = () => stickyNav();
    return (
        <>
            <nav ref={navbar} className={`navbar ${sticky ? "sticky" : ""}`}>
                <div className="brand-and-toggler">
                    <a href="/#" className="navbar-brand">ASHU</a>
                    <button onClick={() => setShowNav(true)} type="button" className="nav-show-btn">
                        <i className="fas fa-bars"></i>
                    </button>
                </div>

                <div className={`navbar-collapse ${showNav ? "showNav" : ""}`}>
                    <button onClick={() => setShowNav(false)} type="button" className="nav-hide-btn">
                        <i className="fas fa-times"></i>
                    </button>
                    <ul className="navbar-nav">
                        {links.map((link: Link, i: number) => (
                            <li key={i} className="nav-item">
                                <a href={link.url} className="nav-link">{link.name}</a>
                            </li>))}
                    </ul>
                </div>
            </nav>
            <div className="showcase-wrapper">
                <div className="showcase-content" style={{ transform: `translateX(${-slide * displayWidth}px)` }}>
                    {images.map((image: Image, i: number) => (
                        <div className="showcase" key={i} style={{ background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)), url(${image.url}) center/cover no-repeat` }} ref={showcase}>
                            <h1>{image.description}</h1>
                            <button type="button">{image.info}</button>
                        </div>))}
                </div>
                <div className="dotted-btns">
                    {[...Object.keys(images)].map((i: string) => (
                        <span key={i} onClick={() => slideShowcase(+i)}>
                            <i className="fas fa-circle"></i>
                        </span>))}
                </div>
            </div>
        </>
    )
}

export default Landing;