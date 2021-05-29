const router = require('express').Router();
const { notes } = require("../../db/db.json");

const path = require('path');
const fs = require("fs");


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

router.get('/notes', (req, res) => {
    let results = notes;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(db);
});

router.post('/notes', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = notes.length.toString();

    if (!validateNotes(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});

router.post('/notes', (req, res) => {
    const newNote = req.body;
    console.log(newNote)
    notes.push(newNote);
    // step 2: now that you have the info from newNote, you need to write to the db.json file - npm package fs
    // push htmlBody to db.json, fs.writeFile
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ db }, null, 2)
    );
    res.json(db);
    return db;
});



module.exports = router;