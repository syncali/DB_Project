// src/components/admin/AdminLayout.jsx
import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  Dashboard as DashboardIcon,
  Inventory as ProductsIcon,
  ShoppingCart as OrdersIcon,
  Store as LogoIcon
} from '@mui/icons-material';

const AdminLayout = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="admin-layout">
      <nav className="admin-nav">
        <div className="admin-nav-header">
          <LogoIcon sx={{ fontSize: 32 }} />
          <h1>Wish Tech</h1>
        </div>
        <div className="nav-links">
          <Link 
            to="/admin/dashboard" 
            className={isActive('/admin/dashboard') ? 'active' : ''}
          >
            <DashboardIcon />
            <span>Dashboard</span>
          </Link>
          <Link 
            to="/admin/products"
            className={isActive('/admin/products') ? 'active' : ''}
          >
            <ProductsIcon />
            <span>Products</span>
          </Link>
          <Link 
            to="/admin/orders"
            className={isActive('/admin/orders') ? 'active' : ''}
          >
            <OrdersIcon />
            <span>Orders</span>
          </Link>
        </div>
      </nav>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;