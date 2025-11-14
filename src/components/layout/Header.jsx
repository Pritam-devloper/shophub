import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaShoppingCart, FaHeart, FaUser, FaBars, FaTimes, FaSearch, FaLaptop, FaGem, FaTshirt, FaChevronDown, FaMapMarkerAlt, FaBox, FaTruck, FaPercent,FaHome } from 'react-icons/fa'
import useAuth from '../../hooks/useAuth'
import useCart from '../../hooks/useCart'
import { APP_NAME } from '../../utils/constants'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { user, logout } = useAuth()
  const { getCartCount } = useCart()
  const navigate = useNavigate()

  const categories = [
    { name: "Electronics", path: "/shop?category=electronics", icon: <FaLaptop /> },
    { name: "Jewelery", path: "/shop?category=jewelery", icon: <FaGem /> },
    { name: "Men's Clothing", path: "/shop?category=men's clothing", icon: <FaTshirt /> },
    { name: "Women's Clothing", path: "/shop?category=women's clothing", icon: <FaTshirt /> },
  ]

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
    <header className="sticky top-0 z-40">
      {/* Navy Blue Header - Amazon/Flipkart Style */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 shadow-lg">
        <div className="container-custom px-4">
          {/* Top Row */}
          <div className="flex items-center justify-between py-3 gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 flex-shrink-0 group hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-lg text-blue-900 shadow-md">
                S
              </div>
              <span className="text-white font-bold text-lg tracking-wide hidden sm:inline">{APP_NAME}</span>
            </Link>

            {/* Location - Flipkart Style */}
            <div className="hidden md:flex items-center space-x-1 text-white/90 hover:text-white cursor-pointer transition-colors group">
              <FaMapMarkerAlt size={16} />
              <div className="flex flex-col text-xs">
                <span className="text-white/70 text-[10px]">Deliver to</span>
                <span className="font-semibold">New York</span>
              </div>
            </div>

            {/* Search Bar - Main Feature */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-4">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-900 placeholder-gray-500 font-medium transition-all"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </form>

            {/* Right Actions */}
            <div className="flex items-center space-x-1 md:space-x-4">
              {/* Seller Link - Flipkart Style */}
              <Link 
                to="/shop" 
                className="hidden sm:flex flex-col items-center text-white/90 hover:text-white text-xs font-medium py-2 px-2 transition-colors rounded hover:bg-blue-700/50"
              >
                <FaBox size={18} />
                <span className="text-[10px] mt-0.5">Become</span>
                <span className="text-[10px]">Seller</span>
              </Link>

              {/* User Account */}
              <div className="relative group hidden sm:block">
                {user ? (
                  <>
                    <button className="flex flex-col items-center text-white/90 hover:text-white text-xs font-medium py-2 px-2 transition-colors rounded hover:bg-blue-700/50">
                      <FaUser size={18} />
                      <span className="text-[10px] mt-0.5 truncate max-w-[60px]">Account</span>
                    </button>
                    <div className="absolute right-0 mt-0 w-48 bg-white rounded-sm shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-1 z-50">
                      <div className="px-4 py-2 border-b border-gray-200 bg-gray-50">
                        <p className="text-sm font-semibold text-gray-800">Hello, {user.username}</p>
                      </div>
                      <Link to="/profile" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                        👤 My Profile
                      </Link>
                      <Link to="/orders" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                        📦 My Orders
                      </Link>
                      <div className="border-t border-gray-200">
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          🚪 Logout
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <button className="flex flex-col items-center text-white/90 hover:text-white text-xs font-medium py-2 px-2 transition-colors rounded hover:bg-blue-700/50">
                      <FaUser size={18} />
                      <span className="text-[10px] mt-0.5">Account</span>
                    </button>
                    <div className="absolute right-0 mt-0 w-40 bg-white rounded-sm shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-1 z-50">
                      <Link to="/profile" className="block px-4 py-3 text-sm font-semibold text-blue-600 hover:bg-gray-100 transition-colors border-b border-gray-200 text-center">
                        Login / Sign Up
                      </Link>
                      <Link to="/profile" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                        New Customer
                      </Link>
                    </div>
                  </>
                )}
              </div>

              {/* Wishlist */}
              <Link 
                to="/wishlist" 
                className="flex flex-col items-center text-white/90 hover:text-white text-xs font-medium py-2 px-2 transition-colors rounded hover:bg-blue-700/50"
              >
                <FaHeart size={18} />
                <span className="text-[10px] mt-0.5">Wishlist</span>
              </Link>

              {/* Cart - Amazon Style Badge */}
              <Link 
                to="/cart" 
                className="relative flex flex-col items-center text-white/90 hover:text-white text-xs font-medium py-2 px-2 transition-colors rounded hover:bg-blue-700/50"
              >
                <div className="relative">
                  <FaShoppingCart size={18} />
                  {getCartCount() > 0 && (
                    <span className="absolute -top-2 -right-1 bg-yellow-400 text-blue-900 text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md">
                      {getCartCount()}
                    </span>
                  )}
                </div>
                <span className="text-[10px] mt-0.5">Cart</span>
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-white hover:text-yellow-400 transition-colors p-2"
              >
                {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </div>

          {/* Search Bar Mobile */}
          {isMenuOpen && (
            <form onSubmit={handleSearch} className="md:hidden pb-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-900 placeholder-gray-500 font-medium"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Category Bar - Gray with Offers */}
      <div className="bg-white border-b border-gray-200 hidden lg:block">
        <div className="container-custom px-4">
          <div className="flex items-center space-x-8 py-3 overflow-x-auto pb-2">
            {/* Home Button */}
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-semibold text-sm whitespace-nowrap transition-colors"
            >
              <span className="text-lg"><FaHome size={16} /></span>
              <span>Home</span>
            </Link>

            {/* Divider */}
            <div className="w-px h-6 bg-gray-300"></div>

            {/* Best Sellers */}
            <Link 
              to="/shop?deals=true" 
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-semibold text-sm whitespace-nowrap transition-colors"
            >
              <FaPercent size={16} className="text-darkblue-300" />
              <span>Best Sellers</span>
            </Link>

            {/* Divider */}
            <div className="w-px h-6 bg-gray-300"></div>

            {/* Categories */}
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="text-gray-700 hover:text-blue-600 font-medium text-sm whitespace-nowrap transition-colors flex items-center space-x-1 group"
              >
                <span className="text-base group-hover:scale-110 transition-transform">{category.icon}</span>
                <span>{category.name}</span>
              </Link>
            ))}

            {/* Free Shipping Badge */}
            <div className="ml-auto flex items-center space-x-1 text-orange-600 text-xs font-bold whitespace-nowrap bg-orange-50 px-3 py-1.5 rounded-full">
              <FaTruck size={12} />
              <span>FREE SHIPPING</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 shadow-lg">
          <div className="container-custom px-4 py-4 space-y-3">
            {/* Account Section */}
            {user ? (
              <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                <p className="text-sm font-semibold text-blue-900">👤 {user.username}</p>
                <div className="space-y-2 mt-2">
                  <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="block text-sm text-blue-700 hover:text-blue-900 font-medium">
                    My Profile
                  </Link>
                  <Link to="/orders" onClick={() => setIsMenuOpen(false)} className="block text-sm text-blue-700 hover:text-blue-900 font-medium">
                    My Orders
                  </Link>
                  <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="block text-sm text-red-600 hover:text-red-800 font-medium">
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="block bg-blue-600 text-white text-center py-2.5 font-bold rounded-lg hover:bg-blue-700 transition-colors">
                Login / Sign Up
              </Link>
            )}

            {/* Navigation */}
            <nav className="space-y-1 border-t pt-3">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded font-medium">
                Home
              </Link>

              <Link to="/shop" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded font-medium">
                All Products
              </Link>

              <Link to="/shop?deals=true" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2.5 text-orange-600 hover:bg-orange-50 rounded font-bold">
                Best Sellers
              </Link>

              {/* Categories */}
              <button
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                className="flex items-center justify-between w-full px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded font-medium"
              >
                <span className="flex items-center space-x-2">
                  <FaBox size={16} />
                  <span>Categories</span>
                </span>
                <FaChevronDown size={12} className={`transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`} />
              </button>
              {isCategoriesOpen && (
                <div className="pl-4 space-y-1 bg-gray-50 rounded py-2">
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      to={category.path}
                      onClick={() => {
                        setIsMenuOpen(false)
                        setIsCategoriesOpen(false)
                      }}
                      className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-white rounded font-medium text-sm"
                    >
                      <span>{category.icon}</span>
                      <span>{category.name}</span>
                    </Link>
                  ))}
                </div>
              )}

              <Link to="/wishlist" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded font-medium">
                ❤️ Wishlist
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
