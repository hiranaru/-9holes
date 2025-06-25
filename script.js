const grid = document.getElementById("holes-grid");
const startBtn = document.getElementById("startBtn");

let currentIndex = -1;
let clickedIndices = [];

function createGrid() {
  grid.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const btn = document.createElement("button");
    btn.addEventListener("click", () => handleClick(i));
    grid.appendChild(btn);
  }
}

function highlightRandomHole() {
  const buttons = grid.querySelectorAll("button");
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * 9);
  } while (clickedIndices.includes(newIndex));

  buttons.forEach(btn => btn.classList.remove("active"));
  buttons[newIndex].classList.add("active");
  currentIndex = newIndex;
}

function handleClick(index) {
  if (index === currentIndex) {
    clickedIndices.push(index);
    if (clickedIndices.length === 9) {
      alert("クリア！");
    } else {
      highlightRandomHole();
    }
  }
}

startBtn.addEventListener("click", () => {
  clickedIndices = [];
  createGrid();
  highlightRandomHole();
});

createGrid();
