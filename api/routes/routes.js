const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/api/newuser', (req, res) => {

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    newUser
        .save()
        .then( user => res.json({
            username: user.username,
            email: user.email,
            password: user.password
        })
    )
    .catch(err => console.log(err));

});

module.exports = router;