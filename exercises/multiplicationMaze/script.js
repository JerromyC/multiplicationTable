let gridSize = 5;
let maze = [];
let playerPos = {x:0, y:0};
let correct = 0, total = 0;
let pendingMove = null;

const mazeEl = document.getElementById("maze");
const problemEl = document.getElementById("problem");
const answerInput = document.getElementById("answerInput");
const submitBtn = document.getElementById("submitBtn");
const feedbackEl = document.getElementById("feedback");
const scoreEl = document.getElementById("score");

function generateMaze() {
  maze = [];
  for (let r=0; r<gridSize; r++) {
    let row = [];
    for (let c=0; c<gridSize; c++) {
      let a = Math.floor(Math.random()*12)+1;
      let b = Math.floor(Math.random()*12)+1;
      row.push({a,b});
    }
    maze.push(row);
  }
  renderMaze();
  showProblem();
}

function renderMaze() {
  mazeEl.innerHTML = "";
  mazeEl.style.gridTemplateColumns = `repeat(${gridSize}, 60px)`;
  mazeEl.style.gridTemplateRows = `repeat(${gridSize}, 60px)`;

  for (let r=0; r<gridSize; r++) {
    for (let c=0; c<gridSize; c++) {
      const cellData = maze[r][c];
      const cell = document.createElement("div");
      cell.className = "cell";

      // Put the multiplication fact inside
      cell.textContent = `${cellData.a}×${cellData.b}`;

      if (r === playerPos.y && c === playerPos.x) {
        cell.classList.add("player");
        cell.textContent = "🙂"; // show player
      }
      if (r === gridSize-1 && c === gridSize-1) {
        cell.classList.add("goal");
        cell.textContent = "🏁"; // goal
      }
      mazeEl.appendChild(cell);
    }
  }
}


function setMove(dir) {
  pendingMove = dir;
  showProblem();
}

function showProblem() {
  const cell = maze[playerPos.y][playerPos.x];
  problemEl.textContent = `${cell.a} × ${cell.b} = ?`;
  answerInput.value = "";
  answerInput.focus();
  feedbackEl.textContent = "";
}

function checkAnswer() {
  const cell = maze[playerPos.y][playerPos.x];
  total++;
  let answer = parseInt(answerInput.value);

  if (answer === cell.a * cell.b) {
    correct++;
    feedbackEl.textContent = "Correct!";
    feedbackEl.style.color = "green";

    if (pendingMove) {
      if (pendingMove === "up" && playerPos.y>0) playerPos.y--;
      if (pendingMove === "down" && playerPos.y<gridSize-1) playerPos.y++;
      if (pendingMove === "left" && playerPos.x>0) playerPos.x--;
      if (pendingMove === "right" && playerPos.x<gridSize-1) playerPos.x++;
      pendingMove = null;
    }

    if (playerPos.x===gridSize-1 && playerPos.y===gridSize-1) {
      feedbackEl.textContent = "🎉 You reached the goal!";
      feedbackEl.style.color = "blue";
    }
  } else {
    feedbackEl.textContent = `Wrong, it was ${cell.a*cell.b}`;
    feedbackEl.style.color = "red";
  }

  scoreEl.textContent = `Score: ${correct}/${total}`;
  renderMaze();
  showProblem();
}

submitBtn.addEventListener("click", checkAnswer);
answerInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") checkAnswer();
});

generateMaze();
