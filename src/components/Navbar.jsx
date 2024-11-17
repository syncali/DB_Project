// components/NavbarCustom.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './../components-css/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary rounded" aria-label="Eleventh navbar example">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          WishTech
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample09" aria-controls="navbarsExample09" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample09">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Products</a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/products/laptops">Laptops</Link></li>
                <li><Link className="dropdown-item" to="/products/storage">SSD and HDD</Link></li>
                <li><Link className="dropdown-item" to="/products/monitors">Monitors</Link></li>
                <li><Link className="dropdown-item" to="/products/processors">Processors</Link></li>
                <li><Link className="dropdown-item" to="/products/cases">PC Case</Link></li>
                <li><Link className="dropdown-item" to="/products/ram">Memory</Link></li>
                <li><Link className="dropdown-item" to="/products/gpus">Graphics Cards</Link></li>
                <li><Link className="dropdown-item" to="/products/motherboards">Motherboards</Link></li>
                <li><Link className="dropdown-item" to="/products/desktops">Desktops</Link></li>
                <li><Link className="dropdown-item" to="/products/accessories">Accessories</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About Us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact Us</Link>
            </li>
          </ul>
          <form className="d-flex me-3 search-form" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-dark" type="submit">
              <i className="fas fa-search"></i>
            </button>
          </form>
          <div className="nav-buttons d-flex">
            <Link to="/login" className="btn btn-dark me-2">Login</Link>
            <Link to="/register" className="btn btn-dark">Register</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;