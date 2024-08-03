const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    train: { type: mongoose.Schema.Types.ObjectId, ref: 'Train', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    fromStation: { type: mongoose.Schema.Types.ObjectId, ref: 'Station', required: true },
    toStation: { type: mongoose.Schema.Types.ObjectId, ref: 'Station', required: true },
    fare: { type: Number, required: true },
});

module.exports = mongoose.model('Ticket', ticketSchema);