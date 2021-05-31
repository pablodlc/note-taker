const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const { filterByQuery, findById, createNewNote, validateNote } = require('../../lib/notes');
const notes = require('../../db/db');
// Installed UUID to give notes ids
const { v4: uuidv4 } = require('uuid');

router.get("/notes", (req, res) => {
    res.json(notes);
});


// router.get('/api/notes', (req, res) => {
//     fs.readFile('../../db/db', (err, data) => {
//         if (err) throw err
//         res.json(data);
//     });
// });

// router.get('/notes/:id', (req, res) => {
//     const result = findById(req.params.id, notes);
//     if (result) {
//         res.json(result);
//     } else {
//         res.send(404);
//     }
// });

router.post('/notes', (req, res) => {
    // set id based on what the next index of the array will be
    console.log(notes);
    req.body.id = notes.length.toString();

    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});

module.exports = router;