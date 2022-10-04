import React from "react";
import "./style.css";
import { useRef, useState } from "react";

import emailjs from "@emailjs/browser";
import SnackBar from "../SnackBar";

const ContactUs = () => {
  const [message, setMessage] = useState("");
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
          setMessage(error.text);
        }
      );
  };

  return (
    <>
      <div className="contact-us-container">
        <form className="contact-us-form" ref={form} onSubmit={sendEmail}>
          <label>Name</label>
          <input type="text" name="user_name" />
          <label>Email</label>
          <input type="email" name="user_email" />
          <label>Message</label>
          <textarea name="message" />
          <input type="submit" value="Send" />
          <h3 className="contact-message">{emailSendMessage}</h3>
        </form>
      </div>
      {message && <SnackBar message={message} setMessage={setMessage} />}
    </>
  );
};

export default ContactUs;
