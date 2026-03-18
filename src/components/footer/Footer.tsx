import React from 'react';
import "./Footer.css"

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-brand">ASHU</div>
                <div className="footer-socials">
                    <a href="#/"><i className="fab fa-instagram"></i></a>
                    <a href="#/"><i className="fab fa-twitter"></i></a>
                    <a href="#/"><i className="fab fa-behance"></i></a>
                </div>
                <div className="copyright">
                    <p>&copy; 2026 <span>ASHU'S GALLERY</span>. ALL RIGHTS RESERVED.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;