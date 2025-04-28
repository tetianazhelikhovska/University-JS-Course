const playButton = document.querySelector(".playButton");
const retryBtn = document.getElementById("retryBtn");
const menuBtn = document.getElementById("menuBtn");

const difficultyDropdown = document.getElementById("difficultySelect");
const colorDropdown = document.getElementById("colorSelect");

const menuScreen = document.querySelector(".menu-screen");
const gameScreen = document.querySelector(".game-screen");
const gameField = document.querySelector(".game-field");
const gameOverModal = document.getElementById("gameOverModal");

const pointsDisplay = document.getElementById("pointsCounter");
const timerDisplay = document.getElementById("timerCounter");
const finalPoints = document.getElementById("finalPoints");

let points = 0;
let countdown = 5;
let pixelElement = null;
let gameInterval = null;

function randomInt(max) {
  return Math.floor(Math.random() * max);
}

function getSettings() {
  const difficulty = difficultyDropdown.value;
  let settings = {};

  switch (difficulty) {
    case "easy":
      settings = { timeLimit: 6, pixelDimension: 60 };
      break;
    case "medium":
      settings = { timeLimit: 4, pixelDimension: 40 };
      break;
    case "hard":
      settings = { timeLimit: 2, pixelDimension: 20 };
      break;
    default:
      settings = { timeLimit: 4, pixelDimension: 30 };
  }

  return settings;
}

function getColor() {
  return colorDropdown.value;
}

function spawnPixel(settings) {
  const fieldWidth = gameField.clientWidth;
  const fieldHeight = gameField.clientHeight;
  const pixelSize = settings.pixelDimension;
  
  const hud = document.querySelector('.hud');
  const hudHeight = hud.clientHeight;
  
  const availableWidth = fieldWidth - pixelSize;
  const availableHeight = fieldHeight - pixelSize - hudHeight;
  
  const posX = randomInt(availableWidth);
  const posY = randomInt(availableHeight);

  pixelElement = document.createElement("div");
  pixelElement.className = "pixel";
  pixelElement.style.width = `${pixelSize}px`;
  pixelElement.style.height = `${pixelSize}px`;
  pixelElement.style.left = `${posX}px`;
  pixelElement.style.top = `${posY}px`;
  pixelElement.style.backgroundColor = getColor();

  pixelElement.addEventListener("click", onPixelClick);
  gameField.appendChild(pixelElement);
}

function onPixelClick() {
  points++;
  pointsDisplay.textContent = points;
  movePixel();
  resetTimer();
}

function movePixel() {
  if (!pixelElement) return;

  const settings = getSettings();
  const fieldWidth = gameField.clientWidth;
  const fieldHeight = gameField.clientHeight;
  const pixelSize = settings.pixelDimension;
  
  const hud = document.querySelector('.hud');
  const hudHeight = hud.clientHeight;
  
  const availableWidth = fieldWidth - pixelSize;
  const availableHeight = fieldHeight - pixelSize - hudHeight;
  
  const posX = randomInt(availableWidth);
  const posY = randomInt(availableHeight);

  pixelElement.style.left = `${posX}px`;
  pixelElement.style.top = `${posY}px`;
}

function resetTimer() {
  clearInterval(gameInterval);
  const settings = getSettings();
  countdown = settings.timeLimit;
  timerDisplay.textContent = countdown;
  timerDisplay.classList.remove('low-time');

  gameInterval = setInterval(() => {
    countdown--;
    timerDisplay.textContent = countdown;

    if (countdown <= 3) {
      timerDisplay.classList.add('low-time');
    }

    if (countdown <= 0) {
      endGame();
    }
  }, 1000);
}

function startGame() {
  const settings = getSettings();
  points = 0;
  pointsDisplay.textContent = points;

  menuScreen.style.display = "none";
  gameOverModal.style.display = "none";
  gameScreen.style.display = "flex";

  if (pixelElement) {
    pixelElement.remove();
  }
  spawnPixel(settings);
  resetTimer();
}

function endGame() {
  clearInterval(gameInterval);
  if (pixelElement) {
    pixelElement.remove();
    pixelElement = null;
  }

  finalPoints.textContent = points;
  gameOverModal.style.display = "flex";
}

playButton.addEventListener("click", startGame);
retryBtn.addEventListener("click", startGame);
menuBtn.addEventListener("click", () => {
  gameOverModal.style.display = "none";
  menuScreen.style.display = "flex";
});