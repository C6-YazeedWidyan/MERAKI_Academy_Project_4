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

      <div className="website-about">
        © 2022, RED Games, Inc. All rights reserved. RED, RED Games, the RED
        Games logo, Fortnite, the Fortnite logo, RED, RED Engine, the RED Engine
        logo, RED Tournament, and the RED Tournament logo are trademarks or
        registered trademarks of RED Games, Inc. in the United States of America
        and elsewhere. Other brands or product names are the trademarks of their
        respective owners. Non-US transactions through RED Games International
      </div>
      <div>
        <div className="website-social-media">
          <a
            href="https://www.youtube.com/watch?v=4apvo3w97qY&list=RDMM4apvo3w97qY&start_radio=1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="social-icon"
              src="/assets/images/facebook.png"
              alt=""
            />
          </a>
          <br />
          <a
            href="https://www.youtube.com/watch?v=4apvo3w97qY&list=RDMM4apvo3w97qY&start_radio=1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="social-icon"
              src="/assets/images/instagram.png"
              alt=""
            />
          </a>
          <br />
          <a
            href="https://www.youtube.com/watch?v=4apvo3w97qY&list=RDMM4apvo3w97qY&start_radio=1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="social-icon"
              src="/assets/images/twitter.png"
              alt=""
            />
          </a>
        </div>
        <div className="contact-us-btn" onClick={goToContactUs}>
          Contact Us
        </div>
      </div>
    </div>
  );
};

export default Footer;
