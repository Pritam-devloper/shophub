export const APP_NAME = import.meta.env.VITE_APP_NAME || 'ShopHub'
export const API_URL = import.meta.env.VITE_API_URL || 'https://fakestoreapi.com'

export const CATEGORIES = [
  'All',
  'Electronics',
  'Jewelery',
  'Men\'s Clothing',
  'Women\'s Clothing'
]

export const SORT_OPTIONS = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Newest', value: 'newest' }
]

export const PRICE_RANGES = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under $50', min: 0, max: 50 },
  { label: '$50 - $100', min: 50, max: 100 },
  { label: '$100 - $200', min: 100, max: 200 },
  { label: 'Over $200', min: 200, max: Infinity }
]

export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
}

export const STORAGE_KEYS = {
  USER: 'user',
  TOKEN: 'token',
  CART: 'cart',
  WISHLIST: 'wishlist'
}
