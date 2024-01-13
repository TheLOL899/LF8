const highscores = [
    { name: 'Alice', score: 43 },
    { name: 'Bob', score: 74 },
    { name: 'Charlie', score: 80 },
    { name: 'Dan', score: 50 },
    { name: 'Eli', score: 30 },
    { name: 'Frank', score: 36 },
    { name: 'Grace', score: 21 },
    { name: 'Heidi', score: 30 },
    { name: 'Ivan', score: 20 },
    { name: 'Judy', score: 10 },
];

highscores.sort((a, b) => b.score - a.score);

const highscoreList = document.getElementById('highscore-list');

highscores.forEach(highscore => {
    const li = document.createElement('li');
    li.textContent = `${highscore.name}: ${highscore.score}`;
    highscoreList.appendChild(li);
});