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
router.post('/events', (req, res) => {
    db.Event.create(req.body)
        .then(newEvent => res.json(newEvent))
        .catch(err => res.status(500).json(err));
});