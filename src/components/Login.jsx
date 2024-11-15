import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username</label>
          <input
            type="text"
            placeholder='Enter your username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="password-container">
          <label>Password</label>
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i 
              className={`fa ${showPassword ? "fa-eye" : "fa-eye-slash" }`}
              onClick={() => setShowPassword(!showPassword)}
            ></i>
          </div>
        </div>
        <button type="button" className="btn btn-primary">Login</button>
        <div>
          <Link to="/register" id="reg-link">Haven't Registered Yet? Go Here</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"></link>