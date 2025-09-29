import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="nav-wrapper">
          {/* Logo */}
          <Link to="/" className="logo">
            <div className="logo-icon">🎯</div>
            <span className="logo-text">EDU-ARENA</span>
          </Link>

          {/* Navigation */}
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/courses" 
              className={`nav-link ${location.pathname === '/courses' ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Courses
            </Link>
            <Link 
              to="/reviews" 
              className={`nav-link ${location.pathname === '/reviews' ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Reviews
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="auth-buttons">
            <Link to="/signin" className="btn btn-login">Sign In</Link>
            <Link to="/signup" className="btn btn-primary">Sign Up</Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="menu-toggle" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;