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
      <div>footer</div>
      <div onClick={goToContactUs}>Contact Us</div>
    </div>
  );
};

export default Footer;
