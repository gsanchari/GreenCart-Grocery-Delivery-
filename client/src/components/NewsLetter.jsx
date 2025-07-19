// src/components/NewsLetter.jsx
import React from 'react';
import '../stylesheet/NewsLetter.css'; // Correct CSS file import

const NewsLetter = () => {
  return (
    <div className="newsletter-container">
      <h1 className="newsletter-heading">Never Miss a Deal!</h1>
      <p className="newsletter-subtext">
        Subscribe to get the latest offers, new arrivals, and exclusive discounts
      </p>
      <form className="newsletter-form">
        <input className="newsletter-input" type="text" placeholder="Enter your email id"required/>
        <button type="submit" className="newsletter-button">
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsLetter;
