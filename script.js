const holeGrid = document.getElementById('holeGrid');
const startButton = document.getElementById('startButton');
const clickSound = document.getElementById('clickSound');

let holes = [];
let activatedIndexes = [];
let currentActiveIndex = null;

// 9個のボタンを生成
for (let i = 0; i < 9; i++) {
  const btn = document.createElement('button');
  btn.classList.add('hole-button');
  holeGrid.appendChild(btn);
  holes.push(btn);
}

function activateRandomHole() {
  if (activatedIndexes.length >= 9) {
    alert('クリア！お疲れさまでした✨');
    return;
  }

  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * 9);
  } while (activatedIndexes.includes(randomIndex));

  // 既存の active をリセット
  holes.forEach(hole => hole.classList.remove('active'));

  currentActiveIndex = randomIndex;
  holes[randomIndex].classList.add('active');
}

holes.forEach((hole, index) => {
  hole.addEventListener('click', () => {
    if (index === currentActiveIndex) {
      clickSound.currentTime = 0;
      clickSound.play();
      activatedIndexes.push(index);
      hole.classList.remove('active');
      activateRandomHole();
    }
  });
});

startButton.addEventListener('click', () => {
  // 初期化
  activatedIndexes = [];
  currentActiveIndex = null;
  holes.forEach(hole => hole.classList.remove('active'));
  activateRandomHole();
});
