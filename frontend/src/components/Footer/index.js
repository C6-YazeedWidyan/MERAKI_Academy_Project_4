import React from "react";
import "./style.css";
import { useRef } from "react";
import emailjs from "@emailjs/browser";

const Footer = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_i1bc0ks",
        "template_qyg3ngc",
        form.current,
        "w7Elqe9AjPIEw9j_I"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("messge send");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div className="footer-container">
      <img className="logo" src="/assets/images/logo.png" alt="" />
      <div>footer</div>
      <div>
        <form ref={form} onSubmit={sendEmail}>
          <label>Name</label>
          <input type="text" name="user_name" />
          <label>Email</label>
          <input type="email" name="user_email" />
          <label>Message</label>
          <textarea name="message" />
          <input type="submit" value="Send" />
        </form>
      </div>
    </div>
  );
};

export default Footer;
