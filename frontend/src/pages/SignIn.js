import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign in logic here
    console.log('Sign in data:', formData);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <Link to="/" className="logo">
            <div className="logo-icon">🎯</div>
            <span className="logo-text">EDU-ARENA</span>
          </Link>
          <h2>Welcome Back!</h2>
          <p>Sign in to continue your learning journey</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
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
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input type="checkbox" />
              Remember me
            </label>
            <Link to="/forgot-password" className="forgot-password">
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className="btn btn-primary auth-btn">
            Sign In
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>

        <div className="social-auth">
          <div className="divider">
            <span>Or continue with</span>
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

export default SignIn;