import React from 'react'
import { useNavigate } from 'react-router-dom'
import { formatCurrency } from '../../utils/formatCurrency'
import Button from '../common/Button'

const CartSummary = ({ items = [], onCheckout }) => {
  const navigate = useNavigate()

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : 10
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + shipping + tax

  const handleCheckout = () => {
    if (onCheckout) {
      onCheckout()
    } else {
      navigate('/checkout')
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal ({items.length} items)</span>
          <span className="font-semibold">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span className="font-semibold">
            {shipping === 0 ? (
              <span className="text-green-600">FREE</span>
            ) : (
              formatCurrency(shipping)
            )}
          </span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Tax</span>
          <span className="font-semibold">{formatCurrency(tax)}</span>
        </div>
        
        {subtotal < 100 && (
          <div className="text-sm text-gray-500 bg-blue-50 p-3 rounded">
            Add {formatCurrency(100 - subtotal)} more for FREE shipping!
          </div>
        )}
      </div>

      <div className="border-t pt-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-gray-900">Total</span>
          <span className="text-2xl font-bold text-primary-600">
            {formatCurrency(total)}
          </span>
        </div>
      </div>

      <Button
        onClick={handleCheckout}
        variant="primary"
        className="w-full"
        disabled={items.length === 0}
      >
        Proceed to Checkout
      </Button>

      <div className="mt-4 text-center">
        <button
          onClick={() => navigate('/shop')}
          className="text-primary-600 hover:text-primary-700 font-medium text-sm"
        >
          Continue Shopping
        </button>
      </div>

      {/* Trust Badges */}
      <div className="mt-6 pt-6 border-t space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>✓</span>
          <span>Secure checkout</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>✓</span>
          <span>Free returns within 30 days</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>✓</span>
          <span>Customer support 24/7</span>
        </div>
      </div>
    </div>
  )
}

export default CartSummary
