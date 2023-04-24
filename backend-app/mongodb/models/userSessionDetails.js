const mongoose = require('mongoose');

const userSessionDetailsSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    loginDate: { type: Date, required: true },
    sessionTimeInSec: { type: Number, required: true },
    loginCountry: { type: String, required: true },
    loginBrowser: { type: String, required: true },
});

const userSessionData = mongoose.model('userSessionData', userSessionDetailsSchema);

module.exports = userSessionData;