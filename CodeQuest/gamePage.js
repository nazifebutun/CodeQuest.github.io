let questions = [];
let currentQuestionIndex = 0;

const questionButtons = document.querySelectorAll('.question-button');
const popup = document.getElementById('popup');
const congratsPopup = document.getElementById('congratsPopup');
const popupBody = document.getElementById('popupBody');
const answerInput = document.getElementById('answer');
const submitAnswerButton = document.getElementById('submitAnswer');
const closeButton = document.getElementsByClassName('close')[0];

// Load questions via AJAX
function loadQuestions() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'questions.json', true);
    xhr.onload = function() {
        if (this.status === 200) {
            questions = JSON.parse(this.responseText);
            console.log('Questions loaded:', questions);  // Check if questions are loaded
            initializeButtons();  // Initialize buttons after questions are loaded
        } else {
            console.error('Failed to load questions');
        }
    };
    xhr.onerror = function() {
        console.error('Request error...');
    };
    xhr.send();
}

// Initialize buttons: disable all except the first one
function initializeButtons() {
    questionButtons.forEach((button, index) => {
        if (index !== 0) {
            button.disabled = true;
            button.style.filter = 'grayscale(100%)';
        }
    });
}

// Add click event to each button
questionButtons.forEach(button => {
    button.addEventListener('click', function() {
        if (!this.disabled) {
            currentQuestionIndex = parseInt(this.getAttribute('data-index'));  // Convert string to integer
            console.log('Current question index:', currentQuestionIndex);  // Check current question index
            showQuestion();
            popup.style.display = 'block';
        }
    });
});

// Close the popup
closeButton.addEventListener('click', function() {
    popup.style.display = 'none';
});

// Close the popup when clicking anywhere outside of it
window.addEventListener('click', function(event) {
    if (event.target == popup) {
        popup.style.display = 'none';
    }
});

// Check the answer when the submit button is clicked
submitAnswerButton.addEventListener('click', function() {
    checkAnswer();
});


// Function to show the question and image
function showQuestion() {
    if (questions.length > 0 && currentQuestionIndex < questions.length) {
        const questionObj = questions[currentQuestionIndex];
        popupBody.innerHTML = `<p>${questionObj.question}</p>`;
        answerInput.value = '';
        popup.style.display = 'block'; // Show the popup
    } else {
        console.error('Invalid question index or questions not loaded');
    }
}

window.onload = function() {
    loadQuestions();
};


// Close the popup
closeButton.addEventListener('click', function() {
    popup.style.display = 'none';
});

// Close the popup when clicking anywhere outside of it
window.addEventListener('click', function(event) {
    if (event.target == popup) {
        popup.style.display = 'none';
    }
});

// Event listener for question buttons
questionButtons.forEach(button => {
    button.addEventListener('click', function() {
        if (!this.disabled) {
            currentQuestionIndex = parseInt(this.getAttribute('data-index'));  // Convert string to integer
            showQuestion();
        }
    });
});

// Check the answer
submitAnswerButton.addEventListener('click', function() {
    checkAnswer();
});

function checkAnswer() {
    const userAnswer = answerInput.value.trim();
    if (userAnswer === questions[currentQuestionIndex].answer) {
        const currentQuestionNumber = currentQuestionIndex + 1;
        const nextQuestionNumber = currentQuestionNumber + 1;
        const totalQuestions = questions.length;
        let message = "";

        if (nextQuestionNumber <= totalQuestions) {
            message = `Congratulations! You completed step ${currentQuestionNumber} and unlocked step ${nextQuestionNumber}. You are one step closer to the grand prize!`;
        } else {
            message = "Congratulations! You've completed all questions. Stay tuned for the next levels!";
            createConfetti();
        }

        document.getElementById('congratsMessage').textContent = message;
        congratsPopup.style.display = 'block'; // Display congrats popup
        setTimeout(() => { // After 3 seconds, hide the congrats popup
            congratsPopup.style.display = 'none';
        }, 3000);

        questionButtons[currentQuestionIndex].classList.add('shining');  // Add shining effect
        questionButtons[currentQuestionIndex].disabled = true;  // Disable the current button
        questionButtons[currentQuestionIndex].style.filter = 'none';  // Remove grayscale
        popup.style.display = 'none';

        // Unlock the next button if there is one
        if (currentQuestionIndex + 1 < questionButtons.length) {
            questionButtons[currentQuestionIndex + 1].disabled = false;
            questionButtons[currentQuestionIndex + 1].style.filter = 'none';  // Remove grayscale from the next button
        }
    } else {
        // Yanlış cevap
        const wrongMessage = document.getElementById('wrongMessage');
        wrongMessage.textContent = 'Wrong answer, but don\'t be discouraged! Try your luck again';
        wrongPopup.style.display = 'block';

        // 2 saniye sonra popup'ı gizle
        setTimeout(() => {
            wrongPopup.style.display = 'none';
        }, 3000);
    }
}

function createConfetti() {
    const confettiContainer = document.getElementById('confettiContainer');
    const colors = ['#f00', '#0f0', '#00f', '#ff0', '#f0f', '#0ff'];
    const numConfetti = 200;

    for (let i = 0; i < numConfetti; i++) {
        const confetti = document.createElement('div');
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.position = 'absolute';
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.animation = 'falling 4s linear infinite';
        confetti.style.animationDelay = `${Math.random() * 4}s`; // Konfeti parçacıklarının rastgele zamanlarda başlamasını sağlar

        confettiContainer.appendChild(confetti);
    }

    document.getElementById('congratsImage').src = 'images/cup.png';
}

function fetchQuotes() {
    console.log('Fetching quotes...');
    fetch('https://type.fit/api/quotes')
        .then(response => response.json())
        .then(data => {
            // Filter out the 'type.fit' part from the author field
            const filteredData = data.map(quote => {
                const author = quote.author.replace(', type.fit', '');
                return { ...quote, author };
            });
            displayQuotesPopup(filteredData);
        })
        .catch(error => {
            console.error('Error fetching quotes:', error);
        });
}



// Function to display motivational quotes as a popup
function displayQuotesPopup(quotes) {
    const popup = document.getElementById('quotesPopup');
    popup.innerHTML = ''; // Clear any existing quotes
        const quote = quotes[Math.floor(Math.random() * quotes.length)];
        const quoteElement = document.createElement('div');
        quoteElement.className = 'quote';
        quoteElement.textContent = `"${quote.text}" - ${quote.author || 'Unknown'}`;
        popup.appendChild(quoteElement);
    // Show the popup
    popup.style.display = 'block';
    setTimeout(() => {
        popup.style.display = 'none';
    }, 3000);
}

// Event listener for fetching quotes
document.getElementById('fetchQuotesButton').addEventListener('click', fetchQuotes);
