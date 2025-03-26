import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/homepage.css';

const HomePage: React.FC = () => {
  return (
    <div className="homepage">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Delicious Wings Delivered To Your Door</h1>
            <p className="hero-subtitle">
              Order your favorite wings with our easy-to-use food delivery app
            </p>
            <Link to="/menu" className="btn btn-primary hero-button">
              Order Now
            </Link>
          </div>
        </div>
      </section>

      <section className="features section">
        <div className="container">
          <h2 className="section-title">Why Choose Us</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🍗</div>
              <h3 className="feature-title">Quality Wings</h3>
              <p className="feature-description">
                Our wings are made with premium quality ingredients for the best taste.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3 className="feature-title">Fast Delivery</h3>
              <p className="feature-description">
                We deliver your order promptly to your door.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👨‍🍳</div>
              <h3 className="feature-title">Best Chefs</h3>
              <p className="feature-description">
                Our chefs are professionals with years of experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="popular section">
        <div className="container">
          <h2 className="section-title">Popular Items</h2>
          <div className="popular-items grid">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="popular-item card">
                <div className="popular-item-image">
                  <img src={`/images/wings-${item}.jpg`} alt={`Popular item ${item}`} />
                </div>
                <div className="popular-item-content">
                  <h3 className="popular-item-title">Classic Buffalo Wings</h3>
                  <p className="popular-item-description">
                    Spicy buffalo wings with our secret sauce blend.
                  </p>
                  <div className="popular-item-price">$12.99</div>
                  <Link to="/menu" className="btn btn-primary btn-block">
                    Order Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="app-download section">
        <div className="container">
          <div className="app-download-content">
            <div className="app-download-text">
              <h2 className="app-download-title">Download Our Mobile App</h2>
              <p className="app-download-description">
                Get exclusive offers and track your orders in real-time.
              </p>
              <div className="app-download-buttons">
                <a href="#" className="app-download-button">
                  <img src="/images/app-store.png" alt="App Store" />
                </a>
                <a href="#" className="app-download-button">
                  <img src="/images/google-play.png" alt="Google Play" />
                </a>
              </div>
            </div>
            <div className="app-download-image">
              <img src="/images/mobile-app.png" alt="Mobile App" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 