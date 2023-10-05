const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");


const adminSchema = mongoose.Schema({
    name: { type: String, required: true },
    region: { type: String, required: true },
    regionCode: { type: String, required: true },
    emailId: { type: String, required: true },
    password: { type: String, required: true },
});
module.exports = mongoose.model('Admin', adminSchema);