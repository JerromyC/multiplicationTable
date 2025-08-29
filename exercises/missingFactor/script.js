let currentA, currentB, missingSide;
let correct = 0, wrong = 0, total = 0;

const game = document.getElementById("game");
const problemEl = document.getElementById("problem");
const answerInput = document.getElementById("answerInput");
const feedbackEl = document.getElementById("feedback");
const scoreEl = document.getElementById("score");
const submitBtn = document.getElementById("submitBtn");

function newProblem() {
  game.style.backgroundColor = "white";
  currentA = Math.floor(Math.random() * 10) + 1;
  currentB = Math.floor(Math.random() * 10) + 1;
  missingSide = Math.random() < 0.5 ? "A" : "B"; // randomly hide one factor

  if (missingSide === "A") {
    problemEl.textContent = `? × ${currentB} = ${currentA * currentB}`;
  } else {
    problemEl.textContent = `${currentA} × ? = ${currentA * currentB}`;
  }

  answerInput.value = "";
  feedbackEl.textContent = "";
  answerInput.focus();
}

function checkAnswer() {
  const userAnswer = parseInt(answerInput.value);
  let correctAnswer = (missingSide === "A") ? currentA : currentB;

  total++;
  if (userAnswer === correctAnswer) {
    correct++;
    feedbackEl.textContent = "Correct!";
    feedbackEl.style.color = "green";
    game.style.backgroundColor = "lightGreen";
  } else {
    wrong++;
    feedbackEl.textContent = `Wrong, it was ${correctAnswer}`;
    feedbackEl.style.color = "red";
    game.style.backgroundColor = "#f8d7da";
  }

  scoreEl.textContent = `Score: ${correct}/${total}`;
  setTimeout(newProblem, 1000);
}

submitBtn.addEventListener("click", checkAnswer);
answerInput.addEventListener("keydown", e => {
  if (e.key === "Enter") checkAnswer();
});

newProblem();
