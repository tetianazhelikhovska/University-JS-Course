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