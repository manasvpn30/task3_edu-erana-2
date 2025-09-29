import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/api';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await apiService.login(formData);
      login(response.user, response.token);
      navigate('/');
    } catch (error) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--dark-black)' }}>
          Welcome Back to EDU-ARENA
        </h2>
        
        {error && (
          <div style={{ 
            background: '#ffeaea', 
            color: '#d63031', 
            padding: '1rem', 
            borderRadius: '8px',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
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
              required
              placeholder="Enter your password"
            />
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
              style={{ width: '100%', padding: '1rem' }}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>
        </form>

        <div className="form-link">
          <p>
            Don't have an account? <Link to="/register">Sign up here</Link>
          </p>
        </div>

        {/* Demo Credentials */}
        <div style={{ 
          marginTop: '2rem', 
          padding: '1rem', 
          background: '#e3f2fd', 
          borderRadius: '8px',
          fontSize: '0.9rem'
        }}>
          <strong>Demo Account:</strong><br />
          Email: demo@eduarena.com<br />
          Password: demo123
        </div>
      </div>
    </div>
  );
};

export default Login;