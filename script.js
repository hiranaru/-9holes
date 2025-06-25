const holes = Array.from(document.querySelectorAll(".hole-button"));
const resetButton = document.getElementById("resetButton");

let activatedHoles = [];
let currentHoleIndex = null;
let previousHoleIndex = null;

function resetGame() {
  activatedHoles = [];
  currentHoleIndex = null;
  previousHoleIndex = null;
  resetButton.style.display = "none";

  holes.forEach(hole => {
    hole.classList.remove("active");
    hole.disabled = false;
  });

  activateNextHole();
}

function activateNextHole() {
  if (activatedHoles.length >= holes.length) {
    showResetButton();
    return;
  }

  let availableIndices = holes.map((_, i) => i);

  // 同じボタンが連続して光らないように
  if (previousHoleIndex !== null) {
    availableIndices = availableIndices.filter(i => i !== previousHoleIndex);
  }

  let nextIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];

  currentHoleIndex = nextIndex;
  previousHoleIndex = nextIndex;

  holes[currentHoleIndex].classList.add("active");
}

holes.forEach((hole, index) => {
  hole.addEventListener("click", () => {
    if (index === currentHoleIndex) {
      hole.classList.remove("active");

      if (!activatedHoles.includes(index)) {
        activatedHoles.push(index);
      }

      currentHoleIndex = null;
      setTimeout(activateNextHole, 300);
    }
  });
});

function showResetButton() {
  resetButton.style.display = "block";
}

resetButton.addEventListener("click", resetGame);

// 起動時に開始
resetGame();
