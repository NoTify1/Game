const gameArea = document.getElementById("gameArea");
const scoreDisplay = document.getElementById("score");
const startBtn = document.getElementById("startBtn");

let score = 0;
let active = false;
let boxTimeout;

function createBox() {
  const box = document.createElement("div");
  box.classList.add("box");

  const size = 60;
  const maxX = gameArea.clientWidth - size;
  const maxY = gameArea.clientHeight - size;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  box.style.left = `${x}px`;
  box.style.top = `${y}px`;

  box.addEventListener("click", () => {
    if (!active) return;
    score++;
    scoreDisplay.textContent = score;
    box.remove();
    clearTimeout(boxTimeout);
    spawnBox();
  });

  gameArea.appendChild(box);

  boxTimeout = setTimeout(() => {
    if (active) {
      alert("Game Over! Your score: " + score);
      resetGame();
    }
  }, 1500);
}

function spawnBox() {
  createBox();
}

function startGame() {
  score = 0;
  scoreDisplay.textContent = score;
  active = true;
  spawnBox();
}

function resetGame() {
  active = false;
  gameArea.innerHTML = "";
}

startBtn.addEventListener("click", () => {
  resetGame();
  startGame();
});
