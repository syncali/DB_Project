import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../components-css/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="login-form auth-form">
      <h2>Sign In</h2>
      <form className = "l-form" onSubmit={handleLogin}>
        <div className="form-floating mt-5">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating mb-1">
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            id="floatingPassword"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="floatingPassword">Password</label>
          <i
            className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              top: "50%",
              right: "1.1rem",
              transform: "translateY(-50%)",
              cursor: "pointer",
              zIndex: 2,
              fontSize: "1.1rem",
              color: "#6c757d"
            }}
          ></i>
        </div>

        <button type="button" className="btn btn-primary w-50">
          Login
        </button>

        <div>
          <Link to="/register" id="reg-link">
            Haven't Registered Yet? Go Here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;

<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
></link>;
