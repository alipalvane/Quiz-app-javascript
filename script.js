const startButton = document.getElementById("startBtn");
const nextButton = document.getElementById("nextBtn");
const qustionContainerElement = document.getElementById("questionContainer");
let shuffledQustions, currentQuestionIndex;
const questionElement = document.getElementById("question");
const answerBtnElement = document.getElementById("answerBtn");


const startGame = () => {
  console.log("start game");
  startButton.classList.add("hide");
  shuffledQustions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  qustionContainerElement.classList.remove("hide");
  setNextQuestion();
};

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

const setNextQuestion = () => {
  resetState();
  showQuestion(shuffledQustions[currentQuestionIndex]);
};

const showQuestion = (question) => {
  questionElement.innerHTML = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerBtnElement.appendChild(button);
  });
};

const resetState = () => {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerBtnElement.firstChild) {
    answerBtnElement.removeChild(answerBtnElement.firstChild);
  }
};
const selectAnswer = (e) => {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerBtnElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  nextButton.classList.remove("hide");
  if (shuffledQustions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
    nextButton.classList.add("hide")
  }
};

const setStatusClass = (element, correct) => {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
};

const clearStatusClass = (element) => {
  element.classList.remove("correct");
  element.classList.remove("wrong");
};

const questions = [
  {
    question: "2 + 2 = ? ",
    answers: [
      { text: "4", correct: true },
      { text: "18", correct: false },
      { text: "0", correct: false },
      { text: "9", correct: false },
    ],
  },
  {
    question: "2 + 10 = ? ",
    answers: [
      { text: "5", correct: false },
      { text: "28", correct: false },
      { text: "12", correct: true },
      { text: "-10", correct: false },
    ],
  },
];