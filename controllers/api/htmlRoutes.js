const express = require('express');
const router = express.Router();

// Route for homepage
router.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

// Route for login page
router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

router.get('/signup', (req, res) => {
    res.render('signup', { title: 'Signup' });
});

// Route for user's dashboard
router.get('/dashboard', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }

    res.render('dashboard', {
        title: 'Dashboard',
        user: req.session.user,
        //other data
    });
});

// Route for 404 
router.get('*', (req, res) => {
    res.status(404).send('404 Page Not Found');
});

module.exports = router;
