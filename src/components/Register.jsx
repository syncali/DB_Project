import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    console.log("Registration Data:", formData);
  };

  return (
    <div className="login-form auth-form">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-1 mt-4">
          <input
            type="text"
            className="form-control"
            id="floatingFirstName"
            placeholder="Enter your first name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <label htmlFor="floatingFirstName">First Name</label>
        </div>

        <div className="form-floating mb-1">
          <input
            type="text"
            className="form-control"
            id="floatingLastName"
            placeholder="Enter your last name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <label htmlFor="floatingLastName">Last Name</label>
        </div>

        <div className="form-floating mb-1">
          <input
            type="email"
            className="form-control"
            id="floatingEmail"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="floatingEmail">Email address</label>
        </div>

        <div className="form-floating mb-1">
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            id="floatingPassword"
            placeholder="Enter your password"
            name="password"
            value={formData.password}
            onChange={handleChange}
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
              color: "#6c757d",
            }}
          ></i>
        </div>

        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="floatingConfirmPassword"
            placeholder="Confirm your password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <label htmlFor="floatingConfirmPassword">Confirm Password</label>
        </div>

        <button type="submit" className="btn btn-primary w-100 mb-3">
          Register
        </button>
        <div className="text-center">
          <Link to="/" className="text-decoration-none text-muted hover-link">
            Already have an account? Login here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
