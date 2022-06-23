'use strict';
console.log('welcome to the server!');

//REQUIRE-----------------------------------

const express = require('express');
const cors = require('cors');
// const { default: axios } = require('axios');
require('dotenv').config();
// let weatherData = require('./data/weather.json');
const axios = require('axios');

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

app.get('/weather', async(request, response, next) => {

  try {
    let lat = request.query.lat;
    let lon = request.query.lon;
    let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&units=I&days=3&lat=${lat}&lon=${lon}`;
    let dataToGroom = await axios.get(url);
    console.log(dataToGroom);
    let dataToSend = dataToGroom.data.data.map(weatherDatetime => new Forecast(weatherDatetime));
    response.status(200).send(dataToSend);
    console.log(dataToSend);

  } catch (error) {
    next(error);
  }
});


//ROUTE MOVIES-----------------------------------------


app.get('/movies', async(request, response, next) => {

  try {

    let url=`https://api.themoviedb.org/3/search/movies?key=${process.env.MOVIE_API_KEY}&searchQurery=${movieQuery}`;
    let dataToGroom = await axios.get(url);
    let dataToSend = dataToGroom.data.map(weatherDatetime => new Forecast(weatherDatetime));
    response.status(200).send(dataToSend);

  } catch (error) {
    next(error);
  }
});

app.get('*', (request, response) => {
  response.send('The thing you are looking for doesn\'t exist');
});

// CLASSES-------------------------------------------
class Forecast {
  constructor(forecastObj) {
    console.log(forecastObj);
    this.datetime = forecastObj.datetime;
    this.description = forecastObj.weather.description;
  }
}

// ERRORS------------------------------------------------------

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
})


// LISTEN-----------------------------------------------------

app.listen(PORT, () => console.log(`listening on port ${PORT}`));