// Works regardless of when the numpad is injected
(function initNumpad() {
  // Find the input used by the current exercise
  const input = document.getElementById("answer") || document.getElementById("answerInput");
  if (!input) {
    console.warn("Numpad: no input (#answer or #answerInput) found.");
    return;
  }

  // Find the numpad container (supports both ids / old markup)
  const container =
    document.getElementById("numpadContainer") ||
    document.getElementById("numpad-container") ||
    document.querySelector(".numpad");

  if (!container) {
    console.warn("Numpad: container not found.");
    return;
  }

  // Event delegation so we don’t care when buttons were added
  container.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    // Accept either data-key or button text
    const key = (btn.dataset.key || btn.textContent || "").trim();

    if (key === "backspace" || key === "⌫") {
      input.value = input.value.slice(0, -1);
      return;
    }

    if (key === "clear") {
      input.value = "";
      return;
    }

    if (key === "enter" || key === "↵" || key.toLowerCase() === "enter") {
      const submit = document.getElementById("submitBtn") || document.querySelector('button[type="submit"]');
      if (submit) submit.click();
      return;
    }

    // Only append a single digit (0–9)
    if (/^\d$/.test(key)) {
      input.value = (input.value || "") + key;
    }
  });
})();
