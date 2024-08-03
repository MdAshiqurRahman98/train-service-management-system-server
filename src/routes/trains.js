const express = require('express');
const Train = require('../models/train');
const auth = require('../middleware/auth');
const router = express.Router();

// Create a train
router.post('/', auth, async (req, res) => {
    try {
        const train = new Train(req.body);
        await train.save();
        res.status(201).json(train);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Update a train
router.put('/:id', auth, async (req, res) => {
    try {
        const train = await Train.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!train) return res.status(404).send('Train not found');
        res.json(train);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Retrieve all trains
router.get('/', async (req, res) => {
    try {
        const trains = await Train.find().populate('stops.station');
        res.json(trains);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;