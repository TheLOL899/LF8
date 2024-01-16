document.getElementById('startButton').addEventListener('click', function() {
    window.location.href = 'questions_with_api_page.html';
});

document.getElementById('multiplayerButton').addEventListener('click', function() {
    window.location.href = 'multiplayer_setup_page.html';
});

document.getElementById('achievmentsButton').addEventListener('click', function() {
    window.location.href = 'achievment_page.html';
});

document.getElementById('highscoreButton').addEventListener('click', function() {
    window.location.href = 'highscore_page.html';
});

document.getElementById('logoutButton').addEventListener('click', function() {
    window.location.href = 'login_page.html';
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'h') {
        document.getElementById('helpText').innerText =
            'Starten: Starte das Quiz mit 10 Fragen.\n' +
            'Mehrspieler: Starte das Quiz mit einer anderen Person.\n' +
            'Achievments: Erreichbare und schon erreichte Achievments.\n' +
            'Rangliste: Eine Rangliste in der man sein Highscore mit anderen vergleichen kann.\n' +
            'Ausloggen: Logge dich aus und kehre zum Login zurück.';
        document.getElementById('helpModal').style.display = 'block';
    }
});

document.getElementsByClassName('close')[0].addEventListener('click', function() {
    document.getElementById('helpModal').style.display = 'none';
});