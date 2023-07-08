const router = require('express').Router();
const { Event } = require('../../models');
const db = require('../../models');

// Route to get all events
router.get('/events', (req, res) => {
    db.Event.findAll() 
        .then(events => res.json(events))
        .catch(err => res.status(500).json(err));
});

// Route to get a single event by its id
router.get('/events/:id', (req, res) => {
    db.Event.findByPk(req.params.id)
        .then(event => res.json(event))
        .catch(err => res.status(500).json(err));
});

// Route to create a new event
router.post('/new', async (req, res) => {
    try {
        const newEvent = await db.Event.create(req.body);
        // Associate the event with the user by setting the appropriate foreign key
        newEvent.user_id = req.session.user_id;
        await newEvent.save();
        res.json(newEvent);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;