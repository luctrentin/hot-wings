import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  available: boolean;
}

interface MenuState {
  items: MenuItem[];
  filteredItems: MenuItem[];
  categories: string[];
  loading: boolean;
  error: string | null;
  activeCategory: string | null;
}

const initialState: MenuState = {
  items: [],
  filteredItems: [],
  categories: [],
  loading: false,
  error: null,
  activeCategory: null,
};

export const fetchMenuItems = createAsyncThunk('menu/fetchItems', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('/api/menu');
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message || 'Failed to fetch menu items');
  }
});

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    filterByCategory: (state, action: PayloadAction<string>) => {
      state.activeCategory = action.payload;
      if (action.payload === 'all') {
        state.filteredItems = state.items;
      } else {
        state.filteredItems = state.items.filter(item => item.category === action.payload);
      }
    },
    searchItems: (state, action: PayloadAction<string>) => {
      const searchTerm = action.payload.toLowerCase();
      state.filteredItems = state.items.filter(
        item =>
          item.name.toLowerCase().includes(searchTerm) ||
          item.description.toLowerCase().includes(searchTerm)
      );
    },
    resetFilter: (state) => {
      state.filteredItems = state.items;
      state.activeCategory = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenuItems.fulfilled, (state, action: PayloadAction<MenuItem[]>) => {
        state.loading = false;
        state.items = action.payload;
        state.filteredItems = action.payload;
        
        // Extract unique categories
        const categories = new Set<string>();
        action.payload.forEach(item => categories.add(item.category));
        state.categories = Array.from(categories);
      })
      .addCase(fetchMenuItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { filterByCategory, searchItems, resetFilter } = menuSlice.actions;
export default menuSlice.reducer; 