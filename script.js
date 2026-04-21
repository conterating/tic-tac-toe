const gameboard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => {
    return { board };
  };

  return { getBoard };
})();

function controlGame() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let winner;
  let gameOver = false;

  const getIndexes = (board) => {
    let xIndexes = [];
    let oIndexes = [];

    board.array.forEach((element, index) => {
      if (element == "x") {
        xIndexes.push(index);
      } else if (element == "o") {
        oIndexes.push(index);
      }
    });

    return { xIndexes, oIndexes };
  };

  const xWinner = () => {
    winner = "X's Win";
    return { winner };
  };

  const oWinner = () => {
    winner = "O's Win";
    return { winner };
  };

  const identifyWinner = () => {
    const { xIdx, oIdx } = getIndexes(gameboard.getBoard());

    winningCombinations.forEach((element) => {
      if (JSON.stringify(xIdx) == JSON.stringify(element)) {
        xWinner();
      } else if (JSON.stringify(oIdx) == JSON.stringify(element)) {
        oWinner();
      }
    });
  };

  const checkGameOver = (board) => {
    let notEmpty = [];
    board.forEach((element) => {
      if (element != "") {
        notEmpty.pushEmpty;
      }
    });

    if (notEmpty.length == 9) {
      gameOver = true;
    }
  };

  return { identifyWinner, checkGameOver };
}

function createPlayers() {
  const moves = [];

  const addMove = (move) => {
    moves.push(move);
  };

  const getMoves = () => {
    return { moves };
  };

  return { addMove, getMoves };
}
