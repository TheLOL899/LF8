let params = new URLSearchParams(window.location.search);
let achievement = params.get('achievement');
if (achievement === '10correct') {
    // Display the achievement
    console.log("Achievement '10correct' received"); // Debug check

    // Save the achievement to localStorage
    localStorage.setItem('10correct', true);

    // Create a new paragraph element
    let achievementElement = document.createElement('p');
    // Set the text of the element to the achievement message
    achievementElement.textContent = "Congratulations! You have received the '10 correct' achievement!";
    // Append the element to the body of the document
    document.body.appendChild(achievementElement);
}