import express from 'express';
import {
  getMenuItems,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from '../controllers/menuController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// Get all menu items and create a new menu item
router.route('/')
  .get(getMenuItems as express.RequestHandler)
  .post(protect, createMenuItem as express.RequestHandler);

// Get, update and delete a specific menu item
router.route('/:id')
  .get(getMenuItem as express.RequestHandler)
  .put(protect, updateMenuItem as express.RequestHandler)
  .delete(protect, deleteMenuItem as express.RequestHandler);

export default router; 