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

        // Erstellung des Buttons für die korrekte Option
        const correctOptionButton = createOptionButton(currentQuestion.korrekteOption, 'correct');
        optionButtons.push(correctOptionButton); // Füge den Button für die korrekte Option hinzu

        // Zufällige Anordnung der Antwortmöglichkeiten-Buttons
        for (let i = optionButtons.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [optionButtons[i], optionButtons[j]] = [optionButtons[j], optionButtons[i]];
        }

        // Anzeige der Antwortmöglichkeiten-Buttons
        optionButtons.forEach(button => optionsContainer.appendChild(button));
    }

    // Funktion zur Erstellung der Antwortmöglichkeiten-Buttons
    function createOptionButton(optionText, optionKey) {
        const button = document.createElement('button');
        button.textContent = optionText;
        button.classList.add('option-button');
        button.dataset.correct = optionKey === 'correct'; // Add data attribute
        button.addEventListener('click', () => checkAnswer(optionKey, button));
        return button;
    }

    // Funktion zur Überprüfung der Antwort
    function checkAnswer(selectedOptionKey, button) {
        // Deaktiviere alle Buttons, damit der Benutzer nicht mehr klicken kann
        const optionButtons = document.querySelectorAll('.option-button');
        optionButtons.forEach(button => button.disabled = true);
    
        // Entferne alle vorherigen Rückmeldungen
        feedbackContainer.classList.remove('correct-feedback', 'wrong-feedback');
        button.classList.remove('correct-answer', 'wrong-answer');
    
        if (selectedOptionKey === 'correct') {
            // Zeige eine Rückmeldung für eine korrekte Antwort
            feedbackContainer.textContent = 'Richtig!';
            feedbackContainer.classList.add('correct-feedback');
            button.classList.add('correct-answer');
            correctAnswers++;
        } else {
            // Zeige eine Rückmeldung für eine falsche Antwort
            feedbackContainer.textContent = 'Falsch!';
            feedbackContainer.classList.add('wrong-feedback');
            button.classList.add('wrong-answer');
    
            // Finde den Button für die korrekte Antwort und füge die Klasse correct-answer hinzu
            const correctButton = Array.from(optionButtons).find(button => button.dataset.correct === 'true');
            if (correctButton) {
                correctButton.classList.remove('wrong-answer');
                correctButton.classList.add('correct-answer');
            }
        }
            // Erstellt den Button für die nächste Frage
            var nextButton = document.createElement("button");
            nextButton.textContent = "Nächste Frage";
            nextButton.classList.add("next-button");
            document.body.appendChild(nextButton);

            // Event-Listener für den Button für die nächste Frage
            nextButton.addEventListener('click', function() {
                this.remove();
                currentQuestionIndex++;
                if (currentQuestionIndex < 10) {
                    displayQuestion(allQuestions[currentQuestionIndex]);
                    console.log(allQuestions);
                } else {
                    saveScore(username, correctAnswers);
                    window.location.href = 'highscore_page.html';
                }
                // Entferne alle vorherigen feedbacks
                feedbackContainer.textContent = '';
                feedbackContainer.classList.remove('wrong-feedback');
            });

    }

    var username = localStorage.getItem('loggedInUser');

    function saveScore(username, score) {
        fetch('http://localhost:3000/api/score', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, score }),
        })
        .then(response => response.json())
        .then(data => console.log('Score saved:', data))
        .catch((error) => console.error('Error:', error));
    }

    let currentQuestionIndex = 0;
    let allQuestions = [];
    let correctAnswers = 0;

    // Fetch-GET-Aufruf, um die Fragen vom Server zu laden
    fetch('http://localhost:3000/api/fragen')
        .then(response => response.json())
        .then(questions => {
            allQuestions = questions;
            displayQuestion(allQuestions[currentQuestionIndex]);
        })
        .catch(error => console.error('Fehler beim Abrufen der Fragen:', error));
});