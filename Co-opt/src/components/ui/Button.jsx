import React from 'react'

export const Button = ({ onClick, className, children }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 font-semibold rounded-lg transition duration-300 ${className}`}
    >
      {children}
    </button>
  )
}

export default Button