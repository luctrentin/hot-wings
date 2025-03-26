import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section about">
            <h2 className="footer-logo">Hot Wings</h2>
            <p className="footer-description">
              Delicious wings and more, delivered to your doorstep.
            </p>
            <div className="social-links">
              <a href="#" className="social-link">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          <div className="footer-section links">
            <h3 className="footer-section-title">Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/menu">Menu</Link></li>
              <li><Link to="/cart">Cart</Link></li>
              <li><Link to="/orders">My Orders</Link></li>
            </ul>
          </div>

          <div className="footer-section contact">
            <h3 className="footer-section-title">Contact Us</h3>
            <p><i className="fas fa-map-marker-alt"></i> 123 Wing Street, Food City</p>
            <p><i className="fas fa-phone"></i> +1 234 567 8900</p>
            <p><i className="fas fa-envelope"></i> contact@hotwings.com</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Hot Wings. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 