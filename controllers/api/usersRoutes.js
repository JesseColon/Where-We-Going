const router = require('express').Router();
const withAuth = require('../../utils/auth');
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
            res.redirect('/login');
        });
    } catch (err) {
        res.status(400).json(err);
        res.redirect('/signup');
    }
});

// LOGIN user
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });
        if (!userData) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }
        const validPassword = await userData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        req.session.save(err => {
            if (err) {
                return res.status(500).json(err);
            }
            // Redirect the user to the dashboard page
            res.redirect('/dashboard');
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// LOGOUT user
router.post('/logout', withAuth, async (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
    if (req.session.logged_in) {
        const userData = await User.findByPk(req.session.user_id);
        // Serialize the user data
        const user = userData.get({ plain: true });
        res.render('dashboard', { username: user.username });
    } else {
        res.status(500).json(err);
    }
});


// Route to get all users
router.get('/users', (req, res) => {
    db.User.findAll()
        .then(users => res.json(users))
        .catch(err => res.status(500).json(err));
});

 // Route to create a new user
 router.post('/users', (req, res) => {
     db.User.create(req.body)
         .then(newUser => res.json(newUser))
         .catch(err => res.status(500).json(err));
 });

module.exports = router;
