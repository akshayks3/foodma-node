const mongoose = require('mongoose');

const distanceSchema = mongoose.Schema({
  registration_number: { type: String, required: true },
  name: { type: String, required: true },
  distanceDetails: { type: Array, required: true },
});

module.exports = mongoose.model('distance', distanceSchema);
