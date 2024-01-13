window.onload = function() {
    // Retrieve the form data from local storage
    var player1 = localStorage.getItem('player1');
    var player2 = localStorage.getItem('player2');

    // Use the form data
    console.log('Player 1: ' + player1);
    console.log('Player 2: ' + player2);
};

// Clear the form data from local storage
localStorage.removeItem('player1');
localStorage.removeItem('player2');