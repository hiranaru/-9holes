const gridContainer = document.getElementById("holeGrid");
const playButton = document.getElementById("playButton");
const clickSound = document.getElementById("clickSound");

let currentActiveIndex = -1;
let clickedIndices = [];

function createHoles() {
  gridContainer.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const hole = document.createElement("div");
    hole.classList.add("hole");
    hole.dataset.index = i;
    hole.addEventListener("click", handleHoleClick);
    gridContainer.appendChild(hole);
  }
}

function activateRandomHole() {
  if (clickedIndices.length >= 9) {
    alert("クリア！おつかれさまでした🌟");
    return;
  }

  let index;
  do {
    index = Math.floor(Math.random() * 9);
  } while (clickedIndices.includes(index));

  currentActiveIndex = index;
  updateHoleStyles();
}

function updateHoleStyles() {
  const holes = document.querySelectorAll(".hole");
  holes.forEach((hole, idx) => {
    hole.classList.toggle("active", idx === currentActiveIndex);
  });
}

function handleHoleClick(e) {
  const index = parseInt(e.target.dataset.index);
  if (index === currentActiveIndex && !clickedIndices.includes(index)) {
    clickSound.currentTime = 0;
    clickSound.play();
    clickedIndices.push(index);
    currentActiveIndex = -1;
    activateRandomHole();
  }
}

playButton.addEventListener("click", () => {
  clickedIndices = [];
  createHoles();
  activateRandomHole();
});
