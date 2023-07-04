const router = require('express').Router();
const apiRoutes = require('./api');
const htmlRoutes = require('./api/htmlRoutes'); // Import the HTML routes

router.use('/api', apiRoutes);
router.use('/', htmlRoutes); // Use the HTML routes for the root URL

module.exports = router;
