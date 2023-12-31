const express = require('express');
const router = express.Router();
const withAuth = require('../utils/auth');
const { Event, User } = require('../models');

// Route for homepage
router.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

// Route for login page
router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

router.get('/signup', (req, res) => {
    res.render('signup', { title: 'Signup' });
});

// Route for user's dashboard
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        if (req.session.logged_in) {
            const userData = await User.findByPk(req.session.user_id);
            // Serialize the user data
            const user = userData.get({ plain: true });
            res.render('dashboard', { username: user.username });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'An error occurred while trying to load the dashboard' });
    }
});

router.get('/eventSearch', (req, res) => {
    res.render('eventSearch', { apiKey: process.env.API_KEY });
});

router.get('/newEvent', (req, res) => {
    res.render('newEvent');
});

// Route for 404 
router.get('*', (req, res) => {
    res.status(404).send('404 Page Not Found');
});

router.get('/', async (req, res) => {
    try {
        // Fetch the events from the database
        const eventList = await Event.findAll();

        // Serialize the event data for the template
        const events = eventList.map(event => event.get({ plain: true }));

        res.render('index', { title: 'Home', events });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;

