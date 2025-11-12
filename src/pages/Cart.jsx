import React from 'react'
import useCart from '../hooks/useCart'
import CartItem from '../components/cart/CartItem'
import CartSummary from '../components/cart/CartSummary'
import EmptyCart from '../components/cart/EmptyCart'
import Button from '../components/common/Button'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart()
  const navigate = useNavigate()

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container-custom py-8">
          <EmptyCart />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Shopping Cart
          </h1>
          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-700 font-medium"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
              />
            ))}
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <CartSummary items={cartItems} />
          </div>
        </div>

        {/* Continue Shopping */}
        <div className="mt-8 text-center">
          <Button
            onClick={() => navigate('/shop')}
            variant="outline"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Cart
