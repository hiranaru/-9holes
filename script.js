const holeGrid = document.getElementById("holeGrid");
const resetBtn = document.getElementById("resetBtn");
const popSound = document.getElementById("popSound");
const switchToRandom = document.getElementById("switchToRandom");
const switchToPuzzle = document.getElementById("switchToPuzzle");
const modeDescription = document.getElementById("modeDescription");
const stageLabel = document.getElementById("stageLabel");

let mode = "random";
let buttons = [];
let litButtons = new Set();
let pressedButtons = new Set();
let previousLit = [];

let puzzleStage = 0;
const puzzleStages = [
  [0],
  [1, 8],
  [0, 4, 8],
  [0, 2, 6, 8],
  [1, 3, 4, 5, 7],
  [0, 1, 2, 6, 7],
  [3, 4, 5],
  [0, 2, 4, 6, 8],
  [0, 1, 2, 3, 4, 5, 6, 7, 8]
];

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
  const count = Math.floor(Math.random() * 5) + 1;
  const candidates = Array.from({ length: 9 }, (_, i) => i)
    .filter(i => !pressedButtons.has(i) && !previousLit.includes(i));

  if (candidates.length === 0) {
    pressedButtons.clear();
    previousLit = [];
    lightRandomButtons();
    return;
  }

  const newLit = [];
  while (newLit.length < Math.min(count, candidates.length)) {
    const idx = candidates[Math.floor(Math.random() * candidates.length)];
    if (!newLit.includes(idx)) newLit.push(idx);
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
        pressedButtons.clear();
        litButtons.clear();
        lightRandomButtons();
      }
    }
  } else if (mode === "puzzle") {
    toggleMap[index].forEach(i => {
      litButtons.has(i) ? litButtons.delete(i) : litButtons.add(i);
    });
    updateLighting();

    if (litButtons.size === 9) {
      showVictory();
    }
  }
}

function loadPuzzleStage() {
  const stageData = puzzleStages[puzzleStage];
  litButtons = new Set(stageData || []);
  updateLighting();
  updateStageLabel();
}

function updateStageLabel() {
  if (mode === "puzzle") {
    stageLabel.style.display = "block";
    stageLabel.innerText = `LEVEL ${puzzleStage + 1}`;
  } else {
    stageLabel.style.display = "none";
  }
}

function showVictory() {
  if (mode !== "puzzle") return;

  // 演出（背景フラッシュ）
  document.body.classList.add("victory-flash");

  const winMsg = document.createElement("div");
  winMsg.className = "victory-message";
  winMsg.innerHTML = `
    <div>🎉 LEVEL CLEAR! 🎉</div>
    ${puzzleStage + 1 < puzzleStages.length ? '<button id="nextStageBtn" class="next-button">次へ ▶</button>' : '<div>🎉 全ステージクリア！</div>'}
  `;
  document.body.appendChild(winMsg);

  setTimeout(() => {
    document.body.classList.remove("victory-flash");
  }, 600);

  const nextBtn = document.getElementById("nextStageBtn");
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      winMsg.remove();
      puzzleStage++;
      loadPuzzleStage();
    });
  }
}

function resetGame() {
  litButtons.clear();
  pressedButtons.clear();
  previousLit = [];

  if (mode === "random") {
    stageLabel.style.display = "none";
    lightRandomButtons();
  } else {
    puzzleStage = 0;
    loadPuzzleStage();
  }
}

function updateModeButtons() {
  switchToRandom.classList.toggle("active-mode", mode === "random");
  switchToPuzzle.classList.toggle("active-mode", mode === "puzzle");

  modeDescription.innerText = mode === "random"
    ? "光るボタンを押していこう！押すと次に新しいボタンがランダムに光るよ。"
    : "押すと周りのボタンが光るよ。全部光らせてね。";

  updateStageLabel();
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
