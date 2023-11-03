const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const routes = require('./routes/notesRoute');



app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);


// GET: /notes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

// GET: Wildcard 
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
})