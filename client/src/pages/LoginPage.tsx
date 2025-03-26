import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { RootState } from '../redux/store';
import { login, clearError } from '../redux/slices/authSlice';
import '../styles/authpages.css';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

interface LocationState {
  redirect?: string;
}

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const { loading, error, isAuthenticated } = useAppSelector(
    (state: RootState) => state.auth
  );
  
  const redirect = (location.state as LocationState)?.redirect || '/';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirect);
    }
    
    // Clear any previous errors when component mounts
    dispatch(clearError());
  }, [isAuthenticated, navigate, redirect, dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !password.trim()) {
      return;
    }
    
    dispatch(login({ email, password }));
  };

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-container">
          <div className="auth-form-container card">
            <h1 className="auth-title">Login</h1>
            
            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}
            
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary btn-block"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
            
            <div className="auth-links">
              <p>
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
          </div>
          
          <div className="auth-info">
            <h2>Welcome Back!</h2>
            <p>
              Login to your account to access your order history, track current orders,
              and enjoy a personalized experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 