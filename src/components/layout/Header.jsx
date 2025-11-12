import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaShoppingCart, FaHeart, FaUser, FaBars, FaTimes, FaSearch } from 'react-icons/fa'
import useAuth from '../../hooks/useAuth'
import useCart from '../../hooks/useCart'
import { APP_NAME } from '../../utils/constants'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { user, logout } = useAuth()
  const { getCartCount } = useCart()
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/shop?search=${searchQuery}`)
      setSearchQuery('')
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="container-custom">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-professional group-hover:shadow-professional-md transition-all duration-300">
              <span className="text-white font-bold text-2xl">S</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">{APP_NAME}</span>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full group">
              <input
                type="text"
                placeholder="Search for products, brands and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors" />
            </div>
          </form>

          {/* Right Icons */}
          <div className="flex items-center space-x-6">
            {/* Wishlist */}
            <Link to="/wishlist" className="hidden sm:block text-gray-700 hover:text-primary-600 transition-colors">
              <FaHeart size={22} />
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative text-gray-700 hover:text-blue-600 transition-colors duration-300">
              <FaShoppingCart size={22} />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-professional">
                  {getCartCount()}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="hidden sm:block relative group">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors">
                  <FaUser size={20} />
                  <span className="text-sm font-medium">{user.username}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Profile
                  </Link>
                  <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/profile" className="hidden sm:block text-gray-700 hover:text-primary-600 transition-colors">
                <FaUser size={20} />
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 hover:text-primary-600 transition-colors"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-8 py-3 border-t">
          <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
            Home
          </Link>
          <Link to="/shop" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
            Shop
          </Link>
          <Link to="/orders" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
            Orders
          </Link>
          <Link to="/wishlist" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
            Wishlist
          </Link>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="container-custom py-4 space-y-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </form>

            {/* Mobile Navigation */}
            <nav className="flex flex-col space-y-2">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Home
              </Link>
              <Link
                to="/shop"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Shop
              </Link>
              <Link
                to="/orders"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Orders
              </Link>
              <Link
                to="/wishlist"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Wishlist
              </Link>
              {user ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout()
                      setIsMenuOpen(false)
                    }}
                    className="text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Login
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
