'use strict';

// Use a `require` statement to read the weather data from the `weather.json` file. (this is like importing in React)

// This library (.env) keeps our keys hidden
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const weatherCallBack = require('./weather.js');
const movieCallBack = require('./movies.js');
const weather = require('./weather.js');



// defining middleware
//.use is used for error handeling
app.use(cors());
const PORT = process.env.PORT || 3002;

app.get('/weather', weatherCallBack);
app.get('/movies', movieCallBack);
app.get('/weather', weatherHandler);

async function weatherHandler(request, response) {
  let lat = request.qury.lat;
  let lon = request.qury.lon;
  await weather(lat, lon)
    .then(summaries => response.send(summaries))
    .catch((error) => {
      console.error(error);
      response.status(200).send('Sorry. Something went wrong!')
    });
}

app.listen(PORT, () => console.log(`Listening on port:${PORT}`));

// getting data from the end route and seding a response back to the user using .get
// the "/" means its the home route
// every call back function in our app.get has to have request and a response
// app.get('/weather', (request, response) => {
// const lat = parseInt(request.query.lat);
// const lon = parseInt(request.query.lon);
// const searchQuery = request.query.searchQuery;
// console.log(searchQuery);
// // const city = weatherData.find(cityObject => cityObject.city_name.toLowerCase() === searchQuery.toLowerCase());

// try {
//   const weatherArr = city.data.map(day => new Forecast(day.valid_date, day.weather.description));
//   response.send(weatherArr);
// }
// catch (error) {
//   response.send(error.message);
// }
// response.send();
// });


// .listen tells the express app which port to listen on
// the second arguement checks to see if the port we're runing on is 3001

