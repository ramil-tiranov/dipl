import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
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

  return (
    <nav className="navbar">
      <Link to="/" className="logo">Code Vulnerability Analysis</Link>

      <div className="nav-links">
  
        <Link to="/analysis">Jobs</Link>
        
        {/* <Link to="/generate">Generate</Link> */}

        {/* Пока авторизация проверяется */}
              {isLoggedIn === null ? (
        <div>Loading...</div>
      ) : !isLoggedIn ? (
        <>
          <Link to="/signup" className="nav-link">Sign Up</Link>
          <Link to="/signin" className="nav-link">Sign In</Link>
          
        </>
      ) : (
        <>
          <Link to="/profile" className="nav-link">Profile</Link>
          <button onClick={handleLogout} className="nav-link">Log Out</button>
        </>
      )}

      </div>
    </nav>
  );
};

export default Navbar;
