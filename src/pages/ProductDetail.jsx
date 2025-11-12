import React, { useState, useContext, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FaShoppingCart, FaHeart, FaRegHeart, FaMinus, FaPlus, FaArrowLeft } from 'react-icons/fa'
import { ProductContext } from '../context/ProductContext'
import useCart from '../hooks/useCart'
import RatingStars from '../components/common/RatingStars'
import Button from '../components/common/Button'
import Loader from '../components/common/Loader'
import { formatCurrency } from '../utils/formatCurrency'
import { scrollToTop } from '../utils/helpers'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { products, isInWishlist, addToWishlist, removeFromWishlist } = useContext(ProductContext)
  const { addToCart, isInCart } = useCart()
  
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  const product = products.find((p) => p.id === parseInt(id))

  useEffect(() => {
    scrollToTop()
  }, [id])

  if (!product) {
    return (
      <div className="container-custom py-16">
        <Loader size="lg" text="Loading product..." />
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
  }

  const handleToggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <FaArrowLeft /> Back
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div>
              <div className="bg-gray-100 rounded-lg p-8 mb-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-96 object-contain"
                />
              </div>
              {/* Thumbnail would go here if we had multiple images */}
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-4">
                <span className="inline-block px-4 py-1 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full capitalize">
                  {product.category}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>

              <div className="mb-6">
                <RatingStars rating={product.rating?.rate || 0} size="lg" />
                <p className="text-sm text-gray-600 mt-2">
                  Based on {product.rating?.count || 0} reviews
                </p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold text-primary-600">
                  {formatCurrency(product.price)}
                </span>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Quantity</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-2">
                    <button
                      onClick={decrementQuantity}
                      className="p-2 hover:bg-gray-200 rounded transition-colors"
                      disabled={quantity <= 1}
                    >
                      <FaMinus size={14} />
                    </button>
                    <span className="w-16 text-center font-semibold text-lg">
                      {quantity}
                    </span>
                    <button
                      onClick={incrementQuantity}
                      className="p-2 hover:bg-gray-200 rounded transition-colors"
                    >
                      <FaPlus size={14} />
                    </button>
                  </div>
                  <span className="text-gray-600">
                    {isInCart(product.id) && '(Already in cart)'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mb-6">
                <Button
                  onClick={handleAddToCart}
                  variant="primary"
                  className="flex-1 flex items-center justify-center gap-2"
                >
                  <FaShoppingCart />
                  {isInCart(product.id) ? 'Update Cart' : 'Add to Cart'}
                </Button>

                <button
                  onClick={handleToggleWishlist}
                  className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {isInWishlist(product.id) ? (
                    <FaHeart className="text-red-500" size={20} />
                  ) : (
                    <FaRegHeart size={20} />
                  )}
                </button>
              </div>

              {/* Product Features */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Product Features</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-gray-700">
                    <span className="text-green-500">✓</span>
                    Free shipping on orders over $100
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <span className="text-green-500">✓</span>
                    30-day money-back guarantee
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <span className="text-green-500">✓</span>
                    Secure payment processing
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <span className="text-green-500">✓</span>
                    24/7 customer support
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
