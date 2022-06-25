'use strict';

const axios = require('axios');

// app.get('/weather', async(request, response, next) => {
let cache ={};
async function getWeather(request, response, next) {
  try {
    let lat = request.query.lat;
    let lon = request.query.lon;
    let key = `${city}CacheData`;
    let sleepTimeInCache = 1000 * 60 * 60 * 24 * 7;//a week
    if (cache[key] && Date.now() - cache[key].timestamp < sleepTimeInCache) {
    // let testSleepTimeInCache = 1000 * 10; //10 secs
    // if (cache[key] && Date.now() - cache[key].timestamp < testSleepTimeInCache) {
      console.log('weatherCacheData is in the cache already.');
      // console.log(cache[key]);
      response.status(200).json(cache[key].data);
    } else {
      console.log('weatherCacheData is not ready, Please request from Database.')


    let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=
    ${process.env.WEATHER_API_KEY}&units=I&days=3&lat=${lat}&lon=${lon}`;
    let dataToGroom = await axios.get(url);
    let dataToSend = dataToGroom.data.data.map(weatherDatetime => new Forecast(weatherDatetime));
    response.status(200).json(dataToSend);
    cache[key] = {
      data: dataToSend,
      timestamp: Date.now()
    } 
  }
  } catch (error) {
    next(error);
  }
};
class Forecast {
  constructor(forecastObj) {
    this.datetime = forecastObj.datetime;
    this.description = forecastObj.weather.description;
  }
}
module.exports = getWeather;


    // function getWeather(req, res, next) {
    //   let lat = request.query.lat;
    //   let lon = request.query.lon;
    
    //   let url = `http://api.weatherbit.io/v2.0/forecast/daily`;
    //   let params = {
    //     key: process.env.WEATHER_API_KEY,
    //     units: I,
    //     days: 3,
    //     lat: request.query.lat,
    //     lon: request.query.lon,
    //   }
    
    //   axios.get(url, { params })
    //   .then(dataToGroom => dataToGroom.data.data.map(weatherDatetime => new Forecast(weatherDatetime)))
    //   .then(groomedData => res.status(200).send(groomedData))
    //   .catch(error => console.log(error));
    // };