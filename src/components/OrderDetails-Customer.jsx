// src/components/OrderDetails-Customer.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Chip,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Collapse,
} from "@mui/material";
import {
  LocalShipping as ShippingIcon,
  CheckCircle as DeliveredIcon,
  Pending as ProcessingIcon,
  ConfirmationNumber as ConfirmedIcon,
  ExpandMore as ExpandMoreIcon,
  CalendarMonth as DateIcon,
  Receipt as OrderIcon,
} from "@mui/icons-material";
import "./../components-css/OrderDetails-Customer.css";

const OrderDetailsC = () => {
  const [filterStatus, setFilterStatus] = useState("all");
  const [expandedOrder, setExpandedOrder] = useState(null);

  const orders = [
    {
      id: "ORD-001",
      date: "2024-03-20",
      status: "delivered",
      total: "744,900",
      items: [
        {
          id: 1,
          name: "Macbook Pro M3 Chip",
          price: "744,900",
          quantity: 1,
        },
      ],
      timeline: [
        { status: "confirmed", date: "2024-03-20 10:00 AM" },
        { status: "processing", date: "2024-03-20 02:30 PM" },
        { status: "shipped", date: "2024-03-21 11:00 AM" },
        { status: "delivered", date: "2024-03-22 03:45 PM" },
      ],
    },
  ];

  const statusConfig = {
    confirmed: {
      color: "#2196f3",
      icon: <ConfirmedIcon />,
      label: "Confirmed",
    },
    processing: {
      color: "#ff9800",
      icon: <ProcessingIcon />,
      label: "Processing",
    },
    shipped: { color: "#4caf50", icon: <ShippingIcon />, label: "Shipped" },
    delivered: {
      color: "#8bc34a",
      icon: <DeliveredIcon />,
      label: "Delivered",
    },
  };

  const filteredOrders = orders.filter((order) =>
    filterStatus === "all" ? true : order.status === filterStatus
  );

  return (
    <div className="order-history-page">
      <Box className="content-wrapper">
        <Typography variant="h4" className="page-title">
          My Orders
        </Typography>

        <Box className="filter-section">
          <FormControl variant="outlined" size="small">
            <InputLabel>Filter by Status</InputLabel>
            <Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              label="Filter by Status"
            >
              <MenuItem value="all">All Orders</MenuItem>
              {Object.entries(statusConfig).map(([status, config]) => (
                <MenuItem key={status} value={status}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {config.icon}
                    {config.label}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box className="orders-grid">
          {filteredOrders.map((order) => (
            <Paper key={order.id} className="order-card">
              <Box className="order-header">
                <Box className="order-info">
                  <Box className="order-id">
                    <OrderIcon />
                    <Typography variant="subtitle1">
                      Order #{order.id}
                    </Typography>
                  </Box>
                  <Box className="order-date">
                    <DateIcon />
                    <Typography variant="body2">
                      {new Date(order.date).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>
                <Chip
                  label={statusConfig[order.status].label}
                  icon={statusConfig[order.status].icon}
                  sx={{
                    bgcolor: `${statusConfig[order.status].color}22`,
                    color: statusConfig[order.status].color,
                    "& .MuiChip-icon": {
                      color: "inherit",
                    },
                  }}
                />
              </Box>

              <Box className="order-total">
                <Typography variant="subtitle2">Total Amount</Typography>
                <Typography variant="h6">Rs. {order.total}</Typography>
              </Box>

              <Box className="order-timeline">
                {order.timeline.map((event, index) => (
                  <Box key={index} className="timeline-item">
                    <Box
                      className="timeline-icon"
                      sx={{ color: statusConfig[event.status].color }}
                    >
                      {statusConfig[event.status].icon}
                    </Box>
                    <Box className="timeline-content">
                      <Typography variant="subtitle2">
                        {statusConfig[event.status].label}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {event.date}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>

              <IconButton
                className="expand-button"
                onClick={() =>
                  setExpandedOrder(expandedOrder === order.id ? null : order.id)
                }
                sx={{
                  transform:
                    expandedOrder === order.id
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                }}
              >
                <ExpandMoreIcon />
              </IconButton>

              <Collapse in={expandedOrder === order.id}>
                <Box className="order-details">
                  <Typography variant="h6" gutterBottom>
                    Order Items
                  </Typography>
                  {order.items.map((item) => (
                    <Box key={item.id} className="order-item">
                      <Typography variant="subtitle2">{item.name}</Typography>
                      <Box className="item-details">
                        <Typography variant="body2">
                          Quantity: {item.quantity}
                        </Typography>
                        <Typography variant="body2">
                          Rs. {item.price}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Collapse>
            </Paper>
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default OrderDetailsC;
