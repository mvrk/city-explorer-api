const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3002;
let data = require('./data/weather.json');
require('dotenv').config();

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/weather', (request, response) => {
  try {
    let weatherFromRequest = request.query.weather;
    console.log(weatherFromRequest);
    let dataToGroom = data.find(Forecast => Forecast.weather === weatherFromRequest);
    let dataToSend = new Forecast(dataToGroom);
    response.send(dataToSend);
  } catch (error) {
    // if I have an error, it will create a new instance of the Error object that lives in Express
    next(error);
    // this iwll instanciate any error as a new error
  }
});

// catchall route — goes at the bottom of our routes
app.get('*', (request, response) => {
  response.send('The thing you are looking for doesn\'t exist');
});

// CLASSES
class Forecast {
  constructor(forecastObj) {
    this.data = forecastObj.data;
    this.description = forecastObj.description;
  }
}

// ERRORS
// Handle any errors
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
}) 


// LISTEN
// start the server
// .listen() is an express methos that takes in a Port value and a callback function
app.listen(PORT, () => console.log(`listening on port ${PORT}`));