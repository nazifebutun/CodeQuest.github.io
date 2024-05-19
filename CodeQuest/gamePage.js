let questions = [];
let currentQuestionIndex = 0;

const questionButtons = document.querySelectorAll('.question-button');
const popup = document.getElementById('popup');
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
        } else {
            console.error('Failed to load questions');
        }
    };
    xhr.onerror = function() {
        console.error('Request error...');
    };
    xhr.send();
}

// Add click event to each button
questionButtons.forEach(button => {
    button.addEventListener('click', function() {
        currentQuestionIndex = parseInt(this.getAttribute('data-index'));  // Convert string to integer
        console.log('Current question index:', currentQuestionIndex);  // Check current question index
        showQuestion();
        popup.style.display = 'block';
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

// Show the question
function showQuestion() {
    if (questions.length > 0 && currentQuestionIndex < questions.length) {
        const questionObj = questions[currentQuestionIndex];
        popupBody.innerHTML = `<p>${questionObj.question}</p>`;
        answerInput.value = '';
    } else {
        console.error('Invalid question index or questions not loaded');
    }
}

// Check the answer
function checkAnswer() {
    const userAnswer = answerInput.value.trim();
    if (userAnswer === questions[currentQuestionIndex].answer) {
        alert('Correct answer!');
        popup.style.display = 'none';
    } else {
        alert('Wrong answer! Try again.');
    }
}

// Load questions when the page is loaded
window.onload = function() {
    loadQuestions();
};
