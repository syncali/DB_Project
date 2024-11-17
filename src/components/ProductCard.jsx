// src/components/ProductCard.jsx
import React from 'react';
import './../components-css/ProductCard.css';

const ProductCard = ({ image, name, price, description, brand }) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={image} alt={name} />
        <div className="product-overlay">
          <button className="cart-btn">
            <i className="fas fa-shopping-cart"></i> Add to Cart
          </button>
        </div>
      </div>
      <div className="product-info">
        <h4 className="product-name">{name}</h4>
        <p className="product-brand">{brand}</p>
        <div className="product-rating">
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star-half-alt"></i>
          <span>(4.5)</span>
        </div>
        <div className="product-price">
          <span className="currency">Rs.</span>
          <span className="amount">{price}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;