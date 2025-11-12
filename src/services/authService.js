import api from './api'
import { STORAGE_KEYS } from '../utils/constants'

export const authService = {
  // Login user
  login: async (username, password) => {
    const response = await api.post('/auth/login', { username, password })
    if (response.data.token) {
      localStorage.setItem(STORAGE_KEYS.TOKEN, response.data.token)
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.data.user))
    }
    return response.data
  },

  // Register user
  register: async (userData) => {
    const response = await api.post('/users', userData)
    return response.data
  },

  // Logout user
  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN)
    localStorage.removeItem(STORAGE_KEYS.USER)
  },

  // Get current user
  getCurrentUser: () => {
    const userStr = localStorage.getItem(STORAGE_KEYS.USER)
    return userStr ? JSON.parse(userStr) : null
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem(STORAGE_KEYS.TOKEN)
  },

  // Update user profile
  updateProfile: async (userId, userData) => {
    const response = await api.put(`/users/${userId}`, userData)
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.data))
    return response.data
  }
}
