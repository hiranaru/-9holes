const grid = document.getElementById("holes-grid");
const startBtn = document.getElementById("startBtn");

let currentIndex = -1;
let clickedIndices = [];
let sound;

// 効果音を事前に読み込む
function loadSound() {
  sound = new Audio("Onoma-Pop04-4(High-Wet).mp3");
  sound.volume = 0.6;
}

// グリッド（9個の穴ボタン）を作成
function createGrid() {
  grid.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const btn = document.createElement("button");
    btn.classList.add("hole-button");
    btn.dataset.index = i;
    btn.addEventListener("click", () => handleClick(i, btn));
    grid.appendChild(btn);
  }
}

// ランダムに次の穴を光らせる（未クリックの中から選ぶ）
function highlightRandomHole() {
  const buttons = grid.querySelectorAll("button");

  if (clickedIndices.length === 9) {
    setTimeout(() => {
      alert("🎉 クリア！おめでとうございます！");
    }, 200);
    return;
  }

  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * 9);
  } while (clickedIndices.includes(newIndex));

  currentIndex = newIndex;

  // 光らせる演出
  buttons.forEach(btn => btn.classList.remove("active"));
  buttons[newIndex].classList.add("active");
}

// ボタンが押された時の処理
function handleClick(index, btn) {
  if (index === currentIndex) {
    clickedIndices.push(index);
    btn.classList.remove("active");

    // ぷにっと演出と音再生
    btn.style.transform = "scale(0.95)";
    if (sound) {
      sound.currentTime = 0;
      sound.play();
    }
    setTimeout(() => {
      btn.style.transform = "scale(1)";
    }, 100);

    highlightRandomHole();
  }
}

// ゲーム開始時の初期化処理
function startGame() {
  clickedIndices = [];
  createGrid();
  highlightRandomHole();
}

// ページロード時の処理
window.addEventListener("DOMContentLoaded", () => {
  loadSound();
  createGrid();
});

// PLAYボタンにイベント設定
startBtn.addEventListener("click", startGame);
