import React from 'react';
import { Link } from 'react-router-dom'; // or remove it if you're not using routing
import '../stylesheet/MainBanner.css';


const MainBanner = () => {
  return (
    <div className="banner-container">
  <img src="/main_banner_bg.png" alt="banner" className="main-banner" />
  <img src="/main_banner_bg_sm.png" alt="banner" className="main-banner-sm" />

  <div className="banner-text">
    <div>
      <h1>Freshness You Can Trust, Savings You will Love!</h1>
    </div>
    <div className="explore">
      <div className="shop-now">
        <Link to="/products"> Shop now <i className="ri-arrow-right-line"></i></Link>
      </div>
      <div className="explore-deals">
        <Link to="/products"> Explore deals <i className="ri-arrow-right-line"></i></Link>
      </div>
    </div>
  </div>
</div>

  )
}

export default MainBanner
