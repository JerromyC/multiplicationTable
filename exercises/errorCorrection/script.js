  let total = 0, correct = 0, wrong = 0;
    let maxQuestions = 20;
    let currentA, currentB, shownAnswer;
    let resultsList = [];

    const game = document.getElementById("game");
    const problemEl = document.getElementById("problem");
    const answerInput = document.getElementById("answerInput");
    const submitBtn = document.getElementById("submitBtn");
    const feedbackEl = document.getElementById("feedback");

    function newProblem() {
      game.style.backgroundColor = "white";
      currentA = Math.floor(Math.random() * 10) + 1;
      currentB = Math.floor(Math.random() * 10) + 1;
      const trueAnswer = currentA * currentB;

      // Wrong answer generator
      let offset = Math.floor(Math.random() * 5) + 1;
      shownAnswer = trueAnswer + (Math.random() < 0.5 ? offset : -offset);
      if (shownAnswer === trueAnswer) shownAnswer++; // ensure it's wrong

      problemEl.textContent = `${currentA} × ${currentB} = ${shownAnswer}`;
      answerInput.value = "";
      feedbackEl.textContent = "";
    }

    function checkAnswer() {
      const userAnswer = parseInt(answerInput.value);
      const trueAnswer = currentA * currentB;
      total++;

      if (userAnswer === trueAnswer) {
        correct++;
        resultsList.push(`${problemEl.textContent} → ${userAnswer} ✓`);
        game.style.backgroundColor = "lightGreen";
      } else {
        wrong++;
        resultsList.push(`${problemEl.textContent} → ${userAnswer} ✗ (Correct: ${trueAnswer})`);
        game.style.backgroundColor = "red";
      }

      if (total >= maxQuestions) {
        endGame();
      } else {
        setTimeout(newProblem, 1000);
      }
    }

    function endGame() {
      document.body.innerHTML = `
        <h2>Results</h2>
        <p>Correct: ${correct}</p>
        <p>Wrong: ${wrong}</p>
        <p>Total: ${total}</p>
        <h3>Details:</h3>
        <ul>${resultsList.map(r => `<li>${r}</li>`).join("")}</ul>
      `;
    }

    submitBtn.addEventListener("click", checkAnswer);
    answerInput.addEventListener("keypress", e => {
      if (e.key === "Enter") checkAnswer();
    });

    newProblem();