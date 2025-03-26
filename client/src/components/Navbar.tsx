import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store';
import { logout } from '../redux/slices/authSlice';
import '../styles/navbar.css';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import logoImage from '../assets/hotwings.png';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAppSelector((state: RootState) => state.auth);
  const { items } = useAppSelector((state: RootState) => state.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logoImage} alt="Hot Wings Logo" className="logo-image" />
        </Link>

        <div className="navbar-toggle" onClick={toggleMenu}>
          <span className="toggle-icon"></span>
          <span className="toggle-icon"></span>
          <span className="toggle-icon"></span>
        </div>

        <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="navbar-item">
            <Link to="/" className="navbar-link">Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/menu" className="navbar-link">Menu</Link>
          </li>
          {isAuthenticated ? (
            <>
              <li className="navbar-item">
                <Link to="/orders" className="navbar-link">My Orders</Link>
              </li>
              <li className="navbar-item user-profile">
                <span className="user-name">Hi, {user?.name}</span>
                <button onClick={handleLogout} className="btn-logout">Logout</button>
              </li>
            </>
          ) : (
            <li className="navbar-item">
              <Link to="/login" className="navbar-link">Login</Link>
            </li>
          )}
          <li className="navbar-item cart-icon">
            <Link to="/cart" className="navbar-link">
              <span className="material-icons">shopping_cart</span>
              {items.length > 0 && (
                <span className="cart-count">{items.length}</span>
              )}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar; 