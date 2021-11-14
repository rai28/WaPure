import React from "react";
export default function ContactUsScreen() {
  return (
    <div className="contact-us-form-container">
      <div className="contact-us-form-header">
        <h1>Contact Us</h1>
      </div>
      <div className="contact-us-form-body">
        <form className="contact-us-form" action="">
          <div className="contact-us-form-input-container">
            <label>Name</label>
            <input type="text" placeholder="Enter your name" required />
          </div>
          <div className="contact-us-form-input-container">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" required />
          </div>
          <div className="contact-us-form-input-container">
            <label>Message</label>
            <textarea placeholder="Enter your message" required></textarea>
          </div>
          <div className="contact-us-form-input-container">
            <button
              className="contact-us-form-submit-button"
              onClick={() => {
                alert("Thank you for contacting us!");
              }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
