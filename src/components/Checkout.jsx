import React, { useState, useEffect } from "react";
import "./../components-css/Checkout.css";
import {
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import ReactConfetti from "react-confetti";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Shipping", "Payment", "Review"];
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    setOrderSuccess(true);
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
      navigate("/");
    }, 5000);
  };

  const SuccessOverlay = () => (
    <div className="success-overlay">
      {showConfetti && <ReactConfetti />}
      <div className="success-content">
        <div className="success-icon">
          <i className="fas fa-check-circle"></i>
        </div>
        <h2>Order Placed Successfully!</h2>
        <p>You will receive a confirmation email shortly.</p>
        <div className="email-icon">
          <i className="fas fa-envelope"></i>
        </div>
      </div>
    </div>
  );

  return (
    <div className="checkout-container">
      <div className="checkout-content">
        <div className="checkout-main">
          <Stepper activeStep={activeStep} className="checkout-stepper">
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <div className="checkout-form">
            {activeStep === 0 && (
              <div className="shipping-form">
                <h2>Shipping Information</h2>
                <div className="form-grid">
                  <TextField label="First Name" variant="outlined" />
                  <TextField label="Last Name" variant="outlined" />
                  <TextField label="Email" variant="outlined" fullWidth />
                  <TextField label="Phone" variant="outlined" fullWidth />
                  <TextField label="Address" variant="outlined" fullWidth />
                  <TextField label="City" variant="outlined" />
                  <TextField label="State" variant="outlined" />
                  <TextField label="ZIP Code" variant="outlined" />
                </div>
              </div>
            )}

            {activeStep === 1 && (
              <div className="payment-form">
                <h2>Payment Method</h2>
                <RadioGroup defaultValue="card">
                  <div className="payment-option">
                    <FormControlLabel
                      value="card"
                      control={<Radio />}
                      label="Credit/Debit Card"
                    />
                    <div className="payment-details">
                      <TextField
                        label="Card Number"
                        variant="outlined"
                        fullWidth
                      />
                      <div className="card-extra">
                        <TextField label="Expiry Date" variant="outlined" />
                        <TextField label="CVV" variant="outlined" />
                      </div>
                    </div>
                  </div>
                  <FormControlLabel
                    value="cod"
                    control={<Radio />}
                    label="Cash on Delivery"
                  />
                </RadioGroup>
              </div>
            )}

            {activeStep === 2 && (
              <div className="review-section">
                <h2>Review Order</h2>
                <div className="review-details">
                  <div className="review-item">
                    <h3>Shipping Address</h3>
                    <p>John Doe</p>
                    <p>123 Main St</p>
                    <p>City, State 12345</p>
                  </div>
                  <div className="review-item">
                    <h3>Payment Method</h3>
                    <p>Credit Card ending in 1234</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="form-buttons">
            {activeStep > 0 && (
              <button
                className="back-btn"
                onClick={() => setActiveStep((prev) => prev - 1)}
              >
                Back
              </button>
            )}
            <button
              className="next-btn"
              onClick={() => {
                if (activeStep === steps.length - 1) {
                  handlePlaceOrder();
                } else {
                  setActiveStep((prev) => prev + 1);
                }
              }}
            >
              {activeStep === steps.length - 1 ? "Place Order" : "Continue"}
            </button>
          </div>
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="summary-items">
            <div className="summary-item">
              <span>Subtotal</span>
              <span>Rs. 744,900</span>
            </div>
            <div className="summary-item">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>Rs. 744,900</span>
            </div>
          </div>
        </div>
      </div>
      {orderSuccess && <SuccessOverlay />}
    </div>
  );
};

export default Checkout;
