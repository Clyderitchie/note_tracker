const router = require('express').Router();
const { readAndRemove } = require('../helpers/fsUtils');

// GET: /api/notes
router.get('/notes', (req, res) => {
    const notes = require('../db/db.json')
    res.json(notes)
});

// POST: /api/notes
router.post('/notes', (req, res) => {
    const { title, text } = req.body;
    if (title && text) {
        const newNote = {
            title,
            text
        };
        const recentNote = JSON.stringify(newNote);
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

        // const noteMade = {
        //     newNote
        //   };

        //   res.status(201).json(noteMade);
    } else {
        console.log('Error adding note');
        res.status(500).end();
    }
});

router.delete('/notes/:id', (req, res) => {
    readAndRemove(req.params.id, './db/db.json');
    res.status(204).end();
})

module.exports = router;