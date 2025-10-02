import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // optional styling

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">Specly</h2>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/scan">Scan</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
