import React from 'react'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  disabled = false, 
  type = 'button',
  className = '',
  ...props 
}) => {
  const baseClasses = 'font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-elegant hover:shadow-elegant-lg',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-400 shadow-sm hover:shadow-elegant',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500 shadow-sm hover:shadow-elegant',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-elegant hover:shadow-elegant-lg',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 shadow-elegant hover:shadow-elegant-lg'
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
