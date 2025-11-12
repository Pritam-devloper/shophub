import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { FaBox, FaCheckCircle, FaTruck, FaTimesCircle } from 'react-icons/fa'
import { formatCurrency } from '../utils/formatCurrency'
import { formatDate } from '../utils/helpers'

const Orders = () => {
  const location = useLocation()
  const [orders, setOrders] = useState([])
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  useEffect(() => {
    // Show success message if redirected from checkout
    if (location.state?.orderPlaced) {
      setShowSuccessMessage(true)
      
      // Create a new order
      const newOrder = {
        id: Date.now(),
        date: new Date().toISOString(),
        status: 'processing',
        total: 0, // This would come from the cart
        items: [] // This would come from the cart
      }
      
      setOrders((prev) => [newOrder, ...prev])

      // Clear the message after 5 seconds
      setTimeout(() => setShowSuccessMessage(false), 5000)
    }
  }, [location])

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <FaCheckCircle className="text-green-500" />
      case 'shipped':
        return <FaTruck className="text-blue-500" />
      case 'processing':
        return <FaBox className="text-yellow-500" />
      case 'cancelled':
        return <FaTimesCircle className="text-red-500" />
      default:
        return <FaBox className="text-gray-500" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'shipped':
        return 'bg-blue-100 text-blue-800'
      case 'processing':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // Sample orders for demo
  const sampleOrders = [
    {
      id: 1,
      date: '2024-01-15',
      status: 'delivered',
      total: 299.99,
      items: [
        { name: 'Product 1', quantity: 2, price: 99.99 },
        { name: 'Product 2', quantity: 1, price: 100.01 }
      ]
    },
    {
      id: 2,
      date: '2024-01-10',
      status: 'shipped',
      total: 150.00,
      items: [
        { name: 'Product 3', quantity: 1, price: 150.00 }
      ]
    },
    {
      id: 3,
      date: '2024-01-05',
      status: 'processing',
      total: 450.50,
      items: [
        { name: 'Product 4', quantity: 3, price: 150.17 }
      ]
    }
  ]

  const displayOrders = orders.length > 0 ? orders : sampleOrders

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">My Orders</h1>

        {showSuccessMessage && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            <div className="flex items-center gap-2">
              <FaCheckCircle size={20} />
              <span className="font-semibold">Order placed successfully!</span>
            </div>
            <p className="mt-1 text-sm">
              Thank you for your purchase. You'll receive a confirmation email shortly.
            </p>
          </div>
        )}

        {displayOrders.length === 0 ? (
          <div className="text-center py-16">
            <FaBox size={64} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No orders yet
            </h2>
            <p className="text-gray-600 mb-6">
              When you place orders, they will appear here.
            </p>
            <a
              href="/shop"
              className="inline-block px-8 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
            >
              Start Shopping
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {displayOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Order Header */}
                <div className="bg-gray-50 px-6 py-4 border-b">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        <span className="font-semibold text-gray-900">
                          Order #{order.id}
                        </span>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Placed on {formatDate(order.date)}
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="px-6 py-4">
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-primary-600">
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-primary-600">
                      {formatCurrency(order.total)}
                    </span>
                  </div>
                </div>

                {/* Order Actions */}
                <div className="bg-gray-50 px-6 py-4 border-t">
                  <div className="flex flex-wrap gap-3">
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium">
                      View Details
                    </button>
                    {order.status === 'delivered' && (
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium">
                        Buy Again
                      </button>
                    )}
                    {order.status === 'processing' && (
                      <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium">
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders
