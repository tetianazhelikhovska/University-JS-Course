import { levelLoader } from './components/levelManager.js';
import { gameLogic } from './components/gameRules.js';
import { gameRenderer } from './components/gameRenderer.js';
import { ui } from './components/ui.js';

const boardElement = document.getElementById('gameBoard');
const restartButton = document.getElementById('restartBtn');
const newGameButton = document.getElementById('newGameBtn');
const levelSelect = document.getElementById('levelSelect');

let levels = [];
let currentLevelIndex = 0;

// Завантаження рівня за індексом
const loadLevel = (index) => {
  if (!levels[index]) return;

  currentLevelIndex = index;
  gameLogic.setBoard(levels[index].matrix);
  ui.updateSteps(gameLogic.steps);
  ui.updateTime(gameLogic.time);
  gameRenderer.render(boardElement);
};

// Ініціалізація гри
const init = async () => {
  try {
    levels = await levelLoader.fetchLevels();
    if (!levels.length) return;

    ui.populateLevelSelect(levels, loadLevel);
    gameLogic.onTimeUpdate(ui.updateTime);

    loadLevel(0);

    restartButton.addEventListener('click', () => loadLevel(currentLevelIndex));
    newGameButton.addEventListener('click', () => {
      const randomIndex = Math.floor(Math.random() * levels.length);
      loadLevel(randomIndex);
    });
  } catch (error) {
    console.error('Помилка ініціалізації гри:', error);
  }
};

// Запуск
init();
