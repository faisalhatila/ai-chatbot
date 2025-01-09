import React from 'react'
interface ButtonProps {
    type: 'submit' | 'button'
}
const Button = ({type}:ButtonProps) => {
  return (
    <button type={type} className='bg-blue-500 p-2 font-bold text-white rounded'>Button</button>
  )
}

export default Button