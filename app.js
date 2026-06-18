// DOM Objects
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionsSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question: "What is the capital of India?",
    answers: [
      { text: "london", correct: false },
      { text: "New Delhi", correct: true },
      { text: "Mumbai", correct: false },
      { text: "Ahmedabad", correct: false },
    ],
  },
  {
    question: "Who painted the famous painting 'The Starry Night'?",
    answers: [
      { text: "Leonardo da Vinci", correct: false },
      { text: "Vincent van Gogh", correct: true },
      { text: "Pablo Picasso", correct: false },
      { text: "Claude Monet", correct: false },
    ],
  },
  {
    question: "What is the largest planet in our solar system?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Saturn", correct: false },
      { text: "Jupiter", correct: true },
      { text: "Uranus", correct: false },
    ],
  },
  {
    question: "Who wrote the famous novel 'To Kill a Mockingbird'?",
    answers: [
      { text: "F. Scott Fitzgerald", correct: false },
      { text: "Harper Lee", correct: true },
      { text: "Jane Austen", correct: false },
      { text: "J.K. Rowling", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Ag", correct: true },
      { text: "Au", correct: false },
      { text: "Hg", correct: false },
      { text: "Pb", correct: false },
    ],
  },
];

// Quiz state

let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;

// Adding the Event Listeners to Navigate between sections

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  // reset Vars
  currentQuestionIndex = 0;
  scoreSpan.textContent = 0;
  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  // reset state
  answersDisabled = false;
  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionsSpan.textContent = currentQuestionIndex + 1;
  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  // reset the answer buttons
  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");

    // create a dataset attribute

    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);

    answersContainer.appendChild(button);
  });
}
function selectAnswer(event) {
  //optimization check
  if (answersDisabled) return;

  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";
  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });
  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }
  setTimeout(() => {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");
  maxScoreSpan.textContent = quizQuestions.length
  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You're a genius";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Excellent work!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good job!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "You passed, but there's room for improvement.";
  } else {
    resultMessage.textContent = "Keep practicing and try again!";
  }
}

function restartQuiz() {
    resultScreen.classList.remove("active")

    score = 0
    startQuiz()
}
