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
    xIdxs = [];
    oIdxs = [];

    for (let i = 0; i < board.length; i++) {
      if (board[i] == "x") {
        xIdxs.push(i);
      } else if (board[i] == "o") {
        oIdxs.push(i);
      }
    }
  }

  function declareWinner() {
    addIndices();
    for (let arr in winningIdxs) {
      let xWins = winningIdxs[arr].every((val) => xIdxs.includes(val));
      let oWins = winningIdxs[arr].every((val) => oIdxs.includes(val));
      const allFilled = board.every((element) => element != "");

      if (xWins === true) {
        winner = "x";
        return winner;
      } else if (oWins === true) {
        winner = "o";
        return winner;
      } else if (allFilled === true) {
        winner = "draw";
        return winner;
      }
    }
  }

  function makeMove(player, index) {
    if (board[index] == "") {
      board.splice(index, 1, player.getSide());
    } else {
      console.log("That spot is already taken");
    }
  }

  function resetBoard() {
    //learn how to write this function using array methods
    //we should be able to modify the same array not create a new one
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
  }

  return {
    getBoard,
    addIndices,
    declareWinner,
    makeMove,
    resetBoard,
  };
})();

function createPlayer(name, side) {
  function getName() {
    return name;
  }

  function getSide() {
    return side;
  }

  return {
    getName,
    getSide,
  };
}

function GameController() {
  const player1 = createPlayer("Player 1", "x");
  const player2 = createPlayer("Player 2", "o");

  const players = [player1, player2];
  let xScoreTally = 0;
  let oScoreTally = 0;

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => {
    return activePlayer;
  };

  const playRound = (index) => {
    console.log(
      `${getActivePlayer().getName()} put an ${getActivePlayer().getSide()} at ${index}`,
    );

    Gameboard.makeMove(getActivePlayer(), index);

    let winner = Gameboard.declareWinner();
    console.log(`winner: ${winner}`);
    if (winner == "x") {
      xScoreTally += 1;
    } else if (winner == "o") {
      oScoreTally += 1;
    }

    console.log(`x tally: ${xScoreTally}`);
    console.log(`o tally: ${oScoreTally}`);

    switchPlayerTurn();
    return winner;
    //call the check board full function in here
  };

  const getXScoreTally = () => {
    return xScoreTally;
  };

  const getOScoreTally = () => {
    return oScoreTally;
  };

  const getBoard = () => {
    return Gameboard.getBoard();
  };

  return {
    playRound,
    getActivePlayer,
    getBoard,
    getXScoreTally,
    getOScoreTally,
  };
}

function ScreenController() {
  const game = GameController();
  const boardDiv = document.querySelector(".board");
  const turnDiv = document.querySelector(".turn");
  const resetButton = document.querySelector(".reset");
  const xWinTallyDiv = document.querySelector(".x-wins-tally");
  const oWinTallyDiv = document.querySelector(".o-wins-tally");

  function updateScreen() {
    boardDiv.textContent = "";

    const board = game.getBoard();

    turnDiv.textContent = game.getActivePlayer().getName();

    for (let i = 0; i < board.length; i++) {
      const gridSquare = document.createElement("button");
      gridSquare.classList.add("square");
      gridSquare.setAttribute("data-square-id", i);
      gridSquare.textContent = board[i];

      xWinTallyDiv.textContent = game.getXScoreTally();
      oWinTallyDiv.textContent = game.getOScoreTally();

      boardDiv.append(gridSquare);
    }
  }

  function clickBoardHandler(e) {
    if (e.target.textContent == "") {
      e.target.textContent = game.getActivePlayer().getSide();
      let winner = game.playRound(e.target.getAttribute("data-square-id"));
      if (winner == "x" || winner == "o") {
        Gameboard.resetBoard();
      }

      updateScreen();
    }
  }

  function clickResetHandler() {
    Gameboard.resetBoard();

    updateScreen();
  }

  updateScreen();

  boardDiv.addEventListener("click", clickBoardHandler);
  resetButton.addEventListener("click", clickResetHandler);
}

ScreenController();
