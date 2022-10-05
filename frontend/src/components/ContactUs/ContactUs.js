import React from "react";
import "./style.css";
import { useRef, useState, useContext } from "react";
import emailjs from "@emailjs/browser";
import { AuthContext } from "../../contexts/AuthContext";

const ContactUs = () => {
  const { setErrorMessage } = useContext(AuthContext);

  const [emailSendMessage, setEmailSendMessage] = useState("");
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
          setEmailSendMessage("Email send");
        },
        (error) => {
          setErrorMessage(error.text);
        }
      );
  };

  return (
    <>
      <div className="contact-us-container">
        <form className="contact-us-form" ref={form} onSubmit={sendEmail}>
          <label className="contact-us-name-label">Name</label>
          <input
            className="contact-us-name-field"
            type="text"
            name="user_name"
          />
          <label>Email</label>
          <input
            className="contact-us-email-field"
            type="email"
            name="user_email"
          />
          <label>Message</label>
          <textarea className="contact-us-message-field" name="message" />
          <input className="contact-us-send-btn" type="submit" value="Send" />
          <h3 className="contact-message">{emailSendMessage}</h3>
        </form>
      </div>
    </>
  );
};

export default ContactUs;
