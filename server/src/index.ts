import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Route imports
import authRoutes from './routes/authRoutes';
import menuRoutes from './routes/menuRoutes';
import orderRoutes from './routes/orderRoutes';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://hot-wings.vercel.app',
    'https://hot-wings-git-main.vercel.app',
    /\.hot-wings\.vercel\.app$/,
    'https://hot-wings-frontend-4qsov47i4-lucastrentins-projects.vercel.app',
    'https://hot-wings-frontend-c46wcth6g-lucastrentins-projects.vercel.app',
    'https://hot-wings-frontend.vercel.app'
  ],
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../../client/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client/dist', 'index.html'));
  });
}

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hotwings')
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong on the server',
    error: process.env.NODE_ENV === 'production' ? null : err.message,
  });
}); 