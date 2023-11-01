const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.static('public'));

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
    const notes = require('./db/db.json');
    notes.push(req.body)
    fs.writeFile('./db/db.json', JSON.stringify(notes, null, 2), err =>{
        if (err) {
            console.log(err)
        } else {
            console.log('Note Saved!');
            res.status(201).end();
        }
    })
})

// GET: Wildcard 
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
})