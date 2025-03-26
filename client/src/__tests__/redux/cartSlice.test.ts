import cartReducer, {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  CartItem
} from '../../redux/slices/cartSlice';
import { AnyAction } from '@reduxjs/toolkit';

describe('Cart Slice', () => {
  const initialState = {
    items: [],
    total: 0
  };

  const sampleItem: CartItem = {
    id: '1',
    name: 'Classic Wings',
    price: 10.99,
    quantity: 1,
    image: 'wings.jpg'
  };

  test('should return the initial state', () => {
    expect(cartReducer(undefined, { type: 'unknown' } as AnyAction)).toEqual(initialState);
  });

  test('should handle adding an item to the cart', () => {
    const newState = cartReducer(initialState, addToCart(sampleItem));
    
    expect(newState.items.length).toBe(1);
    expect(newState.items[0]).toEqual({ ...sampleItem, quantity: 1 });
    expect(newState.total).toBe(10.99);
  });

  test('should handle adding the same item to the cart', () => {
    const stateWithItem = {
      items: [sampleItem],
      total: 10.99
    };
    
    const newState = cartReducer(stateWithItem, addToCart(sampleItem));
    
    expect(newState.items.length).toBe(1);
    expect(newState.items[0].quantity).toBe(2);
    expect(newState.total).toBe(21.98);
  });

  test('should handle removing an item from the cart', () => {
    const stateWithItem = {
      items: [sampleItem],
      total: 10.99
    };
    
    const newState = cartReducer(stateWithItem, removeFromCart(sampleItem.id));
    
    expect(newState.items.length).toBe(0);
    expect(newState.total).toBe(0);
  });

  test('should handle updating item quantity', () => {
    const stateWithItem = {
      items: [sampleItem],
      total: 10.99
    };
    
    const newState = cartReducer(
      stateWithItem, 
      updateQuantity({ id: sampleItem.id, quantity: 3 })
    );
    
    expect(newState.items[0].quantity).toBe(3);
    expect(newState.total).toBe(32.97);
  });

  test('should handle clearing the cart', () => {
    const stateWithItems = {
      items: [
        sampleItem,
        { ...sampleItem, id: '2', name: 'Garlic Parmesan', price: 12.99 }
      ],
      total: 23.98
    };
    
    const newState = cartReducer(stateWithItems, clearCart());
    
    expect(newState.items.length).toBe(0);
    expect(newState.total).toBe(0);
  });
}); 