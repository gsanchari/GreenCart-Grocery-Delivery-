import React from 'react';
import '../stylesheet/BottomBanner.css';
import { features } from '../assets/assets';

const BottomBanner = () => {
  return (
    <div className="bottom-banner-container">
      <img
        src="../public/bottom_banner_image.png" alt="banner" className="banner-img desktop-only"
      />
      <img
        src="../public/bottom_banner_image_sm.png" alt="banner" className="banner-img mobile-only"
      />

      <div className="banner-content">
        <div className="content-wrapper">
          <h1 className="banner-heading">Why We Are the Best?</h1>
          {features.map((feature, index) => (
            <div key={index} className="feature-item">
              <img src={feature.icon} alt={feature.title} className="feature-icon" />
              <div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomBanner;
