import React, { useCallback, useEffect, useState } from 'react'
import {Corousel, TrendingCard, DiscoverCard} from '../index.js'
import tmdbMovieServices from '../../TMDBapi/movies.js'
import { useSelector } from 'react-redux';
import useDebounce from '../../hooks/useDebouce.js'

function Hero() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loader, setLoader] = useState(true);
  const [discoverMovies, setDiscoverMovies] = useState([])
  const [searchedMovies, setSearchedMovies] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([])
  const input = useSelector((state)=>state.movie.inputText)
  const sortBy = useSelector((state)=>state.movie.sortBy);
  const year = useSelector((state)=> state.movie.yearQuery);
  const genre = useSelector((state)=>state.movie.genreQuery);
  const debounceInput = useDebounce(input, 2000);

  const sortParms = {
    "No Sort": "No Sort",
    "Highest Rated": "vote_average.desc",
    "Most Popular": "popularity.desc",
    "Latest Release": "primary_release_year.desc",
    "A-Z": 'original_title.desc'
  }

  const genreParams = {
    "All Genres": "All Genres",
    "Action": 28,
    "Adventure": 12,
    "Animation": 16,
    "Comedy": 35,
    "Crime": 80,
    "Documentry": 99,
    "Drama": 18,
    "Family": 10751,
    "Fantasy": 14,
    "History": 36,
    "Horror": 27,
    "Music": 10402,
    "Mystery": 9648,
    "Romance": 10749,
    "Science Fiction": 878,
    "TV Movie": 10770,
    "Thriller": 53,
    "War": 10752,
    "Western": 37
  }

  // input:text movie search function 
  const searchMoviesByName = useCallback((searchQuery)=>{
    if(searchQuery.trim.length === 0) setSearchedMovies([]) 
    setLoader(true);
  
    tmdbMovieServices.getMoviesByName(searchQuery).then(movieData=>{
        setSearchedMovies(movieData);
      })
      .catch(err=> console.log(err.message))
      .finally(()=> setLoader(false))
    }, [])

  // input:select movie filter function
  const getFilteredMovies = useCallback(({
    sortBy, genre, year
  })=>{
    setLoader(true)
    tmdbMovieServices.getFilteredMovies({sortBy, genre, year}).then(movieData=>setFilteredMovies(movieData))
    .catch(err=>console.log(err.message))
    .finally(()=>setLoader(false))
  }, [])

  //fetches list of trending movies
  useEffect(()=>{
    tmdbMovieServices.getTrendingMovies().then(movieData=>setTrendingMovies(movieData))
    setLoader(false);
  }, [])
  //fetches list of popular movies
  useEffect(()=>{
    tmdbMovieServices.getPopularMovies().then(movieData=>setDiscoverMovies(movieData))
  }, [])
  //fetches list of searched movies with input:text
  useEffect(()=>{
    searchMoviesByName(debounceInput);
  }, [debounceInput, searchMoviesByName])

  useEffect(()=>{
    getFilteredMovies({sortBy: sortParms[sortBy], genre: genreParams[genre], year})
  }, [sortBy, year, genre])

  if(input === '' && sortBy == 'No Sort' && year == 'All Years' && genre == 'All Genres'){
    return (
    <div className='px-5 py-5 relative'>
      <h1 className='text-white text-3xl font-semibold mb-5'>🔥 Trending Now</h1>
      { loader ? <div>Loading...</div>:
        <Corousel>
        {
          trendingMovies.map((movie)=>(
              <div key={movie.id} className='w-full'>
                <TrendingCard
                index={trendingMovies.indexOf(movie) + 1}
                title={movie.title}
                imgUrl={movie.poster_path}
                year={movie.release_date}
                rating={movie.vote_average}
                genre={movie.genre_ids}
              />
              </div>    
          ))
        }
      </Corousel>}
      <div className='mt-10 mb-4'>
        <h1 className='text-white text-3xl font-semibold mb-4'>🎬 Discover Movies</h1>
        <div className='border w-full grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 relative gap-4'>
            {
              discoverMovies.map((movie)=>(
                <div key={movie.id}>
                  <DiscoverCard
                    imgUrl={movie.backdrop_path}
                    title={movie.title}
                    year={movie.release_date}
                    genre={movie.genre_ids}
                    description={movie.overview}
                    rating={movie.vote_average}
                  />
                </div>
              ))
            }
            </div>
      </div>
    </div>
  )
  }else{
    if(input.trim().length > 0 && sortBy == 'No Sort' && year == 'All Years' && genre == 'All Genres'){
      return (
      <div className=' px-5 py-5 h-100 relative'>
        {loader? <div>Loading...</div>:
        <>
          <h1 className='text-white text-3xl font-semibold mb-5'>🔍 {`Search Results for "${input}"`}</h1>
        <div className='border w-full grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 relative gap-4'>
            {
              searchedMovies.map((movie)=>(
                <div key={movie.id}>
                  <DiscoverCard
                    imgUrl={movie.poster_path}
                    title={movie.title}
                    year={movie.release_date}
                    genre={movie.genre_ids}
                    description={movie.overview}
                    rating={movie.vote_average}
                  />
                </div>
              ))
            }
            </div>
        </>}
      </div>
    )
    }else{
      return (
      <div className=' px-5 py-5 h-100 relative'>
        {loader? <div>Loading...</div>:
        <>
          <h1 className='text-white text-3xl font-semibold mb-5'>🎬 Filtered Movies</h1>
        <div className='border w-full grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 relative gap-4'>
            {
              filteredMovies.map((movie)=>(
                <div key={movie.id}>
                  <DiscoverCard
                    imgUrl={movie.poster_path}
                    title={movie.title}
                    year={movie.release_date}
                    genre={movie.genre_ids}
                    description={movie.overview}
                    rating={movie.vote_average}
                  />
                </div>
              ))
            }
            </div>
        </>}
      </div>
    )
    }
    
  }
  
}

export default Hero
