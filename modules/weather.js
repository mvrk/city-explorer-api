'use strict';

let cache = require('./cache.js');
const axios = require('axios');
module.exports = getWeather;

async function getWeather(request, response) {
  const{lat, lon} = request.query;
  const key = 'weather-' + lat + lon;
  const url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lang=en&lat=${lat}&lon=${lon}&days=5`;
console.log(url);
  if (cache[key] && Date.now() - cache[key].timestamp < 50000) {
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    cache[key]={};
    cache[key].timestamp = Date.now();
    cache[key].data = await axios.get(url).then(response => parseWeather(response.data));
  }
  console.log(cache[key].data);
  response.send(cache[key].data);
}

function parseWeather(dataToGroom) {
  console.log(dataToGroom);
  try {
    const dataToSend = dataToGroom.data.map(day => {
      return new Forecast(day);
    });
    return Promise.resolve(dataToSend);
  } catch (e) {
    return Promise.reject(e);
  }
}

class Forecast {
  constructor(ForecastObj) {
    this.forecast = ForecastObj.weather.description;
    this.time = ForecastObj.datetime;
  }
}
