import React from 'react'
import { Link } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'
import Button from '../components/common/Button'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary-600 mb-4">404</h1>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>
        <Link to="/">
          <Button variant="primary" size="lg" className="inline-flex items-center gap-2">
            <FaHome />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default NotFound
