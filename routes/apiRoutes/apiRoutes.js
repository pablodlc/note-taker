const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const filterId = require('../../lib/script');
// Adding variable `notes` to access my database easily

// Installed UUID to give notes ids. Learned about this and much of this code in class today with Cody H. and our office hours sub, Phil Cowan.
const { v4: uuidv4 } = require('uuid');

// If there's a request for notes in the path, `res.json(notes)` returns the notes to the page.
router.get('/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err
        res.json(JSON.parse(data));
    });
});

// Reads db.json
fs.readFile("db/db.json", "utf8", (err, data) => {
    let notes = JSON.parse(data);
    // Post a new note
    router.post("/notes", (req, res) => {
        // giving it a variable
        let newNote = req.body;
        // and an id using UUID.
        newNote.id = uuidv4();
        notes.push(newNote);
        // Writes the notes, including the new one, to the page
        fs.writeFile('./db/db.json', JSON.stringify(notes), (err, data) => {
            if (err) throw err
        })
        res.json(newNote)
    });
});

// Delete route
fs.readFile("db/db.json", "utf8", (err, data) => {
    let notes = JSON.parse(data);
    router.delete('/notes/:id', (req, res) => {
        // declaring an array to push the saved notes into using `filterById()`
        const postDeleteArray = filterId(req.params.id, notes);
        res.send(postDeleteArray)
    })
})

module.exports = router;