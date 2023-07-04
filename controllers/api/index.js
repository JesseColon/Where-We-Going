const router = require('express').Router();
const userRoutes = require('./usersRoutes');
const eventRoutes = require('./eventsRoutes');
const htmlRoutes = require('./htmlRoutes');

router.use('/users', userRoutes);
//router.use('/events', eventRoutes);
router.use('/', htmlRoutes); 

module.exports = router;
