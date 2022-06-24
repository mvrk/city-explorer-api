'use strict';
console.log('welcome to the server!');

//REQUIRE-----------------------------------

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');

//REQUIRE MODULES-----------------------------------
// const getWeather =require('./modules/weather.js')
const getMovies = require('./modules/movies.js');


//USE-----------------------------------------

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3008;

//TEST ROUTE--------------------------------------------

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//ROUTE WEATHERDATA--------------------------------------------------
// app.get('/weatherData', (request, response, next) => {

//   try {
//     let searchQuery = request.query.searchQuery;
//     console.log(searchQuery);
//     let dataToGroom = weatherData.find(object => object.city_name.toLowerCase() === searchQuery.toLowerCase());
//     let dataToSend = dataToGroom.data.map(weatherDatetime => new Forecast(weatherDatetime));
//     response.status(200).send(dataToSend);

//   } catch (error) {
//     next(error);
//   }
// });

// app.get('*', (request, response) => {
//   response.send('The thing you are looking for doesn\'t exist');
// });

//ROUTE WEATHER-----------------------------------------
// app.get('/weather', getWeather);
// app.get('/weather', async(request, response, next) => {

//   try {
//     let lat = request.query.lat;
//     let lon = request.query.lon;
//     let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&units=I&days=3&lat=${lat}&lon=${lon}`;
//     let dataToGroom = await axios.get(url);
//     // console.log(dataToGroom);
//     let dataToSend = dataToGroom.data.data.map(weatherDatetime => new Forecast(weatherDatetime));
//     response.status(200).send(dataToSend);
//     // console.log(dataToSend);

//   } catch (error) {
//     next(error);
//   }
// });


//ROUTE MOVIES-----------------------------------------
app.get('/weather', getMovies);

// app.get('/movies', async(request, response, next) => {
// let city = request.query.searchQuery;
//   try {

//     let url=`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`;
//     let dataToGroom = await axios.get(url);
//     console.log(dataToGroom);
//     let dataToSend = dataToGroom.data.results.map(movieData => new Movie(movieData));
//     response.status(200).send(dataToSend);

//   } catch (error) {
//    console.log(error.message);
//   }
// });

// app.get('*', (request, response) => {
//   response.send('The thing you are looking for doesn\'t exist');
// });

// CLASSES-------------------------------------------
// class Forecast {
//   constructor(forecastObj) {
//     // console.log(forecastObj);
//     this.datetime = forecastObj.datetime;
//     this.description = forecastObj.weather.description;
//   }
// }
// class Movie{
//   constructor(movieObj){
//     this.title = movieObj.title;
//     this.overview = movieObj.overview;
//     this.average_votes = movieObj.vote_average;
//     this.image_url = 'https://image.tmdb.org/t/p/w500' + movieObj.poster_path;
//     this.popularity = movieObj.popularity;
//     this.released_on = movieObj.release_date;
//   }
// }
// ERRORS------------------------------------------------------

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
})


// LISTEN-----------------------------------------------------

app.listen(PORT, () => console.log(`listening on port ${PORT}`));