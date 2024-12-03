import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // useNavigate instead of useHistory
import axios from "axios"; // Importing axios
import "../components-css/Register.css";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    const requestBody = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      role: "customer",
      password: formData.password,
    };

    console.log(requestBody.password);

    try {
      // Using axios to send POST request
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/register`,
        requestBody
      );

      if (response.status === 201) {
        alert("Registration successful!");
        console.log(response.data);
        navigate("/login"); // Redirect to login page after successful registration
      }
    } catch (error) {
      if (error.response) {
        // Request made and server responded with a status code
        setErrorMessage(
          error.response.data.message || "An error occurred while registering"
        );
        console.error("Registration failed:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        setErrorMessage("Failed to communicate with the backend.");
        console.error("No response from server:", error.request);
      } else {
        // Something happened in setting up the request
        setErrorMessage("An unexpected error occurred.");
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-form-wrapper">
        <div className="register-form">
          <div className="form-header">
            <h2>Create Account</h2>
            <p className="subtitle">Join our community today</p>
          </div>

          {/* Displaying error message if any */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <div className="input-group">
                  <i className="fas fa-user input-icon"></i>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    placeholder="First Name"
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="input-group">
                  <i className="fas fa-user input-icon"></i>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    placeholder="Last Name"
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="input-group">
                <i className="fas fa-envelope input-icon"></i>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Email Address"
                />
              </div>
            </div>

            <div className="form-group">
              <div className="input-group">
                <i className="fas fa-lock input-icon"></i>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Password"
                />
                <i
                  className={`fas ${
                    showPassword ? "fa-eye-slash" : "fa-eye"
                  } password-toggle`}
                  onClick={() => setShowPassword(!showPassword)}
                ></i>
              </div>
            </div>

            <div className="form-group">
              <div className="input-group">
                <i className="fas fa-lock input-icon"></i>
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Confirm Password"
                />
              </div>
            </div>

            <button type="submit" className="register-btn">
              <span>Register</span>
              <i className="fas fa-user-plus"></i>
            </button>

            <div className="login-link">
              <p>
                Already have an account? <Link to="/login">Login here</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
