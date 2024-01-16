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
        frage: 'Was braucht man nicht um einen guten Kuchen zu backen?',
        optionA: 'Eier und Schmalz',
        optionB: 'Zucker und Salz',
        optionC: 'Milch und Mehl',
        korrekteOption: 'Shokolade und Muskat',
        kategorie: 'Essen'
    };
    const frageGaming = {
        frage: 'Was ist die meisverkaufteste Videospielkonsole aller Zeiten?',
        optionA: 'Nindendo Wii',
        optionB: 'XBox 360',
        optionC: 'Atari 2600',
        korrekteOption: 'Playstation 2',
        kategorie: 'Gaming'
    };
    const frageGaming2 = {
        frage: 'Welches Spiel hat den ersten "Game Award for Game of the Year" gewonnen?',
        optionA: 'Dark Souls 2',
        optionB: 'The Witcher 3: Wild Hunt',
        optionC: 'Fallout 4',
        korrekteOption: 'Dragon Age: Inquisition',
        kategorie: 'Gaming'
    };
    const frageAnime = {
        frage: 'Wie heißt der Hauptcharakter aus dem Anime "Attack on Titan"?',
        optionA: 'Ichigo Kurosaki',
        optionB: 'Lelouch Lamperouge',
        optionC: 'Armin Arlert',
        korrekteOption: 'Eren Yeager',
        kategorie: 'Anime'
    };
    const frageAnime2 = {
        frage: 'Was ist ein "Gundam" im gleichnamigen Anime?',
        optionA: 'Ein Handgewehr',
        optionB: 'Ein Auto',
        optionC: 'Ein Netzwerk',
        korrekteOption: 'Ein Roboter',
        kategorie: 'Anime'
    };
    const frageRandom = {
        frage: 'An welche Zahl denke ich gerade?',
        optionA: '1',
        optionB: '2',
        optionC: '4',
        korrekteOption: '3',
        kategorie: 'Random'
    };
    const frageRandom2 = {
        frage: 'Links, Rechts, Oben oder Unten?',
        optionA: 'Links',
        optionB: 'Rechts',
        optionC: 'Oben',
        korrekteOption: 'Unten',
        kategorie: 'Random'
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
    insertFrage(frageGaming);
    insertFrage(frageGaming2);
    insertFrage(frageAnime);
    insertFrage(frageAnime2);
    insertFrage(frageRandom);
    insertFrage(frageRandom2);
});

// Schließe die Datenbankverbindung
db.close();
