import React, { useEffect, useState, useId } from 'react'

function Select({
  options=[],
  label,
  className='',
  ref,
  ...props
}) {

  const id = useId()

  return (
        <>
          {label && <label htmlFor={id}></label>}
          <select 
          className={`bg-black text-white rounded-3xl px-2 py-1.5 outline-none ring ring-gray-500 focus:ring focus:ring-red-500  cursor-pointer text-sm`}  
          {...props}
          ref={ref}
          id={id}>
            {options?.map((option)=>(
              <option className='overflow-scroll' key={option} 
              value={option}>
                {option}
              </option>))}
          </select>
        </>   
  )
}

export default Select
