const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const APIKEY = process.env.API_KEY; 

router.get('/', async (req, res) => {
    const { keyword, segmentName, postalCode, city, countryCode, stateCode } = req.query;

    let locationParam;
    if (postalCode) {
        locationParam = `postalCode=${postalCode}`;
    } else if (city) {
        locationParam = `city=${city}`;
    } else if (countryCode) {
        locationParam = `countryCode=${countryCode}`;
    } else if (stateCode) {
        locationParam = `stateCode=${stateCode}`;
    }

    const url = `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${keyword}&classificationId=${segmentName}&${locationParam}&apikey=${APIKEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while trying to fetch events' });
    }
});

module.exports = router;
