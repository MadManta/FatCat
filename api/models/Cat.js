const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CatSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String
    },
    breed: {
        type: String
    },
    age: {
        type: Number,
    },
    startingWeight: {
        type: Number
    },
    diet: {
        type: [String]
    },
    description: {
        type: String
    }

});

const Cat = mongoose.model('cats', CatSchema);

module.exports = Cat;