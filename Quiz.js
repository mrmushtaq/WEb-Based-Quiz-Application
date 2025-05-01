// Array to store the questions, options, and correct answers
const quizData = [
    {
        question: "Qno# 1. What is the capital of France?",
        options: ["a. Berlin", "b. Madrid", "c. Paris"],
        correctAnswer: 2 // Index of the correct answer in the options array
    },
    {
        question: "Qno# 2. Who is known as the father of Computer Science?",
        options: ["a. Charles Babbage", "b. Alan Turing", "c. Thomas Edison"],
        correctAnswer: 1
    },
    {
        question: "Qno# 3. Which is the largest planet in our Solar System?",
        options: ["a. Mars", "b. Jupiter", "c. Saturn"],
        correctAnswer: 1
    },
    {
        question: "Qno# 4. What is the square root of 64?",
        options: ["a. 6", "b. 8", "c. 10"],
        correctAnswer: 1
    }
];

// Track the current question index
let currentQuestionIndex = 0;

// Store user-selected answers (undefined by default)
let userAnswers = new Array(quizData.length).fill(undefined);

// Function to display the current question and its options
function displayQuestion() {
    const questionBox = document.getElementById("Qno");
    const optionsBox = document.getElementById("Options");
    const submitBtn = document.getElementById("submitBtn");

    // Get the current question data
    const currentQuestion = quizData[currentQuestionIndex];
    
    // Set the question text
    questionBox.innerText = currentQuestion.question;

    // Clear the previous options
    optionsBox.innerHTML = "";

    // Create new radio buttons for options
    currentQuestion.options.forEach((option, index) => {
        const optionElement = document.createElement("div");
        optionElement.innerHTML = `
            <input type="radio" id="radioBtn${index}" name="b" value="${index}" ${userAnswers[currentQuestionIndex] === index ? 'checked' : ''}>
            <label for="radioBtn${index}">${option}</label>
        `;
        optionsBox.appendChild(optionElement);
    });

    // Show/hide the Submit button depending on the current question index
    if (currentQuestionIndex === quizData.length - 1) {
        submitBtn.style.display = "block";
    } else {
        submitBtn.style.display = "none";
    }
}

// Function to go to the next question
function nextQuestion() {
    // Save the selected answer
    saveAnswer();

    if (currentQuestionIndex < quizData.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    }
}

// Function to go to the previous question
function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
}

// Function to save the currently selected answer
function saveAnswer() {
    const selectedOption = document.querySelector('input[name="b"]:checked');
    if (selectedOption) {
        userAnswers[currentQuestionIndex] = parseInt(selectedOption.value);
    }
}

// Function to submit the quiz and calculate the score
function submitQuiz() {
    saveAnswer();

    // Calculate the score
    let score = 0;
    quizData.forEach((question, index) => {
        if (userAnswers[index] === question.correctAnswer) {
            score++;
        }
    });

    // Display the result
    const resultBox = document.getElementById("resultBox");
    resultBox.innerHTML = `<h2>You scored ${score} out of ${quizData.length}</h2>`;
    resultBox.style.display = "block";

    // Disable further interaction with the quiz
    document.getElementById("QuestionBox").style.display = "none";
}

// Initial display of the first question
displayQuestion();
