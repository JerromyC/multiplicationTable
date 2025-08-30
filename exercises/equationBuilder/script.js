let targetProduct, firstPick = null, secondPick = null;
let correct = 0, total = 0;

const problemEl = document.getElementById("problem");
const choicesEl = document.getElementById("choices");
const equationEl = document.getElementById("equation");
const feedbackEl = document.getElementById("feedback");
const scoreEl = document.getElementById("score");
const submitBtn = document.getElementById("submitBtn");
const game = document.getElementById("game");

function newProblem() {
  game.style.backgroundColor = "white";

  const a = Math.floor(Math.random() * 12) + 1;
  const b = Math.floor(Math.random() * 12) + 1;
  targetProduct = a * b;

  problemEl.textContent = `Build an equation for: ${targetProduct}`;
  firstPick = null;
  secondPick = null;
  equationEl.textContent = "? × ? = " + targetProduct;
  submitBtn.disabled = true;

  renderChoices();
  feedbackEl.textContent = "";
}

function renderChoices() {
  choicesEl.innerHTML = "";
  for (let i = 1; i <= 12; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.classList.add("choiceBtn");
    btn.addEventListener("click", () => pickNumber(i));
    choicesEl.appendChild(btn);
  }
}

function pickNumber(num) {
  if (firstPick === null) {
    firstPick = num;
  } else if (secondPick === null) {
    secondPick = num;
  } else {
    // reset if both already filled
    firstPick = num;
    secondPick = null;
  }

  equationEl.textContent = 
    `${firstPick !== null ? firstPick : "?"} × ${secondPick !== null ? secondPick : "?"} = ${targetProduct}`;

  submitBtn.disabled = !(firstPick && secondPick);
}

function checkAnswer() {
  total++;
  if (firstPick * secondPick === targetProduct) {
    correct++;
    feedbackEl.textContent = "Correct!";
    feedbackEl.style.color = "green";
    game.style.backgroundColor = "lightGreen";
  } else {
    feedbackEl.textContent = `Wrong, correct pairs include: ${factorPairs(targetProduct)}`;
    feedbackEl.style.color = "red";
    game.style.backgroundColor = "#f8d7da";
  }

  scoreEl.textContent = `Score: ${correct}/${total}`;
  setTimeout(newProblem, 1500);
}

function factorPairs(num) {
  const pairs = [];
  for (let i = 1; i <= 12; i++) {
    if (num % i === 0 && num / i <= 12) {
      pairs.push(`${i}×${num/i}`);
    }
  }
  return pairs.join(", ");
}

submitBtn.addEventListener("click", checkAnswer);

newProblem();
