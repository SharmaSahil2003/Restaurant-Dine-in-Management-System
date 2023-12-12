import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
      email: '',
      password: '',
      confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
  
    const toggleForm = () => {
      setIsLogin(!isLogin);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (isLogin) {
        // Handle login logic
        console.log('Logging in with:', formData.email, formData.password);
      } else {
        // Handle signup logic
        console.log('Signing up with:', formData.email, formData.password);
      }
    };
  
    const containerStyle = {
      marginTop: '5.3rem',
      marginBottom: '3.3rem',
      backgroundColor: '#f8f9fa',
    };
  
    const formStyle = {
      border: '1px solid #dee2e6',
      borderRadius: '10px',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
      padding: '20px',
    };
  
    const buttonStyle = {
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
    };
  
    return (
      <div className="container" style={containerStyle}>
        <div className="row justify-content-center">
          <div className="col-md-6" style={formStyle}>
            <h2 className="mb-4">{isLogin ? 'Login' : 'Sign Up'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="input-group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
                <button
                  style={buttonStyle}
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
                </button>
              </div>
              {!isLogin && (
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({ ...formData, confirmPassword: e.target.value })
                    }
                  />
                </div>
              )}
              <button type="submit" className="btn btn-primary">
                {isLogin ? 'Login' : 'Sign Up'}
              </button>
            </form>
            <p className="mt-3">
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <Link to="/Login" onClick={toggleForm}>
                {isLogin ? 'Sign Up' : 'Login'}
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
}

export default Auth
