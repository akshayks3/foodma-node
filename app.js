const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const vehicleDetails = require('./routes/vehicle_details');
const fuelDetails = require('./routes/fuel');
const distanceDetails = require('./routes/distance');
const routeDetails = require('./routes/route');
const app = express();
// mongo1 = 'mongodb+srv://akshay:MmuPpn43IC1FC0Ka@cluster0.dy1gt.mongodb.net/node-angular'
mongoose
  .connect(
    "mongodb+srv://akshay:cW7x843dfrG1IBVT@cluster0.udftj.mongodb.net/node-angular?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection Failed');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With,Content-Type,Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,POST,PATCH,PUT,DELETE,OPTIONS'
  );
  next();
});

app.use('/api/user', userRoutes);
app.use('/api/vehicle_details', vehicleDetails);
app.use('/api/fuel_details', fuelDetails);
app.use('/api/distance_details', distanceDetails);
app.use('/api/route_details', routeDetails)

module.exports = app;
