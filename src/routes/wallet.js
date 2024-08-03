const express = require('express');
const Wallet = require('../models/wallet');
const auth = require('../middleware/auth');
const router = express.Router();

// Add funds to wallet
router.post('/add-funds', auth, async (req, res) => {
    try {
        const wallet = await Wallet.findOne({ user: req.user.userId });
        wallet.balance += req.body.amount;
        await wallet.save();
        res.json(wallet);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Retrieve wallet balance
router.get('/', auth, async (req, res) => {
    try {
        const wallet = await Wallet.findOne({ user: req.user.userId });
        res.json(wallet);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;