import React from "react";
import "./footerStyles.css";
import drinkWaterPng from "../../assets/images/drink-water.png";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-div">
        <span className="site-logo">
          <img src={drinkWaterPng} alt="logo" width="50" height="50" />
        </span>
        <div className="footer-text">
          <p className="footer-para">
            We are modern water quality testing company offering instant and
            highest accuracy detailed reports. Today fast growing world need
            intelligent and modern solutions. That’s where we come in.
          </p>
        </div>
      </div>
      {/* create contact us button */}
      <Link to="/contact-us">
        <div className="footer-contact">
          <span className="footer-contact-btn">Contact Us</span>
        </div>
      </Link>
    </footer>
  );
}

export default Footer;
