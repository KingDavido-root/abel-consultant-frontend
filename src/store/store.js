import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import adminReducer from './slices/adminSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    admin: adminReducer,
  },
});

export default store;
