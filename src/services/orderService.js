import api from './api'

export const orderService = {
  // Create new order
  createOrder: async (orderData) => {
    const response = await api.post('/carts', orderData)
    return response.data
  },

  // Get user orders
  getUserOrders: async (userId) => {
    const response = await api.get(`/carts/user/${userId}`)
    return response.data
  },

  // Get order by ID
  getOrderById: async (orderId) => {
    const response = await api.get(`/carts/${orderId}`)
    return response.data
  },

  // Get all orders (admin)
  getAllOrders: async () => {
    const response = await api.get('/carts')
    return response.data
  },

  // Update order status
  updateOrderStatus: async (orderId, status) => {
    const response = await api.patch(`/carts/${orderId}`, { status })
    return response.data
  }
}
