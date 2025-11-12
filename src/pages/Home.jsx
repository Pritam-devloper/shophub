import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FaShoppingBag, FaTruck, FaUndo, FaHeadset, FaMobileAlt, FaTshirt, FaHome, FaLaptop, FaGem } from 'react-icons/fa'
import { ProductContext } from '../context/ProductContext'
import ProductCarousel from '../components/product/ProductCarousel'
import Loader from '../components/common/Loader'
import { formatCurrency } from '../utils/formatCurrency'

const Home = () => {
  const { products, loading } = useContext(ProductContext)

  const categories = [
    { name: "Electronics", path: "/shop?category=electronics", icon: <FaLaptop />, color: "bg-blue-600", hoverColor: "hover:bg-blue-700" },
    { name: "Jewelery", path: "/shop?category=jewelery", icon: <FaGem />, color: "bg-amber-500", hoverColor: "hover:bg-amber-600" },
    { name: "Men's Clothing", path: "/shop?category=men's clothing", icon: <FaTshirt />, color: "bg-emerald-600", hoverColor: "hover:bg-emerald-700" },
    { name: "Women's Clothing", path: "/shop?category=women's clothing", icon: <FaTshirt />, color: "bg-rose-500", hoverColor: "hover:bg-rose-600" },
  ]

  const deals = products.slice(0, 6)
  const topPicks = products.slice(6, 14)
  const electronics = products.filter(p => p.category === 'electronics').slice(0, 5)
  const fashion = products.filter(p => p.category.includes('clothing')).slice(0, 5)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Flipkart Style */}
      <section className="bg-white shadow-sm">
        <div className="container-custom">
          <div className="grid grid-cols-12 gap-0">
            {/* Left Sidebar - Categories */}
            <div className="col-span-12 md:col-span-2 bg-white border-r border-gray-100">
              <div className="py-4 space-y-1">
                {categories.map((category, index) => (
                  <Link
                    key={index}
                    to={category.path}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-all duration-300 group rounded-lg mx-2 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-blue-100 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 opacity-50"></div>
                    <div className={`w-9 h-9 ${category.color} rounded-xl flex items-center justify-center text-white text-sm shadow-md group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 relative z-10`}>
                      {category.icon}
                    </div>
                    <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors duration-300 relative z-10">
                      {category.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Main Carousel */}
            <div className="col-span-12 md:col-span-10">
              {loading ? (
                <div className="h-80 flex items-center justify-center">
                  <Loader size="lg" />
                </div>
              ) : (
                <ProductCarousel products={products} />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Deals of the Day - Flipkart Style */}
      <section className="container-custom py-12">
        <div className="bg-white rounded-xl shadow-professional-lg border border-gray-200 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-4">
              <div className="relative">
                <h2 className="text-2xl font-bold text-gray-900">Deals of the Day</h2>
                
              </div>
              <div className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-elegant animate-pulse-subtle">
                <FaShoppingBag className="animate-wiggle" />
                <span>Limited Time</span>
              </div>
            </div>
            <Link to="/shop">
              <button className="text-blue-600 font-bold hover:text-blue-700 flex items-center gap-2 text-sm uppercase tracking-wide transition-all duration-300 hover:gap-3 group">
                VIEW ALL
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </Link>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {deals.map((product) => (
                <Link key={product.id} to={`/product/${product.id}`} className="group">
                  <div className="text-center transform transition-all duration-300 hover:scale-105">
                    <div className="bg-gray-50 rounded-xl p-4 mb-3 hover:shadow-professional-lg hover:bg-white transition-all border border-gray-200 relative overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.title} 
                        className="w-full h-40 object-contain group-hover:scale-110 transition-transform duration-500 relative z-10"
                      />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2 px-1 group-hover:text-blue-600 transition-colors">
                      {product.title}
                    </h3>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-lg font-bold text-gray-900">
                        {formatCurrency(product.price * 0.8)}
                      </span>
                      <span className="text-xs text-gray-500 line-through">
                        {formatCurrency(product.price)}
                      </span>
                    </div>
                    <span className="inline-block mt-2 text-xs text-green-700 font-bold bg-green-50 px-3 py-1 rounded-full border border-green-200">20% OFF</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Top Picks Section */}
      <section className="container-custom py-12">
        <div className="bg-white rounded-xl shadow-professional-lg border border-gray-200 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-gray-900">Top Picks For You</h2>
            </div>
            <Link to="/shop">
              <button className="text-blue-600 font-bold hover:text-blue-700 text-sm uppercase tracking-wide transition-all duration-300 hover:scale-105">
                VIEW ALL →
              </button>
            </Link>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {topPicks.map((product, index) => (
                <Link 
                  key={product.id} 
                  to={`/product/${product.id}`} 
                  className="group border border-gray-200 rounded-xl hover:shadow-professional-lg hover:border-blue-300 transition-all duration-300 overflow-hidden bg-white hover:-translate-y-1"
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="w-full h-56 object-contain p-4 bg-gray-50 group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-professional z-20">
                      {Math.floor(Math.random() * 30 + 10)}% OFF
                    </div>
                    <div className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-professional opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                      <span className="text-lg">❤️</span>
                    </div>
                  </div>
                  <div className="p-4 border-t border-gray-200 bg-white">
                    <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-3 min-h-[40px] leading-relaxed group-hover:text-blue-600 transition-colors">
                      {product.title}
                    </h3>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-xl font-bold text-gray-900">
                        {formatCurrency(product.price * 0.8)}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        {formatCurrency(product.price)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="bg-green-600 text-white px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                          <span>{product.rating?.rate || 4.2}</span>
                          <span>★</span>
                        </div>
                        <span className="text-xs text-gray-500">
                          ({product.rating?.count || 1234})
                        </span>
                      </div>
                      <span className="text-xs text-green-700 font-bold bg-green-50 px-2 py-1 rounded border border-green-200">Free Ship</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Banner */}
      <section className="bg-white border-y border-gray-200 py-12 mt-8 shadow-sm">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center group cursor-pointer">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-all duration-300">
                <FaTruck className="text-blue-600 text-3xl" />
              </div>
              <h3 className="text-sm font-bold text-gray-900 mb-1">Free Delivery</h3>
              <p className="text-xs text-gray-600">On orders above ₹500</p>
            </div>

            <div className="flex flex-col items-center text-center group cursor-pointer">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-200 transition-all duration-300">
                <FaUndo className="text-green-600 text-3xl" />
              </div>
              <h3 className="text-sm font-bold text-gray-900 mb-1">7 Days Return</h3>
              <p className="text-xs text-gray-600">Easy return policy</p>
            </div>

            <div className="flex flex-col items-center text-center group cursor-pointer">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-all duration-300">
                <FaShoppingBag className="text-purple-600 text-3xl" />
              </div>
              <h3 className="text-sm font-bold text-gray-900 mb-1">100% Authentic</h3>
              <p className="text-xs text-gray-600">Products guaranteed</p>
            </div>

            <div className="flex flex-col items-center text-center group cursor-pointer">
              <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-all duration-300">
                <FaHeadset className="text-orange-600 text-3xl" />
              </div>
              <h3 className="text-sm font-bold text-gray-900 mb-1">24/7 Support</h3>
              <p className="text-xs text-gray-600">Dedicated support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Electronics Section */}
      {electronics.length > 0 && (
        <section className="container-custom py-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FaLaptop className="text-blue-600 text-xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Electronics</h2>
              </div>
              <Link to="/shop?category=electronics" className="text-blue-600 hover:text-blue-700 text-sm font-semibold">
                See All →
              </Link>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {electronics.map((product) => (
                  <Link key={product.id} to={`/product/${product.id}`} className="group text-center">
                    <div className="bg-gray-50 rounded-xl p-4 mb-3 group-hover:shadow-lg group-hover:bg-white transition-all border border-gray-100">
                      <img 
                        src={product.image} 
                        alt={product.title} 
                        className="w-full h-40 object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2 px-1 leading-relaxed">
                      {product.title}
                    </h3>
                    <div className="text-green-600 text-sm font-bold">
                      From {formatCurrency(product.price * 0.8)}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">⭐ 4.5+ ratings</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Fashion Section */}
      {fashion.length > 0 && (
        <section className="container-custom py-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                  <FaTshirt className="text-pink-600 text-xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Fashion Essentials</h2>
              </div>
              <Link to="/shop?category=men's clothing" className="text-blue-600 hover:text-blue-700 text-sm font-semibold">
                See All →
              </Link>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {fashion.map((product) => (
                  <Link key={product.id} to={`/product/${product.id}`} className="group text-center">
                    <div className="bg-gray-50 rounded-xl p-4 mb-3 group-hover:shadow-lg group-hover:bg-white transition-all border border-gray-100">
                      <img 
                        src={product.image} 
                        alt={product.title} 
                        className="w-full h-40 object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2 px-1 leading-relaxed">
                      {product.title}
                    </h3>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-sm font-bold text-gray-900">{formatCurrency(product.price * 0.8)}</span>
                      <span className="text-xs text-orange-600 font-semibold bg-orange-50 px-2 py-1 rounded">Min 40% Off</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default Home
