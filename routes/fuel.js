const express = require('express');
const Fuel_Details = require('../models/fuel');
const router = express.Router();

router.post('', async (req, res, next) => {
    value = await Fuel_Details.findOne({
        registration_number: req.body.registration_number,
    })
        .then((document) => {
            //   console.log(document, '1');
            if (document.fuelDetails.length > 0) {
                document.fuelDetails.push(req.body.fuel_details[0]);
                Fuel_Details.updateOne(
                    { registration_number: req.body.registration_number },
                    document
                ).then((result) => {
                    //   console.log(result, 'updates');
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
    //   console.log(value);
    if (value == 2) {
        const post = new Fuel_Details({
            registration_number: req.body.registration_number,
            name: req.body.name,
            fuelDetails: req.body.fuel_details,
        });
        // console.log(post);
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
        // console.log(registration_number);
        Fuel_Details.findOne({ registration_number: registration_number }).then(
            (document) => {
                //   console.log(document, 'one');
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
    Fuel_Details.find().then((documents) => {
        // console.log(documents);
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
    Fuel_Details.deleteOne({ _id: req.params.id }).then((result) => {
        // console.log(result);
        res.status(200).json({ message: 'Post deleted' });
    });
});

router.put('', (req, res, next) => {
    const details = new Fuel_Details({
        _id: req.body._id,
        registration_number: req.body.registration_number,
        name: req.body.name,
        fuelDetails: req.body.fuelDetails,
    });
    Fuel_Details.updateOne({ _id: req.body._id }, details).then((result) => {
        // console.log(result);
        res.status(200).json({ message: 'Update Successful' });
    });
});

module.exports = router;
