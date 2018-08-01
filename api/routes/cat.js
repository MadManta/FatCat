const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
require('dotenv').config();
const Cat = require('../models/Cat');
const User = require('../models/User');

// @route   GET api/cats/test
// @desc    Tests cats
// @access  Public

router.get('/test', (req, res) => res.json({msg: 'Cats Works'}));

// @route   GET api/cats/
// @desc    Get current current user's cats
// @access  Private

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};

    Cat.findOne({ user: req.user.id })
        .then(cat => {
            if(!cat) {
                errors.nocat = 'There is no cat for this user';
                return res.status(404).json(errors);
            }
            res.json(cat);
        })
        .catch(err => res.status(404).json(err));
});

// @route   POST api/cats
// @desc    Add cat to user account
// @access  Private

router.post('/add-cat', passport.authenticate('jwt', { session: false }), (req, res) => {
    const catInfo = {};
    catInfo.user = req.user.id;

    if(req.body.name) catInfo.name = req.body.name
    if(req.body.breed) catInfo.breed = req.body.breed
    if(req.body.age) catInfo.age = req.body.age
    if(req.body.startingWeight) catInfo.startingWeight = req.body.startingWeight
    if(typeof req.body.diet !== 'undefined') { catInfo.diet = req.body.diet.split(','); }
    if(req.body.description) catInfo.description = req.body.description

    const newCat = new Cat(catInfo);

      newCat
        .save()
        .then(cat =>
          res.json({ cat })
        )
        .catch(err => console.log(err));


    // Cat.findOne({ user: req.user.id }, {name: req.body.name})
    //     .then(cat => {
    //         if(cat) {
    //             //Update
    //             Cat.findOneAndUpdate(
    //                 { user: req.user.id }, 
    //                 { $set: catInfo }, 
    //                 {new: true}
    //             )
    //             .then(cat => res.json(cat));
    //         } else {
    //             //Create
    //             new Cat(catInfo)
    //             .save()
    //             .then(cat => res.json(cat))
    //         }
    //     })
});

module.exports = router;