const router = require('express').Router();
const userRoutes = require('./usersRoutes');
const eventRoutes = require('./eventsRoutes');
const searchRoutes = require('./searchRoutes');
router.use('/users', userRoutes);
router.use('/events', eventRoutes); 
router.use('/search', searchRoutes);
module.exports = router;
