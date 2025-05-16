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