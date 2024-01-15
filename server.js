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

module.exports = { app };

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

    db.run('INSERT INTO fragen (frage, optionA, optionB, optionC, korrekteOption, kategorie) VALUES (?, ?, ?, ?, ?, ?)', [frage, optionA, optionB, optionC, korrekteOption, kategorie], function (err) {
        if (err) {
            console.error('Fehler beim Erstellen der Frage:', err.message);
            return res.status(500).json({ message: 'Interner Serverfehler' });
        }

        console.log('Neue Frage erstellt mit ID:', this.lastID);
        res.status(201).json({ message: 'Frage erfolgreich erstellt', id: this.lastID });
    });
});

app.post('/api/score', (req, res) => {
    const { username, score } = req.body;

        db.run('INSERT INTO highscore (username, score) VALUES (?, ?)', [username, score], function (err) {
            if (err) {
                console.error('Fehler beim Erstellen des Score:', err.message);
                return res.status(500).json({ message: 'Interner Serverfehler' });
            }

        res.json({ message: 'Score saved' });
    });
});

app.delete('/api/fragen/:id', (req, res) => {
    const id = req.params.id;

    db.run('DELETE FROM fragen WHERE id = ?', [id], function (err) {
        if (err) {
            console.error('Fehler beim Löschen der Frage:', err.message);
            return res.status(500).json({ message: 'Interner Serverfehler' });
        }

        if (this.changes === 0) {
            return res.status(404).json({ message: 'Frage nicht gefunden' });
        }

        console.log('Frage gelöscht mit ID:', id);
        res.status(200).json({ message: 'Frage erfolgreich gelöscht' });
    });
});

app.put('/api/fragen/:id', (req, res) => {
    const id = req.params.id;
    const { frage, optionA, optionB, optionC, korrekteOption, kategorie } = req.body;

    db.run('UPDATE fragen SET frage = ?, optionA = ?, optionB = ?, optionC = ?, korrekteOption = ?, kategorie = ? WHERE id = ?', 
        [frage, optionA, optionB, optionC, korrekteOption, kategorie, id], 
        function (err) {
            if (err) {
                console.error('Fehler beim Aktualisieren der Frage:', err.message);
                return res.status(500).json({ message: 'Interner Serverfehler' });
            }

            if (this.changes === 0) {
                return res.status(404).json({ message: 'Frage nicht gefunden' });
            }

            console.log('Frage aktualisiert mit ID:', id);
            res.status(200).json({ message: 'Frage erfolgreich aktualisiert' });
        });
});

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
}); 