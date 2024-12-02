import React, { useState } from "react";
import {
  Card,
  Button,
  CircularProgress,
  Fade,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import "./../components-css/Rewards.css";

const rewardItems = [
  {
    id: 1,
    name: "Premium Gaming Mouse",
    points: 5000,
    image: "https://example.com/gaming-mouse.jpg",
    description: "High-performance gaming mouse with RGB lighting",
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    points: 8000,
    image: "https://example.com/keyboard.jpg",
    description: "RGB mechanical keyboard with Cherry MX switches",
  },
  {
    id: 3,
    name: "Gaming Headset",
    points: 6000,
    image: "https://example.com/headset.jpg",
    description: "7.1 surround sound gaming headset",
  },
];

const Rewards = () => {
  const [redeemingId, setRedeemingId] = useState(null);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const [points, setPoints] = useState(10000); // Demo points

  const handleRedeem = async (item) => {
    if (points < item.points) {
      setNotification({
        show: true,
        message: "Not enough points!",
        type: "error",
      });
      return;
    }

    setRedeemingId(item.id);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setPoints((prev) => prev - item.points);
      setNotification({
        show: true,
        message: `Successfully redeemed ${item.name}!`,
        type: "success",
      });
    } catch (error) {
      setNotification({
        show: true,
        message: "Failed to redeem item",
        type: "error",
      });
    } finally {
      setRedeemingId(null);
    }
  };

  return (
    <div className="rewards-container">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="points-display"
      >
        <StarIcon sx={{ color: "#FFD700", fontSize: 40 }} />
        <Typography variant="h4">{points.toLocaleString()} Points</Typography>
      </motion.div>

      <div className="rewards-grid">
        {rewardItems.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card className="reward-card">
              <img src={item.image} alt={item.name} className="reward-image" />
              <div className="reward-content">
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {item.description}
                </Typography>
                <div className="points-required">
                  <StarIcon sx={{ color: "#FFD700" }} />
                  <Typography>{item.points.toLocaleString()} points</Typography>
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={redeemingId === item.id || points < item.points}
                  onClick={() => handleRedeem(item)}
                >
                  {redeemingId === item.id ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Redeem"
                  )}
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Snackbar
        open={notification.show}
        autoHideDuration={3000}
        onClose={() => setNotification({ ...notification, show: false })}
      >
        <Alert severity={notification.type} variant="filled">
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Rewards;
