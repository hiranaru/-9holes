const holeButtons = document.querySelectorAll('.hole-button');
const resetButton = document.getElementById('resetButton');
const popSound = new Audio('Onoma-Pop04-4(High-Wet).mp3');

let clickedHoles = new Set();
let previouslyLit = new Set();
let gameStage = 1; // 初期段階は1個点灯
let gameStarted = false;

function getRandomHoles(count) {
  const indices = Array.from({ length: holeButtons.length }, (_, i) => i)
    .filter(i => !previouslyLit.has(i)); // 前回光ったものは除外
  const selected = new Set();
  while (selected.size < count && indices.length > 0) {
    const randIndex = Math.floor(Math.random() * indices.length);
    selected.add(indices.splice(randIndex, 1)[0]);
  }
  return Array.from(selected);
}

function lightUpHoles(count) {
  clearLights();
  const holesToLight = getRandomHoles(count);
  holesToLight.forEach(index => {
    holeButtons[index].classList.add('active');
    previouslyLit.add(index);
  });
}

function clearLights() {
  holeButtons.forEach(btn => btn.classList.remove('active'));
  previouslyLit.clear();
}

function handleClick(e) {
  const index = Array.from(holeButtons).indexOf(e.currentTarget);
  if (e.currentTarget.classList.contains('active')) {
    e.currentTarget.classList.remove('active');
    popSound.currentTime = 0;
    popSound.play();

    clickedHoles.add(index);

    if (clickedHoles.size === 9) {
      showClearMessage();
    } else {
      // 次の段階に進める（最大5個まで増える）
      gameStage = Math.min(gameStage + 1, 5);
      lightUpHoles(gameStage);
    }
  }
}

function showClearMessage() {
  clearLights();
  alert("🎉 おめでとう！すべて見つけたね！");
  resetButton.style.display = 'block';
}

function resetGame() {
  clickedHoles.clear();
  previouslyLit.clear();
  gameStage = 1;
  resetButton.style.display = 'none';
  lightUpHoles(gameStage);
}

holeButtons.forEach(btn => btn.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);

// ゲーム開始時に1つ光らせる
window.onload = () => {
  if (!gameStarted) {
    gameStarted = true;
    lightUpHoles(gameStage);
  }
};
