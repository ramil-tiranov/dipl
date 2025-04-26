import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); 
  const navigate = useNavigate();

  // Проверяем авторизацию при загрузке
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:8000/users/profile', {
          method: 'GET',
          credentials: 'include', 
        });

        if (response.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Auth check failed', error);
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8000/auth/logout', {
        method: 'POST',
        credentials: 'include', 
      });

      if (response.ok) {
        setIsLoggedIn(false);
        navigate('/');
      } else {
        console.error('Logout failed:', await response.text());
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">Code Vulnerability Analysis</Link>

      <div className="nav-links">
        <Link to="/rules">Rules</Link>
        <Link to="/trending">Trending</Link>
        <Link to="/analysis">Jobs</Link>
        <Link to="/mcps">MCPs</Link>
        <Link to="/generate">Generate</Link>

        {/* Показываем загрузку, пока не проверено */}
        {isLoggedIn === null ? (
          <div>Loading...</div>
        ) : !isLoggedIn ? (
          <>
            <Link to="/signin" className="auth-link">Sign In</Link>
            <Link to="/signup" className="auth-link">Sign Up</Link>
          </>
        ) : (
          <div className="profile-dropdown">
            <button onClick={toggleDropdown} className="profile-button">
              My Profile ⌄
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/profile" onClick={() => setDropdownOpen(false)}>View Profile</Link>
                <button onClick={handleLogout}>Log Out</button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
