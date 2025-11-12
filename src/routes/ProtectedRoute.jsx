import React from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Loader from '../components/common/Loader'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container-custom py-16">
          <Loader size="lg" text="Loading..." />
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/profile" replace />
  }

  return children
}

export default ProtectedRoute
