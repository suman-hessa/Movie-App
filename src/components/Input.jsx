import React from 'react'

export default function Input({
    label, 
    type, 
    className = '',
    ref, 
    ...props
}) {
  return (
    <>
      {label && <label htmlFor=''>{label}</label>}
      <input 
      type={type}
      className={`${className} px-4 py-2 rounded-full text-lg outline-none border-gray-100 border text-white`}
      ref={ref}
      {...props}
      />
    </>
  )
}
