import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Navbar from '../../components/Navbar';

const mockStore = configureStore([]);

describe('Navbar Component', () => {
  test('renders Navbar with Hot Wings logo', () => {
    const initialState = {
      auth: {
        isAuthenticated: false,
        user: null
      },
      cart: {
        items: []
      }
    };
    
    const store = mockStore(initialState);
    
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );
    
    const logoElement = screen.getByText(/Hot Wings/i);
    expect(logoElement).toBeInTheDocument();
  });
  
  test('renders login link when user is not authenticated', () => {
    const initialState = {
      auth: {
        isAuthenticated: false,
        user: null
      },
      cart: {
        items: []
      }
    };
    
    const store = mockStore(initialState);
    
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );
    
    const loginLink = screen.getByText(/Login/i);
    expect(loginLink).toBeInTheDocument();
  });
  
  test('renders user name and logout button when authenticated', () => {
    const initialState = {
      auth: {
        isAuthenticated: true,
        user: { name: 'Test User' }
      },
      cart: {
        items: []
      }
    };
    
    const store = mockStore(initialState);
    
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );
    
    const userGreeting = screen.getByText(/Hi, Test User/i);
    const logoutButton = screen.getByText(/Logout/i);
    
    expect(userGreeting).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
  });
}); 