import { useEffect, useRef, useState } from 'react';
import {Select, Input, Button} from '../index.js'
import { useDispatch, useSelector } from 'react-redux';
import {addGenreQuery, addSearchQuery, addSortQuery, addYearQuery } from '../../store/movieSlice.js';

function Header() {
  const inputRef = useRef(null);
  const sortInputRef = useRef(null)
  const [input, setInput] = useState('')
  const [sortQuery,setSortQuery ] = useState('No Sort');
  const [yearQuery, setYearQuery ] = useState('All Years');
  const [genreQuery,setGenreQuery ] = useState('All Genres');
  const dispatch = useDispatch()

  const[genre, setGenre] = useState(["All Genres", "Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary", "Drama", "Family", "Fantasy", "History", "Horror", "Music", "Mystery", "Romance", "Science Fiction", "TV Movie", "Thriller", "War", "Western"]);

  const [year, setYear] = useState(["All Years",2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2001, 2000, 1999, 1998, 1997, 1996, 1995, 1994, 1993, 1992, 1991, 1990]);

  const[sort, setSort] = useState(["No Sort", "Highest Rated", "Most Popular","Latest Release", "A-Z"])

  useEffect(()=>{
    console.log(inputRef.current.value)
    dispatch(addSearchQuery(inputRef.current.value))
  }, [input])

  useEffect(()=>{
    dispatch(addSortQuery(sortQuery))
    dispatch(addYearQuery(yearQuery))
    dispatch(addGenreQuery(genreQuery))
  }, [sortQuery, yearQuery, genreQuery])

  return (
        <div className='px-8'>
          <h1 className='text-red-600 text-5xl font-bold my-5 text-center'>MovieFlix</h1>
        <div className='flex flex-wrap gap-3'>
         <Input
          type="text"
          placeholder="Search for movies..."
          ref={inputRef}
          value={input}
          onChange={(e)=>setInput(e.target.value)}
          className='border-gray-500 w-full rounded-3xl px-4 py-2 ring ring-gray-500 text-gray-300 focus:ring focus:ring-red-600 mb-2 max-w-md'
         />
        <div className='flex flex-wrap gap-4 mb-4'>
          <Select 
          options={genre}
          onChange={(e)=>setGenreQuery(e.target.value)}
          value={genreQuery}
           />
          <Select
           options={year}
           onChange={(e)=>setYearQuery(e.target.value)}
           value={yearQuery}
            />
          <Select 
          ref={sortInputRef} 
          options={sort} 
          onChange={(e)=>setSortQuery(e.target.value)}
          value={sortQuery}
          />
        </div>
        <Button
         children="Clear"
         type='button'
         bgColor='bg-red-500'
         textColor='text-white'
        />
        </div>
        
        </div>
        
        
  )
}

export default Header
