const Gameboard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];
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

  function getBoard() {
    return board;
  }

  function addIndices() {
    for (let i = 0; i < board.length; i++) {
      if (board[i] == "x") {
        xIdxs.push(i);
      } else if (board[i] == "o") {
        oIdxs.push(i);
      }
    }
  }

  function declareWinner() {
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

  return {
    getBoard,
    addIndices,
    declareWinner,
  };
})();

function createPlayer(side) {
  board = Gameboard.getBoard();

  function makeMove(index) {
    if (board[index] == "") {
      board.splice(index, 1, side);
      console.log(board);
    } else {
      console.log("That spot is taken already!");
    }
  }

  return {
    makeMove,
  };
}

const controlGame = (() => {
  board = Gameboard.getBoard();

  const player1 = createPlayer("x");
  const player2 = createPlayer("o");

  player1.makeMove("0");
  player2.makeMove("3");
  player1.makeMove("5");
  player2.makeMove("4");
  player1.makeMove("8");
  player2.makeMove("6");
  player1.makeMove("7");
  player2.makeMove("2");
  player1.makeMove("1");

  Gameboard.addIndices();

  const filled = board.every((str) => str !== "");
  if (filled) {
    const winner = Gameboard.declareWinner();
    console.log(winner);
  } else {
    console.log("board isnt full");
  }
})();
