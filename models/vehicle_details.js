const mongoose = require('mongoose');

const vehicleSchema = mongoose.Schema({
  registration_number: { type: String, required: true },
  name: { type: String, required: true },
  rc_reg_date: { type: Date, required: true },
  permit_reg_date: { type: Date, required: true },
  permit_val_date: { type: Date, required: true },
  road_tax_reg_date: { type: Date, required: true },
  road_tax_validity_date: { type: Date, required: true },
  last_polution_test_date: { type: Date, required: true },
  polution_test_validity_date: { type: Date, required: true },
  insurance_registration_date: { type: Date, required: true },
  insurance_validity_date: { type: Date, required: true },
});

module.exports = mongoose.model('Post1', vehicleSchema);
