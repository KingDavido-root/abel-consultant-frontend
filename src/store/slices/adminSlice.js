import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Analytics
export const getAnalytics = createAsyncThunk(
  'admin/getAnalytics',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/dashboard`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Orders
export const getAllOrders = createAsyncThunk(
  'admin/getAllOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/orders`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  'admin/updateOrderStatus',
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/api/admin/orders/${orderId}`, {
        status
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Products
export const getInventoryStatus = createAsyncThunk(
  'admin/getInventoryStatus',
  async (category, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/inventory-status`, {
        params: { category }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProductPrice = createAsyncThunk(
  'admin/updateProductPrice',
  async ({ productType, productId, price, salePrice }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/admin/products/${productType}/${productId}/price`,
        { price, salePrice }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    analytics: null,
    orders: [],
    inventory: null,
    loading: false,
    error: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Analytics
      .addCase(getAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.analytics = action.payload;
      })
      .addCase(getAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch analytics';
      })
      // Orders
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch orders';
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const index = state.orders.findIndex(
          (order) => order._id === action.payload._id
        );
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })
      // Inventory
      .addCase(getInventoryStatus.fulfilled, (state, action) => {
        state.inventory = action.payload;
      })
      .addCase(updateProductPrice.fulfilled, (state, action) => {
        // Handle price update success if needed
      });
  }
});

export const { clearError } = adminSlice.actions;
export default adminSlice.reducer;
