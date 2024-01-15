// Dummy test, um sicherzustellen, dass Tests funktionieren
test('Dummy Test', () => {
    const result = 2 + 2;
    expect(result).toBe(4);
  });

const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

// Lade die JavaScribt-Datei in eine Dom-Instanz
const jsFilePath = path.join(__dirname, 'questions_with_api_page.js');
const jsFileContent = fs.readFileSync(jsFilePath, 'utf-8');
const dom = new JSDOM(`<!DOCTYPE html><body><div id="question-container"></div><div id="options-container"></div><div id="feedback-container"></div></body></html>`, { runScripts: 'dangerously' });
const window = dom.window;
const document = window.document;

// Evaluiere die JavaScript-Datei in der Dom-Instanz
eval(jsFileContent);

test('Initial question is displayed', () => {
    expect(document.getElementById('question-container').textContent).toBe(allQuestions[0].frage);
});

test('Options are displayed for the initial question', () => {
    const options = document.getElementById('options-container').children;
    expect(options.length).toBeGreaterThan(0);
});

test('Feedback container is initially empty', () => {
    expect(document.getElementById('feedback-container').textContent).toBe('');
});

test('Clicking on the correct option displays correct feedback', () => {
    const correctButton = Array.from(document.querySelectorAll('.option-button')).find(button => button.dataset.correct === 'true');
    correctButton.click();
    expect(document.getElementById('feedback-container').textContent).toBe('Richtig!');
});

test('Clicking on the next question button displays the next question', () => {
    const nextButton = document.querySelector('.next-button');
    nextButton.click();
    expect(document.getElementById('question-container').textContent).toBe(allQuestions[1].frage);
});