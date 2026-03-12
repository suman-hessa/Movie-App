import React from 'react'

function TrendingCard({
  index, title, year, genre=[],rating, imgUrl
}) {
  return (
    <div className={`h-112.5 min-w-75 rounded-xl relative  cursor-pointe`}
     style={
      {
        backgroundImage: `url(https://image.tmdb.org/t/p/w500${imgUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
       }}>
        <div className='absolute bg-black opacity-85 h-20 w-14 rounded-xl p-2 top-5 left-5 flex justify-center items-center ring-2 ring-red-500 text-red-500 text-3xl font-bold'>
            <h1>{index}</h1>
        </div>
        <div className='min-h-28 min-w-10 flex flex-col gap-2.5 absolute bottom-5 left-5 text-shadow-sm'>
            <h1 className='text-2xl font-bold text-white'>{title}</h1>
            <h3 className='text-gray-300'>{year}</h3>
            <h3 className='text-gray-300'>{genre}</h3>
        </div>
        <div className='bg-red-500 h-7 w-15 px-2 py-1 rounded-full absolute right-5 bottom-16 text-white flex items-center justify-center font-semibold text-sm'>
          {rating}
        </div>
    </div>
  )
}

export default TrendingCard
