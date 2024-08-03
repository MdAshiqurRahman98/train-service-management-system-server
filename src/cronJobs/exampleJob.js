const cron = require('node-cron');
const User = require('../models/user');
const Ticket = require('../models/ticket');
const moment = require('moment');

// Function to send reminders to users
const sendReminders = async () => {
    try {
        const tickets = await Ticket.find({
            purchaseDate: {
                $gte: moment().subtract(1, 'days').toDate(),
                $lt: moment().add(1, 'days').toDate(),
            },
        }).populate('user train');

        tickets.forEach(ticket => {
            console.log(`Sending reminder to ${ticket.user.username} for train ${ticket.train.name}`);
            // Here, an email service can be integrated to send actual reminders
        });
    } catch (error) {
        console.error('Error sending reminders:', error);
    }
};

// Schedule the task to run every day at 9:00 AM
cron.schedule('0 9 * * *', () => {
    console.log('Running daily reminders task...');
    sendReminders();
});