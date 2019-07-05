import React from 'react';
import './Footer.css';
import logo from '../Header/logo.jpg';
export default function Footer() { 
  return (
    <footer className="footer-distributed">

      <div className="footer-left">

        <img src={logo} className="icon" alt="logo" />



        <p className="footer-company-name">Nine to Nine &copy; 2019</p>
      </div>

      <div className="footer-center">

        <div>
          <i className="fa fa-map-marker"></i>
          <p><span>Lekki Chevy View Estate</span> Lagos state, Nigeria</p>
        </div>

        <div>
          <i className="fa fa-phone"></i>
          <p>+234-818-298-8304</p>
        </div>

        <div>
          <i className="fa fa-envelope"></i>
          <p><a href="mailto:support@company.com">support@9to9.com</a></p>
        </div>

      </div>

      <div className="footer-right">

        <p className="footer-company-about">
          <span>About the Nine to Nine</span>
          Bridging the gap between service providers and people in need of their services by proximity, get the job done by the woman closest to your location, true definition of working remotely.
				</p>

      </div>

    </footer>
  );
}
