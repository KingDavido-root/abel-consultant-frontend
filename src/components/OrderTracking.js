import React, { useState } from 'react';
import { FaBox, FaTruck, FaCheckCircle, FaSpinner } from 'react-icons/fa';

const TRACKING_STATUSES = {
  processing: {
    icon: FaSpinner,
    color: 'text-blue-500',
    label: 'Processing',
    description: 'Your order is being processed',
  },
  shipped: {
    icon: FaTruck,
    color: 'text-green-500',
    label: 'Shipped',
    description: 'Your order is on the way',
  },
  delivered: {
    icon: FaCheckCircle,
    color: 'text-green-700',
    label: 'Delivered',
    description: 'Your order has been delivered',
  },
  cancelled: {
    icon: FaBox,
    color: 'text-red-500',
    label: 'Cancelled',
    description: 'Your order has been cancelled',
  },
};

export default function OrderTracking({ order }) {
  const [showDetails, setShowDetails] = useState(false);

  const getStatusIndex = (status) => {
    const statuses = ['processing', 'shipped', 'delivered'];
    return statuses.indexOf(status);
  };

  const currentStatus = order.status;
  const currentIndex = getStatusIndex(currentStatus);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Order #{order.orderId}</h2>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-blue-600 hover:text-blue-800"
        >
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>
      </div>

      {/* Status Timeline */}
      <div className="relative">
        <div className="absolute left-0 top-5 w-full h-0.5 bg-gray-200">
          <div
            className="h-full bg-green-500 transition-all duration-500"
            style={{
              width: `${(currentIndex / 2) * 100}%`,
            }}
          />
        </div>

        <div className="relative flex justify-between">
          {['processing', 'shipped', 'delivered'].map((status, index) => {
            const StatusIcon = TRACKING_STATUSES[status].icon;
            const isActive = getStatusIndex(currentStatus) >= index;
            const statusColor = isActive ? TRACKING_STATUSES[status].color : 'text-gray-400';

            return (
              <div key={status} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full ${
                    isActive ? 'bg-green-100' : 'bg-gray-100'
                  } flex items-center justify-center z-10`}
                >
                  <StatusIcon className={`text-xl ${statusColor}`} />
                </div>
                <p className={`mt-2 font-medium ${statusColor}`}>
                  {TRACKING_STATUSES[status].label}
                </p>
                <p className="text-xs text-gray-500">
                  {TRACKING_STATUSES[status].description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Order Details */}
      {showDetails && (
        <div className="mt-6 border-t pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Shipping Address</h3>
              <p className="text-sm text-gray-600">
                {order.shippingAddress.name}<br />
                {order.shippingAddress.street}<br />
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}<br />
                {order.shippingAddress.country}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Order Summary</h3>
              <div className="text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${order.totals.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>${order.totals.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>${order.totals.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold mt-2">
                  <span>Total:</span>
                  <span>${order.totals.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold mb-2">Items</h3>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="ml-4 flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-500">
                      {item.variant ? `Variant: ${item.variant.name}` : 'Standard'}
                    </p>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex space-x-4">
            <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition">
              Contact Support
            </button>
            {currentStatus === 'delivered' && (
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                Write Review
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
