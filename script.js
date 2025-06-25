document.addEventListener("DOMContentLoaded", () => {
  const holes = document.querySelectorAll(".hole-button");
  const resetButton = document.getElementById("resetButton");
  const clearMessage = document.getElementById("clearMessage");
  const clickSound = document.getElementById("clickSound");

  // ボタンの影響マップ（押すとどこが切り替わるか）
  const toggleMap = {
    0: [0, 1],
    1: [1, 2],
    2: [2, 3],
    3: [3, 4, 5],
    4: [4, 6],
    5: [5, 7],
    6: [6, 8],
    7: [7],
    8: [8, 0]
  };

  let activeStates = new Array(9).fill(false);

  function updateButtons() {
    holes.forEach((hole, index) => {
      if (activeStates[index]) {
        hole.classList.add("active");
      } else {
        hole.classList.remove("active");
      }
    });

    if (activeStates.every(state => state)) {
      clearMessage.style.display = "block";
      resetButton.style.display = "block";
    }
  }

  holes.forEach((hole, index) => {
    hole.addEventListener("click", () => {
      clickSound.currentTime = 0;
      clickSound.play();

      const affected = toggleMap[index];
      affected.forEach(i => {
        activeStates[i] = !activeStates[i];
      });

      updateButtons();
    });
  });

  resetButton.addEventListener("click", () => {
    activeStates = new Array(9).fill(false);
    activeStates[0] = true;
    clearMessage.style.display = "none";
    resetButton.style.display = "none";
    updateButtons();
  });

  // 初期状態
  activeStates[0] = true;
  updateButtons();
});
