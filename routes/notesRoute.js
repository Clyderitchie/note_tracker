const fs = require('fs');
const router = require('express').Router();
const { readAndRemove, readFromFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET: /api/notes
router.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then(data => res.json(JSON.parse(data)));
});

// POST: /api/notes
router.post('/notes', (req, res) => {
    const { title, text } = req.body;
    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid()
        };
        const note = require('../db/db.json');
        note.push(newNote);

        fs.writeFile('./db/db.json', JSON.stringify(note, null, 2), err => {
            if (err) {
                console.log(err)
            } else {
                console.log('Note was saved!');
                res.status(201).end();
            }
        })

        
    } else {
        console.log('Error adding note');
        res.status(500).end();
    }
});

router.delete('/notes/:id', (req, res) => {
    console.log(req.params.id);
    readAndRemove(req.params.id, './db/db.json');
    res.status(200).json('good');
})

module.exports = router;