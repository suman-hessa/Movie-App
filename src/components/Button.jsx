import React from 'react'

export default function Button({
    children,
    type="Button",
    bgColor,
    textColor,
    className='',
    ...props
}) {
  return (
    <button
     type={type}
     className={`${bgColor} ${textColor} ${className} px-4 bg-red-400 hover:bg-red-500 text-white duration-200 rounded-full cursor-pointer`}
     {...props}>
        {children}
    </button>
  )
}
