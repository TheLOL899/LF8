document.querySelector('form').addEventListener('submit', function(event) {
    // Prevent the form from submitting normally
    event.preventDefault();

    // Capture the form data
    var player1 = document.getElementById('player1').value;
    var player2 = document.getElementById('player2').value;

    // Store the form data for use on the next page
    localStorage.setItem('player1', player1);
    localStorage.setItem('player2', player2);

    // Navigate to the new page
    window.location.href = 'multiplayer_questions.html';
});