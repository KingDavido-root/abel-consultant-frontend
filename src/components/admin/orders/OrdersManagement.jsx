import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Chip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { getAllOrders, updateOrderStatus } from '../../../store/slices/adminSlice';

const OrdersManagement = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.admin);
  const [selectedStatus, setSelectedStatus] = useState('all');

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const handleStatusChange = (orderId, newStatus) => {
    dispatch(updateOrderStatus({ orderId, status: newStatus }));
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

  const filteredOrders = selectedStatus === 'all'
    ? orders
    : orders?.filter(order => order.status.toLowerCase() === selectedStatus.toLowerCase());

  if (loading) return <Box>Loading...</Box>;
  if (error) return <Box color="error.main">Error: {error}</Box>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Orders Management
      </Typography>

      <Box sx={{ mb: 3 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Filter by Status</InputLabel>
          <Select
            value={selectedStatus}
            label="Filter by Status"
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <MenuItem value="all">All Orders</MenuItem>
            <MenuItem value="processing">Processing</MenuItem>
            <MenuItem value="shipped">Shipped</MenuItem>
            <MenuItem value="delivered">Delivered</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders?.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order._id.substring(0, 8)}</TableCell>
                <TableCell>
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>{order.user.name}</TableCell>
                <TableCell>${order.totals.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Chip
                    label={order.status}
                    color={getStatusColor(order.status)}
                  />
                </TableCell>
                <TableCell>
                  <FormControl sx={{ minWidth: 120 }}>
                    <Select
                      value={order.status}
                      size="small"
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    >
                      <MenuItem value="Processing">Processing</MenuItem>
                      <MenuItem value="Shipped">Shipped</MenuItem>
                      <MenuItem value="Delivered">Delivered</MenuItem>
                      <MenuItem value="Cancelled">Cancelled</MenuItem>
                    </Select>
                  </FormControl>
                  <Button
                    size="small"
                    sx={{ ml: 1 }}
                    href={`/admin/orders/${order._id}`}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrdersManagement;
