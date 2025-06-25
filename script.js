document.addEventListener("DOMContentLoaded", () => {
  const holes = document.querySelectorAll(".hole-button");
  const resetButton = document.getElementById("resetButton");
  const clearMessage = document.getElementById("clearMessage");

  // 押すと影響するボタンを定義（indexで指定）
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

  // 音声
  const clickSound = new Audio("Onoma-Pop04-4(High-Wet).mp3");

  let activeStates = new Array(9).fill(false); // 各ボタンの点灯状態

  // ボタン状態の更新
  function updateButtons() {
    holes.forEach((hole, index) => {
      if (activeStates[index]) {
        hole.classList.add("active");
      } else {
        hole.classList.remove("active");
      }
    });

    // すべてのボタンが点灯していたらクリア
    if (activeStates.every(state => state)) {
      clearMessage.style.display = "block";
      resetButton.style.display = "block";
    }
  }

  // ボタンが押されたときの処理
  holes.forEach((hole, index) => {
    hole.addEventListener("click", () => {
      clickSound.currentTime = 0;
      clickSound.play();

      const affected = toggleMap[index];
      affected.forEach(i => {
        activeStates[i] = !activeStates[i]; // 状態を反転
      });

      updateButtons();
    });
  });

  // リセット
  resetButton.addEventListener("click", () => {
    activeStates = new Array(9).fill(false);
    clearMessage.style.display = "none";
    resetButton.style.display = "none";
    activeStates[0] = true; // 最初に1個点灯
    updateButtons();
  });

  // 初期状態：1つだけ点灯
  activeStates[0] = true;
  updateButtons();
});
