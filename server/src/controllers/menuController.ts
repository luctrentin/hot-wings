import { Request, Response } from 'express';
import MenuItem, { IMenuItem } from '../models/MenuItem';

// @desc    Get all menu items
// @route   GET /api/menu
// @access  Public
export const getMenuItems = async (req: Request, res: Response) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (error: any) {
    console.error('Get menu items error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Get single menu item
// @route   GET /api/menu/:id
// @access  Public
export const getMenuItem = async (req: Request, res: Response) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);

    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.json(menuItem);
  } catch (error: any) {
    console.error('Get menu item error:', error);
    
    // Check if error is because of invalid ID format
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Create a menu item
// @route   POST /api/menu
// @access  Private/Admin
export const createMenuItem = async (req: Request, res: Response) => {
  try {
    const { name, description, price, image, category, available } = req.body;

    const menuItem = await MenuItem.create({
      name,
      description,
      price,
      image,
      category,
      available: available !== undefined ? available : true,
    });

    res.status(201).json(menuItem);
  } catch (error: any) {
    console.error('Create menu item error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Update a menu item
// @route   PUT /api/menu/:id
// @access  Private/Admin
export const updateMenuItem = async (req: Request, res: Response) => {
  try {
    const { name, description, price, image, category, available } = req.body;

    const menuItem = await MenuItem.findById(req.params.id);

    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    menuItem.name = name || menuItem.name;
    menuItem.description = description || menuItem.description;
    menuItem.price = price !== undefined ? price : menuItem.price;
    menuItem.image = image || menuItem.image;
    menuItem.category = category || menuItem.category;
    menuItem.available = available !== undefined ? available : menuItem.available;

    const updatedMenuItem = await menuItem.save();
    res.json(updatedMenuItem);
  } catch (error: any) {
    console.error('Update menu item error:', error);
    
    // Check if error is because of invalid ID format
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Delete a menu item
// @route   DELETE /api/menu/:id
// @access  Private/Admin
export const deleteMenuItem = async (req: Request, res: Response) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);

    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    await menuItem.deleteOne();
    res.json({ message: 'Menu item removed' });
  } catch (error: any) {
    console.error('Delete menu item error:', error);
    
    // Check if error is because of invalid ID format
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    
    res.status(500).json({ message: error.message || 'Server error' });
  }
}; 