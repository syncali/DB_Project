// src/components/ProductCard.jsx
import React from 'react';
import './../components-css/ProductCard.css';

const ProductCard = ({ image, name, price, description, brand }) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={image} alt={name} />
      </div>
      <div className="product-info">
        <h4 className="product-name">{name}</h4>
        <p className="product-brand">{brand}</p>
        <div className="product-price">Rs. {price}</div>
      </div>
    </div>
  );
};

export default ProductCard;