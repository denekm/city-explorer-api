'use strict';

require('dotenv').config();

const axios = require('axios');

class Forecast {
  constructor(weatherData) {
    this.date = weatherData.datetime;
    this.description = weatherData.weather.description;
  }
}
module.exports= async(request, response) => {
  const lat = request.query.lat;
  const lon = request.query.lon;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily/?&lat=${lat}&lon=${lon}&days=7&key=${process.env.WEATHER_API_KEY}`;

  try {
    let weather = await axios.get(url);
    weather = weather.data.data;
    const weatherArray = weather.map(value => new Forecast(value));
    response.send(weatherArray);
  } catch (error) {
    response.send(error.message);
  }
};
