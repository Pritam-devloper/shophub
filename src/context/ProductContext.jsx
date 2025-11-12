import React, { createContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { productService } from '../services/productService'
import { STORAGE_KEYS } from '../utils/constants'
import { getLocalStorage, setLocalStorage } from '../utils/helpers'

export const ProductContext = createContext()

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchProducts()
    fetchCategories()
    loadWishlist()
  }, [])

  useEffect(() => {
    // Save wishlist to localStorage
    setLocalStorage(STORAGE_KEYS.WISHLIST, wishlist)
  }, [wishlist])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const data = await productService.getAllProducts()
      setProducts(data)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const data = await productService.getCategories()
      setCategories(data)
    } catch (err) {
      console.error('Failed to fetch categories:', err)
    }
  }

  const loadWishlist = () => {
    const savedWishlist = getLocalStorage(STORAGE_KEYS.WISHLIST)
    if (savedWishlist) {
      setWishlist(savedWishlist)
    }
  }

  const getProductById = (id) => {
    return products.find((product) => product.id === parseInt(id))
  }

  const addToWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.find((item) => item.id === product.id)
      if (exists) {
        toast.error('Item already in wishlist')
        return prevWishlist
      }
      toast.success(`Added ${product.title.substring(0, 20)}... to wishlist`)
      return [...prevWishlist, product]
    })
  }

  const removeFromWishlist = (productId) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((item) => item.id !== productId)
    )
    toast.success('Removed from wishlist')
  }

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId)
  }

  const value = {
    products,
    categories,
    wishlist,
    loading,
    error,
    getProductById,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    refreshProducts: fetchProducts
  }

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  )
}
