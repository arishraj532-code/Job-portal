import { useState } from "react";
import "./Contact.css";

function Contact() {
  const [messageSent, setMessageSent] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setMessageSent(true);
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    setFeedbackSent(true);
  };

  return (
    <div className="contact-page">
      <h1>Get in Touch</h1>

      <p>
        Have a question about a job or your application?
        We’re here to help.
      </p>

      <div className="contact-container">
        <div className="contact-info">
          <h2>Contact Us</h2>

          <p>Email: support@jobportal.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Location: Chennai, Tamil Nadu</p>
        </div>

        <form className="contact-form" onSubmit={handleContactSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            required
          />

          <input
            type="text"
            placeholder="Subject"
            required
          />

          <textarea
            placeholder="Write your message here..."
            rows="5"
            required
          ></textarea>

          <button type="submit">Send Message</button>

          {messageSent && (
            <p className="success-message">
              Thank you! Your message has been sent successfully.
            </p>
          )}
        </form>
      </div>

      <div className="feedback-section">
        <h2>Website Feedback</h2>

        <p>
          We’d love to hear your thoughts about JobPortal.
          Share your feedback, suggestions, or any issues you experienced
          while using the website.
        </p>

        <form onSubmit={handleFeedbackSubmit}>
          <textarea
            placeholder="Write your feedback here..."
            rows="6"
            required
          ></textarea>

          <button type="submit">Submit Feedback</button>

          {feedbackSent && (
            <p className="success-message">
              Thanks for your feedback!
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Contact;
