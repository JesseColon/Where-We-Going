const router = require('express').Router();
const userRoutes = require('./usersRoutes');
const eventRoutes = require('./eventsRoutes');
const homeRoutes = require('../homeRoutes');

router.use('/users', userRoutes);
router.use('/events', eventRoutes); 

module.exports = router;
