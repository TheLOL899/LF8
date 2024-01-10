document.addEventListener('DOMContentLoaded', function() {
    var achievements = [
        { name: 'Answered 10 questions correctly', earned: false },
        // Add more achievements here
    ];

    var achievementsDiv = document.getElementById('achievements');
    achievements.forEach(function(achievement) {
        var achievementElement = document.createElement('p');
        achievementElement.textContent = achievement.name;
        if (!achievement.earned) {
            achievementElement.style.color = 'gray';
        }
        achievementsDiv.appendChild(achievementElement);
    });
});