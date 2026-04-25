const Gameboard = (() => {
  const board = ["x", "x", "o", "x", "o", "o", "x", "o", "x"];

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
    for (let arr in winningIdxs) {
      let xWins = winningIdxs[arr].every((val) => xIdxs.includes(val));
      let oWins = winningIdxs[arr].every((val) => oIdxs.includes(val));

      if (xWins) {
        winner = "X's Win!!!!";
        break;
      } else if (oWins) {
        winner = "O's Win!!!";
        break;
      } else {
        winner = "draw";
      }
    }

    return winner;
  }

  function getIndices() {
    return { xIdxs, oIdxs };
  }

  return { addIndices, checkWinner, getIndices };
})();
