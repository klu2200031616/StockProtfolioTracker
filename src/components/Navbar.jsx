import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Import the Navbar CSS

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-item">Portfolio Dashboard</Link>
        <div className="navbar-links">
        <Link to="/" className="navbar-item">Home</Link>
          <Link to="/add-stock" className="navbar-item">Add Stock</Link>
          <Link to="/stock-list" className="navbar-item">Stock List</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;