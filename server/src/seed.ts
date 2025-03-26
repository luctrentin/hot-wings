import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User';
import MenuItem from './models/MenuItem';
import Order from './models/Order';
import bcrypt from 'bcryptjs';

// Load environment variables
dotenv.config();

// Sample menu items
const menuItems = [
  {
    name: 'Classic Wings',
    description: 'Traditional bone-in wings tossed in your choice of sauce',
    price: 9.99,
    image: 'https://example.com/classic-wings.jpg',
    category: 'wings',
  },
  {
    name: 'Boneless Wings',
    description: 'Boneless chicken bites tossed in your choice of sauce',
    price: 8.99,
    image: 'https://example.com/boneless-wings.jpg',
    category: 'wings',
  },
  {
    name: 'French Fries',
    description: 'Crispy seasoned fries',
    price: 3.99,
    image: 'https://example.com/fries.jpg',
    category: 'sides',
  },
  {
    name: 'Chicken Sandwich',
    description: 'Crispy chicken breast with lettuce, tomato, and mayo on a brioche bun',
    price: 7.99,
    image: 'https://example.com/chicken-sandwich.jpg',
    category: 'starters',
  },
  {
    name: 'Soft Drink',
    description: 'Your choice of soda',
    price: 1.99,
    image: 'https://example.com/soft-drink.jpg',
    category: 'drinks',
  },
];

// Sample user
const users = [
  {
    name: 'Test User',
    email: 'test@example.com',
    password: bcrypt.hashSync('password123', 10),
  },
];

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hotwings')
  .then(async () => {
    console.log('Connected to MongoDB');
    
    try {
      // Clear existing data
      await MenuItem.deleteMany({});
      await User.deleteMany({});
      await Order.deleteMany({});
      
      console.log('Database cleared');
      
      // Seed menu items
      const createdMenuItems = await MenuItem.insertMany(menuItems);
      console.log(`${createdMenuItems.length} menu items created`);
      
      // Seed users
      const createdUsers = await User.insertMany(users);
      console.log(`${createdUsers.length} users created`);
      
      // Create a sample order
      const sampleOrder = {
        userId: createdUsers[0]._id,
        items: [
          {
            id: String(createdMenuItems[0]._id),
            name: String(createdMenuItems[0].name),
            price: Number(createdMenuItems[0].price),
            quantity: 2,
            image: String(createdMenuItems[0].image),
          },
          {
            id: String(createdMenuItems[2]._id),
            name: String(createdMenuItems[2].name),
            price: Number(createdMenuItems[2].price),
            quantity: 1,
            image: String(createdMenuItems[2].image),
          },
        ],
        total: 2 * Number(createdMenuItems[0].price) + Number(createdMenuItems[2].price),
        status: 'delivered',
        address: '123 Main St, Anytown, USA',
        paymentMethod: 'card',
      };
      
      const createdOrder = await Order.create(sampleOrder);
      console.log(`Sample order created: ${createdOrder._id}`);
      
      console.log('Data import complete!');
      process.exit();
    } catch (error) {
      console.error(`Error: ${error}`);
      process.exit(1);
    }
  })
  .catch((err) => {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(1);
  }); 