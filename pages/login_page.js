document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    var users = JSON.parse(localStorage.getItem('users')) || [];

    var existingUser = users.find(function(user) {
        return user.username === username;
    });

    if(existingUser) {
        document.getElementById('errorMessage').textContent = 'Username already taken!';
        return;
    }
    users.push({username: username, password: password});

    localStorage.setItem('users', JSON.stringify(users));

    document.getElementById('errorMessage').textContent = 'Registration successful!';
});

document.getElementById('login').addEventListener('click', function() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    var users = JSON.parse(localStorage.getItem('users')) || [];

    var user = users.find(function(user) {
        return user.username === username && user.password === password;
    });

    if(user) {
        localStorage.setItem('currentUser', username);
        window.location.href = 'account_page.html';
    } else {
        document.getElementById('errorMessage').textContent = 'Invalid username or password!';
    }
});

document.getElementById('username').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById('login').click();
    }
});

document.getElementById('password').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById('login').click();
    }
});