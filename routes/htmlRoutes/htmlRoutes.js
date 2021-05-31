const path = require('path');
const router = require('express').Router();

// This directs a user to the index.html page if searched by `coolestsiteever.com/`
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

// If our users search for `/notes` after our address, they're directed to coolestsiteever.com/notes.html 
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/notes.html'));
});

// If our user types as well as I do and fat fingers some url, they're just taken back to index.html.
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

module.exports = router;
