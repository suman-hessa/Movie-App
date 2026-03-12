import {conf} from "../conf/conf.js";

class TmdbService {
    apikey;

    constructor(apikey){
        this.apikey = apikey;
    }

    async getTrendingMovies(){
        const url = 'https://api.themoviedb.org/3/trending/movie/week?language=en-US';
        const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${this.apikey}`
        }
        };
        try {
            const trendingMovies = await fetch(url, options);
            if(trendingMovies){
                const trendingMoviesData = await trendingMovies.json()
                if(trendingMoviesData) return trendingMoviesData.results
            }
        } catch (error) {
            console.log(`TmdbApiServices :: getTrendingMovies :: error`, error)
        }
    }

    async getPopularMovies(){
        const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
        const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${this.apikey}`
        }
    }
        try {
            const movie = await fetch(url, options);
            if(movie){
                const movieData = await movie.json()
                if(movieData) return movieData.results
            }
        } catch (error) {
            console.log('TmdbApiServices :: searchMovieByName :: error', error)
        }
    }

    async getFilteredMovies({sortBy, genre, year}){
        const url = new URL ('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&');
        if(sortBy!= 'No Sort'){
            url.searchParams.set('sort_by', sortBy)
        }
        if(genre!= 'All Genres'){
            url.searchParams.set('with_genres', genre)
        }
        if(year!= 'All Years'){
            url.searchParams.set('primary_release_year', year)
        }
        const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${this.apikey}`
        }
        };
        try {
            const filteredMovies = await fetch(url, options);
            if(filteredMovies){
                const filteredMoviesData = await filteredMovies.json()
                if(filteredMoviesData) return filteredMoviesData.results
            }
        } catch (error) {
            console.log('TmdbApiServices :: getFilteredMovies :: error', error)
        }
    }

    async getMoviesByName(movie_name){
        const url = new URL('https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1');
        url.searchParams.set("query",movie_name)
        
        const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${this.apikey}`
        }
        };
        try {
            const movies = await fetch(url.href, options);
            if(movies){
                const movieData = await movies.json();
                if(movieData){
                    return movieData.results;
                }
            }
        } catch (error) {
            console.log("TmdbApiServices :: getMovieByName :: error", error)
        }
    }

}

const tmdbMovieServices = new TmdbService(conf.tmdbApiKey);

export default tmdbMovieServices;
