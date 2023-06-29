const router = require('express').Router();
const usercontroller = require('./usersRoutes');
const eventR = require('./eventsRoutes');

router.use('/users', usercontroller);
router.use('/events', eventcontroller);

module.exports = router;