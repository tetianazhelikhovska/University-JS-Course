import { gameLogic } from './gameRules.js';
import { ui } from './ui.js';

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