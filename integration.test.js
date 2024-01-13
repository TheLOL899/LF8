const { execSync } = require('child_process');
const request = require('supertest');
const { app } = require('./serverApi');

const testPort = 3001; // Verwende einen freien Port
let testapp;

beforeAll((done) => {
    execSync('node createdata.js');
  testapp = app.listen(testPort, done);
});

afterAll((done) => {
    testapp.close(() => {
        done();
    });
});

test('sollte alle Quizfragen abrufen', async () => {
    const response = await request(testapp).get('/api/fragen');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
});

test('sollte eine Quizfrage erstellen, aktualisieren und löschen', async () => {
    const neueFrage = {
        frage: 'Testfrage',
        optionA: 'Option A',
        optionB: 'Option B',
        optionC: 'Option C',
        korrekteOption: 'A',
        kategorie: 'Testkategorie',
    };

    // Erstelle eine neue Frage
    const createResponse = await request(testapp).post('/api/fragen').send(neueFrage);
    expect(createResponse.status).toBe(201);
    const neueFrageId = createResponse.body.id;

    // Aktualisiere die Frage
    const updateResponse = await request(testapp).put(`/api/fragen/${neueFrageId}`).send({ ...neueFrage, frage: 'Geänderte Testfrage' });
    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.message).toBe('Frage erfolgreich aktualisiert');

    // Lösche die Frage
    const deleteResponse = await request(testapp).delete(`/api/fragen/${neueFrageId}`);
    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body.message).toBe('Frage erfolgreich gelöscht');
});
