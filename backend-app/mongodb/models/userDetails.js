const mongoose = require('mongoose');

const userDetailsSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true }
});

const userData = mongoose.model('UserData', userDetailsSchema);

module.exports = userData;