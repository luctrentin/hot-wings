# Hot Wings Food Ordering Application

A full-stack food ordering application built with React, Redux, TypeScript, Express, and MongoDB. This project demonstrates modern web development practices and architecture.

[![CI/CD Pipeline](https://github.com/username/hotwings/actions/workflows/ci.yml/badge.svg)](https://github.com/username/hotwings/actions/workflows/ci.yml)

## Features

- User authentication (register, login)
- Menu items browsing
- Add items to cart
- Place orders
- View order history
- Responsive design

## Tech Stack

### Frontend
- React (v19)
- Redux Toolkit for state management
- TypeScript for type safety
- React Router for navigation
- Axios for API requests
- CSS for styling
- Webpack for bundling

### Backend
- Node.js
- Express for RESTful API
- MongoDB with Mongoose ODM
- JWT for authentication
- TypeScript

### Testing
- Jest for unit and integration testing
- React Testing Library for component testing
- Cypress for end-to-end testing
- Supertest for API testing

### DevOps
- GitHub Actions for CI/CD
- ESLint for code quality
- TypeScript for type checking

## Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

1. Clone the repository
```
git clone <repository-url>
cd hotwings
```

2. Install dependencies
```
npm run install-all
```

3. Set up environment variables
   - Create a `.env` file in the `server` folder based on `.env.example`

## Running the Application

### Development Mode

To run both frontend and backend concurrently:
```
npm run dev
```

To run only the backend:
```
npm run server
```

To run only the frontend:
```
npm run client
```

### Seed the Database

To populate the database with sample data:
```
npm run seed
```

### Production Build

```
npm run build
npm start
```

## Testing

### Run All Tests
```
npm test
```

### Run Frontend Tests
```
npm test --prefix client
```

### Run Backend Tests
```
npm test --prefix server
```

### Run E2E Tests
```
npm run cypress --prefix client
```

## CI/CD Pipeline

This project uses GitHub Actions for continuous integration and deployment:

1. On every push and pull request to main:
   - Linting
   - Unit and integration tests
   - Build check

2. On push to main:
   - End-to-end tests with Cypress
   - (Deployment would be configured for production)

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/me` - Get current user profile (protected)

### Menu
- `GET /api/menu` - Get all menu items
- `GET /api/menu/:id` - Get a specific menu item
- `POST /api/menu` - Create a new menu item (protected)
- `PUT /api/menu/:id` - Update a menu item (protected)
- `DELETE /api/menu/:id` - Delete a menu item (protected)

### Orders
- `GET /api/orders` - Get all orders for logged in user (protected)
- `POST /api/orders` - Create a new order (protected)
- `GET /api/orders/:id` - Get a specific order (protected)
- `PUT /api/orders/:id` - Update order status (protected)

## Login Information

For testing purposes, a demo user is created when you seed the database:
- Email: test@example.com
- Password: password123

## License

MIT 