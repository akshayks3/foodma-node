const mongoose = require('mongoose');

const routeSchema = mongoose.Schema({
  route_name: { type: String, required: true }
});

module.exports = mongoose.model('route', routeSchema);