const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 3000;

const db = new sqlite3.Database('quiz.db');
const corsOptions = {

    optionsSuccessStatus: 200,
  };
  
  app.use(cors(corsOptions));

app.use(express.json());


db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS fragen (id INTEGER PRIMARY KEY AUTOINCREMENT, frage TEXT, optionA TEXT, optionB TEXT, optionC TEXT, korrekteOption TEXT, kategorie TEXT)');
});

// Endpoint zum Abrufen aller Quizfragen
app.get('/api/fragen', (req, res) => {
    db.all('SELECT * FROM fragen', (err, rows) => {
        if (err) {
            console.error('Fehler beim Abrufen der Fragen:', err.message);
            res.status(500).json({ message: 'Interner Serverfehler' });
        } else {
            res.status(200).json(rows);
        }
    });
});

// Endpoint zum Erstellen einer Quizfrage mit Antwortoptionen
app.post('/api/fragen', (req, res) => {
    const { frage, optionA, optionB, optionC, korrekteOption, kategorie } = req.body;

    // Überprüfe, ob korrekteOption eine gültige Option ist (A, B, C oder D)
    if (!['A', 'B', 'C', 'D'].includes(korrekteOption)) {
        return res.status(400).json({ message: 'Ungültige korrekteOption. Verwende A, B, C oder D.' });
    }

    db.run('INSERT INTO fragen (frage, optionA, optionB, optionC, korrekteOption, kategorie) VALUES (?, ?, ?, ?, ?, ?, ?)', [frage, optionA, optionB, optionC, korrekteOption, kategorie], function (err) {
        if (err) {
            console.error('Fehler beim Erstellen der Frage:', err.message);
            return res.status(500).json({ message: 'Interner Serverfehler' });
        }

        console.log('Neue Frage erstellt mit ID:', this.lastID);
        res.status(201).json({ message: 'Frage erfolgreich erstellt', id: this.lastID });
    });
});
