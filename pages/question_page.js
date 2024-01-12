// Purpose: JavaScript for question_page.html

/*
 * Diese Funktion wird ausgeführt, sobald die Frage und deren Antworten geladen wurden.
 * Sie fügt die Antwortmöglichkeiten zu den Buttons hinzu und mischt die Buttons.
 */
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
/*
 * Diese Funktion wird ausgeführt, sobald der Nutzer eine Antwort auswählt.
 * Sie überprüft, ob die Antwort korrekt ist und färbt die Buttons entsprechend ein.
 */
function checkAnswer(isCorrect, button) {
    var correctButton = document.getElementById("correct");
    var buttons = document.querySelectorAll(".button-container button");
    var body = document.querySelector("body");

    buttons.forEach(function(btn) {
        btn.disabled = true;
        btn.classList.add("disabled");
    });

    var resultText = document.createElement("p");
    resultText.style.textAlign = "center";
    resultText.style.fontSize = "70px";

    if (isCorrect) {
        button.classList.add("correct-answer");
        resultText.textContent = "Correct!";
        resultText.style.color = "green";
    } else {
        button.classList.add("wrong-answer");
        correctButton.classList.add("correct-answer");
        resultText.textContent = "Incorrect!";
        resultText.style.color = "red";
    }

    var nextButton = document.createElement("button");
    nextButton.textContent = "Next Question";
    nextButton.classList.add("next-button");

    body.appendChild(resultText);
    body.appendChild(nextButton);
}

/* Zusatz für die Shuffle-Funktion */
var buttons = Array.from(document.querySelectorAll(".button-container button"));
shuffle(buttons);
var buttonContainer = document.querySelector(".button-container");
buttons.forEach(function(btn) {
    buttonContainer.appendChild(btn);
});

/* 
 * Diese Funktion wird ausgeführt, sobald die Seite geladen wurde.
 * Sie lädt die Frage von der API und fügt die Antwortmöglichkeiten
 * zu den Buttons hinzu.
 * Momentan wird diese Funktion nicht verwendet, da noch kein Zugriff auf die API besteht.
 */

/*
window.onload = function() {
    fetch('/api/fragen')
        .then(response => response.json())
        .then(question => {
            document.querySelector('h1').textContent = question.text;
            const buttons = Array.from(document.querySelectorAll('.button-container button'));
            buttons.forEach((button, index) => {
                button.textContent = question.answers[index];
                button.onclick = function() {
                    checkAnswer(question.correctAnswerIndex === index, this);
                };
            });
            shuffle(buttons);
            const buttonContainer = document.querySelector('.button-container');
            buttons.forEach(button => buttonContainer.appendChild(button));
        });
};
*/