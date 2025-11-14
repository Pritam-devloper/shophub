import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FaShoppingBag, FaTruck, FaUndo, FaHeadset, FaMobileAlt, FaTshirt, FaHome, FaLaptop, FaGem, FaHeart, FaRegHeart, FaShoppingCart } from 'react-icons/fa'
import { ProductContext } from '../context/ProductContext'
import ProductCarousel from '../components/product/ProductCarousel'
import Loader from '../components/common/Loader'
import useCart from '../hooks/useCart'
import { formatCurrency } from '../utils/formatCurrency'

const Home = () => {
  const { products, loading, isInWishlist, addToWishlist, removeFromWishlist } = useContext(ProductContext)
  const { addToCart, isInCart } = useCart()

  const deals = products.slice(0, 6)
  const topPicks = products.slice(6, 14)
  const electronics = products.filter(p => p.category === 'electronics').slice(0, 5)
  const fashion = products.filter(p => p.category.includes('clothing')).slice(0, 5)

  const handleAddToCart = (e, product) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
  }

  const handleToggleWishlist = (e, product) => {
    e.preventDefault()
    e.stopPropagation()
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Full Width Carousel */}
      <section className="bg-gradient-to-b from-blue-50 to-white">
        <div className="container-custom">
          {loading ? (
            <div className="h-96 flex items-center justify-center">
              <Loader size="lg" />
            </div>
          ) : (
            <ProductCarousel products={products} />
          )}
        </div>
      </section>

      {/* Deals of the Day - Premium Style */}
      <section className="container-custom py-12">
        <div className="bg-gradient-to-r from-white to-blue-50 rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700">
            <div className="flex items-center gap-4">
              <div className="relative">
                <h2 className="text-3xl font-bold text-white">Deals of the Day</h2>
              </div>
              <div className="flex items-center gap-2 bg-red-500 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg animate-pulse-subtle">
                <FaShoppingBag className="animate-wiggle" />
                <span>Limited Time</span>
              </div>
            </div>
            <Link to="/shop">
              <button className="bg-white text-blue-600 font-bold hover:bg-gray-100 flex items-center gap-2 text-sm uppercase tracking-wide transition-all duration-300 hover:gap-3 px-6 py-2.5 rounded-lg shadow-md group">
                VIEW ALL
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </Link>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
              {deals.map((product) => (
                <Link key={product.id} to={`/product/${product.id}`} className="group">
                  <div className="text-center">
                    <div className="bg-white rounded-2xl p-6 mb-4 shadow-lg border-2 border-gray-100 relative overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.title} 
                        className="w-full h-40 object-contain relative z-10"
                      />
                      <div className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-lg text-xs font-bold shadow-lg">
                        -20%
                      </div>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-3 px-1 h-10">
                      {product.title}
                    </h3>
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <span className="text-lg font-bold text-gray-900">
                        {formatCurrency(product.price * 0.8)}
                      </span>
                      <span className="text-xs text-gray-500 line-through">
                        {formatCurrency(product.price)}
                      </span>
                    </div>
                    <button 
                      onClick={(e) => handleAddToCart(e, product)}
                      className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Top Picks Section - Modern Grid */}
      <section className="container-custom py-12">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-amber-50 to-orange-50">
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-bold text-gray-900">Top Picks For You</h2>
            </div>
            <Link to="/shop">
              <button className="text-blue-600 font-bold hover:text-blue-700 text-sm uppercase tracking-wide transition-all duration-300 hover:scale-105 px-6 py-2.5 hover:bg-blue-50 rounded-lg">
                VIEW ALL →
              </button>
            </Link>
          </div>
          <div className="p-8 bg-gradient-to-b from-white to-gray-50">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {topPicks.map((product, index) => (
                <Link 
                  key={product.id} 
                  to={`/product/${product.id}`} 
                  className="group border-2 border-gray-200 rounded-2xl shadow-lg overflow-hidden bg-white"
                >
                  <div className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="w-full h-56 object-contain p-4"
                    />
                    <div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg z-20">
                      {Math.floor(Math.random() * 30 + 10)}% OFF
                    </div>
                    <div className="absolute top-3 right-3 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg z-20 text-xl cursor-pointer hover:bg-gray-50 transition-colors" onClick={(e) => handleToggleWishlist(e, product)}>
                      {isInWishlist(product.id) ? (
                        <FaHeart className="text-red-500" size={20} />
                      ) : (
                        <FaRegHeart className="text-gray-600" size={20} />
                      )}
                    </div>
                  </div>
                  <div className="p-5 border-t border-gray-100 bg-white">
                    <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-3 min-h-[40px] leading-relaxed">
                      {product.title}
                    </h3>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-xl font-bold text-gray-900">
                        {formatCurrency(product.price * 0.8)}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        {formatCurrency(product.price)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1.5">
                        <div className="bg-green-600 text-white px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-md">
                          <span>{product.rating?.rate || 4.2}</span>
                          <span>★</span>
                        </div>
                        <span className="text-xs text-gray-500">
                          ({product.rating?.count || 1234})
                        </span>
                      </div>
                    </div>
                    <button 
                      onClick={(e) => handleAddToCart(e, product)}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 rounded-lg font-bold text-sm hover:from-blue-700 hover:to-blue-800 transition-colors"
                    >
                      Buy Now
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Banner - Modern Cards */}
      <section className="bg-gradient-to-r from-blue-50 via-white to-purple-50 border-y border-gray-200 py-16 mt-8 shadow-sm">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center p-6 rounded-2xl border-2 border-blue-200 bg-white">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mb-4 shadow-md">
                <FaTruck className="text-blue-600 text-4xl" />
              </div>
              <h3 className="text-sm font-bold text-blue-600 mb-1">Free Delivery</h3>
              <p className="text-xs text-gray-600">On orders above $50</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-2xl border-2 border-green-200 bg-white">
              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mb-4 shadow-md">
                <FaUndo className="text-green-600 text-4xl" />
              </div>
              <h3 className="text-sm font-bold text-green-600 mb-1">7 Days Return</h3>
              <p className="text-xs text-gray-600">Easy return policy</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-2xl border-2 border-purple-200 bg-white">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mb-4 shadow-md">
                <FaShoppingBag className="text-purple-600 text-4xl" />
              </div>
              <h3 className="text-sm font-bold text-purple-600 mb-1">100% Authentic</h3>
              <p className="text-xs text-gray-600">Products guaranteed</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-2xl border-2 border-orange-200 bg-white">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mb-4 shadow-md">
                <FaHeadset className="text-orange-600 text-4xl" />
              </div>
              <h3 className="text-sm font-bold text-orange-600 mb-1">24/7 Support</h3>
              <p className="text-xs text-gray-600">Dedicated support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Electronics Section */}
      {electronics.length > 0 && (
        <section className="container-custom py-12">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-blue-50 to-cyan-50">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center shadow-md">
                  <FaLaptop className="text-blue-600 text-3xl" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Electronics</h2>
              </div>
              <Link to="/shop?category=electronics" className="text-blue-600 hover:text-blue-700 text-sm font-bold px-6 py-2.5 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all">
                See All →
              </Link>
            </div>
            <div className="p-8 bg-gradient-to-b from-white to-gray-50">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
                {electronics.map((product) => (
                  <Link key={product.id} to={`/product/${product.id}`} className="group text-center">
                    <div className="bg-white rounded-2xl p-5 mb-4 shadow-lg border-2 border-gray-100">
                      <img 
                        src={product.image} 
                        alt={product.title} 
                        className="w-full h-40 object-contain"
                      />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2 px-1 leading-relaxed">
                      {product.title}
                    </h3>
                    <div className="text-green-600 text-sm font-bold">
                      From {formatCurrency(product.price * 0.8)}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 mb-3">⭐ {product.rating?.rate || 4.5}+ ratings</div>
                    <button 
                      onClick={(e) => handleAddToCart(e, product)}
                      className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold text-xs hover:bg-blue-700 transition-colors"
                    >
                      Add to Cart
                    </button>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Fashion Section */}
      {fashion.length > 0 && (
        <section className="container-custom py-12 mb-6">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg">
                <FaTshirt className="text-white text-2xl" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Fashion Essentials</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {fashion.map((product) => (
                <Link key={product.id} to={`/product/${product.id}`} className="group">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
                    {/* Image Container */}
                    <div className="relative bg-gray-50 p-4 h-48 flex items-center justify-center overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.title} 
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Discount Badge */}
                      <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-lg text-xs font-bold shadow-lg">
                        40% OFF
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-3 leading-tight flex-grow">
                        {product.title}
                      </h3>
                      
                      {/* Price */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg font-bold text-gray-900">
                          ₹{Math.floor(product.price * 0.8)}
                        </span>
                        <span className="text-xs text-gray-500 line-through">
                          ₹{Math.floor(product.price)}
                        </span>
                      </div>
                      
                      {/* Button */}
                      <button 
                        onClick={(e) => handleAddToCart(e, product)}
                        className="w-full bg-pink-600 text-white py-2.5 rounded-xl font-semibold text-sm hover:bg-pink-700 transition-colors shadow-md hover:shadow-lg active:scale-95"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default Home
