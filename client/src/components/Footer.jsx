// src/components/Footer.jsx
import React from 'react';
import '../stylesheet/Footer.css';
import { footerLinks } from '../assets/assets';

const Footer = () => {
  

  return (
    <div className="footer-wrapper">
      <div className="footer-top">
        <div className="footer-brand">
          <img className="footer-logo" src="../public/logo.svg" alt="logo" />
          <p className="footer-description">
            We deliver fresh groceries and snacks straight to your door. Trusted by thousands, we aim to make your shopping experience simple and affordable
          </p>
          <div className="social-link">
                <i className="ri-facebook-circle-line"></i>
                <i className="ri-instagram-line"></i> 
                <i className="ri-twitter-line"></i>
                <i className="ri-youtube-line"></i>
          </div>
          

        </div>
        <div className="footer-links">
          {footerLinks.map((section, index) => (
            <div key={index} className="footer-section">
              <h3 className="footer-title">{section.title}</h3>
              <ul className="footer-list">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href={link.url} className="footer-link">{link.text}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <p className="footer-bottom">
        Copyright {new Date().getFullYear()} © GreatStack.dev All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
