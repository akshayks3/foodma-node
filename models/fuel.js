const mongoose = require('mongoose');

const fuelSchema = mongoose.Schema({
  registration_number: { type: String, required: true },
  name: { type: String, required: true },
  fuelDetails: { type: Array, required: true },
});

module.exports = mongoose.model('Fuel', fuelSchema);
