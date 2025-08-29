const listEl = document.getElementById("exerciseList");
const filterEl = document.getElementById("categoryFilter");

// Populate category filter dynamically
const categories = [...new Set(exercises.map(ex => ex.category))];
categories.forEach(cat => {
  const opt = document.createElement("option");
  opt.value = cat;
  opt.textContent = cat;
  filterEl.appendChild(opt);
});

// Render exercise cards
function renderExercises(category = "all") {
  listEl.innerHTML = "";
  const filtered = category === "all" ? exercises : exercises.filter(e => e.category === category);

  filtered.forEach(ex => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${ex.title}</h3>
      <p>Category: ${ex.category}</p>
      <p>Grade: ${ex.grade}</p>
      <a href="${ex.path}">Open</a>
    `;
    listEl.appendChild(card);
  });
}

filterEl.addEventListener("change", () => {
  renderExercises(filterEl.value);
});

// Initial render
renderExercises();
