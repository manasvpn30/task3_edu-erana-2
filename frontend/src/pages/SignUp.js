import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign up logic here
    console.log('Sign up data:', formData);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <Link to="/" className="logo">
            <div className="logo-icon">🎯</div>
            <span className="logo-text">EDU-ARENA</span>
          </Link>
          <h2>Join EDU-ARENA</h2>
          <p>Start your learning journey today</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                required
              />
              I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>
            </label>
          </div>

          <button type="submit" className="btn btn-primary auth-btn">
            Create Account
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account? <Link to="/signin">Sign In</Link>
          </p>
        </div>

        <div className="social-auth">
          <div className="divider">
            <span>Or sign up with</span>
          </div>
          <div className="social-buttons">
            <button type="button" className="btn social-btn google-btn">
              <span className="social-icon">🔍</span>
              Google
            </button>
            <button type="button" className="btn social-btn github-btn">
              <span className="social-icon">💻</span>
              GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
