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

  const identifyWinner = (idxs) => {
    const { xIdx, oIdx } = getIndexes(gameboard.getBoard());

    winningCombinations.forEach((element) => {
      if (JSON.stringify(xIdx) == JSON.stringify(element)) {
        winner = "X's Win";
      } else if (JSON.stringify(oIdx) == JSON.stringify(element)) {
        winner = "O's Win";
      }
    });
  };

  return { identifyWinner };
}

function createPlayers(move) {
  const getMove = () => {
    return { move };
  };

  return { getMove };
}
