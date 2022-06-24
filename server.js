'use strict';
console.log('welcome to the server!');

//REQUIRE-----------------------------------
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');

//REQUIRE MODULES-----------------------------------
const getWeather = require('./modules/weather.js')
const getMovies = require('./modules/movies.js');

//USE-----------------------------------------
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3008;

//TEST--------------------------------------------
app.get('/', (req, res) => {
  res.send('Hello World!')
})

//ROUTE WEATHER-----------------------------------------
app.get('/weather', getWeather);

//ROUTE MOVIES-----------------------------------------
app.get('/movies', getMovies);


// ERRORS------------------------------------------------------
app.get('*', (request, response) => {
  response.send('The thing you are looking for doesn\'t exist');
});

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
})

// LISTEN-----------------------------------------------------
app.listen(PORT, () => console.log(`listening on port ${PORT}`));