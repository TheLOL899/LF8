const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('quiz.db');

// Überprüfen und Aktualisieren der Tabelle
db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS fragen (id INTEGER PRIMARY KEY AUTOINCREMENT, frage TEXT, optionA TEXT, optionB TEXT, optionC TEXT, optionD TEXT, korrekteOption TEXT, kategorie TEXT)');

    // Daten einfügen
    const frageTaylorSwift = {
        frage: 'Welches Album von Taylor Swift hat die meisten Verkäufe?',
        optionA: 'Fearless',
        optionB: '1989',
        optionC: 'Red',
        optionD: 'Speak Now',
        korrekteOption: 'B',
        kategorie: 'Taylor Swift'
    };

    // Funktion zum Einfügen einer Frage
    const insertFrage = (frage) => {
        db.run('INSERT INTO fragen (frage, optionA, optionB, optionC, optionD, korrekteOption, kategorie) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [frage.frage, frage.optionA, frage.optionB, frage.optionC, frage.optionD, frage.korrekteOption, frage.kategorie],
            (err) => {
                if (err) {
                    console.error('Fehler beim Einfügen der Frage:', err.message);
                } else {
                    console.log('Frage erfolgreich eingefügt:', frage.frage);
                }
            });
    };

    // Daten einfügen
    insertFrage(frageTaylorSwift);
});

// Schließe die Datenbankverbindung
db.close();