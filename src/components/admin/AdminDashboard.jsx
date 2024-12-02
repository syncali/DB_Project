import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Grid } from "@mui/material";
import {
  Inventory as ProductsIcon,
  ShoppingCart as OrdersIcon,
} from "@mui/icons-material";
import "./../../components-css/AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Product Management",
      icon: <ProductsIcon sx={{ fontSize: 40 }} />,
      path: "/admin/products",
      color: "#43a047",
    },
    {
      title: "Order Management",
      icon: <OrdersIcon sx={{ fontSize: 40 }} />,
      path: "/admin/orders",
      color: "#1e88e5",
    },
  ];

  return (
    <div className="admin-dashboard">
      <Typography variant="h4" className="dashboard-title">
        Admin Dashboard
      </Typography>
      <Grid container spacing={4} className="menu-container">
        {menuItems.map((item, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Button
              className="menu-button"
              onClick={() => navigate(item.path)}
              style={{ backgroundColor: item.color }}
            >
              <div className="button-content">
                {item.icon}
                <Typography variant="h6">{item.title}</Typography>
              </div>
            </Button>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default AdminDashboard;
