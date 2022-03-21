'use strict';

// Use a `require` statement to read the weather data from the `weather.json` file. (this is like importing in React)

// This library (.env) keeps our keys hidden
require('dotenv').config();

const express = require('express');

const cors = require('cors');

const app = express();

// defining middleare
//.use is used for error handeling

app.use(cors());

const PORT = process.env.PORT || 3002;

// getting data from the end route and seding a response back to the user using .get
// the "/" means its the home route
// every call back function in our app.get has to have request and a response
app.get('/', (request, response) => {
  response.send('testing');
});


// .listen tells the express app which port to listen on
// the second arguement checks to see if the port we're runing on is 3001
app.listen(PORT,() => console.log(`Listening on port:${PORT}`) );
