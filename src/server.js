const express = require('express');
const mongoose = require('mongoose');
const cronJobs = require('./cronJobs/exampleJob');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const stationRoutes = require('./routes/stations');
const trainRoutes = require('./routes/trains');
const walletRoutes = require('./routes/wallet');
const ticketRoutes = require('./routes/ticket');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Train Service Management System Server is running');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB has been connected'))
    .catch(error => console.log('MongoDB connection error:', error));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/stations', stationRoutes);
app.use('/api/trains', trainRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/tickets', ticketRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));