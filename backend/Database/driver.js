const mongoose = require('mongoose');


const driverSchema = mongoose.Schema({
    name: { type: String, required: true },
    cellNo: { type: Number, required: true },
    pan: { type: String, required: true },
    license: { type: String, required: true },
    region: { type: String, required: true },
    regionCode: { type: String, required: true },
    emailId: { type: String, required: true },
    password: { type: String, required: true },
});

module.exports = mongoose.model('Driver', driverSchema);