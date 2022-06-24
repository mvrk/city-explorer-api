'use strict';

const axios = require('axios');
require('dotenv').config();

async function getMovies(request, response) {
  let city = request.query.searchQuery;

  try {
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`;
    let dataToGroom = await axios.get(url);
    let dataToSend = dataToGroom.data.results.map(movieData => new Movie(movieData));
    response.status(200).send(dataToSend);

  } catch (error) {
    console.log(error.message);
  }
};
class Movie {
  constructor(movieObj) {
    this.title = movieObj.title;
    this.overview = movieObj.overview;
    this.average_votes = movieObj.vote_average;
    this.image_url = 'https://image.tmdb.org/t/p/w500' + movieObj.poster_path;
    this.popularity = movieObj.popularity;
    this.released_on = movieObj.release_date;
  }
}

module.exports = getMovies;

// function getMovies(req, res, next) {

//   let city = request.query.searchQuery;
//   let url = `https://api.themoviedb.org/3/search/movie`;

//   let params = {
//     api_key: process.env.MOVIE_API_KEY,
//     query: {city},
//   }

//   axios.get(url, { params })
//     .then(dataToGroom => dataToGroom.data.results.map(movieDisplay => new Movie(movieDisplay)))
//     .then(dataToSend => response.status(200).send(dataToSend))
//     .catch(error => console.log(error))
// };
