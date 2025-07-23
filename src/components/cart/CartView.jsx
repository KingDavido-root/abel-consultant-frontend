import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography, Box, Button } from '@mui/material';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import { fetchCart, clearCart } from '../../store/slices/cartSlice';

const CartView = () => {
  const dispatch = useDispatch();
  const { items, loading, error, totals } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (loading) {
    return <Box>Loading...</Box>;
  }

  if (error) {
    return <Box color="error.main">Error: {error}</Box>;
  }

  if (!items?.length) {
    return (
      <Box textAlign="center" py={4}>
        <Typography variant="h5" gutterBottom>
          Your cart is empty
        </Typography>
        <Button variant="contained" color="primary" href="/products">
          Continue Shopping
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {items.map((item) => (
            <CartItem key={item.productId} item={item} />
          ))}
          <Box mt={2}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleClearCart}
            >
              Clear Cart
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <CartSummary totals={totals} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartView;
