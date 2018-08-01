const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CatSchema = new Schema({

    name: {
        Type: String
    },
    breed: {
        Type: String
    },
    age: {
        Type: String,
        required: false
    },
    startingWeight: {
        Type: Number
    }

});

const Cat = mongoose.model('cats', CatSchema);

module.exports = Cat;