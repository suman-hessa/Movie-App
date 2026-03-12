import React from 'react'


function Corousel({children}) {

  const scroll = (e)=>{
    const corousel = e.currentTarget.firstChild;
    let scrollValue = 320;
    if(e.target.name === 'right'){
      corousel.scrollBy({
        left: scrollValue,
        behavior: 'smooth'
      })
    }else if(e.target.name === 'left'){
      corousel.scrollBy({
        left: -scrollValue,
        behavior: 'smooth'
      })
    }
  }


  return (
    <div className='relative' onClick={scroll}>
      <div className='flex overflow-hidden border border-white px-4 py-2 gap-4'>
      {children}
      </div>
    <button className='absolute rounded-full size-16 hover:bg-red-500 cursor-pointer -right-2 top-[50%] bg-black text-white duration-200' name='right'>{">"}</button>
    <button className='absolute rounded-full size-16 hover:bg-red-500 cursor-pointer -left-2 top-[50%] text-white bg-black' name='left' >{"<"}</button>
    </div>
    
  )
}

export default Corousel
