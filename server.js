'use strict';
console.log('welcome to the server!');

//REQUIRE-----------------------------------

const express = require('express');
const cors = require('cors');
require('dotenv').config();
let weatherData = require('./data/weather.json');

//USE-----------------------------------------

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3008;

//ROUTES--------------------------------------------

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/weatherData', (request, response, next) => {

  try {
    let searchQuery = request.query.searchQuery;
    console.log(searchQuery);
    let dataToGroom = weatherData.find(object => object.city_name.toLowerCase() === searchQuery.toLowerCase());
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