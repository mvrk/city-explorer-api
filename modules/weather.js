'use strict';

const axios = require('axios');

  
  app.get('*', (request, response) => {
    response.send('The thing you are looking for doesn\'t exist');
  });

// function getWeather(req, res, next) {
//   let lat = request.query.lat;
//   let lon = request.query.lon;

//   let url = `http://api.weatherbit.io/v2.0/forecast/daily`;
//   let params = {
//     key: process.env.WEATHER_API_KEY,
//     units: I,
//     days: 3,
//     lat: lat,
//     lon: lon,
//   }

//   axios.get(url, { params })
//     .then(dataToGroom => dataToGroom.data.data.map(weatherDatetime => new Forecast(weatherDatetime)))
//     .then(groomedData => res.status(200).send(groomedData))
//     .catch(error => console.log(error));
// };

// CLASSES
class Forecast {
  constructor(forecastObj) {
    this.datetime = forecastObj.datetime;
    this.description = forecastObj.weather.description;
  }
}
module.exports = getWeather;