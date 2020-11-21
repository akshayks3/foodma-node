const express = require('express');
const Vehicle_Details = require('../models/vehicle_details');
const router = express.Router();

router.post('', (req, res, next) => {
  const post = new Vehicle_Details({
    registration_number: req.body.registration_number,
    name: req.body.name,
    rc_reg_date: new Date(req.body.rc_reg_date),
    permit_reg_date: new Date(req.body.permit_reg_date),
    permit_val_date: new Date(req.body.permit_val_date),
    road_tax_reg_date: new Date(req.body.road_tax_reg_date),
    road_tax_validity_date: new Date(req.body.road_tax_validity_date),
    last_polution_test_date: new Date(req.body.last_polution_test_date),
    polution_test_validity_date: new Date(req.body.polution_test_validity_date),
    insurance_registration_date: new Date(req.body.insurance_registration_date),
    insurance_validity_date: new Date(req.body.insurance_validity_date),
  });
  console.log(post);
  post.save().then((createdPost) => {
    res.status(201).json({
      message: 'Post added successfully',
      postId: createdPost,
    });
  });
});

router.get('', (req, res, next) => {
  Vehicle_Details.find().then((documents) => {
    console.log(documents);
    res.status(200).json({
      message: 'Post fetched successfully',
      details: documents,
    });
    //   .catch((err) => {
    //     res.status(404).json({
    //       message: 'Error while collecting data',
    //     });
    //   });
  });
});

router.delete('/:id', (req, res, next) => {
  Vehicle_Details.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: 'Post deleted' });
  });
});

router.put('/:id', (req, res, next) => {
  const details = new Vehicle_Details({
    _id: req.body.id,
    registration_number: req.body.registration_number,
    name: req.body.name,
    rc_reg_date: new Date(req.body.rc_reg_date),
    permit_reg_date: new Date(req.body.permit_reg_date),
    permit_val_date: new Date(req.body.permit_val_date),
    road_tax_reg_date: new Date(req.body.road_tax_reg_date),
    road_tax_validity_date: new Date(req.body.road_tax_validity_date),
    last_polution_test_date: new Date(req.body.last_polution_test_date),
    polution_test_validity_date: new Date(req.body.polution_test_validity_date),
    insurance_registration_date: new Date(req.body.insurance_registration_date),
    insurance_validity_date: new Date(req.body.insurance_validity_date),
  });
  Vehicle_Details.updateOne({ _id: req.params.id }, details).then((result) => {
    console.log(result);
    res.status(200).json({ message: 'Update Successful' });
  });
});

module.exports = router;
