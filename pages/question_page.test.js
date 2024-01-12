const {defaults} = require('jest-config');
const questionPage = require('./question_page');


// Import the necessary functions from the question_page.js file
const { shuffle, checkAnswer } = require('./question_page');

// Test the shuffle function
test('shuffle function should shuffle the array', () => {
    const array = [1, 2, 3, 4, 5];
    const shuffledArray = shuffle(array);
    expect(shuffledArray).not.toEqual(array);
});

// Test the checkAnswer function
test('checkAnswer function should color the button correctly', () => {
    const isCorrect = true;
    
    // Erstelle ein Mock-Element für den Button
    const button = document.createElement('button');
    button.style.backgroundColor = ''; // Setze den Hintergrund auf einen leeren String

    // Führe die checkAnswer-Funktion aus
    checkAnswer(isCorrect, button);

    // Überprüfe den berechneten Hintergrundfarbwert direkt aus dem Element
    const computedStyle = window.getComputedStyle(button);
    expect(computedStyle.backgroundColor).toBe('rgb(0, 128, 0)');
});

/*test('checkAnswer function should color the button correctly', () => {
    const isCorrect = false;
    const button = document.createElement('button');
    checkAnswer(isCorrect, button);
    expect(button.style.backgroundColor).toBe('red');
}); */
