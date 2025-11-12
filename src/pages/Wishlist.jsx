import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FaHeart, FaTrash, FaShoppingCart } from 'react-icons/fa'
import { ProductContext } from '../context/ProductContext'
import useCart from '../hooks/useCart'
import RatingStars from '../components/common/RatingStars'
import Button from '../components/common/Button'
import { formatCurrency } from '../utils/formatCurrency'
import { truncateText } from '../utils/helpers'

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useContext(ProductContext)
  const { addToCart, isInCart } = useCart()

  const handleAddToCart = (product) => {
    addToCart(product)
  }

  const handleRemove = (productId) => {
    removeFromWishlist(productId)
  }

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container-custom py-8">
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <FaHeart size={64} className="text-gray-400" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Your wishlist is empty
            </h2>
            
            <p className="text-gray-600 text-center mb-8 max-w-md">
              Save your favorite items here so you can easily find them later!
            </p>
            
            <Link to="/shop">
              <Button variant="primary" size="lg">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            My Wishlist
          </h1>
          <p className="text-gray-600">
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div key={product.id} className="card">
              <Link to={`/product/${product.id}`} className="block">
                <div className="relative overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-64 object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Remove Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      handleRemove(product.id)
                    }}
                    className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                    title="Remove from wishlist"
                  >
                    <FaTrash className="text-red-500" size={16} />
                  </button>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary-600 text-white text-xs font-semibold rounded-full capitalize">
                      {product.category}
                    </span>
                  </div>
                </div>
              </Link>

              <div className="p-4">
                <Link to={`/product/${product.id}`}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-primary-600 transition-colors">
                    {truncateText(product.title, 60)}
                  </h3>
                </Link>
                
                <div className="mb-2">
                  <RatingStars rating={product.rating?.rate || 0} size="sm" />
                </div>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-2xl font-bold text-primary-600">
                    {formatCurrency(product.price)}
                  </span>
                  
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      handleAddToCart(product)
                    }}
                    className={`
                      px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2
                      ${isInCart(product.id)
                        ? 'bg-green-500 text-white'
                        : 'bg-primary-600 text-white hover:bg-primary-700'
                      }
                    `}
                  >
                    <FaShoppingCart size={16} />
                    {isInCart(product.id) ? 'In Cart' : 'Add'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-center gap-4">
          <Link to="/shop">
            <Button variant="outline">
              Continue Shopping
            </Button>
          </Link>
          <Link to="/cart">
            <Button variant="primary">
              View Cart
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Wishlist
