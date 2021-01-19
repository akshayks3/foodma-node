const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

router.post('/signup', (req, res, next) => {
    if (req.body.adminpassword != 'foodmavehicleapp') {
        return res.status(500).json({
            error: 'Incorrect Admin Password',
        });
    }
    bcrypt.hash(req.body.password, 10).then((hash) => {
        const user = new User({
            username: req.body.username,
            password: hash,
            role: req.body.role,
            phone: req.body.phone,
        });
        user
            .save()
            .then((result) => {
                res.status(201).json({
                    message: 'user created',
                    result: result,
                });
            })
            .catch((err) => {
                res.status(500).json({
                    error: err,
                });
            });
    });
});

router.post('/login', (req, res, next) => {
    let fetchedUser;
    User.findOne({
        username: req.body.username,
    })
        .then((user) => {
            fetchedUser = user;
            // console.log(fetchedUser);
            if (!user) {
                return res.status(401).json({
                    message: 'No user found',
                });
            }
            return bcrypt.compare(req.body.password, user.password);
        })
        .then((result) => {
            if (!result) {
                return res.status(401).json({
                    message: 'No user found',
                });
            }
            const token = jwt.sign(
                { username: fetchedUser.username, userId: fetchedUser._id },
                'secret_this_should_be_longer',
                { expiresIn: '1h' }
            );
            res.status(200).json({
                token: token,
                expiresIn: 3600,
                username: fetchedUser.username,
                role: fetchedUser.role,
            });
        })
        .catch((err) => {
            return res.status(401).json({
                message: 'Auth Failed',
                error: err,
            });
        });
});

router.put("/changepassword", (req, res, next) => {
    // console.log(req.body)
    if (req.body.adminpassword != 'foodmavehicleapp') {
        return res.status(500).json({
            error: 'Incorrect Admin Password',
        });
    }

    bcrypt.hash(req.body.newpassword, 10).then(hash => {


        User.findOne({
            username: req.body.username,
        }).then(user => {
            if (!user) {
                return res.status(500).json({
                    error: 'User Not Found',
                });
            } else {
                // console.log(user)
                user.password = hash;
                user.save().then(result => {
                    res.status(201).json({
                        message: 'Password Changed',
                        result: result,
                    });
                }).catch(error => {
                    return res.status(500).json({
                        error: 'Issue while changing the password',
                    });
                })
            }

        })

    }).catch(err => {
        return res.status(500).json({
            error: 'Issue while hashing the password',
        });
    })

})

module.exports = router;
