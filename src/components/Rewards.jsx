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
    image: "https://www.czone.com.pk/Images/Thumbnails/39-czone.com.pk-1540-11261-160321092931.jpg",
    description: "High-performance gaming mouse with RGB lighting",
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    points: 8000,
    image:
      "https://www.czone.com.pk/Images/Thumbnails/33-czone.com.pk-1540-17107-171024100520.jpg",
    description: "RGB mechanical keyboard with Cherry MX switches",
  },
  {
    id: 3,
    name: "Gaming Headset",
    points: 6000,
    image:
      "https://www.czone.com.pk/Images/Thumbnails/61-czone.com.pk-1540-15730-140224112713.jpg",
    description: "7.1 surround sound gaming headset",
  },
];

const Rewards = () => {
  const [redeemingId, setRedeemingId] = useState(null);
  const [points, setPoints] = useState(10000); // Initial points
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success"
  });

  const handleRedeem = async (itemId) => {
    const item = rewardItems.find(reward => reward.id === itemId);
    if (!item) return;

    if (points < item.points) {
      setNotification({
        show: true,
        message: "Not enough points to redeem this reward",
        type: "error"
      });
      return;
    }

    setRedeemingId(itemId);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Deduct points
      setPoints(prevPoints => prevPoints - item.points);
      
      setNotification({
        show: true,
        message: `Successfully redeemed ${item.name}!`,
        type: "success"
      });
    } catch (error) {
      setNotification({
        show: true,
        message: "Failed to redeem reward. Please try again.",
        type: "error"
      });
    } finally {
      setRedeemingId(null);
    }
  };

  const handleCloseNotification = () => {
    setNotification(prev => ({ ...prev, show: false }));
  };

  return (
    <div className="rewards-container">
      <div className="rewards-header">
        <Typography variant="h4">Rewards Program</Typography>
        <div className="points-display">
          <StarIcon />
          <Typography variant="h5">{points.toLocaleString()} Points</Typography>
        </div>
      </div>

      <div className="rewards-grid">
        {rewardItems.map((item) => (
          <Card key={item.id} className="reward-card">
            <div className="reward-image">
              <img src={item.image} alt={item.name} />
              <div className="points-badge">
                {item.points.toLocaleString()} Points
              </div>
            </div>
            <div className="reward-content">
              <Typography variant="h6">{item.name}</Typography>
              <Typography variant="body2">{item.description}</Typography>
              <Button
                variant="contained"
                fullWidth
                disabled={points < item.points || redeemingId === item.id}
                onClick={() => handleRedeem(item.id)}
              >
                {redeemingId === item.id ? (
                  <CircularProgress size={24} color="inherit" />
                ) : points < item.points ? (
                  'Not Enough Points'
                ) : (
                  'Redeem'
                )}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Snackbar
        open={notification.show}
        autoHideDuration={3000}
        onClose={handleCloseNotification}
      >
        <Alert 
          severity={notification.type}
          onClose={handleCloseNotification}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Rewards;
