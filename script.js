const gameboard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  return {
    getBoard() {
      return board;
    },
  };
})();

function createPlayer(side) {
  return {
    side,
  };
}

function makeMove(side, index) {
  board = gameboard.getBoard();

  return function addMoveToBoard() {
    board.splice(index, 1, side);
    console.log(board);
  };
}

x3 = makeMove("x", 3);
x3();
