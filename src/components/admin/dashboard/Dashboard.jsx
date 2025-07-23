import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
} from '@mui/material';
import {
  ShoppingCart as OrderIcon,
  Person as UserIcon,
  Inventory as ProductIcon,
  AttachMoney as RevenueIcon,
} from '@mui/icons-material';
import { getAnalytics } from '../../../store/slices/adminSlice';

const StatCard = ({ title, value, icon: Icon, color }) => (
  <Card>
    <CardContent>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Icon sx={{ fontSize: 40, color }} />
        </Grid>
        <Grid item>
          <Typography color="textSecondary" variant="h6">
            {title}
          </Typography>
          <Typography variant="h4">{value}</Typography>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const { analytics, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAnalytics());
  }, [dispatch]);

  if (loading) return <Box>Loading...</Box>;
  if (error) return <Box color="error.main">Error: {error}</Box>;

  const {
    orders = {},
    products = {},
    users = {},
    revenue = 0,
  } = analytics || {};

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Orders"
            value={orders.total || 0}
            icon={OrderIcon}
            color="#1976d2"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Users"
            value={users.total || 0}
            icon={UserIcon}
            color="#2e7d32"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Products"
            value={products.total || 0}
            icon={ProductIcon}
            color="#ed6c02"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Revenue"
            value={`$${revenue.toFixed(2)}`}
            icon={RevenueIcon}
            color="#9c27b0"
          />
        </Grid>

        {/* Order Status Breakdown */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Order Status
            </Typography>
            <Grid container spacing={2}>
              {Object.entries(orders.statusBreakdown || {}).map(([status, count]) => (
                <Grid item xs={6} key={status}>
                  <Typography color="textSecondary">
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </Typography>
                  <Typography variant="h6">{count}</Typography>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <Typography variant="body2" color="textSecondary">
              New Users (Today): {users.new || 0}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Active Users: {users.activeInPeriod || 0}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Orders Processing: {orders.statusBreakdown?.processing || 0}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
