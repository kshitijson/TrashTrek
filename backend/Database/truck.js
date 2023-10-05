const mongoose = require('mongoose');

const truckSchema = mongoose.Schema({
    regNo: { type: String, required: true },
    puc: { type: { number: String, valid: Boolean }, required: true }
});

module.exports = mongoose.model('Truck', truckSchema);