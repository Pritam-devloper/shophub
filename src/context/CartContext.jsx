import React, { createContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { STORAGE_KEYS } from '../utils/constants'
import { getLocalStorage, setLocalStorage } from '../utils/helpers'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = getLocalStorage(STORAGE_KEYS.CART)
    if (savedCart) {
      setCartItems(savedCart)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    if (!loading) {
      setLocalStorage(STORAGE_KEYS.CART, cartItems)
    }
  }, [cartItems, loading])

  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)
      
      if (existingItem) {
        toast.success(`Updated ${product.title.substring(0, 20)}... quantity`)
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      
      toast.success(`Added ${product.title.substring(0, 20)}... to cart`)
      return [...prevItems, { ...product, quantity }]
    })
  }

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId))
    toast.success('Item removed from cart')
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setCartItems([])
    toast.success('Cart cleared')
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0)
  }

  const isInCart = (productId) => {
    return cartItems.some((item) => item.id === productId)
  }

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    isInCart,
    loading
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
