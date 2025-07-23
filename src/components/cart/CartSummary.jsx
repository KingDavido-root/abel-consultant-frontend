import React from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';

const CartSummary = ({ totals }) => (
  <Box>
    <Typography variant="h6">Order Summary</Typography>
    <Divider sx={{ my: 2 }} />
    <Typography>Subtotal: ${totals.subtotal.toFixed(2)}</Typography>
    <Typography>Tax: ${totals.tax.toFixed(2)}</Typography>
    <Typography variant="h6">Total: ${totals.total.toFixed(2)}</Typography>
    <Button
      variant="contained"
      color="primary"
      fullWidth
      sx={{ mt: 2 }}
      href="/checkout"
    >
      Proceed to Checkout
    </Button>
  </Box>
);

export default CartSummary;
