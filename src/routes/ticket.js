const express = require('express');
const Train = require('../models/train');
const Ticket = require('../models/ticket');
const Wallet = require('../models/wallet');
const auth = require('../middleware/auth');
const router = express.Router();

// Purchase a ticket
router.post('/purchase', auth, async (req, res) => {
    try {
        const { trainId, fromStationId, toStationId } = req.body;
        const train = await Train.findById(trainId).populate('stops.station');
        const wallet = await Wallet.findOne({ user: req.user.userId });

        // Calculate fare (simplified logic)
        const fromStop = train.stops.find(stop => stop.station.id === fromStationId);
        const toStop = train.stops.find(stop => stop.station.id === toStationId);
        const fare = Math.abs(new Date(toStop.arrivalTime) - new Date(fromStop.departureTime)) / 60000; // Minutes difference

        if (wallet.balance < fare) {
            return res.status(400).send('Insufficient funds');
        }

        wallet.balance -= fare;
        await wallet.save();

        const ticket = new Ticket({
            train: train._id,
            user: req.user.userId,
            fromStation: fromStop.station._id,
            toStation: toStop.station._id,
            fare,
        });
        await ticket.save();

        res.status(201).json(ticket);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;