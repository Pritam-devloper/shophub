import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaShoppingCart, FaHeart, FaRegHeart } from 'react-icons/fa'
import { ProductContext } from '../../context/ProductContext'
import useCart from '../../hooks/useCart'
import RatingStars from '../common/RatingStars'
import { formatCurrency } from '../../utils/formatCurrency'
import { truncateText } from '../../utils/helpers'

const ProductCard = ({ product }) => {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useContext(ProductContext)
  const { addToCart, isInCart } = useCart()

  const handleAddToCart = (e) => {
    e.preventDefault()
    addToCart(product)
  }

  const handleToggleWishlist = (e) => {
    e.preventDefault()
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="h-full"
    >
      <Link to={`/product/${product.id}`} className="card group relative overflow-hidden h-full flex flex-col">
        <div className="relative overflow-hidden bg-gray-50">
          <motion.img
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
            src={product.image}
            alt={product.title}
            className="w-full h-64 object-contain p-6"
          />
          
          {/* Wishlist Button */}
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleToggleWishlist}
            className="absolute top-4 right-4 p-2.5 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 z-20 border border-gray-100"
          >
            {isInWishlist(product.id) ? (
              <FaHeart className="text-red-500" size={18} />
            ) : (
              <FaRegHeart className="text-gray-600 hover:text-red-400" size={18} />
            )}
          </motion.button>

          {/* Category Badge */}
          <div className="absolute top-4 left-4 z-20">
            <span className="px-4 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg capitalize shadow-md">
              {product.category}
            </span>
          </div>
        </div>

        <div className="p-5 flex-1 flex flex-col">
          <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
            {truncateText(product.title, 60)}
          </h3>
          
          <div className="mb-4">
            <RatingStars rating={product.rating?.rate || 0} size="sm" />
          </div>

          <div className="flex items-center justify-between mt-auto">
            <div>
              <span className="text-2xl font-bold text-gray-900">
                {formatCurrency(product.price)}
              </span>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className={`
                px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg
                ${isInCart(product.id)
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
                }
              `}
            >
              <FaShoppingCart size={16} />
              {isInCart(product.id) ? 'Added' : 'Add'}
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default ProductCard
