const router = require('express').Router();
const bycript = require('bcrypt');
const { User } = require('../../models');
const db = require('../../models');

// CREATE new user
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// LOGIN user
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { username: req.body.username } });
        if (!userData) {
            res.status(400).json({ message: 'Incorrect username or password, please try again' });
            return;
        }
        const validPassword = await userData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect username or password, please try again' });
            return;
        }
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.json({ user: userData, message: 'log in successful!' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// LOGOUT user
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

// Route to get all users
router.get('/users', (req, res) => {
    db.User.findAll() 
        .then(users => res.json(users))
        .catch(err => res.status(500).json(err));
});

// // Route to create a new user
// router.post('/users', (req, res) => {
//     db.User.create(req.body)
//         .then(newUser => res.json(newUser))
//         .catch(err => res.status(500).json(err));
// });

module.exports = router;
