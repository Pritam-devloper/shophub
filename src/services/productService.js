import api from './api'

export const productService = {
  // Get all products
  getAllProducts: async () => {
    const response = await api.get('/products')
    return response.data
  },

  // Get product by ID
  getProductById: async (id) => {
    const response = await api.get(`/products/${id}`)
    return response.data
  },

  // Get products by category
  getProductsByCategory: async (category) => {
    const response = await api.get(`/products/category/${category}`)
    return response.data
  },

  // Get all categories
  getCategories: async () => {
    const response = await api.get('/products/categories')
    return response.data
  },

  // Add new product (admin)
  addProduct: async (productData) => {
    const response = await api.post('/products', productData)
    return response.data
  },

  // Update product (admin)
  updateProduct: async (id, productData) => {
    const response = await api.put(`/products/${id}`, productData)
    return response.data
  },

  // Delete product (admin)
  deleteProduct: async (id) => {
    const response = await api.delete(`/products/${id}`)
    return response.data
  }
}
