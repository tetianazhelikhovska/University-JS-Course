const gameContainer = document.getElementById('game');
const movesDisplay = document.getElementById('moves');
const winMessage = document.getElementById('winMessage');
const timeDisplay = document.getElementById('time');

let grid = [];
let moveCount = 0;
let timer = 0;
let timerInterval;
let levelId = ''; // Поточний рівень
let minMoves = 0; // Мінімальна кількість кроків для виграшу

// Створюємо таймер
function startTimer() {
  timerInterval = setInterval(() => {
    timer++;
    timeDisplay.textContent = `Час: ${timer} сек`;
  }, 1000);
}

// Зупиняємо таймер
function stopTimer() {
  clearInterval(timerInterval);
}

// Створення сітки на основі даних
function createGrid(data) {
  grid = data.map(row => row.slice());
  renderGrid();
  moveCount = 0;
  minMoves = calculateMinMoves(data);
  updateMoves();
  winMessage.textContent = '';
  timer = 0;
  timeDisplay.textContent = `Час: ${timer}`;
  startTimer();
}

// Малюємо сітку
function renderGrid() {
  gameContainer.innerHTML = '';
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      const cell = document.createElement('div');
      cell.className = 'cell' + (grid[i][j] ? ' on' : '');
      cell.dataset.row = i;
      cell.dataset.col = j;
      cell.addEventListener('click', handleClick);
      gameContainer.appendChild(cell);
    }
  }
}

// Обробник кліку на клітинку
function handleClick(e) {
  const row = parseInt(e.target.dataset.row);
  const col = parseInt(e.target.dataset.col);

  toggle(row, col);
  toggle(row - 1, col);
  toggle(row + 1, col);
  toggle(row, col - 1);
  toggle(row, col + 1);

  moveCount++;
  updateMoves();
  renderGrid();

  if (checkWin()) {
    winMessage.textContent = `🎉 Ви виграли за ${moveCount} кроків!`;
    stopTimer();
  }
}

// Перемикає стан клітинки
function toggle(r, c) {
  if (r >= 0 && r < 5 && c >= 0 && c < 5) {
    grid[r][c] ^= 1;
  }
}

// Оновлення лічильника кроків
function updateMoves() {
  movesDisplay.textContent = `Кроків: ${moveCount}`;
}

// Перевірка на виграш
function checkWin() {
  return grid.flat().every(cell => cell === 0) && moveCount <= minMoves;
}

// Розрахунок мінімальної кількості кроків для виграшу
function calculateMinMoves(data) {
  let minMoves = 0;
  for (let row of data) {
    for (let cell of row) {
      if (cell === 1) minMoves++;
    }
  }
  return minMoves;
}

// Завантаження рівня з JSON
async function loadLevel(levelIdParam) {
  const res = await fetch('data/levels.json');
  const levels = await res.json();
  const level = levels[levelIdParam];
  if (level) {
    levelId = levelIdParam;
    createGrid(level);
  } else {
    alert('Рівень не знайдено');
  }
}

// Початок нової гри з випадковим рівнем (відмінним від поточного)
function startNewGame() {
  const levels = ['a', 'b', 'c'];
  let randomLevel;
  do {
    randomLevel = levels[Math.floor(Math.random() * levels.length)];
  } while (randomLevel === levelId); // Перевірка, щоб рівень не був поточним

  loadLevel(randomLevel);
}

// Рестарт поточного рівня
function restartLevel() {
  loadLevel(levelId);
}
