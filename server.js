require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mocha = require('mocha');
const passport = require('passport');
const userRoutes = require('./api/routes/users');
const catRoutes = require('./api/routes/cat');
const app = express();
const PORT = process.env.PORT || 5500;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(logger('dev'));

require('./config/dbConnection')(mongoose);

app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/api/users/', userRoutes);
app.use('/api/cats', catRoutes)

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '/client/public/index.html'));
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});