const mongoose = require("mongoose");

const customerSchema = mongoose.Schema({
    emailId: { type: String, required: true, },
    password: { type: String, required: true },
    address: { type: String, required: false },
    location: { type: { lat: Number, lng: Number }, required: false },
    region: { type: String, required: false },
});


module.exports = mongoose.model("User", customerSchema);