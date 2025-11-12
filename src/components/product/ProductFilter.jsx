import React, { useState } from 'react'
import { FaFilter, FaTimes } from 'react-icons/fa'

const ProductFilter = ({ 
  categories = [], 
  selectedCategory, 
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  sortBy,
  onSortChange
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' }
  ]

  const priceRanges = [
    { value: 'all', label: 'All Prices', min: 0, max: Infinity },
    { value: '0-50', label: 'Under $50', min: 0, max: 50 },
    { value: '50-100', label: '$50 - $100', min: 50, max: 100 },
    { value: '100-200', label: '$100 - $200', min: 100, max: 200 },
    { value: '200+', label: 'Over $200', min: 200, max: Infinity }
  ]

  return (
    <div className="mb-6">
      {/* Mobile Filter Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden w-full flex items-center justify-between px-4 py-3 bg-white rounded-lg shadow-md mb-4"
      >
        <span className="font-medium flex items-center gap-2">
          <FaFilter /> Filters & Sort
        </span>
        {isOpen ? <FaTimes /> : <span className="text-primary-600">Show</span>}
      </button>

      {/* Filter Container */}
      <div className={`
        bg-white rounded-lg shadow-md p-4
        ${isOpen ? 'block' : 'hidden lg:block'}
      `}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category} className="capitalize">
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Price Range
            </label>
            <select
              value={priceRange}
              onChange={(e) => onPriceRangeChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {priceRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductFilter
