import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Button from '../components/common/Button'
import { validateEmail, validatePassword, validateRequired } from '../utils/validations'

const Profile = () => {
  const { user, login, register, logout, isAuthenticated } = useAuth()
  const location = useLocation()
  
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!validateRequired(formData.username)) {
      newErrors.username = 'Username is required'
    }

    if (!isLogin) {
      if (!validateEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email'
      }
      if (!validatePassword(formData.password)) {
        newErrors.password = 'Password must be at least 8 characters with uppercase, lowercase, and number'
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match'
      }
      if (!validateRequired(formData.firstName)) {
        newErrors.firstName = 'First name is required'
      }
      if (!validateRequired(formData.lastName)) {
        newErrors.lastName = 'Last name is required'
      }
    } else {
      if (!validateRequired(formData.password)) {
        newErrors.password = 'Password is required'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      if (isLogin) {
        const result = await login(formData.username, formData.password)
        if (result.success) {
          setMessage('Login successful!')
        } else {
          setMessage('Login failed. Please check your credentials.')
        }
      } else {
        const result = await register({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          name: {
            firstname: formData.firstName,
            lastname: formData.lastName
          }
        })
        if (result.success) {
          setMessage('Registration successful! You can now login.')
          setIsLogin(true)
          setFormData({
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: ''
          })
        } else {
          setMessage('Registration failed. Please try again.')
        }
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Show success message if redirected from checkout
  React.useEffect(() => {
    if (location.state?.orderPlaced) {
      setMessage('Order placed successfully!')
    }
  }, [location])

  if (isAuthenticated && user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container-custom py-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">My Profile</h1>

              <div className="space-y-6">
                <div className="border-b pb-4">
                  <h2 className="text-xl font-semibold mb-4">Account Information</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Username
                      </label>
                      <p className="text-gray-900">{user.username || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <p className="text-gray-900">{user.email || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <p className="text-gray-900">{user.name?.firstname || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <p className="text-gray-900">{user.name?.lastname || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                <div className="border-b pb-4">
                  <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <a
                      href="/orders"
                      className="block p-4 border rounded-lg hover:border-primary-600 hover:bg-primary-50 transition-colors"
                    >
                      <h3 className="font-semibold mb-1">My Orders</h3>
                      <p className="text-sm text-gray-600">View your order history</p>
                    </a>
                    <a
                      href="/wishlist"
                      className="block p-4 border rounded-lg hover:border-primary-600 hover:bg-primary-50 transition-colors"
                    >
                      <h3 className="font-semibold mb-1">Wishlist</h3>
                      <p className="text-sm text-gray-600">View saved items</p>
                    </a>
                  </div>
                </div>

                <div>
                  <Button
                    onClick={logout}
                    variant="danger"
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>

            {message && (
              <div className={`mb-4 p-3 rounded ${
                message.includes('successful') 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={`input-field ${errors.username ? 'border-red-500' : ''}`}
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                )}
              </div>

              {!isLogin && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`input-field ${errors.firstName ? 'border-red-500' : ''}`}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`input-field ${errors.lastName ? 'border-red-500' : ''}`}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                      )}
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`input-field ${errors.password ? 'border-red-500' : ''}`}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`input-field ${errors.confirmPassword ? 'border-red-500' : ''}`}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                  )}
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Please wait...' : (isLogin ? 'Login' : 'Register')}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setIsLogin(!isLogin)
                  setErrors({})
                  setMessage('')
                }}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                {isLogin
                  ? "Don't have an account? Register"
                  : 'Already have an account? Login'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
