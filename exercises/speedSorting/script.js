let currentA, currentB, currentProduct;
let correct = 0, wrong = 0, total = 0;

const game = document.getElementById("game");
const problemEl = document.getElementById("problem");
const feedbackEl = document.getElementById("feedback");
const scoreEl = document.getElementById("score");
const bucketBtns = document.querySelectorAll(".bucket");

function newProblem() {
  game.style.backgroundColor = "white";

  currentA = Math.floor(Math.random() * 12) + 1;
  currentB = Math.floor(Math.random() * 12) + 1;
  currentProduct = currentA * currentB;

  problemEl.textContent = `${currentA} × ${currentB}`;
  feedbackEl.textContent = "";
}

function checkAnswer(range) {
  let correctRange = "";

  if (currentProduct <= 20) {
    correctRange = "low";
  } else if (currentProduct <= 50) {
    correctRange = "mid";
  } else {
    correctRange = "high";
  }

  total++;
  if (range === correctRange) {
    correct++;
    feedbackEl.textContent = "Correct!";
    feedbackEl.style.color = "green";
    game.style.backgroundColor = "lightGreen";
  } else {
    wrong++;
    feedbackEl.textContent = `Wrong, it was ${currentProduct}`;
    feedbackEl.style.color = "red";
    game.style.backgroundColor = "#f8d7da";
  }

  scoreEl.textContent = `Score: ${correct}/${total}`;
  setTimeout(newProblem, 1000);
}

bucketBtns.forEach(btn => {
  btn.addEventListener("click", () => checkAnswer(btn.dataset.range));
});

newProblem();
