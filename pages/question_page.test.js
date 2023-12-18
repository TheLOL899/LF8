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
    const button = document.createElement('button');
    checkAnswer(isCorrect, button);
    expect(button.style.backgroundColor).toBe('green');
});

test('checkAnswer function should color the button correctly', () => {
    const isCorrect = false;
    const button = document.createElement('button');
    checkAnswer(isCorrect, button);
    expect(button.style.backgroundColor).toBe('red');
});
