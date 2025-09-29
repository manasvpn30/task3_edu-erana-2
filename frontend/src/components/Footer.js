import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-section">
            <Link to="/" className="logo">
              <div className="logo-icon">🎯</div>
              <span className="logo-text">EDU-ARENA</span>
            </Link>
            <p className="footer-description">
              Empowering learners with cutting-edge technology education. 
              Join our arena of knowledge and transform your career.
            </p>
            <div className="social-links">
              <a href="#" className="social-link">📘</a>
              <a href="#" className="social-link">🐦</a>
              <a href="#" className="social-link">📷</a>
              <a href="#" className="social-link">💼</a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/courses">Courses</Link></li>
              <li><Link to="/reviews">Reviews</Link></li>
              <li><Link to="/signin">Sign In</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
            </ul>
          </div>

          {/* Courses */}
          <div className="footer-section">
            <h3>Popular Courses</h3>
            <ul className="footer-links">
              <li><a href="#">AI & Machine Learning</a></li>
              <li><a href="#">Generative AI</a></li>
              <li><a href="#">Large Language Models</a></li>
              <li><a href="#">Deep Learning</a></li>
              <li><a href="#">Natural Language Processing</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h3>Contact Us</h3>
            <div className="contact-info">
              <p>📧 info@edu-arena.com</p>
              <p>📞 +1 (555) 123-4567</p>
              <p>📍 123 Learning Street, Education City</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <p>&copy; 2024 EDU-ARENA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;