import React from 'react'
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { formatCurrency } from '../../utils/formatCurrency'
import { truncateText } from '../../utils/helpers'

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const handleIncrement = () => {
    onUpdateQuantity(item.id, item.quantity + 1)
  }

  const handleDecrement = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1)
    }
  }

  return (
    <div className="flex gap-4 p-4 bg-white rounded-lg shadow-md">
      {/* Product Image */}
      <Link to={`/product/${item.id}`} className="flex-shrink-0">
        <img
          src={item.image}
          alt={item.title}
          className="w-24 h-24 object-contain rounded"
        />
      </Link>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <Link to={`/product/${item.id}`}>
          <h3 className="text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors mb-1">
            {truncateText(item.title, 80)}
          </h3>
        </Link>
        <p className="text-sm text-gray-500 capitalize mb-2">{item.category}</p>
        <p className="text-xl font-bold text-primary-600">
          {formatCurrency(item.price)}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex flex-col items-end justify-between">
        <button
          onClick={() => onRemove(item.id)}
          className="text-red-500 hover:text-red-700 transition-colors p-2"
          title="Remove from cart"
        >
          <FaTrash size={18} />
        </button>

        <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-1">
          <button
            onClick={handleDecrement}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            disabled={item.quantity <= 1}
          >
            <FaMinus size={12} />
          </button>
          <span className="w-12 text-center font-semibold">
            {item.quantity}
          </span>
          <button
            onClick={handleIncrement}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
          >
            <FaPlus size={12} />
          </button>
        </div>

        <p className="text-lg font-semibold text-gray-900">
          {formatCurrency(item.price * item.quantity)}
        </p>
      </div>
    </div>
  )
}

export default CartItem
