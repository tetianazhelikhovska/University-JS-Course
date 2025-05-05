const gameContainer = document.getElementById('game');
const movesDisplay = document.getElementById('moves');
const winMessage = document.getElementById('winMessage');

let grid = [];
let moveCount = 0;

function createGrid(data) {
  grid = data.map(row => row.slice());
  renderGrid();
  moveCount = 0;
  updateMoves();
  winMessage.textContent = '';
}

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
  }
}

function toggle(r, c) {
  if (r >= 0 && r < 5 && c >= 0 && c < 5) {
    grid[r][c] ^= 1;
  }
}

function updateMoves() {
  movesDisplay.textContent = `Кроків: ${moveCount}`;
}

function checkWin() {
  return grid.flat().every(cell => cell === 0);
}

async function loadLevel(levelId) {
  const res = await fetch('data/levels.json');
  const levels = await res.json();
  const level = levels[levelId];
  if (level) {
    createGrid(level);
  } else {
    alert('Рівень не знайдено');
  }
}
