let achievements = JSON.parse(localStorage.getItem('achievements')) || [];

let achievementsList = document.getElementById('achievementsList');

// Clear out the current list
achievementsList.innerHTML = '';

// Add each achievement to the list
achievements.forEach(function(achievement) {
  let listItem = document.createElement('li');
  listItem.textContent = achievement;
  achievementsList.appendChild(listItem);
});