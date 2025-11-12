import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import Home from '../pages/Home'
import Shop from '../pages/Shop'
import ProductDetail from '../pages/ProductDetail'
import Cart from '../pages/Cart'
import Checkout from '../pages/Checkout'
import Profile from '../pages/Profile'
import Orders from '../pages/Orders'
import Wishlist from '../pages/Wishlist'
import NotFound from '../pages/NotFound'
import ProtectedRoute from './ProtectedRoute'

const AppRoutes = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default AppRoutes
