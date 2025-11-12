export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export const getLocalStorage = (key) => {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  } catch (error) {
    console.error('Error reading from localStorage:', error)
    return null
  }
}

export const setLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error('Error writing to localStorage:', error)
  }
}

export const removeLocalStorage = (key) => {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error('Error removing from localStorage:', error)
  }
}

export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
