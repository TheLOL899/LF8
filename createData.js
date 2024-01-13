const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('quiz.db');

// Überprüfen und Aktualisieren der Tabelle
db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS fragen (id INTEGER PRIMARY KEY AUTOINCREMENT, frage TEXT, optionA TEXT, optionB TEXT, optionC TEXT, optionD TEXT, korrekteOption TEXT, kategorie TEXT)');

    // Daten einfügen
    const frageTaylorSwift = {
        frage: 'Welches Album von Taylor Swift hat die meisten Verkäufe?',
        optionA: 'Fearless',
        optionB: 'Speak Now',
        optionC: 'Red',
        korrekteOption: '1989',
        kategorie: 'Taylor Swift'
    };
    const frageTaylorSwift2 = {
        frage: 'Wie heißt die Katze von Taylor Swift, die auf dem Times Magazin Cover war?',
        optionA: 'Meredith Grey',
        optionB: 'Olivia Benson',
        optionC: 'Phoebe Buffay',
        korrekteOption: 'Benjamin Button',
        kategorie: 'Taylor Swift'
    };
    const frageEssen = {
        frage: 'Aus welchem Land stammt Sushi?',
        optionA: 'Fantasialand',
        optionB: 'Deutschland',
        optionC: 'Nimmerland',
        korrekteOption: 'Japan',
        kategorie: 'Essen'
    };
    const frageEssen2 = {
        frage: 'Was essen Kinder in Afrika?',
        optionA: 'Brot',
        optionB: 'Pizza',
        optionC: 'Staub',
        korrekteOption: 'Nichts',
        kategorie: 'Essen'
    };

    // Funktion zum Einfügen einer Frage
    const insertFrage = (frage) => {
        db.run('INSERT INTO fragen (frage, optionA, optionB, optionC, korrekteOption, kategorie) VALUES (?, ?, ?, ?, ?, ?)',
            [frage.frage, frage.optionA, frage.optionB, frage.optionC, frage.korrekteOption, frage.kategorie],
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
    insertFrage(frageTaylorSwift2);
    insertFrage(frageEssen);
    insertFrage(frageEssen2);
});

// Schließe die Datenbankverbindung
db.close();
