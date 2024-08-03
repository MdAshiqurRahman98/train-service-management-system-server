const mongoose = require('mongoose');

const stopSchema = new mongoose.Schema({
    station: { type: mongoose.Schema.Types.ObjectId, ref: 'Station', required: true },
    arrivalTime: { type: Date, required: true },
    departureTime: { type: Date, required: true },
});

const trainSchema = new mongoose.Schema({
    name: { type: String, required: true },
    stops: [stopSchema],
});

module.exports = mongoose.model('Train', trainSchema);