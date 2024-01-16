global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

const { JSDOM } = require('jsdom');

// Mock localStorage
const localStorageMock = (function() {
  let store = {};
  return {
    getItem: function(key) {
      return store[key] || null;
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    clear: function() {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock document
const { document } = (new JSDOM('')).window;
global.document = document;

function updateHighscores() {
// Load highscores from localStorage or initialize to default if not present
const highscores = JSON.parse(localStorage.getItem('highscores')) || [];

const correctAnswers = JSON.parse(localStorage.getItem('correctAnswers'));
const currentUser = localStorage.getItem('currentUser');

// Check if currentUser already exists in highscores
let userExists = highscores.find(user => user.name === currentUser);

if (userExists) {
    // If user exists and new score is higher, update the score
    if (userExists.score < correctAnswers) {
        userExists.score = correctAnswers;
    }
} else {
    // If user doesn't exist, add them to highscores
    highscores.push({ name: currentUser, score: correctAnswers });
}

// Save highscores back to localStorage
localStorage.setItem('highscores', JSON.stringify(highscores));

console.log(correctAnswers);
console.log(currentUser);

highscores.sort((a, b) => b.score - a.score);

const highscoreList = document.getElementById('highscore-list');

highscores.forEach(highscore => {
    const li = document.createElement('li');
    li.textContent = `${highscore.name}: ${highscore.score}`;
    highscoreList.appendChild(li);
});
}

// Tests
describe('updateHighscores', () => {
  beforeEach(() => {
    // Reset localStorage and document before each test
    localStorage.clear();
    document.body.innerHTML = '<ul id="highscore-list"></ul>';
  });

  test('adds new user to highscores if not present', () => {
    localStorage.setItem('currentUser', 'Test User');
    localStorage.setItem('correctAnswers', JSON.stringify(5));

    updateHighscores();

    const highscores = JSON.parse(localStorage.getItem('highscores'));
    expect(highscores).toContainEqual({ name: 'Test User', score: 5 });
  });

  test('updates score if new score is higher', () => {
    localStorage.setItem('highscores', JSON.stringify([{ name: 'Test User', score: 3 }]));
    localStorage.setItem('currentUser', 'Test User');
    localStorage.setItem('correctAnswers', JSON.stringify(5));

    updateHighscores();

    const highscores = JSON.parse(localStorage.getItem('highscores'));
    expect(highscores).toContainEqual({ name: 'Test User', score: 5 });
  });

  test('does not update score if new score is lower', () => {
    localStorage.setItem('highscores', JSON.stringify([{ name: 'Test User', score: 5 }]));
    localStorage.setItem('currentUser', 'Test User');
    localStorage.setItem('correctAnswers', JSON.stringify(3));

    updateHighscores();

    const highscores = JSON.parse(localStorage.getItem('highscores'));
    expect(highscores).toContainEqual({ name: 'Test User', score: 5 });
  });
  
  test('adds user to highscores when highscores is initially empty', () => {
    localStorage.setItem('highscores', JSON.stringify([]));
    localStorage.setItem('currentUser', 'Test User');
    localStorage.setItem('correctAnswers', JSON.stringify(5));
  
    updateHighscores();
  
    const highscores = JSON.parse(localStorage.getItem('highscores'));
    expect(highscores).toContainEqual({ name: 'Test User', score: 5 });
  });
  
  test('correctly handles a tie in scores', () => {
    localStorage.setItem('highscores', JSON.stringify([
      { name: 'User 1', score: 5 },
      { name: 'User 2', score: 5 }
    ]));
    localStorage.setItem('currentUser', 'Test User');
    localStorage.setItem('correctAnswers', JSON.stringify(5));
  
    updateHighscores();
  
    const highscores = JSON.parse(localStorage.getItem('highscores'));
    expect(highscores).toContainEqual({ name: 'Test User', score: 5 });
    expect(highscores.filter(user => user.score === 5).length).toBe(3);
  });
});