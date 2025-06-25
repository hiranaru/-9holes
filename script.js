const holeGrid = document.getElementById("holeGrid");
const resetBtn = document.getElementById("resetBtn");
const popSound = document.getElementById("popSound");
const switchToRandom = document.getElementById("switchToRandom");
const switchToPuzzle = document.getElementById("switchToPuzzle");

let mode = "random";
let buttons = [];
let litButtons = new Set();
let pressedButtons = new Set();
let previousLit = [];
let stage = 1;
const maxStages = 9;

const toggleMap = {
  0: [0, 1, 3],
  1: [1, 0, 2, 4],
  2: [2, 1, 5],
  3: [3, 0, 4, 6],
  4: [4, 1, 3, 5, 7],
  5: [5, 2, 4, 8],
  6: [6, 3, 7],
  7: [7, 4, 6, 8],
  8: [8, 5, 7]
};

function createButtons() {
  holeGrid.innerHTML = "";
  buttons = [];
  for (let i = 0; i < 9; i++) {
    const btn = document.createElement("button");
    btn.classList.add("hole-button");
    btn.dataset.index = i;
    btn.addEventListener("click", () => handlePress(i));
    holeGrid.appendChild(btn);
    buttons.push(btn);
  }
}

function playSound() {
  popSound.currentTime = 0;
  popSound.play();
}

function lightRandomButtons() {
  let count = stage <= 3 ? stage : Math.floor(Math.random() * 5) + 1;
  const newLit = [];
  while (newLit.length < count) {
    let idx = Math.floor(Math.random() * 9);
    if (!pressedButtons.has(idx) && !previousLit.includes(idx) && !newLit.includes(idx)) {
      newLit.push(idx);
    }
  }
  previousLit = [...newLit];
  litButtons = new Set(newLit);
  updateLighting();
}

function updateLighting() {
  buttons.forEach((btn, i) => {
    btn.classList.toggle("active", litButtons.has(i));
  });
}

function handlePress(index) {
  playSound();

  if (mode === "random") {
    if (litButtons.has(index)) {
      pressedButtons.add(index);
      litButtons.delete(index);
      buttons[index].classList.remove("active");

      if ([...previousLit].every(i => pressedButtons.has(i))) {
        stage++;
        pressedButtons.clear();
        litButtons.clear();

        if (stage <= maxStages) {
          lightRandomButtons();
        } else {
          showVictory();
        }
      }
    }
  } else if (mode === "puzzle") {
    toggleMap[index].forEach(i => {
      if (litButtons.has(i)) {
        litButtons.delete(i);
      } else {
        litButtons.add(i);
      }
    });
    updateLighting();
    if (litButtons.size === 9) {
      showVictory();
    }
  }
}

function showVictory() {
  const winMsg = document.createElement("div");
  winMsg.textContent = "🎉 ゲームクリア！ 🎉";
  winMsg.style.position = "fixed";
  winMsg.style.top = "40%";
  winMsg.style.left = "50%";
  winMsg.style.transform = "translate(-50%, -50%)";
  winMsg.style.background = "#ffffffdd";
  winMsg.style.padding = "30px";
  winMsg.style.fontSize = "28px";
  winMsg.style.borderRadius = "20px";
  winMsg.style.boxShadow = "0 6px 12px rgba(0,0,0,0.2)";
  document.body.appendChild(winMsg);
  setTimeout(() => {
    winMsg.remove();
  }, 1000);
  resetBtn.style.display = "block";
}

function resetGame() {
  litButtons.clear();
  pressedButtons.clear();
  stage = 1;
  previousLit = [];
  updateLighting();
  resetBtn.style.display = "none";
  if (mode === "random") {
    lightRandomButtons();
  }
}

function updateModeButtons() {
  switchToRandom.classList.toggle("active-mode", mode === "random");
  switchToPuzzle.classList.toggle("active-mode", mode === "puzzle");
}

switchToRandom.addEventListener("click", () => {
  mode = "random";
  updateModeButtons();
  resetGame();
});

switchToPuzzle.addEventListener("click", () => {
  mode = "puzzle";
  updateModeButtons();
  resetGame();
});

resetBtn.addEventListener("click", resetGame);

createButtons();
updateModeButtons();
resetGame();
