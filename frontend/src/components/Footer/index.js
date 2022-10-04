import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const goToContactUs = () => {
    navigate("/contactUs");
  };

  return (
    <div className="footer-container">
      <img className="logo" src="/assets/images/logo.png" alt="" />
      <div className="website-social-media">
        <a
          href="https://www.youtube.com/watch?v=4apvo3w97qY&list=RDMM4apvo3w97qY&start_radio=1"
          target="_blank"
          rel="noopener noreferrer"
        >
          instagram
        </a>
        <br />
        <a
          href="https://www.youtube.com/watch?v=4apvo3w97qY&list=RDMM4apvo3w97qY&start_radio=1"
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>
        <br />
        <a
          href="https://www.youtube.com/watch?v=4apvo3w97qY&list=RDMM4apvo3w97qY&start_radio=1"
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
        </a>
      </div>
      <div className="contact-us-btn" onClick={goToContactUs}>
        Contact Us
      </div>
    </div>
  );
};

export default Footer;
