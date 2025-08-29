let currentA = 1;
let currentB = 1;
let correct = 0;
let wrong = 0;
let struggled = 0;
let startTime;
let firstAttempt = true;
let attemptCount = 0;
let problemStartTime;

let wrongProblems = [];
let struggledProblems = [];

// Elements
const mainHeading = document.getElementsByTagName("h1")
const rules = document.getElementById("rules");
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
const quizContainer = document.getElementById("quizContainer");
const tableContainer = document.getElementById("tableContainer");
const table = document.getElementById("multiplicationTable");

function showProblem() {
    problem.textContent = `${currentA} × ${currentB}`;
    answerInput.value = "";
    firstAttempt = true;
    attemptCount = 0;
    problemStartTime = Date.now();
}

function nextProblem() {
    if (currentB < 9) currentB++;
    else {
        currentB = 1;
        currentA++;
    }
}

function endGame() {
    quiz.classList.add("hidden");
    results.classList.remove("hidden");

    const totalTime = Math.floor((Date.now() - startTime) / 1000);
    scoreDisplay.textContent =
        `Correct: ${correct}, Wrong: ${wrong}, Struggled: ${struggled}`;
    timeDisplay.textContent = `Time: ${totalTime} seconds`;

    let stars = "⭐".repeat(3);
    if (wrong > 5 || struggled > 7) stars = "⭐⭐";
    if (wrong > 10 || struggled > 12) stars = "⭐";
    starsDisplay.textContent = `Rating: ${stars}`;
}

function createTable(size = 9) {
    table.innerHTML = "";
    let headerRow = "<tr><th>×</th>";
    for (let i = 1; i <= size; i++) headerRow += `<th>${i}</th>`;
    headerRow += "</tr>";
    table.innerHTML += headerRow;

    for (let a = 1; a <= size; a++) {
        let row = `<tr><th>${a}</th>`;
        for (let b = 1; b <= size; b++) {
            row += `<td id="cell-${a}-${b}" class="unsolved">${a}×${b}</td>`;
        }
        row += "</tr>";
        table.innerHTML += row;
    }
}

function markSolved(a, b, status) {
    const cell = document.getElementById(`cell-${a}-${b}`);
    if (cell) {
        cell.textContent = a * b;
        cell.classList.remove("unsolved", "wrong-attempt", "struggled");
        if (status === "correct") cell.classList.add("correct-first"); // green
        else if (status === "struggled") cell.classList.add("corrected"); // yellow
        else if (status === "wrong") cell.classList.add("wrong-final"); // red
    }
}

function checkAnswer() {
    const userAnswer = parseInt(answerInput.value);
    const correctAnswer = currentA * currentB;
    attemptCount++;

    if (userAnswer === correctAnswer) {
        const elapsed = (Date.now() - problemStartTime) / 1000;
        correct++;

        if (firstAttempt && elapsed <= 10) {
            // First try & fast → green
            markSolved(currentA, currentB, "correct");
        } else {
            // Took too long or corrected → yellow
            struggled++;
            struggledProblems.push(`${currentA} × ${currentB} = ${correctAnswer}`);
            markSolved(currentA, currentB, "struggled");
        }

        nextProblem();
        if (currentA > 9) endGame();
        else showProblem();
    }
    else if (attemptCount >= 3) {
        // Failed 3 attempts → red, persists
        wrong++;
        wrongProblems.push(`${currentA} × ${currentB} = ${correctAnswer}`);
        markSolved(currentA, currentB, "wrong"); // red stays after moving forward

        nextProblem();
        if (currentA > 9) endGame();
        else showProblem();
    }
    else {
        // Wrong but still under 3 attempts → keep it highlighted temporarily
        firstAttempt = false;
        const cell = document.getElementById(`cell-${currentA}-${currentB}`);
        if (cell) cell.classList.add("wrong-attempt"); // light red while trying
        answerInput.value = "";
    }
}


// ----- DOWNLOAD RESULTS -----
function downloadResults() {
    const totalTime = Math.floor((Date.now() - startTime) / 1000);
    const dateStr = new Date().toLocaleDateString();
    const timeStr = new Date().toLocaleTimeString();
    const total = correct + wrong;

    let message = `Multiplication Results\n\n`;
    message += `Date: ${dateStr}\nTime: ${timeStr}\n`;
    message += `Correct: ${correct}/${total}\nWrong: ${wrong}/${total}\nStruggled: ${struggled}\n\n`;

    if (wrongProblems.length || struggledProblems.length) {
        message += `Areas to Practice:\n`;
        wrongProblems.concat(struggledProblems).forEach(p => message += `- ${p}\n`);
    }

    const blob = new Blob([message], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "multiplication_results.txt";
    link.click();
}

// ----- EMAILJS -----
function sendEmailJS() {
    const studentName = document.getElementById("studentName").value.trim();
    const parentEmail = document.getElementById("parentEmail").value.trim();

    if (!studentName) {
        alert("Please enter the student's name.");
        return;
    }
    if (!parentEmail) {
        alert("Please enter a parent's email.");
        return;
    }

    const dateStr = new Date().toLocaleDateString();
    const timeStr = new Date().toLocaleTimeString();
    const total = correct + wrong;

    const struggledText = struggledProblems.length
        ? struggledProblems.join("\n")
        : "None!";
    const wrongText = wrongProblems.length
        ? wrongProblems.join("\n")
        : "None!";

    emailjs.send("service_cyydwqe", "multiplication-results", {
        to_name: "Parent",
        student_name: studentName,  // 👈 new field
        from_name: "Multiplication Is Fun Team",
        reply_to: parentEmail,
        date: dateStr,
        time: timeStr,
        correct: correct,
        wrong: wrong,
        total: total,
        struggled_areas: struggledText,
        wrong_areas: wrongText
    })
    .then(() => alert("Email sent successfully!"))
    .catch(err => {
        console.error("EmailJS error:", err);
        alert("Failed to send email. Check your Service/Template IDs.");
    });
}

// ----- EVENT LISTENERS -----
startBtn.addEventListener("click", () => {
    currentA = 1; currentB = 1; correct = 0; wrong = 0; struggled = 0;
    wrongProblems = []; struggledProblems = [];
    startTime = Date.now();

    mainHeading[0].classList.add("hidden");
    rules.classList.add("hidden");
    startBtn.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    quiz.classList.remove("hidden");
    tableContainer.classList.remove("hidden");

    createTable(9);
    showProblem();
});

submitBtn.addEventListener("click", checkAnswer);
answerInput.addEventListener("keypress", e => { if (e.key === "Enter") checkAnswer(); });
// restartBtn.addEventListener("click", () => { results.classList.add("hidden");startBtn.classList.remove("hidden"); });
document.getElementById("downloadBtn").addEventListener("click", downloadResults);
document.getElementById("emailJSBtn").addEventListener("click", sendEmailJS);

