import React, { useState, useEffect, useContext } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import { ProductContext } from '../context/ProductContext'
import Loader from '../components/common/Loader'
import useDebounce from '../hooks/useDebounce'
import { formatCurrency } from '../utils/formatCurrency'

const Shop = () => {
  const [searchParams] = useSearchParams()
  const { products, loading } = useContext(ProductContext)
  
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all')
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [sortBy, setSortBy] = useState('default')
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  
  const debouncedSearch = useDebounce(searchQuery, 500)

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'jewelery', label: 'Jewelery' },
    { value: "men's clothing", label: "Men's Clothing" },
    { value: "women's clothing", label: "Women's Clothing" },
  ]

  const maxPrice = Math.max(...products.map(p => p.price), 1000)

  useEffect(() => {
    setPriceRange([0, maxPrice])
  }, [maxPrice])

  useEffect(() => {
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    if (category) setSelectedCategory(category)
    if (search) setSearchQuery(search)
  }, [searchParams])

  const filteredProducts = products
    .filter((product) => {
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false
      }
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false
      }
      if (debouncedSearch) {
        const searchLower = debouncedSearch.toLowerCase()
        return (
          product.title.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower)
        )
      }
      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'name':
          return a.title.localeCompare(b.title)
        case 'rating':
          return (b.rating?.rate || 0) - (a.rating?.rate || 0)
        default:
          return 0
      }
    })

  const handleClearFilters = () => {
    setSelectedCategory('all')
    setPriceRange([0, maxPrice])
    setSearchQuery('')
    setSortBy('default')
  }

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  const handlePriceChange = (e) => {
    setPriceRange([0, Number(e.target.value)])
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container-custom py-4">
        <div className="flex gap-4">
          {/* Sidebar - Filters - Flipkart Style */}
          <aside className="w-64 flex-shrink-0">
            <div className="bg-white rounded-sm shadow-sm sticky top-20">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                  {(selectedCategory !== 'all' || priceRange[1] !== maxPrice) && (
                    <button
                      onClick={handleClearFilters}
                      className="text-sm text-primary-600 hover:text-primary-700 font-semibold uppercase"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Category Filter */}
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">
                  Categories
                </h3>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <label key={category.value} className="flex items-center cursor-pointer group">
                      <input
                        type="radio"
                        name="category"
                        value={category.value}
                        checked={selectedCategory === category.value}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      />
                      <span className={`ml-3 text-sm ${selectedCategory === category.value ? 'text-gray-900 font-semibold' : 'text-gray-600'} group-hover:text-primary-600`}>
                        {category.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="px-6 py-4">
                <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">
                  Price
                </h3>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="0"
                    max={maxPrice}
                    value={priceRange[1]}
                    onChange={handlePriceChange}
                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-700">{formatCurrency(priceRange[0])}</span>
                    <span className="text-xs font-semibold text-gray-700">{formatCurrency(priceRange[1])}</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content - Flipkart Style */}
          <main className="flex-1">
            {/* Search and Sort Bar */}
            <div className="bg-white rounded-sm shadow-sm mb-4">
              <div className="px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-gray-200">
                <div className="flex items-center gap-6 w-full md:w-auto">
                  <h1 className="text-lg font-medium text-gray-800">
                    All Products
                  </h1>
                  <span className="text-sm text-gray-500">
                    (Showing {filteredProducts.length} products)
                  </span>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                  <div className="relative w-full md:w-64">
                    <input
                      type="text"
                      placeholder="Search in products..."
                      value={searchQuery}
                      onChange={handleSearch}
                      className="w-full px-3 py-1.5 pl-9 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-primary-500"
                    />
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                  </div>

                  <div className="flex items-center gap-2 w-full md:w-auto">
                    <label className="text-sm text-gray-600">Sort By</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-1.5 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-primary-500 bg-white"
                    >
                      <option value="default">Relevance</option>
                      <option value="rating">Popularity</option>
                      <option value="price-low">Price -- Low to High</option>
                      <option value="price-high">Price -- High to Low</option>
                      <option value="name">Alphabetically</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid - Flipkart Style */}
            <div className="bg-white rounded-sm shadow-sm p-4">
              {loading ? (
                <Loader size="lg" />
              ) : filteredProducts.length === 0 ? (
                <div className="py-20 text-center">
                  <p className="text-gray-500 text-lg">No products found matching your criteria</p>
                  <button 
                    onClick={handleClearFilters}
                    className="mt-4 text-primary-600 font-semibold hover:text-primary-700"
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredProducts.map((product) => (
                    <Link 
                      key={product.id} 
                      to={`/product/${product.id}`} 
                      className="border border-gray-200 rounded-sm hover:shadow-lg transition-all group p-4"
                    >
                      <div className="relative mb-3">
                        <img 
                          src={product.image} 
                          alt={product.title} 
                          className="w-full h-48 object-contain group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute top-0 left-0 bg-yellow-400 text-gray-900 px-2 py-1 text-xs font-bold rounded-br-lg">
                          {Math.floor(Math.random() * 30 + 10)}% OFF
                        </div>
                      </div>
                      <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2 min-h-[40px]">
                        {product.title}
                      </h3>
                      <div className="flex items-baseline gap-2 mb-2 flex-wrap">
                        <span className="text-xl font-medium text-gray-900">
                          {formatCurrency(product.price)}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          {formatCurrency(product.price * 1.25)}
                        </span>
                        <span className="text-sm text-green-600 font-semibold">
                          20% off
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        <div className="bg-green-600 text-white px-1.5 py-0.5 rounded-sm text-xs font-semibold flex items-center gap-1">
                          <span>{product.rating?.rate || 4.2}</span>
                          <span>★</span>
                        </div>
                        <span className="text-xs text-gray-500">
                          ({product.rating?.count || Math.floor(Math.random() * 5000 + 1000)})
                        </span>
                      </div>
                      <div>
                        <span className="text-xs text-green-600 font-semibold">Free delivery</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Shop
