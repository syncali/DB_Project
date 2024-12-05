// src/components/Wishlist.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  IconButton,
  CircularProgress,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  ShoppingCart as CartIcon,
  Favorite as HeartIcon,
} from "@mui/icons-material";
import { useCart } from "../context/CartContext";
import "./../components-css/Wishlist.css";
import img from "./../images/product-images/product1-image/22-czone.com.pk-1540-15686-010224084552.jpg"

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Macbook Pro M3 Chip",
      price: "744,900",
      image: img,
      description: "Premium Laptop for Professionals",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCart();

  const handleRemoveFromWishlist = (itemId) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  return (
    <div className="wishlist-page">
      <Box className="content-wrapper">
        <Typography variant="h4" className="page-title">
          My Wishlist
        </Typography>

        {wishlistItems.length === 0 ? (
          <Paper className="empty-state">
            <HeartIcon sx={{ fontSize: 48, color: "rgba(255,255,255,0.2)" }} />
            <Typography variant="h6">Your wishlist is empty</Typography>
            <Typography variant="body2">
              Add items to your wishlist to save them for later
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {wishlistItems.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Paper className="wishlist-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="item-info">
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="body2" className="item-description">
                      {item.description}
                    </Typography>
                    <Typography variant="h6" className="item-price">
                      Rs. {item.price}
                    </Typography>
                  </div>
                  <div className="item-actions">
                    <IconButton
                      onClick={() => handleRemoveFromWishlist(item.id)}
                      className="remove-btn"
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => addToCart(item)}
                      className="cart-btn"
                      disabled={loading}
                    >
                      {loading ? <CircularProgress size={24} /> : <CartIcon />}
                    </IconButton>
                  </div>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </div>
  );
};

export default Wishlist;
