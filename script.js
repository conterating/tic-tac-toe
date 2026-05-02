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
        winner = "X's Win!!!!";
        return winner;
      } else if (oWins === true) {
        winner = "O's Win!!!";
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

  return {
    getBoard,
    addIndices,
    declareWinner,
    makeMove,
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
  const board = Gameboard.getBoard();

  const player1 = createPlayer("Player 1", "x");
  const player2 = createPlayer("Player 2", "o");

  const players = [player1, player2];

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
    console.log(Gameboard.getBoard());

    console.log(Gameboard.declareWinner());
    switchPlayerTurn();
    //call the check board full function in here
  };

  const getBoard = () => {
    return Gameboard.getBoard();
  };

  return {
    playRound,
    getActivePlayer,
    getBoard,
  };
}

function ScreenController() {
  const game = GameController();
  const boardDiv = document.querySelector(".board");
  const turnDiv = document.querySelector(".turn");

  function updateScreen() {
    boardDiv.textContent = "";

    const board = game.getBoard();

    turnDiv.textContent = game.getActivePlayer().getName();

    for (let i = 0; i < board.length; i++) {
      const gridSquare = document.createElement("button");
      gridSquare.classList.add("square");
      gridSquare.setAttribute("data-square-id", i);
      gridSquare.textContent = board[i];

      boardDiv.append(gridSquare);
    }
  }

  function clickBoardHandler(e) {
    if (e.target.textContent == "") {
      e.target.textContent = game.getActivePlayer().getSide();
      console.log(game.getActivePlayer().getSide());
      game.playRound(e.target.getAttribute("data-square-id"));

      updateScreen();
    }
  }

  updateScreen();

  boardDiv.addEventListener("click", clickBoardHandler);
  /*
  const gridSquares = document.querySelectorAll(".square");
  gridSquares.forEach((element) => {
    element.addEventListener("click", clickBoardHandler);
  });

  */
}

ScreenController();
