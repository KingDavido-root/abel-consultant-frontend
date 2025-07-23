import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Box } from '@mui/material';
import OrderDetails from './OrderDetails';
import { fetchOrders } from '../../store/slices/orderSlice';

const OrderHistory = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (loading) {
    return <Box>Loading...</Box>;
  }

  if (error) {
    return <Box color="error.main">Error: {error}</Box>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Order History
      </Typography>
      {orders && orders.length > 0 ? (
        orders.map((order) => (
          <OrderDetails key={order._id} order={order} />
        ))
      ) : (
        <Typography>No orders found.</Typography>
      )}
    </Container>
  );
};

export default OrderHistory;

