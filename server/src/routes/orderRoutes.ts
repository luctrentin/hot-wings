import express from 'express';
import {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
} from '../controllers/orderController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// Get all orders for logged in user and create a new order
router.route('/')
  .get(protect, getMyOrders as express.RequestHandler)
  .post(protect, createOrder as express.RequestHandler);

// Get and update specific order
router.route('/:id')
  .get(protect, getOrderById as express.RequestHandler)
  .put(protect, updateOrderStatus as express.RequestHandler);

export default router; 