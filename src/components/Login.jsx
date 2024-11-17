import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../components-css/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <div className="login-form">
          <div className="form-header">
            <h2>Welcome Back</h2>
            <p className="subtitle">Log in to your account</p>
          </div>
          
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <div className="input-group">
                <i className="fas fa-envelope input-icon"></i>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Email"
                />
              </div>
            </div>

            <div className="form-group">
              <div className="input-group">
                <i className="fas fa-lock input-icon"></i>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                />
                <i
                  className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} password-toggle`}
                  onClick={() => setShowPassword(!showPassword)}
                ></i>
              </div>
            </div>

            <div className="form-footer">
              <div className="remember-me">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <a href="#" className="forgot-password">Forgot Password?</a>
            </div>

            <button type="submit" className="login-btn">
              <span>Login</span>
              <i className="fas fa-arrow-right"></i>
            </button>

            <div className="register-link">
              <p>Don't have an account? <Link to="/register">Register here</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
></link>;
