import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Button,
  Box,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { cancelOrder } from '../../store/slices/orderSlice';

const OrderDetails = ({ order }) => {
  const dispatch = useDispatch();

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      dispatch(cancelOrder(order._id));
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'processing':
        return 'info';
      case 'shipped':
        return 'primary';
      case 'delivered':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">
              Order #{order._id.substring(0, 8)}
            </Typography>
            <Typography color="textSecondary">
              {new Date(order.createdAt).toLocaleDateString()}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} textAlign="right">
            <Chip
              label={order.status}
              color={getStatusColor(order.status)}
              sx={{ mb: 1 }}
            />
            {order.status === 'Processing' && (
              <Box>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={handleCancel}
                >
                  Cancel Order
                </Button>
              </Box>
            )}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Items:</Typography>
            {order.items.map((item) => (
              <Box key={item.productId} sx={{ my: 1 }}>
                <Typography>
                  {item.name} - Quantity: {item.quantity}
                </Typography>
                <Typography color="textSecondary">
                  ${item.price.toFixed(2)} each
                </Typography>
              </Box>
            ))}
          </Grid>
          <Grid item xs={12} textAlign="right">
            <Typography variant="subtitle1">
              Total: ${order.totals.total.toFixed(2)}
            </Typography>
          </Grid>
          {order.trackingNumber && (
            <Grid item xs={12}>
              <Typography>
                Tracking Number: {order.trackingNumber}
              </Typography>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default OrderDetails;
