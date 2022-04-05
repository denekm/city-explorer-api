'use strict';

require('dotenv').config();

const axios = require('axios');


class Movie {
  constructor(movies) {
    this.title = movies.original_title;
    this.overview = movies.overview;
    this.img_url = movies.backdrop_path;
    this.rating = movies.vote_average;
    this.releaseDate = movies.release_date;

  }
}

module.exports= async(request, response) => {
  const movieQuery = request.query.query;
  const url = `https://api.themoviedb.org/3/search/movie/?api_key=${process.env.MOVIE_API_KEY}&langeuage=en-US&page=1&query=${movieQuery}`;
 
  try {
    let movies = await axios.get(url);
    console.log(movies.data.results);
    const moviesArray = movies.data.results.map(movie => new Movie(movie));
    response.send(moviesArray);
  } catch (error) {
    response.send(error.message);
  }
};

