const express = require('express');
const Distance_Details = require('../models/distance');
const router = express.Router();

router.post('', async (req, res, next) => {
  value = await Distance_Details.findOne({
    registration_number: req.body.registration_number,
  })
    .then((document) => {
      console.log(document, '1');
      if (document.distanceDetails.length > 0) {
        document.distanceDetails.push(req.body.distance_details[0]);
        Distance_Details.updateOne(
          { registration_number: req.body.registration_number },
          document
        ).then((result) => {
          console.log(result, 'updates');
          res.status(200).json({ message: 'Update Successful' });
        });
        return 1;
      } else {
        return 2;
      }
    })
    .catch((err) => {
      return 2;
    });
  console.log(value);
  if (value == 2) {
    const post = new Distance_Details({
      registration_number: req.body.registration_number,
      name: req.body.name,
      distanceDetails: req.body.distance_details,
    });
    console.log(post);
    post.save().then((createdPost) => {
      res.status(201).json({
        message: 'Post added successfully',
        postId: createdPost,
      });
    });
  }
});

router.post('/getone', (req, res, next) => {
  (registration_number = req.body.registration_number),
    console.log(registration_number);
  Distance_Details.findOne({ registration_number: registration_number }).then(
    (document) => {
      console.log(document, 'one');
      res.json({
        details: document,
      });
    }
  );

  //   console.log(post);
  // post.save().then((createdPost) => {
  //   res.status(201).json({
  //     message: 'Post added successfully',
  //     postId: createdPost,
  //   });
  // });
});

router.get('', (req, res, next) => {
  Distance_Details.find().then((documents) => {
    console.log(documents);
    res
      .status(200)
      .json({
        message: 'Post fetched successfully',
        details: documents,
      })
      .catch((err) => {
        res.status(404).json({
          message: 'Error while collecting data',
        });
      });
  });
});

router.delete('/:id', (req, res, next) => {
  Distance_Details.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: 'Post deleted' });
  });
});

router.put('', (req, res, next) => {
  const details = new Distance_Details({
    _id: req.body._id,
    registration_number: req.body.registration_number,
    name: req.body.name,
    distanceDetails: req.body.distanceDetails,
  });
  Distance_Details.updateOne({ _id: req.body._id }, details).then((result) => {
    console.log(result, 88);
    res.status(200).json({ message: 'Update Successful' });
  });
});

module.exports = router;
