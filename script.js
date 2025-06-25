const holeGrid = document.getElementById('holeGrid');
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const clickSound = document.getElementById('clickSound');

let holes = [];
let activeIndexes = [];
let currentStep = 1;
let clickedInThisStep = [];

for (let i = 0; i < 9; i++) {
  const btn = document.createElement('button');
  btn.classList.add('hole-button');
  holeGrid.appendChild(btn);
  holes.push(btn);
}

function getRandomIndexes(count, exclude = []) {
  const indexes = [];
  while (indexes.length < count) {
    const idx = Math.floor(Math.random() * 9);
    if (!indexes.includes(idx) && !exclude.includes(idx)) {
      indexes.push(idx);
    }
  }
  return indexes;
}

function activateStep() {
  clickedInThisStep = [];

  if (currentStep > 9) {
    alert('🎉 コンプリート！全部光ったよ！');
    return;
  }

  const indexes = getRandomIndexes(currentStep, activeIndexes);
  activeIndexes.push(...indexes);

  holes.forEach((btn, i) => {
    btn.classList.toggle('active', activeIndexes.includes(i));
  });
}

holes.forEach((hole, index) => {
  hole.addEventListener('click', () => {
    if (activeIndexes.includes(index) && !clickedInThisStep.includes(index)) {
      clickSound.currentTime = 0;
      clickSound.play();
      clickedInThisStep.push(index);
      hole.classList.remove('active');

      if (clickedInThisStep.length === currentStep) {
        currentStep++;
        setTimeout(() => {
          activateStep();
        }, 400);
      }
    }
  });
});

startButton.addEventListener('click', () => {
  currentStep = 1;
  activeIndexes = [];
  clickedInThisStep = [];
  activateStep();
});

resetButton.addEventListener('click', () => {
  currentStep = 1;
  activeIndexes = [];
  clickedInThisStep = [];
  holes.forEach(h => h.classList.remove('active'));
});
