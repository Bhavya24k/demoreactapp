import React from 'react';
import './style.css'

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="contact-us">
        <h3>Contact Us</h3>
        <p>If you have any questions or inquiries, feel free to reach out to us:</p>
        <ul>
          <li>Email: suvarshitha@gmail.com</li>
          <li>Phone: +918790985888</li>
          <li>Address: 2-29A, BHEL colony, Vijayawada</li>
        </ul>
      </div>
      <div className="social-links">
        <h3>Follow Us</h3>
        <ul>
          <li><a href="https://www.instagram.com/bhavya.k._/">Follow us on Instagram for more updates</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
