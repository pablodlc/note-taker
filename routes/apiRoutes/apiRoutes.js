const router = require('express').Router();
const fs = require('fs');
const path = require('path');
// Adding variable `notes` to access my database easily
const notes = require('../../db/db');

// Installed UUID to give notes ids. Learned about this and much of this code in class today with Cody H. and our office hours sub, Phil Cowan.
const { v4: uuidv4 } = require('uuid');

// If there's a request for notes in the path, `res.json(notes)` returns the notes to the page.
router.get("/notes", (req, res) => {
    res.json(notes);
});

router.post('/notes', (req, res) => {
    // `newNote` is created to hold the user's input
    const newNote = req.body;
    // Using UUID to give the note a unique id, making it easier to delete
    newNote.id = uuidv4();
    // Here we're pushing `newNote` into `notes`, aka db.json.
    notes.push(newNote);
    fs.writeFile('./db/db.json', JSON.stringify(notes), (err, data) => {
        if (err) throw err
    })
    res.json(notes)
});

router.delete('/notes/:id', (req, res) => {
    // let
    // Using a variable to say "id" easier
    let id = req.params.id;
    // This is a new array that filters through db.json. If the id of the note doesn't match the deleted id, it's added to `notesToSave`. A matching id is ignored, so effectively deleted.
    let notesToSave = notes.filter((note) => {
        return note.id !== id;
    })
    fs.writeFile('./db/db.json', JSON.stringify(notesToSave), (err, data) => {
        if (err) throw err
    })
    res.json(notes)
})

module.exports = router;