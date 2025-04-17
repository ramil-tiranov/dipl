import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">Code Vulnerability Analysis</Link>
      <div className="nav-links">
        <Link to="/rules">Rules</Link>
        <Link to="/trending">Trending</Link>
        <Link to="/analysis">Jobs</Link>
        <Link to="/mcps">MCPs</Link>
        <Link to="/generate">Generate</Link>
        <Link to="/signin">Sign In</Link>
      </div>
    </nav>
  );
};

export default Navbar;
