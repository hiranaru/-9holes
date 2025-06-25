const holeButtons = document.querySelectorAll('.hole-button');
const resetButton = document.getElementById('resetButton');
const popSound = new Audio('Onoma-Pop04-4(High-Wet).mp3');

let clickedHoles = new Set();
let gameStage = 1;
let gameStarted = false;

let currentLitHoles = new Set(); // 今回光った
let lastLitHoles = new Set();    // 前回光った

function getRandomHoles(count) {
  const candidates = Array.from({ length: holeButtons.length }, (_, i) => i)
    .filter(i => !clickedHoles.has(i) && !lastLitHoles.has(i));

  const selected = new Set();
  while (selected.size < count && candidates.length > 0) {
    const randIndex = Math.floor(Math.random() * candidates.length);
    selected.add(candidates.splice(randIndex, 1)[0]);
  }
  return Array.from(selected);
}

function lightUpHoles(count) {
  clearLights();
  const newHoles = getRandomHoles(count);
  currentLitHoles = new Set(newHoles);

  newHoles.forEach(index => {
    holeButtons[index].classList.add('active');
  });

  // この段階で光ったボタンを「次回の除外対象」に
  lastLitHoles = new Set(newHoles);
}

function clearLights() {
  holeButtons.forEach(btn => btn.classList.remove('active'));
  currentLitHoles.clear();
}

function handleClick(e) {
  const index = Array.from(holeButtons).indexOf(e.currentTarget);
  if (e.currentTarget.classList.contains('active')) {
    e.currentTarget.classList.remove('active');
    popSound.currentTime = 0;
    popSound.play();

    clickedHoles.add(index);
    currentLitHoles.delete(index); // 今押すべき中から除外

    if (clickedHoles.size === 9) {
      showClearMessage();
    } else if (currentLitHoles.size === 0) {
      // 次のステージへ
      gameStage = Math.min(gameStage + 1, 5);
      lightUpHoles(gameStage);
    }
  }
}

function showClearMessage() {
  clearLights();
  alert("🌟 全部見つけたね！気持ちよかった？");
  resetButton.style.display = 'block';
}

function resetGame() {
  clickedHoles.clear();
  currentLitHoles.clear();
  lastLitHoles.clear();
  gameStage = 1;
  resetButton.style.display = 'none';
  lightUpHoles(gameStage);
}

holeButtons.forEach(btn => btn.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);

// 最初に1個光らせてスタート
window.onload = () => {
  if (!gameStarted) {
    gameStarted = true;
    lightUpHoles(gameStage);
  }
};
