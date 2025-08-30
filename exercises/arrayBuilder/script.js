let targetProduct, currentRows = 1, currentCols = 1;
let correct = 0, total = 0;

const problemEl = document.getElementById("problem");
const rowsCountEl = document.getElementById("rowsCount");
const colsCountEl = document.getElementById("colsCount");
const arrayGrid = document.getElementById("arrayGrid");
const feedbackEl = document.getElementById("feedback");
const scoreEl = document.getElementById("score");
const game = document.getElementById("game");

function newProblem() {
  game.style.backgroundColor = "white";

  const a = Math.floor(Math.random() * 12) + 1;
  const b = Math.floor(Math.random() * 12) + 1;
  targetProduct = a * b;

  problemEl.textContent = `Build an array for: ${targetProduct}`;
  currentRows = 1;
  currentCols = 1;
  updateDisplay();
  feedbackEl.textContent = "";
}

function updateDisplay() {
  rowsCountEl.textContent = currentRows;
  colsCountEl.textContent = currentCols;

  arrayGrid.innerHTML = "";
  arrayGrid.style.gridTemplateRows = `repeat(${currentRows}, 30px)`;
  arrayGrid.style.gridTemplateColumns = `repeat(${currentCols}, 30px)`;

  for (let i = 0; i < currentRows * currentCols; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    arrayGrid.appendChild(cell);
  }
}

function changeRows(delta) {
  currentRows = Math.max(1, currentRows + delta);
  updateDisplay();
}

function changeCols(delta) {
  currentCols = Math.max(1, currentCols + delta);
  updateDisplay();
}

function checkAnswer() {
  total++;
  if (currentRows * currentCols === targetProduct) {
    correct++;
    feedbackEl.textContent = "Correct!";
    feedbackEl.style.color = "green";
    game.style.backgroundColor = "lightGreen";
  } else {
    feedbackEl.textContent = `Wrong, ${currentRows}×${currentCols} = ${currentRows * currentCols}`;
    feedbackEl.style.color = "red";
    game.style.backgroundColor = "#f8d7da";
  }

  scoreEl.textContent = `Score: ${correct}/${total}`;
  setTimeout(newProblem, 1200);
}

document.getElementById("submitBtn").addEventListener("click", checkAnswer);

newProblem();
