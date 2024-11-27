// Cart.jsx
import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import './../components-css/Cart.css';
import img1 from "./../images/product-images/product1-image/22-czone.com.pk-1540-15686-010224084552.jpg";
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Macbook Pro M3 Chip",
      price: "744,900",
      quantity: 1,
      image: img1
    }
  ]);
  const [showError, setShowError] = useState(false);

  const updateQuantity = (id, change) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => 
      total + (parseInt(item.price.replace(/,/g, '')) * item.quantity), 0
    ).toLocaleString();
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000); // Hide error after 3 seconds
    } else {
      navigate('/checkout');
    }
  };

  return (
    <div className="cart-container">
      {showError && (
        <div className="error-banner">
          <i className="fas fa-exclamation-circle"></i>
          Cannot proceed to checkout with an empty cart
        </div>
      )}
      <h1>Shopping Cart</h1>
      <div className="cart-content">
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <i className="fas fa-shopping-cart"></i>
              <h2>Your cart is empty</h2>
              <p>Looks like you haven't added anything to your cart yet.</p>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <div className="item-price">Rs. {item.price}</div>
                  <div className="quantity-controls">
                    <IconButton 
                      size="small"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <span>{item.quantity}</span>
                    <IconButton 
                      size="small"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <AddIcon />
                    </IconButton>
                  </div>
                </div>
                <div className="item-total">
                  Rs. {(parseInt(item.price.replace(/,/g, '')) * item.quantity).toLocaleString()}
                </div>
                <IconButton 
                  className="remove-item"
                  onClick={() => removeItem(item.id)}
                >
                  <DeleteOutlinedIcon />
                </IconButton>
              </div>
            ))
          )}
        </div>
        
        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-item">
            <span>Subtotal</span>
            <span>Rs. {calculateTotal()}</span>
          </div>
          <div className="summary-item">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>Rs. {calculateTotal()}</span>
          </div>
          <button 
            className="checkout-btn"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;