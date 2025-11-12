import React from 'react'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

const RatingStars = ({ rating = 0, maxRating = 5, size = 'md', showNumber = true }) => {
  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl'
  }

  const renderStars = () => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0)

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />)
    }

    // Half star
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />)
    }

    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400" />)
    }

    return stars
  }

  return (
    <div className="flex items-center gap-1">
      <div className={`flex items-center gap-0.5 ${sizes[size]}`}>
        {renderStars()}
      </div>
      {showNumber && (
        <span className="ml-1 text-sm text-gray-600">
          ({rating.toFixed(1)})
        </span>
      )}
    </div>
  )
}

export default RatingStars
