import React from 'react'
import { Link } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa'
import Button from '../common/Button'

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <FaShoppingCart size={64} className="text-gray-400" />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Your cart is empty
      </h2>
      
      <p className="text-gray-600 text-center mb-8 max-w-md">
        Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
      </p>
      
      <Link to="/shop">
        <Button variant="primary" size="lg">
          Start Shopping
        </Button>
      </Link>

      {/* Suggestions */}
      <div className="mt-12 text-center">
        <p className="text-sm text-gray-500 mb-4">You might also like:</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            to="/shop?category=electronics"
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors text-sm"
          >
            Electronics
          </Link>
          <Link
            to="/shop?category=jewelery"
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors text-sm"
          >
            Jewelery
          </Link>
          <Link
            to="/shop?category=men's clothing"
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors text-sm"
          >
            Men's Clothing
          </Link>
          <Link
            to="/shop?category=women's clothing"
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors text-sm"
          >
            Women's Clothing
          </Link>
        </div>
      </div>
    </div>
  )
}

export default EmptyCart
