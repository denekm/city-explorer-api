'use strict';

require('dotenv').config();

const axios = require('axios');
let cache = require('./cache.js');

function getWeather(lat, lon) {
  const key = 'weather-' + lat + lon;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily/?&lat=${lat}&lon=${lon}&days=7&key=${process.env.WEATHER_API_KEY}`;
  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios.get(url)
      .then(response => parseWeather(response.data));
  }

  return cache[key].data;
}

function parseWeather(weatherData) {
  try {
    const weatherSummaries = weatherData.data.map(day => new Forecast(day));
    return Promise.resolve(weatherSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}


class Forecast {
  constructor(weatherData) {
    this.date = weatherData.datetime;
    this.description = weatherData.weather.description;
  }
}
module.exports = async (request, response) => {
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
