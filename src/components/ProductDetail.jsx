import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./../components-css/ProductDetail.css";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { useCart } from "./../context/CartContext";
import { useAuth } from "./../context/AuthContext";

import i1 from "./../images/product-images/product1-image/22-czone.com.pk-1540-15686-010224084552.jpg";
import i2 from "./../images/product-images/product1-image/23-czone.com.pk-1540-15686-010224084552.jpg";
import i3 from "./../images/product-images/product1-image/copy-20-czone.com.pk-1540-15685-010224083833.jpg";
import i4 from "./../images/product-images/product1-image/copy-21-czone.com.pk-1540-15685-010224083833.jpg";

import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import { Rating, Avatar, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const ProductDetail = () => {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { addToCart } = useCart();
  const { isLoggedIn } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  const products = {
    1: {
      name: "Macbook Pro M3 Chip",
      brand: "Apple",
      price: "744,900",
      description: "Premium Laptop for Professionals",
      image: i1,
      specs: {
        Processor: "Apple M3 Pro",
        RAM: "16GB",
        Storage: "512GB SSD",
        Display: "14-inch Liquid Retina XDR",
      },
      features: [
        "Up to 18 hours battery life",
        "8-core CPU",
        "10-core GPU",
        "16-core Neural Engine",
      ],
    },
  };

  const product = products[id];

  const reviews = [
    {
      id: 1,
      name: "John Doe",
      rating: 5,
      date: "March 15, 2024",
      comment:
        "Excellent product! The performance is outstanding and build quality is premium.",
      avatar: "JD",
    },
    {
      id: 2,
      name: "Sarah Smith",
      rating: 4,
      date: "March 10, 2024",
      comment: "Great value for money. Battery life could be better though.",
      avatar: "SS",
    },
    {
      id: 3,
      name: "Mike Johnson",
      rating: 5,
      date: "March 5, 2024",
      comment: "Perfect for my development needs. Fast and reliable.",
      avatar: "MJ",
    },
  ];

  const productImages = [
    { id: 1, url: i1, alt: "Front view" },
    { id: 2, url: i2, alt: "Side view" },
    { id: 3, url: i3, alt: "Back view" },
    { id: 4, url: i4, alt: "Detail view" },
  ];

  const handleMouseMove = (e) => {
    if (isZoomed) {
      const { left, top, width, height } = e.target.getBoundingClientRect();
      const x = ((e.pageX - left) / width) * 100;
      const y = ((e.pageY - top) / height) * 100;
      setMousePosition({ x, y });
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      setShowLoginModal(true);
    } else {
      addToCart({
        id,
        name: product.name,
        price: product.price,
        image: product.image,
        brand: product.brand,
        description: product.description
      });
    }
  };

  return (
    <>
      <div className="product-detail-container">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-6">
              <div className="product-gallery">
                <div
                  className={`main-image-container ${isZoomed ? "zoomed" : ""}`}
                  onMouseEnter={() => setIsZoomed(true)}
                  onMouseLeave={() => setIsZoomed(false)}
                  onMouseMove={handleMouseMove}
                >
                  <img
                    src={productImages[activeImage].url}
                    alt={productImages[activeImage].alt}
                    className="main-image"
                    style={
                      isZoomed
                        ? {
                            transform: "scale(2)",
                            transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                          }
                        : {}
                    }
                  />
                </div>

                <div className="gallery-navigation">
                  <IconButton
                    onClick={() =>
                      setActiveImage((prev) =>
                        prev > 0 ? prev - 1 : productImages.length - 1
                      )
                    }
                    className="nav-button"
                  >
                    <ChevronLeftIcon />
                  </IconButton>

                  <div className="thumbnails-container">
                    {productImages.map((image, index) => (
                      <div
                        key={image.id}
                        className={`thumbnail ${
                          index === activeImage ? "active" : ""
                        }`}
                        onClick={() => setActiveImage(index)}
                      >
                        <img src={image.url} alt={image.alt} />
                      </div>
                    ))}
                  </div>

                  <IconButton
                    onClick={() =>
                      setActiveImage((prev) =>
                        prev < productImages.length - 1 ? prev + 1 : 0
                      )
                    }
                    className="nav-button"
                  >
                    <ChevronRightIcon />
                  </IconButton>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="product-info">
                <h1>{product.name}</h1>
                <div className="brand">{product.brand}</div>
                <p className="description">{product.description}</p>

                <div className="features-section">
                  <h3>Key Features</h3>
                  <ul className="features-list">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="purchase-section">
                  <div className="price">Rs. {product.price}</div>
                  <button className="add-to-cart-btn" onClick={handleAddToCart}>
                    <span>Add to Cart</span>
                    <AddShoppingCartRoundedIcon className="mui-cart" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="specs-container mt-5">
            <h3>Technical Specifications</h3>
            <div className="specs-grid">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="spec-item">
                  <span className="spec-label">{key}</span>
                  <span className="spec-value">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="reviews-section mt-4">
            <h3>Customer Reviews</h3>
            <div className="reviews-grid">
              {reviews.map((review) => (
                <div key={review.id} className="review-card">
                  <div className="review-header">
                    <Avatar className="review-avatar">{review.avatar}</Avatar>
                    <div className="review-meta">
                      <h4>{review.name}</h4>
                      <Rating value={review.rating} readOnly precision={0.5} />
                      <span className="review-date">{review.date}</span>
                    </div>
                  </div>
                  <p className="review-comment">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)}>
        <h3>Please Login First</h3>
        <p>You need to be logged in to add items to your cart.</p>
        <div className="modal-buttons">
          <button className="btn-primary" onClick={() => navigate("/login")}>
            Login
          </button>
          <button
            className="btn-secondary"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ProductDetail;
