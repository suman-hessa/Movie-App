import React from 'react'

export default function DiscoverCard({
    imgUrl,
    title,
    year,
    genre=[],
    description,
    rating
}) {
  return (
    <div className='border w-full flex flex-wrap relative text-white'>
            <div className='w-full md:w-[288px] h-168.25 border flex flex-col gap-4 grow'>
              <div className='h-1/2 bg-center bg-cover bg-no-repeat'
               style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500${imgUrl})`}}>
              </div>
              <div className='flex flex-col gap-4'>
                <h1>{title}</h1>
                <h1>{year}</h1>
                <h1>{genre}</h1>
                <h1>{description}</h1>
                <div className='bg-red-500 h-7 w-15 px-2 py-1 rounded-full absolute right-5 top-1/3 text-white flex items-center justify-center font-semibold text-sm'>
                {rating}
                </div>
              </div>
              
            </div>
        </div>
  )
}
