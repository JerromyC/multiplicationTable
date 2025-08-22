let currentA = 1;
let currentB = 1;
let correct = 0;
let wrong = 0;
let startTime;
let firstAttempt = true; // track if current problem is first try

// Elements
const startBtn = document.getElementById("startBtn");
const quiz = document.getElementById("quiz");
const results = document.getElementById("results");
const problem = document.getElementById("problem");
const answerInput = document.getElementById("answer");
const submitBtn = document.getElementById("submitBtn");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const starsDisplay = document.getElementById("stars");
const restartBtn = document.getElementById("restartBtn");
const tableContainer = document.getElementById("tableContainer");
const table = document.getElementById("multiplicationTable");

function showProblem() {
  problem.textContent = `${currentA} × ${currentB}`;
  answerInput.value = "";
  answerInput.focus();
  firstAttempt = true; // reset for each problem
}

function nextProblem() {
  if (currentB < 9) {
    currentB++;
  } else {
    currentB = 1;
    currentA++;
  }
}

function endGame() {
  quiz.classList.add("hidden");
  results.classList.remove("hidden");

  const totalTime = Math.floor((Date.now() - startTime) / 1000);

  scoreDisplay.textContent = `Correct: ${correct}, Wrong: ${wrong}`;
  timeDisplay.textContent = `Time: ${totalTime} seconds`;

  // Star rating logic
  let stars = "⭐".repeat(3);
  if (wrong > 5) stars = "⭐⭐";
  if (wrong > 10) stars = "⭐";
  starsDisplay.textContent = `Rating: ${stars}`;
}

function createTable(size = 9) {
  table.innerHTML = "";

  // Header row
  let headerRow = "<tr><th>×</th>";
  for (let i = 1; i <= size; i++) {
    headerRow += `<th>${i}</th>`;
  }
  headerRow += "</tr>";
  table.innerHTML += headerRow;

  // Table rows
  for (let a = 1; a <= size; a++) {
    let row = `<tr><th>${a}</th>`;
    for (let b = 1; b <= size; b++) {
      row += `<td id="cell-${a}-${b}" class="unsolved">${a}×${b}</td>`;
    }
    row += "</tr>";
    table.innerHTML += row;
  }
}

function markSolved(a, b, isFirstTry) {
  const cell = document.getElementById(`cell-${a}-${b}`);
  if (cell) {
    cell.textContent = a * b;
    cell.classList.remove("unsolved", "wrong-attempt");
    cell.classList.add("solved");
    if (isFirstTry) {
      cell.classList.add("correct-first"); // green
    } else {
      cell.classList.add("corrected"); // yellow
    }
  }
}

function checkAnswer() {
  const userAnswer = parseInt(answerInput.value);
  const correctAnswer = currentA * currentB;

  if (userAnswer === correctAnswer) {
    correct++;
    markSolved(currentA, currentB, firstAttempt);
    nextProblem();
    if (currentA > 9) {
      endGame();
    } else {
      showProblem();
    }
  } else {
    wrong++;
    firstAttempt = false; // no longer first try
    const cell = document.getElementById(`cell-${currentA}-${currentB}`);
    if (cell) {
      cell.classList.add("wrong-attempt"); // highlight red while unsolved
    }
    answerInput.value = "";
    answerInput.focus();
  }
}

// Event Listeners
startBtn.addEventListener("click", () => {
  currentA = 1;
  currentB = 1;
  correct = 0;
  wrong = 0;
  startTime = Date.now();
  startBtn.classList.add("hidden");
  quiz.classList.remove("hidden");
  tableContainer.classList.remove("hidden");
  createTable(9); // generates 0–10 grid
  showProblem();
});

submitBtn.addEventListener("click", checkAnswer);
answerInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") checkAnswer();
});

restartBtn.addEventListener("click", () => {
  results.classList.add("hidden");
  startBtn.classList.remove("hidden");
});
