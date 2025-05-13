import { levelLoader } from './components/levelLoader.js';
import { gameLogic } from './components/gameLogic.js';
import { gameRenderer } from './components/gameRenderer.js';
import { ui } from './components/ui.js';

const boardElement = document.getElementById('gameBoard');
const restartButton = document.getElementById('restartBtn');
const newGameButton = document.getElementById('newGameBtn');

let levels = [];
let currentLevelIndex = 0;

levelLoader.fetchLevels().then(fetchedLevels => {
  levels = fetchedLevels;
  if (!levels.length) return;

  const loadLevel = (index) => {
    currentLevelIndex = index;
    gameLogic.setBoard(levels[index].matrix);
    ui.updateSteps(gameLogic.steps);
    ui.updateTime(gameLogic.time);
    gameRenderer.render(boardElement);
  };

  gameLogic.onTimeUpdate(ui.updateTime);
  ui.populateLevelSelect(levels, loadLevel);
  loadLevel(0);

  restartButton.addEventListener('click', () => loadLevel(currentLevelIndex));
  newGameButton.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * levels.length);
    loadLevel(randomIndex);
  });
});

// gameLogic.js
export const gameLogic = { 
  board: [],
  steps: 0,
  boardSize: 5,
  lastMove: null,
  timer: null,
  time: 0,
  timerCallback: null,

  setBoard(matrix) {
    this.board = matrix.map(row => [...row]);
    this.steps = 0;
    this.lastMove = null;
    this.time = 0;
    this.stopTimer();
    this.startTimer();
  },

  toggleCell(row, col) {
    const NEIGHBOR_CELLS = [[0, 0], [-1, 0], [1, 0], [0, -1], [0, 1]];

    for (const [dx, dy] of NEIGHBOR_CELLS) {
      const r = row + dx;
      const c = col + dy;
      if (r >= 0 && r < this.boardSize && c >= 0 && c < this.boardSize) {
        this.board[r][c] = this.board[r][c] ? 0 : 1;
      }
    }

    if (this.lastMove && this.lastMove.row === row && this.lastMove.col === col) {
      this.steps = Math.max(0, this.steps - 1);
      this.lastMove = null;
    } else {
      this.steps++;
      this.lastMove = { row, col };
    }
  },

  checkWin() {
    return this.board.every(row => row.every(cell => cell === 0));
  },

  startTimer() {
    this.timer = setInterval(() => {
      this.time++;
      if (this.timerCallback) this.timerCallback(this.time);
    }, 1000);
  },

  stopTimer() {
    clearInterval(this.timer);
    this.timer = null;
  },

  onTimeUpdate(callback) {
    this.timerCallback = callback;
  }
};

// gameRenderer.js
export const gameRenderer = {
  render(boardElement) {
    boardElement.innerHTML = '';
    boardElement.style.gridTemplateColumns = `repeat(${gameLogic.boardSize}, 50px)`;
    boardElement.style.gridTemplateRows = `repeat(${gameLogic.boardSize}, 50px)`;

    for (let row = 0; row < gameLogic.boardSize; row++) {
      for (let col = 0; col < gameLogic.boardSize; col++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        if (gameLogic.board[row][col]) cell.classList.add('on');
        cell.row = row;
        cell.dataset.col = col;
        cell.addEventListener('click', () => {
          gameLogic.toggleCell(row, col);
          this.render(boardElement);
          ui.updateSteps(gameLogic.steps);
          if (gameLogic.checkWin()) {
            gameLogic.stopTimer();
            setTimeout(() => alert(`Ви виграли за ${gameLogic.steps} кроків і ${gameLogic.time} секунд!`), 100);
          }
        });
        boardElement.appendChild(cell);
      }
    }
  }
};

// levelLoader.js
export const levelLoader = {
  LEVELS_PATH: 'data/levels.json',

  async fetchLevels() {
    try {
      const response = await fetch(this.LEVELS_PATH);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      return data.levels;
    } catch (error) {
      console.error("Помилка при завантаженні рівнів:", error);
      return [];
    }
  }
};

// ui.js
export const ui = {
  updateSteps(steps) {
    document.getElementById('stepCounter').textContent = `Кроків: ${steps}`;
  },

  updateTime(seconds) {
    document.getElementById('timer').textContent = `Час: ${seconds} сек`;
  },

  populateLevelSelect(levels, callback) {
    const levelSelect = document.getElementById('levelSelect');
    levelSelect.innerHTML = ''; // Clear existing options

    levels.forEach((level, index) => {
      const option = document.createElement('option');
      option.value = index;
      option.textContent = `${level.name} (мін. кроків: ${level.minSteps})`;
      levelSelect.appendChild(option);
    });

    levelSelect.addEventListener('change', () => {
      callback(parseInt(levelSelect.value));
    });
  }
};
