import React from 'react'
import { Link } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa'

const Sidebar = ({ isOpen, onClose, categories = [] }) => {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:shadow-none
        `}
      >
        <div className="flex items-center justify-between p-4 border-b lg:hidden">
          <h2 className="text-lg font-bold">Menu</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes size={20} />
          </button>
        </div>

        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
            Categories
          </h3>
          <nav className="space-y-1">
            <Link
              to="/shop"
              onClick={onClose}
              className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
            >
              All Products
            </Link>
            {categories.map((category) => (
              <Link
                key={category}
                to={`/shop?category=${category}`}
                onClick={onClose}
                className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors capitalize"
              >
                {category}
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t">
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
            Price Range
          </h3>
          <div className="space-y-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="rounded text-primary-600" />
              <span className="text-sm text-gray-700">Under $50</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="rounded text-primary-600" />
              <span className="text-sm text-gray-700">$50 - $100</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="rounded text-primary-600" />
              <span className="text-sm text-gray-700">$100 - $200</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="rounded text-primary-600" />
              <span className="text-sm text-gray-700">Over $200</span>
            </label>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
