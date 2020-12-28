const express = require('express');
const path = require('path');
const ejs = require('ejs');

require('dotenv').config();

const app = express();
const bookingsRouter = require('./routes/bookings');
const port = process.env.PORT || 80

app.use(express.static('public'));
app.use(express.json());
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', {mapsAPIKey: process.env.MAPS_API_KEY});
})

app.get('/menu', (req, res) => {
  res.sendFile(__dirname + '/public/menu.pdf')
})

app.use('/bookings', bookingsRouter);

//  ERROR HANDLING
app.use((req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;  
  next(err);
})

app.use((err, req, res, next) => {
  err.message = err.message || err.response || 'Internal Server Error';
  err.status = err.status || err.responseCode || 500;
  res.render('error', {err});
})

app.listen(port, () => {
  console.log(`Example app listening at {port}`)
})