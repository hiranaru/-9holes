const holeButtons = document.querySelectorAll('.hole-button');
const resetButton = document.getElementById('resetButton');
const popSound = new Audio('Onoma-Pop04-4(High-Wet).mp3');

let clickedHoles = new Set();
let currentLitHoles = new Set();
let lastLitHoles = new Set();

let gameStage = 1;
let gameStarted = false;
const MAX_STAGE = 9;

function getRandomHoles(count) {
  const availableIndices = Array.from({ length: holeButtons.length }, (_, i) => i)
    .filter(i => !clickedHoles.has(i) && !lastLitHoles.has(i));

  const selected = new Set();
  while (selected.size < count && availableIndices.length > 0) {
    const randomIndex = Math.floor(Math.random() * availableIndices.length);
    selected.add(availableIndices.splice(randomIndex, 1)[0]);
  }

  return Array.from(selected);
}

function lightUpHoles(count) {
  clearLights();

  const holesToLight = getRandomHoles(count);
  currentLitHoles = new Set(holesToLight);

  holesToLight.forEach(index => {
    holeButtons[index].classList.add('active');
  });

  lastLitHoles = new Set(holesToLight);
}

function clearLights() {
  holeButtons.forEach(btn => btn.classList.remove('active'));
  currentLitHoles.clear();
}

function handleClick(e) {
  const index = Array.from(holeButtons).indexOf(e.currentTarget);

  if (currentLitHoles.has(index)) {
    popSound.currentTime = 0;
    popSound.play();

    e.currentTarget.classList.remove('active');
    currentLitHoles.delete(index);
    clickedHoles.add(index);

    if (clickedHoles.size === 9) {
      showClearMessage();
    } else if (currentLitHoles.size === 0) {
      gameStage = Math.min(gameStage + 1, MAX_STAGE);
      const nextCount = Math.min(gameStage, 9 - clickedHoles.size); // 残り穴数以上は選ばない
      lightUpHoles(nextCount);
    }
  }
}

function showClearMessage() {
  clearLights();
  alert("🌟 全ての光るボタンを見つけました！お疲れさまでした！");
  resetButton.style.display = 'block';
}

function resetGame() {
  clickedHoles.clear();
  currentLitHoles.clear();
  lastLitHoles.clear();
  gameStage = 1;
  resetButton.style.display = 'none';
  lightUpHoles(1);
}

holeButtons.forEach(btn => btn.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);

window.onload = () => {
  if (!gameStarted) {
    gameStarted = true;
    lightUpHoles(1); // 最初は1個から開始
  }
};
