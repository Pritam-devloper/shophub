import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import useCart from '../hooks/useCart'
import useAuth from '../hooks/useAuth'
import Button from '../components/common/Button'
import { formatCurrency } from '../utils/formatCurrency'

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    defaultValues: {
      email: user?.email || '',
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      phone: '',
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: ''
    }
  })

  const onSubmit = async (data) => {
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      toast.success('Order placed successfully! 🎉')
      clearCart()
      setIsProcessing(false)
      navigate('/orders', { state: { orderPlaced: true } })
    }, 2000)
  }

  const subtotal = getCartTotal()
  const shipping = subtotal > 100 ? 0 : 10
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  if (cartItems.length === 0) {
    navigate('/cart')
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Contact Information */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: 'Please enter a valid email'
                        }
                      })}
                      className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Shipping Information */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      {...register('firstName', { required: 'First name is required' })}
                      className={`input-field ${errors.firstName ? 'border-red-500' : ''}`}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      {...register('lastName', { required: 'Last name is required' })}
                      className={`input-field ${errors.lastName ? 'border-red-500' : ''}`}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address *
                    </label>
                    <input
                      type="text"
                      {...register('address', { required: 'Address is required' })}
                      className={`input-field ${errors.address ? 'border-red-500' : ''}`}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      {...register('city', { required: 'City is required' })}
                      className={`input-field ${errors.city ? 'border-red-500' : ''}`}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      {...register('state', { required: 'State is required' })}
                      className={`input-field ${errors.state ? 'border-red-500' : ''}`}
                    />
                    {errors.state && (
                      <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Zip Code *
                    </label>
                    <input
                      type="text"
                      {...register('zipCode', {
                        required: 'Zip code is required',
                        pattern: {
                          value: /^\d{6}$/,
                          message: 'Please enter a valid 6-digit pin code'
                        }
                      })}
                      className={`input-field ${errors.zipCode ? 'border-red-500' : ''}`}
                      placeholder="123456"
                    />
                    {errors.zipCode && (
                      <p className="text-red-500 text-sm mt-1">{errors.zipCode.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Payment Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      {...register('cardNumber', {
                        required: 'Card number is required',
                        pattern: {
                          value: /^\d{16}$/,
                          message: 'Please enter a valid 16-digit card number'
                        }
                      })}
                      placeholder="1234 5678 9012 3456"
                      maxLength="16"
                      className={`input-field ${errors.cardNumber ? 'border-red-500' : ''}`}
                    />
                    {errors.cardNumber && (
                      <p className="text-red-500 text-sm mt-1">{errors.cardNumber.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cardholder Name *
                    </label>
                    <input
                      type="text"
                      {...register('cardName', { required: 'Cardholder name is required' })}
                      className={`input-field ${errors.cardName ? 'border-red-500' : ''}`}
                    />
                    {errors.cardName && (
                      <p className="text-red-500 text-sm mt-1">{errors.cardName.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        {...register('expiryDate', {
                          required: 'Expiry date is required',
                          pattern: {
                            value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                            message: 'Format: MM/YY'
                          }
                        })}
                        placeholder="MM/YY"
                        className={`input-field ${errors.expiryDate ? 'border-red-500' : ''}`}
                      />
                      {errors.expiryDate && (
                        <p className="text-red-500 text-sm mt-1">{errors.expiryDate.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CVV *
                      </label>
                      <input
                        type="text"
                        {...register('cvv', {
                          required: 'CVV is required',
                          pattern: {
                            value: /^\d{3,4}$/,
                            message: 'Enter 3 or 4 digits'
                          }
                        })}
                        maxLength="4"
                        className={`input-field ${errors.cvv ? 'border-red-500' : ''}`}
                      />
                      {errors.cvv && (
                        <p className="text-red-500 text-sm mt-1">{errors.cvv.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : `Place Order - ${formatCurrency(total)}`}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-contain rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.title}
                      </p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      <p className="text-sm font-semibold text-primary-600">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : formatCurrency(shipping)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t">
                  <span>Total</span>
                  <span className="text-primary-600">{formatCurrency(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
