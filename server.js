const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET: /notes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

// GET: /api/notes
app.get('/api/notes', (req, res) => {
    const notes = require('./db/db.json')
    res.json(notes)
})

// POST: /api/notes
app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;
    if (title && text) {
        const newNote = {
            title,
            text
        };
        const recentNote = JSON.stringify(newNote);
        const note = require('./db/db.json');
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
})

// GET: Wildcard 
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
})