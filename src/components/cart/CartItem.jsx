import React from 'react';
import { ListItem, Typography, Button } from '@mui/material';

const CartItem = ({ item }) => (
  <ListItem divider>
    <Typography variant="body1">{item.name}</Typography>
    <Typography variant="body2">Quantity: {item.quantity}</Typography>
    <Button variant="text" color="primary">Edit</Button>
  </ListItem>
);

export default CartItem;
