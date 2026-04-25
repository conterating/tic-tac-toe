const Gameboard = (() => {
  const board = ["x", "x", "x", "", "", "", "", "", ""];

  return {
    getBoard() {
      return board;
    },
  };
})();

function createPlayer(side) {
  board = Gameboard.getBoard();

  function addMoveToBoard(index) {
    if (board[index] == "") {
      board.splice(index, 1, side);
      console.log(board);
    } else {
      console.log("That spot is taken already!");
    }
  }

  return {
    addMoveToBoard,
  };
}

const gameController = (() => {
  board = Gameboard.getBoard();

  const winningIdxs = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let xIdxs = [];
  let oIdxs = [];
  let winner;

  function addIndices() {
    for (let i = 0; i < board.length; i++) {
      if (board[i] == "x") {
        xIdxs.push(i);
      } else if (board[i] == "o") {
        oIdxs.push(i);
      }
    }
  }

  function checkWinner() {
    let counter = 0;

    for (let arr in winningIdxs) {
      if (JSON.stringify(winningIdxs[arr]) == JSON.stringify(xIdxs)) {
        winner = "X's Won!!!!";
        break;
      } else if (JSON.stringify(winningIdxs[arr]) == JSON.stringify(oIdxs)) {
        winner = "O's Won!!!!";
        break;
      }

      counter += 1;

      if (counter == 8) {
        winner = "Draw....";
      }
    }

    return winner;
  }

  return { addIndices, checkWinner };
})();

gameController.addIndices();
console.log(gameController.checkWinner());
