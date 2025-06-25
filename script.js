const game = document.getElementById('game');
const holes = [];
const activated = new Set();

for (let i = 0; i < 9; i++) {
  const btn = document.createElement('div');
  btn.classList.add('hole');
  game.appendChild(btn);
  holes.push(btn);
}

function playSound() {
  const audio = new Audio('https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg');
  audio.play();
}

function activateRandomHole() {
  if (activated.size === 9) {
    alert("クリア！");
    return;
  }
  let index;
  do {
    index = Math.floor(Math.random() * 9);
  } while (activated.has(index));
  holes.forEach(h => h.classList.remove('active'));
  holes[index].classList.add('active');
  holes[index].onclick = () => {
    if (!activated.has(index)) {
      activated.add(index);
      playSound();
      holes[index].classList.remove('active');
      activateRandomHole();
    }
  };
}

activateRandomHole();
