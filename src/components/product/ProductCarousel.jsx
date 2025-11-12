import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { formatCurrency } from '../../utils/formatCurrency'

const ProductCarousel = ({ products = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const displayProducts = products.slice(0, 6) // Show max 6 products

  useEffect(() => {
    if (!isAutoPlaying || displayProducts.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayProducts.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, displayProducts.length])

  const handlePrevious = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? displayProducts.length - 1 : prev - 1
    )
    setIsAutoPlaying(false)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % displayProducts.length)
    setIsAutoPlaying(false)
  }

  if (displayProducts.length === 0) return null

  const currentProduct = displayProducts[currentIndex]

  return (
    <div className="relative bg-blue-600 rounded-3xl overflow-hidden shadow-2xl">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
      <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12 relative z-10">
        {/* Product Info */}
        <div className="flex flex-col justify-center text-white">
          <span className="text-sm font-semibold uppercase tracking-wide mb-2 opacity-90">
            Featured Product
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 line-clamp-2">
            {currentProduct.title}
          </h2>
          <p className="text-lg opacity-90 mb-6 line-clamp-3">
            {currentProduct.description}
          </p>
          <div className="flex items-center gap-6 mb-8">
            <span className="text-4xl font-bold">
              {formatCurrency(currentProduct.price)}
            </span>
            {currentProduct.rating && (
              <span className="px-4 py-2 bg-white bg-opacity-20 rounded-full">
                ⭐ {currentProduct.rating.rate} / 5
              </span>
            )}
          </div>
          <Link
            to={`/product/${currentProduct.id}`}
            className="inline-block px-8 py-4 bg-white text-blue-700 font-bold rounded-lg hover:bg-gray-100 transition-colors w-fit"
          >
            Shop Now
          </Link>
        </div>

        {/* Product Image */}
        <div className="flex items-center justify-center">
          <img
            src={currentProduct.image}
            alt={currentProduct.title}
            className="max-h-80 object-contain drop-shadow-2xl"
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white bg-opacity-30 hover:bg-opacity-50 rounded-full transition-all"
      >
        <FaChevronLeft className="text-white" size={20} />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white bg-opacity-30 hover:bg-opacity-50 rounded-full transition-all"
      >
        <FaChevronRight className="text-white" size={20} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {displayProducts.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index)
              setIsAutoPlaying(false)
            }}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'w-8 bg-white'
                : 'w-2 bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductCarousel
