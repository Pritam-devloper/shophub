import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { HelmetProvider } from 'react-helmet-async'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { ProductProvider } from './context/ProductContext'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <HelmetProvider>
      <Router>
        <AuthProvider>
          <ProductProvider>
            <CartProvider>
              <AppRoutes />
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 3000,
                  style: {
                    background: '#363636',
                    color: '#fff',
                  },
                  success: {
                    duration: 3000,
                    iconTheme: {
                      primary: '#10b981',
                      secondary: '#fff',
                    },
                  },
                  error: {
                    duration: 4000,
                    iconTheme: {
                      primary: '#ef4444',
                      secondary: '#fff',
                    },
                  },
                }}
              />
            </CartProvider>
          </ProductProvider>
        </AuthProvider>
      </Router>
    </HelmetProvider>
  )
}

export default App
