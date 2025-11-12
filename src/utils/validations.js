export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/
  return re.test(password)
}

export const validatePhone = (phone) => {
  const re = /^[\d\s\-\+\(\)]{10,}$/
  return re.test(phone)
}

export const validateRequired = (value) => {
  return value !== null && value !== undefined && value.toString().trim() !== ''
}

export const validateCardNumber = (cardNumber) => {
  const cleaned = cardNumber.replace(/\s/g, '')
  const re = /^\d{16}$/
  return re.test(cleaned)
}

export const validateCVV = (cvv) => {
  const re = /^\d{3,4}$/
  return re.test(cvv)
}

export const validateZipCode = (zip) => {
  const re = /^\d{5}(-\d{4})?$/
  return re.test(zip)
}
