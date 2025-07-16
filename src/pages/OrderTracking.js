import React from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import OrderTrackingComponent from '../components/OrderTracking';

export default function OrderTracking() {
  const { orderId } = useParams();
  const { recentOrders } = useCart();

  const order = recentOrders.find(order => order.orderId === orderId);

  if (!order) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-gray-800">Order Not Found</h2>
        <p className="text-gray-600 mt-2">
          We couldn't find the order you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <OrderTrackingComponent order={order} />
    </div>
  );
}
