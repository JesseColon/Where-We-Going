const express = require('express');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ secret: 'super secret', resave: true, saveUninitialized: true }));

app.get('/', (req, res) => {
    res.send('Welcome to the Home Page!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
