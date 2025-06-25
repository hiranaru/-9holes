const holes = Array.from(document.querySelectorAll(".hole-button"));
const resetButton = document.getElementById("resetButton");

// 効果音の読み込み
const clickSound = new Audio("Onoma-Pop04-4(High-Wet).mp3");
clickSound.volume = 0.5;

let activatedHoles = [];
let currentActiveHoles = [];
let lastActiveHoles = [];

function resetGame() {
  activatedHoles = [];
  currentActiveHoles = [];
  lastActiveHoles = [];
  resetButton.style.display = "none";

  holes.forEach(hole => {
    hole.classList.remove("active");
    hole.disabled = false;
  });

  activateRandomHoles();
}

function activateRandomHoles() {
  if (activatedHoles.length >= 9) {
    showResetButton();
    return;
  }

  currentActiveHoles.forEach(index => {
    holes[index].classList.remove("active");
  });

  const availableIndices = holes
    .map((_, i) => i)
    .filter(i => !lastActiveHoles.includes(i) && !activatedHoles.includes(i));

  if (availableIndices.length === 0) {
    showResetButton();
    return;
  }

  const numToActivate = Math.min(
    Math.floor(Math.random() * 5) + 1,
    availableIndices.length
  );

  const shuffled = availableIndices.sort(() => Math.random() - 0.5);
  currentActiveHoles = shuffled.slice(0, numToActivate);
  lastActiveHoles = [...currentActiveHoles];

  currentActiveHoles.forEach(index => {
    holes[index].classList.add("active");
  });
}

holes.forEach((hole, index) => {
  hole.addEventListener("click", () => {
    if (currentActiveHoles.includes(index)) {
      if (!activatedHoles.includes(index)) {
        activatedHoles.push(index);
      }

      clickSound.currentTime = 0;
      clickSound.play();

      holes[index].classList.remove("active");
      currentActiveHoles = currentActiveHoles.filter(i => i !== index);

      if (currentActiveHoles.length === 0) {
        setTimeout(activateRandomHoles, 400);
      }
    }
  });
});

function showResetButton() {
  resetButton.style.display = "block";
}

resetButton.addEventListener("click", resetGame);

// スタート
resetGame();
