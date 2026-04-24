const gameboard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  return {
    getBoard() {
      return board;
    },
  };
})();

function Player(side) {
  board = gameboard.getBoard();

  function addMoveToBoard(index) {
    board.splice(index, 1, side);
    console.log(board);
  }

  return {
    addMoveToBoard,
  };
}

xUser = Player("x");
xUser.addMoveToBoard(2);
