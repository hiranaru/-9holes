const holes = Array.from(document.querySelectorAll(".hole-button"));
const resetButton = document.getElementById("resetButton");

let activatedHoles = [];
let currentlyLitIndices = [];

const clickSound = new Audio("Onoma-Pop04-4(High-Wet).mp3"); // 音ファイル名が合っているか確認！

function resetGame() {
  activatedHoles = [];
  currentlyLitIndices = [];
  resetButton.style.display = "none";

  holes.forEach(hole => {
    hole.classList.remove("active");
    hole.disabled = false;
  });

  activateRandomHoles();
}

function activateRandomHoles() {
  if (activatedHoles.length >= holes.length) {
    showResetButton();
    return;
  }

  // 光っていたものを消す
  currentlyLitIndices.forEach(i => holes[i].classList.remove("active"));
  currentlyLitIndices = [];

  const remainingIndices = holes
    .map((_, i) => i)
    .filter(i => !activatedHoles.includes(i));

  // ランダムに1～3個選ぶ（最大残り数まで）
  const numberToActivate = Math.min(remainingIndices.length, Math.floor(Math.random() * 3) + 1);

  for (let i = 0; i < numberToActivate; i++) {
    if (remainingIndices.length === 0) break;

    const randomIndex = Math.floor(Math.random() * remainingIndices.length);
    const selected = remainingIndices.splice(randomIndex, 1)[0];

    holes[selected].classList.add("active");
    currentlyLitIndices.push(selected);
  }
}

holes.forEach((hole, index) => {
  hole.addEventListener("click", () => {
    if (currentlyLitIndices.includes(index)) {
      clickSound.currentTime = 0;
      clickSound.play();

      hole.classList.remove("active");

      if (!activatedHoles.includes(index)) {
        activatedHoles.push(index);
      }

      currentlyLitIndices = currentlyLitIndices.filter(i => i !== index);

      // 全部押されたら次に行く
      if (currentlyLitIndices.length === 0) {
        setTimeout(activateRandomHoles, 400);
      }
    }
  });
});

function showResetButton() {
  resetButton.style.display = "block";
}

resetButton.addEventListener("click", resetGame);

// スタート！
resetGame();
