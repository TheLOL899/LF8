document.addEventListener('DOMContentLoaded', () => {
    const questionContainer = document.getElementById('question-container');
    const optionsContainer = document.getElementById('options-container');
    const feedbackContainer = document.getElementById('feedback-container');

    // Funktion zum Anzeigen der aktuellen Frage
    function displayQuestion(currentQuestion) {
        // Anzeige der Frage
        questionContainer.textContent = currentQuestion.frage;

        // Löschen der vorherigen Antwortmöglichkeiten-Buttons
        optionsContainer.innerHTML = '';

        // Erstellung der Antwortmöglichkeiten-Buttons mit dem Text aus dem JSON-Objekt
        const optionKeys = ['A', 'B', 'C'];
        const optionButtons = optionKeys.map(optionKey => {
            const optionText = currentQuestion[`option${optionKey}`];
            return createOptionButton(optionText, optionKey);
        });

        // Anzeige der Antwortmöglichkeiten-Buttons
        optionButtons.forEach(button => optionsContainer.appendChild(button));

        // Erstellung des Buttons für die korrekte Option
        const correctOptionButton = createOptionButton(currentQuestion.korrekteOption, 'correct');
        optionsContainer.appendChild(correctOptionButton);
    }

    // Funktion zur Erstellung der Antwortmöglichkeiten-Buttons
    function createOptionButton(optionText, optionKey) {
        const button = document.createElement('button');
        button.textContent = optionText;
        button.classList.add('option-button');
        button.addEventListener('click', () => checkAnswer(optionKey));
        return button;
    }

    // Funktion zur Überprüfung der Antwort
    function checkAnswer(selectedOptionKey) {
        if (selectedOptionKey === 'correct') {
            // Zeige "Correct" an, wenn der Button für die korrekte Option ausgewählt wurde
            feedbackContainer.textContent = 'Correct';
        } else {
            // Hier kannst du optional eine Rückmeldung für eine falsche Antwort implementieren
             feedbackContainer.textContent = 'Incorrect';
        }
    }

    // Fetch-GET-Aufruf, um die Fragen vom Server zu laden
    fetch('http://localhost:3000/api/fragen')
        .then(response => response.json())
        .then(questions => {
            // Starte das Quiz mit der ersten Frage
            displayQuestion(questions[0]);

            // Optional: Hier kannst du Logik hinzufügen, um durch weitere Fragen zu iterieren
            // und das Quiz dynamisch zu gestalten.
        })
        .catch(error => console.error('Fehler beim Abrufen der Fragen:', error));
});
