

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

router.post('/new', async (req, res) => {
    try {
        // Check if a user is logged in
        if(!req.session || !req.session.user_id) {
            return res.status(400).json({ error: 'No user session found' });
        }
        
        // Create new event with user_id from the session
        const newEvent = await db.Event.create({
            ...req.body,
            user_id: req.session.user_id
        });
        
        res.json(newEvent);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



module.exports = router;

