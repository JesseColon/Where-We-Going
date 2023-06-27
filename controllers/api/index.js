const router = require('express').Router();
const usercontroller = require('./usercontroller');
const eventcontroller = require('./eventcontroller');

router.use('/users', usercontroller);
router.use('/events', eventcontroller);

module.exports = router;