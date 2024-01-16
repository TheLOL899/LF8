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