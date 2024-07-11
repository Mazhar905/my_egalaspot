import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
        const { id, quantity } = action.payload;
        const existingItem = state.items.find(item => item.id === id);
        if (existingItem) {
          existingItem.quantity = quantity; // Add the given quantity to the existing quantity
        } else {
          state.items.push({ ...action.payload, quantity });
        }
      },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },
    incrementQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity++;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item && item.quantity > 1) {
        item.quantity--;
      }
    },
  },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity } = cartSlice.actions;

export default cartSlice.reducer;
