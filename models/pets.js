const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PetSchema = new Schema({
    name: String,
    petType: String,
    breed: String,
    age: Number,
    gender: String,
    isSpayedOrNeutered: Boolean,
    location: String,
    description: String,
});

module.exports = mongoose.model('Pet', PetSchema);