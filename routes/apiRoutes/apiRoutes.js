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


fs.readFile("db/db.json", "utf8", (err, data) => {
    let notes = JSON.parse(data);
    router.post("/notes", (req, res) => {
        let newNote = req.body;
        newNote.id = uuidv4();
        notes.push(newNote);
        fs.writeFile('./db/db.json', JSON.stringify(notes), (err, data) => {
            if (err) throw err
        })
        res.json(newNote)
    });
});

fs.readFile("db/db.json", "utf8", (err, data) => {
    let notes = JSON.parse(data);
    router.delete('/notes/:id', (req, res) => {
        const postDeleteArray = filterId(req.params.id, notes);
        res.send(postDeleteArray)
    })
})

// router.delete('/notes/:id', (req, res) => {
//     // Using a variable to say "id" easier
//     let id = req.params.id;
//     // This is a new array that filters through db.json. If the id of the note doesn't match the deleted id, it's added to `notesToSave`. A matching id is ignored, so effectively deleted.
//     let notesToSave = notes.filter((note) => {
//         return note.id !== id;
//     })
//     let currentNotes = require('../../db/db');
//     fs.writeFile('./db/db.json', JSON.stringify(notesToSave), (err, data) => {
//         if (err) throw err
//     })
//     res.json(currentNotes)
// })


module.exports = router;