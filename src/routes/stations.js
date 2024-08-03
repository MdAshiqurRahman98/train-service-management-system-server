const express = require('express');
const Station = require('../models/station');
const auth = require('../middleware/auth');
const router = express.Router();

// Create a station
router.post('/', auth, async (req, res) => {
    try {
        const station = new Station(req.body);
        await station.save();
        res.status(201).json(station);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Update a station
router.put('/:id', auth, async (req, res) => {
    try {
        const station = await Station.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!station) return res.status(404).send('Station not found');
        res.json(station);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Retrieve all stations
router.get('/', async (req, res) => {
    try {
        const stations = await Station.find();
        res.json(stations);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;