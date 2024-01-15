const highscores = [
    { name: 'Alice', score: 10 },
];

highscores.sort((a, b) => b.score - a.score);

const highscoreList = document.getElementById('highscore-list');

highscores.forEach(highscore => {
    const li = document.createElement('li');
    li.textContent = `${highscore.name}: ${highscore.score}`;
    highscoreList.appendChild(li);
});