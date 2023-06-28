const router = require('express').Router();
const usercontroller = require('./usersController');
//const eventcontroller = require('./eventsController');

router.use('/users', usercontroller);
//router.use('/events', eventcontroller);

module.exports = router;